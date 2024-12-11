using Xunit;

namespace QuizHero.EntityFrameworkCore;

[CollectionDefinition(QuizHeroTestConsts.CollectionDefinitionName)]
public class QuizHeroEntityFrameworkCoreCollection : ICollectionFixture<QuizHeroEntityFrameworkCoreFixture>
{

}
