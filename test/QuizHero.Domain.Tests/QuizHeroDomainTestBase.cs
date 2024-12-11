using Volo.Abp.Modularity;

namespace QuizHero;

/* Inherit from this class for your domain layer tests. */
public abstract class QuizHeroDomainTestBase<TStartupModule> : QuizHeroTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
