using Volo.Abp.Caching;

namespace QuizHero.Zalo
{
	public class ZaloErrorResponse
	{
		public int Error { get; set; }
		public string Message { get; set; } = default!;
	}

	[CacheName("ZaloProfile")]
	public class ZaloProfileResponse : ZaloErrorResponse
	{
		public string Id { get; set; } = default!;
		public string Name { get; set; } = default!;
		public ZaloPictureDto Picture { get; set; } = default!;
	}

	public class ZaloPictureDto
	{
		public ZaloPictureDataDto Data { get; set; } = default!;
	}

	public class ZaloPictureDataDto
	{
		public string Url { get; set; } = default!;
	}
}