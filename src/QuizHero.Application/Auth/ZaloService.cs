using Microsoft.AspNetCore.Authorization;
using QuizHero.Quiz;
using QuizHero.Zalo;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Data;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Security.Claims;

namespace QuizHero.Auth
{
	public class ZaloService : ApplicationService, IZaloService
	{
		private readonly ZaloManager _zaloManager;
		private readonly IdentityUserManager _identityUserManager;

		public ZaloService(
			ZaloManager zaloManager,
			IdentityUserManager identityUserManager
			)
		{
			_zaloManager = zaloManager;
			_identityUserManager = identityUserManager;
		}

		public async Task<List<Claim>> AuthenticateAsync(string accessToken)
		{
			var user = await _zaloManager.EnsureUser(accessToken);
			if (user == null)
			{
				return null;
			}

			var claims = new List<Claim>
			{
				new Claim(AbpClaimTypes.Role, "user"),
				new Claim(AbpClaimTypes.UserName, user.UserName),
				new Claim(AbpClaimTypes.Name, user.Name),
				new Claim(AbpClaimTypes.UserId, user.Id.ToString()),
				new Claim(AbpClaimTypes.Picture, user.GetAvatarUrl()),
				new Claim(AbpClaimTypes.Email, user.Email),
				new Claim(AbpClaimTypes.EmailVerified, user.EmailConfirmed.ToString())
			};

			return claims;
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		public async Task<IdentityUserDto?> GetProfileAsync()
		{
			if (CurrentUser.Id == null)
			{
				return null;
			}

			var id = CurrentUser.Id.Value;
			var user = await _identityUserManager.FindByIdAsync(id.ToString());
			if (user == null)
			{
				return null;
			}

			var dto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(user);
			return dto;
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		public async Task PutLocationAsync(UpdateLocationInputDto input)
		{
			if (CurrentUser.Id == null)
			{
				return;
			}

			var user = await _identityUserManager.FindByIdAsync(CurrentUser.Id.Value.ToString());
			if (user == null)
			{
				return;
			}

			user.SetCity(input.City);
			user.SetProvince(input.Province);
			await _identityUserManager.UpdateAsync(user);
		}
	}
}