using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using QuizHero.Data;
using Volo.Abp.DependencyInjection;

namespace QuizHero.EntityFrameworkCore;

public class EntityFrameworkCoreQuizHeroDbSchemaMigrator
    : IQuizHeroDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreQuizHeroDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the QuizHeroDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<QuizHeroDbContext>()
            .Database
            .MigrateAsync();
    }
}
