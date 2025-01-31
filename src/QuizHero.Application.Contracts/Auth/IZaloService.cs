using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace QuizHero.Auth
{
	public interface IZaloService : IApplicationService
	{
		Task<List<Claim>> AuthenticateAsync(string accessToken);

		Task<IdentityUserDto?> GetProfileAsync();
	}
}