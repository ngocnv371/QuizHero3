using QuizHero.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace QuizHero.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(QuizHeroEntityFrameworkCoreModule),
    typeof(QuizHeroApplicationContractsModule)
)]
public class QuizHeroDbMigratorModule : AbpModule
{
}
