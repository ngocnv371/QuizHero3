using QuizHero.Localization;
using Volo.Abp.Application.Services;

namespace QuizHero;

/* Inherit your application services from this class.
 */
public abstract class QuizHeroAppService : ApplicationService
{
    protected QuizHeroAppService()
    {
        LocalizationResource = typeof(QuizHeroResource);
    }
}
