using Volo.Abp.Settings;

namespace QuizHero.Settings;

public class QuizHeroSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(QuizHeroSettings.MySetting1));
    }
}
