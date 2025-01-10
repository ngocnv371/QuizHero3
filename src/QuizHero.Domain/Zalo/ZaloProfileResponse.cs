namespace QuizHero.Zalo
{
	public class ZaloErrorResponse
	{
		public int Error { get; set; }
		public string Message { get; set; }
	}

	public class ZaloProfileResponse : ZaloErrorResponse
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public ZaloPictureDto Picture { get; set; }
	}

	public class ZaloPictureDto
	{
		public ZaloPictureDataDto Data { get; set; }
	}

	public class ZaloPictureDataDto
	{
		public string Url { get; set; }
	}
}