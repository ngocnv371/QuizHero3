using System.Threading.Tasks;

namespace QuizHero.Data;

public interface IQuizHeroDbSchemaMigrator
{
    Task MigrateAsync();
}
