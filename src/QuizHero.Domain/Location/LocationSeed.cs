using Microsoft.Extensions.Options;
using QuizHero.Quiz;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace QuizHero.Location
{
	public class LocationSeed(
		IRepository<Location> locationRepository
		)
		: IDataSeedContributor, ITransientDependency
	{
		protected readonly JsonSerializerOptions options = new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true
		};

		public async Task SeedAsync(DataSeedContext context)
		{
			if (await locationRepository.GetCountAsync() == 0)
			{
				var items = await LoadLocations("locations.json");
				await locationRepository.InsertManyAsync(items, true);
			}
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
			var items = JsonSerializer.Deserialize<List<Location>>(json, options);
			if (items == null)
			{
				throw new Exception("Failed to deserialize the locations file.");
			}

			var locations = items.ToList();
			return locations;
		}
	}
}