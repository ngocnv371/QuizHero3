namespace QuizHero.Permissions;

public static class QuizHeroPermissions
{
	public const string GroupName = "QuizHero";

	public static class Quizzes
	{
		public const string Default = GroupName + ".Quizzes";
		public const string Create = Default + ".Create";
		public const string Update = Default + ".Update";
		public const string Delete = Default + ".Delete";
	}

	public static class Questions
	{
		public const string Default = GroupName + ".Questions";
		public const string Create = Default + ".Create";
		public const string Update = Default + ".Update";
		public const string Delete = Default + ".Delete";
	}
}