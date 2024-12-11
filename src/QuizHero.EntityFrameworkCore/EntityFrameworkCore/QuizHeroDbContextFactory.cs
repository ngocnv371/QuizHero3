using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace QuizHero.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class QuizHeroDbContextFactory : IDesignTimeDbContextFactory<QuizHeroDbContext>
{
    public QuizHeroDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        QuizHeroEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<QuizHeroDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new QuizHeroDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../QuizHero.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
