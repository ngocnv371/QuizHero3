using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.Account;
using Volo.Abp.Identity;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using Volo.Abp.ObjectExtending;
using QuizHero.Quiz;

namespace QuizHero;

[DependsOn(
	typeof(QuizHeroDomainModule),
	typeof(QuizHeroApplicationContractsModule),
	typeof(AbpPermissionManagementApplicationModule),
	typeof(AbpFeatureManagementApplicationModule),
	typeof(AbpIdentityApplicationModule),
	typeof(AbpAccountApplicationModule),
	typeof(AbpTenantManagementApplicationModule),
	typeof(AbpSettingManagementApplicationModule)
	)]
public class QuizHeroApplicationModule : AbpModule
{
	public override void ConfigureServices(ServiceConfigurationContext context)
	{
		Configure<AbpAutoMapperOptions>(options =>
		{
			options.AddMaps<QuizHeroApplicationModule>();
		});
		ConfigureExtensions();
	}

	private void ConfigureExtensions()
	{
		ObjectExtensionManager.Instance
			.AddOrUpdateProperty<string>(
				new[]
				{
					typeof(IdentityUser),
					typeof(IdentityUserDto),
				},
				IdentityUserExtensions.ZaloIdPropertyName
			);
		ObjectExtensionManager.Instance
			.AddOrUpdateProperty<string>(
				new[]
				{
					typeof(IdentityUser), 
					typeof(IdentityUserDto),
				},
				IdentityUserExtensions.AvatarUrlPropertyName
			);
		ObjectExtensionManager.Instance
			.AddOrUpdateProperty<string>(
				new[]
				{
					typeof(IdentityUser),
					typeof(IdentityUserDto),
				},
				IdentityUserExtensions.CityPropertyName
			);
		ObjectExtensionManager.Instance
			.AddOrUpdateProperty<string>(
				new[]
				{
					typeof(IdentityUser),
					typeof(IdentityUserDto),
				},
				IdentityUserExtensions.ProvincePropertyName
			);
	}
}