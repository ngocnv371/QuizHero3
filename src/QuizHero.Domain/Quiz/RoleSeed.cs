using Polly;
using QuizHero.Permissions;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;

namespace QuizHero.Quiz
{
	public class RoleSeed(
		IdentityRoleManager roleManager,
		PermissionManager permissionManager,
		ICurrentTenant currentTenant,
		IGuidGenerator guidGenerator
		) : IDataSeedContributor, ITransientDependency
	{
		public async Task SeedAsync(DataSeedContext context)
		{
			using (currentTenant.Change(context.TenantId))
			{
				await SeedUserRole(context.TenantId);
			}
		}

		public async Task SeedUserRole(Guid? tenantId)
		{
			var roleName = "user";
			var role = await roleManager.FindByNameAsync(roleName);
			if (role != null)
			{
				return;
			}

			role = new IdentityRole(guidGenerator.Create(), roleName, tenantId)
			{
				IsStatic = true
			};

			await roleManager.CreateAsync(role);

			await permissionManager.SetForRoleAsync(roleName, QuizHeroPermissions.Topics.Default, true);
			await permissionManager.SetForRoleAsync(roleName, QuizHeroPermissions.Quizzes.Default, true);
		}
	}
}