using QuizHero.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace QuizHero.Permissions;

public class QuizHeroPermissionDefinitionProvider : PermissionDefinitionProvider
{
	public override void Define(IPermissionDefinitionContext context)
	{
		var myGroup = context.AddGroup(QuizHeroPermissions.GroupName);

		var quiz = myGroup.AddPermission(QuizHeroPermissions.Quizzes.Default, L("Permission:Quizzes"));
		quiz.AddChild(QuizHeroPermissions.Quizzes.Create, L("Permission:Quizzes.Create"));
		quiz.AddChild(QuizHeroPermissions.Quizzes.Edit, L("Permission:Quizzes.Edit"));
		quiz.AddChild(QuizHeroPermissions.Quizzes.Delete, L("Permission:Quizzes.Delete"));
	}

	private static LocalizableString L(string name)
	{
		return LocalizableString.Create<QuizHeroResource>(name);
	}
}