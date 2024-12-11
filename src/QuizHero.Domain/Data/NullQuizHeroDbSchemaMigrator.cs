using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace QuizHero.Data;

/* This is used if database provider does't define
 * IQuizHeroDbSchemaMigrator implementation.
 */
public class NullQuizHeroDbSchemaMigrator : IQuizHeroDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
