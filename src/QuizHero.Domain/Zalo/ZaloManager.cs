using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.SettingManagement;

namespace QuizHero.Zalo
{
	public class ZaloManager(
		HttpClient client,
		IdentityUserManager identityUserManager
		, IdentityRoleManager identityRoleManager
		, IConfiguration configuration
		) : DomainService
	{
		protected string GetProof(string accessToken)
		{
			var secret = configuration["Zalo:AppSecret"];
			var keyBytes = Encoding.UTF8.GetBytes(secret);
			var dataBytes = Encoding.UTF8.GetBytes(accessToken);
			using (var hmac = new HMACSHA256(keyBytes))
			{
				var hashBytes = hmac.ComputeHash(dataBytes);
				var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
				return hash;
			}
		}

		protected async Task<ZaloProfileResponse?> GetProfile(string accessToken)
		{
			if (string.IsNullOrWhiteSpace(accessToken))
			{
				return null;
			}

			var defaultToken = configuration["Zalo:DefaultAccessToken"];
			if (accessToken == defaultToken)
			{
				return new ZaloProfileResponse
				{
					Error = 0,
					Id = "a123456",
					Name = "Test User",
					Picture = new ZaloPictureDto
					{
						Data = new ZaloPictureDataDto
						{
							Url = "https://picsum.photos/200/200"
						}
					}
				};
			}

			var request = new HttpRequestMessage(HttpMethod.Get, "https://graph.zalo.me/v2.0/me?fields=id,name,picture");
			request.Headers.Add("access_token", accessToken);
			request.Headers.Add("appsecret_proof", GetProof(accessToken));
			var response = await client.SendAsync(request);
			if (response.IsSuccessStatusCode)
			{
				var content = await response.Content.ReadAsStringAsync();
				var data = JsonSerializer.Deserialize<ZaloProfileResponse>(content, new JsonSerializerOptions
				{
					PropertyNameCaseInsensitive = true
				});
				if (data == null)
				{
					Logger.LogError("Zalo response is null: {0}", content);
					return null;
				}
				if (data.Error != 0)
				{
					Logger.LogError("Zalo error: {0} - {1}", data.Error, data.Message);
					return null;
				}

				return data;
			}
			else
			{
				return null;
			}
		}

		public async Task<IdentityUser?> EnsureUser(string accessToken)
		{
			var profile = await GetProfile(accessToken);
			if (profile == null)
			{
				return null;
			}

			var name = $"u{profile.Id}";
			var email = $"{name}@zalo.com";
			var user = await identityUserManager.FindByEmailAsync(email);
			if (user != null)
			{
				return user;
			}

			var role = await identityRoleManager.FindByNameAsync("user");
			user = new IdentityUser(GuidGenerator.Create(), name, email);
			user.Name = profile.Name;
			user.SetProperty("ZaloId", profile.Id.ToString());
			user.SetProperty("AvatarUrl", profile.Picture.Data.Url);
			user.SetEmailConfirmed(true);
			user.IsExternal = true;
			user.AddRole(role.Id);
			await identityUserManager.CreateAsync(user, configuration["Zalo:DefaultPassword"], validatePassword: false);

			return user;
		}
	}
}