using System;
using Volo.Abp.Data;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public static class IdentityUserExtensions
	{
		public static readonly string ZaloIdPropertyName = "zaloId";

		public static string GetZaloId(this IHasExtraProperties user)
		{
			return user.GetProperty(ZaloIdPropertyName, "")!.ToString();
		}

		public static IHasExtraProperties SetZaloId(this IHasExtraProperties user, string zaloId)
		{
			user.SetProperty(ZaloIdPropertyName, zaloId);
			return user;
		}

		public static readonly string AvatarUrlPropertyName = "avatarUrl";

		public static string GetAvatarUrl(this IHasExtraProperties user)
		{
			return user.GetProperty(AvatarUrlPropertyName, "")!.ToString();
		}

		public static IHasExtraProperties SetAvatarUrl(this IHasExtraProperties user, string avatarUrl)
		{
			user.SetProperty(AvatarUrlPropertyName, avatarUrl);
			return user;
		}

		public static readonly string CityPropertyName = "city";

		public static string GetCity(this IHasExtraProperties user)
		{
			return user.GetProperty(CityPropertyName, "")!.ToString();
		}

		public static IHasExtraProperties SetCity(this IHasExtraProperties user, string city)
		{
			user.SetProperty(CityPropertyName, city);
			return user;
		}

		public static readonly string ProvincePropertyName = "province";

		public static string GetProvince(this IHasExtraProperties user)
		{
			return user.GetProperty(ProvincePropertyName, "")!.ToString();
		}

		public static IHasExtraProperties SetProvince(this IHasExtraProperties user, string province)
		{
			user.SetProperty(ProvincePropertyName, province);
			return user;
		}
	}
}