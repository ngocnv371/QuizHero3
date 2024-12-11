using QuizHero.Samples;
using Xunit;

namespace QuizHero.EntityFrameworkCore.Applications;

[Collection(QuizHeroTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<QuizHeroEntityFrameworkCoreTestModule>
{

}
