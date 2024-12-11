using Volo.Abp.Modularity;

namespace QuizHero;

[DependsOn(
    typeof(QuizHeroApplicationModule),
    typeof(QuizHeroDomainTestModule)
)]
public class QuizHeroApplicationTestModule : AbpModule
{

}
