using System.Threading.Tasks;

namespace QuizHero.Location
{
	public class UpdateUserLocationInputDto
	{
		public string LocationId { get; set; } = default!;
	}

	public class UserLocationDto
	{
		public string LocationId { get; set; } = default!;
	}

	public interface IUserLocationsAppService
	{
		Task PutAsync(UpdateUserLocationInputDto input);
		Task<UserLocationDto> GetAsync();
	}
}