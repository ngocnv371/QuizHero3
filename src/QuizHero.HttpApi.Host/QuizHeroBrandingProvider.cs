using Microsoft.Extensions.Localization;
using QuizHero.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace QuizHero;

[Dependency(ReplaceServices = true)]
public class QuizHeroBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<QuizHeroResource> _localizer;

    public QuizHeroBrandingProvider(IStringLocalizer<QuizHeroResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
