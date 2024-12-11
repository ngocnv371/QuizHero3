using Volo.Abp.Modularity;

namespace QuizHero;

public abstract class QuizHeroApplicationTestBase<TStartupModule> : QuizHeroTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
