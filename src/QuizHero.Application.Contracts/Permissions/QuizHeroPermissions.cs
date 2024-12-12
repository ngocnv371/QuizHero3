namespace QuizHero.Permissions;

public static class QuizHeroPermissions
{
	public const string GroupName = "QuizHero";

	public static class Quizzes
	{
		public const string Default = GroupName + ".Quizzes";
		public const string Create = Default + ".Create";
		public const string Edit = Default + ".Edit";
		public const string Delete = Default + ".Delete";
	}
}