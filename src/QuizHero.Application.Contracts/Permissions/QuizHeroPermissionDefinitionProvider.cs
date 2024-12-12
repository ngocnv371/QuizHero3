using QuizHero.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace QuizHero.Permissions;

public class QuizHeroPermissionDefinitionProvider : PermissionDefinitionProvider
{
	public override void Define(IPermissionDefinitionContext context)
	{
		var myGroup = context.AddGroup(QuizHeroPermissions.GroupName);

		//myGroup.AddPermission(QuizHeroPermissions.MyPermission1, L("Permission:MyPermission1"));
	}

	private static LocalizableString L(string name)
	{
		return LocalizableString.Create<QuizHeroResource>(name);
	}
}