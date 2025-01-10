using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace QuizHero.Auth
{
	public interface IZaloService : IApplicationService
	{
		Task<IdentityUserDto> Authenticate(string accessToken);
	}
}