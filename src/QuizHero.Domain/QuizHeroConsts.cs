using Volo.Abp.Identity;

namespace QuizHero;

public static class QuizHeroConsts
{
	public const string DbTablePrefix = "App";
	public const string? DbSchema = "Quiz";
	public const string AdminEmailDefaultValue = IdentityDataSeedContributor.AdminEmailDefaultValue;
	public const string AdminPasswordDefaultValue = IdentityDataSeedContributor.AdminPasswordDefaultValue;
}