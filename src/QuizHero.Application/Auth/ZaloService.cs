using QuizHero.Zalo;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;

namespace QuizHero.Auth
{
	public class ZaloService : ApplicationService, IZaloService
	{
		private readonly ZaloManager _zaloManager;

		public ZaloService(ZaloManager zaloManager)
		{
			_zaloManager = zaloManager;
		}

		public async Task<IdentityUserDto?> Authenticate(string accessToken)
		{
			var user = await _zaloManager.EnsureUser(accessToken);
			if (user == null)
			{
				return null;
			}

			var dto = ObjectMapper.Map<IdentityUser, IdentityUserDto>(user);
			return dto;
		}
	}
}