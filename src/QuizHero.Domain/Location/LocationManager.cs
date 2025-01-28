using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Services;

namespace QuizHero.Location
{
	public class LocationManager(
		 IDistributedCache<IEnumerable<Location>, string> _cache
		) : DomainService
	{
		protected readonly JsonSerializerOptions options = new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true
		};

		public async Task<IEnumerable<Location>> GetLocationsAsync()
		{
			return await _cache.GetOrAddAsync(
				"0",
				async () =>
				{
					var l1 = await LoadLocations("tinh-thanh.json");
					var l2 = await LoadLocations("quan-huyen.json");
					return l1.Concat(l2);
				},
				() => new Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions
				{
					AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1000)
				}
			);
		}

		private async Task<IEnumerable<Location>> LoadLocations(string fileName)
		{
			string assemblyPath = Assembly.GetExecutingAssembly().Location;
			string filePath = Path.Combine(Path.GetDirectoryName(assemblyPath), "location", fileName);

			if (!File.Exists(filePath))
			{
				throw new FileNotFoundException("The locations file was not found.", filePath);
			}

			var json = await File.ReadAllTextAsync(filePath);
			var dict = JsonSerializer.Deserialize<Dictionary<string, Location>>(json, options);
			if (dict == null)
			{
				throw new Exception("Failed to deserialize the locations file.");
			}

			var locations = dict.Values.ToList();
			return locations;
		}
	}
}