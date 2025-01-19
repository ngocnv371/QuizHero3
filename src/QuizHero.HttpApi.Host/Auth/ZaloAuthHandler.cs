using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Security.Claims;
using Volo.Abp.Users;

namespace QuizHero.Auth
{
	public static class ZaloScheme
	{
		public const string Name = "Zalo";
	}

	public class ZaloAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
	{
		private const string HeaderName = "X-Zalo-Access-Key";
		private readonly IZaloService ZaloService;
		private readonly ICurrentUser CurrentUser;

		public ZaloAuthHandler(
			IOptionsMonitor<AuthenticationSchemeOptions> options,
			ILoggerFactory logger,
			UrlEncoder encoder,
			ICurrentUser currentUser,
			IZaloService zaloService
		) : base(options, logger, encoder)
		{
			ZaloService = zaloService;
			CurrentUser = currentUser;
		}

		protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
		{
			if (!Request.Headers.ContainsKey(HeaderName))
			{
				return AuthenticateResult.NoResult();
			}

			var headerValue = Request.Headers[HeaderName].ToString();
			var user = await ZaloService.Authenticate(headerValue);
			if (user == null)
			{
				return AuthenticateResult.Fail("Invalid access key");
			}

			var claims = new List<Claim>
			{
				new Claim(AbpClaimTypes.Role, "user"),
				new Claim(AbpClaimTypes.UserName, user.UserName),
				new Claim(AbpClaimTypes.Name, user.Name),
				new Claim(AbpClaimTypes.UserId, user.Id.ToString()),
				new Claim(AbpClaimTypes.Picture, user.GetProperty("AvatarUrl").ToString()),
				new Claim(AbpClaimTypes.Email, user.Email),
				new Claim(AbpClaimTypes.EmailVerified, user.EmailConfirmed.ToString())
			};
			var identity = new ClaimsIdentity(claims, Scheme.Name);
			var principal = new ClaimsPrincipal(identity);
			var ticket = new AuthenticationTicket(principal, Scheme.Name);

			return AuthenticateResult.Success(ticket);
		}
	}
}