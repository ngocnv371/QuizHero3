using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace QuizHero.Auth
{
	public class UpdateLocationInputDto
	{
		public string City { get; set; } = default!;
		public string Province { get; set; } = default!;
	}

	public interface IZaloService : IApplicationService
	{
		Task<List<Claim>> AuthenticateAsync(string accessToken);
		Task<IdentityUserDto?> GetProfileAsync();
		Task PutLocationAsync(UpdateLocationInputDto input);
	}
}