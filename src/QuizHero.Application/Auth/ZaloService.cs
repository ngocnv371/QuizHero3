using QuizHero.Zalo;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace QuizHero.Auth
{
	public class ZaloService : ApplicationService, IZaloService
	{
		private readonly ZaloManager _zaloManager;

		public ZaloService(ZaloManager zaloManager)
		{
			_zaloManager = zaloManager;
		}

		public async Task<IdentityUserDto> Authenticate(string accessToken)
		{
			var user = await _zaloManager.EnsureUser(accessToken);
			if (user == null)
			{
				return null;
			}

			return ObjectMapper.Map<IdentityUser, IdentityUserDto>(user);
		}
	}
}