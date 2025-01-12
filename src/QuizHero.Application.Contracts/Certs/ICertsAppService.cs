using System.Threading.Tasks;

namespace QuizHero.Certs
{
	public interface ICertsAppService
	{
		Task GenerateCertsAsync();
	}
}