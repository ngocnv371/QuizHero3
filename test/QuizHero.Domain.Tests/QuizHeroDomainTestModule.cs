using Volo.Abp.Modularity;

namespace QuizHero;

[DependsOn(
    typeof(QuizHeroDomainModule),
    typeof(QuizHeroTestBaseModule)
)]
public class QuizHeroDomainTestModule : AbpModule
{

}
