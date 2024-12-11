using QuizHero.Samples;
using Xunit;

namespace QuizHero.EntityFrameworkCore.Domains;

[Collection(QuizHeroTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<QuizHeroEntityFrameworkCoreTestModule>
{

}
