using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Security.Claims;

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

		public ZaloAuthHandler(
			IOptionsMonitor<AuthenticationSchemeOptions> options,
			ILoggerFactory logger,
			UrlEncoder encoder,
			IZaloService zaloService
		) : base(options, logger, encoder)
		{
			ZaloService = zaloService;
		}

		protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
		{
			if (!Request.Headers.ContainsKey(HeaderName))
			{
				return AuthenticateResult.NoResult();
			}

			var headerValue = Request.Headers[HeaderName].ToString();
			var claims = await ZaloService.AuthenticateAsync(headerValue);
			
			var identity = new ClaimsIdentity(claims, Scheme.Name);
			var principal = new ClaimsPrincipal(identity);
			var ticket = new AuthenticationTicket(principal, Scheme.Name);

			return AuthenticateResult.Success(ticket);
		}
	}
}