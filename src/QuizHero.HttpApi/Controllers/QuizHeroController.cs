using QuizHero.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace QuizHero.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class QuizHeroController : AbpControllerBase
{
    protected QuizHeroController()
    {
        LocalizationResource = typeof(QuizHeroResource);
    }
}
