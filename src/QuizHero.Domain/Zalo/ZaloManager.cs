using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;

namespace QuizHero.Zalo
{
	public class ZaloManager(HttpClient client, IdentityUserManager identityUserManager) : DomainService
	{
		protected async Task<ZaloProfileResponse?> GetProfile(string accessToken)
		{
			// TODO: add secret proof
			var request = new HttpRequestMessage(HttpMethod.Get, "https://graph.zalo.me/v2.0/me?fields=id,name,picture");
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

			var user = await identityUserManager.FindByLoginAsync("Zalo", profile.Id.ToString());
			if (user == null)
			{
				var email = $"{profile.Id}@zalo.com";
				user = new IdentityUser(GuidGenerator.Create(), profile.Name, email);
				user.SetEmailConfirmed(true);
				user.IsExternal = true;
				await identityUserManager.CreateAsync(user);
				await identityUserManager.AddLoginAsync(user, new UserLoginInfo("Zalo", profile.Id.ToString(), profile.Name));
			}
			return user;
		}
	}
}