using System.Text.Json.Serialization;

namespace QuizHero.Location
{
	public class Location
	{
		public string Code { get; set; } = default!;
		[JsonPropertyName("Name_With_Type")]
		public string Name { get; set; } = default!;
		[JsonPropertyName("Parent_Code")]
		public string ParentCode { get; set; } = default!;
	}
}