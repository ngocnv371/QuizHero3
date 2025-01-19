using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using QuizHero.Localization;
using QuizHero.MultiTenancy;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.SettingManagement;
using Volo.Abp.BlobStoring.Database;
using Volo.Abp.Caching;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement.OpenIddict;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.TenantManagement;
using Volo.Abp.ObjectExtending;

namespace QuizHero;

[DependsOn(
	typeof(QuizHeroDomainSharedModule),
	typeof(AbpAuditLoggingDomainModule),
	typeof(AbpCachingModule),
	typeof(AbpBackgroundJobsDomainModule),
	typeof(AbpFeatureManagementDomainModule),
	typeof(AbpPermissionManagementDomainIdentityModule),
	typeof(AbpPermissionManagementDomainOpenIddictModule),
	typeof(AbpSettingManagementDomainModule),
	typeof(AbpEmailingModule),
	typeof(AbpIdentityDomainModule),
	typeof(AbpOpenIddictDomainModule),
	typeof(AbpTenantManagementDomainModule),
	typeof(BlobStoringDatabaseDomainModule)
	)]
public class QuizHeroDomainModule : AbpModule
{
	public override void ConfigureServices(ServiceConfigurationContext context)
	{
		Configure<AbpMultiTenancyOptions>(options =>
		{
			options.IsEnabled = MultiTenancyConsts.IsEnabled;
		});

		Configure<AbpLocalizationOptions>(options =>
		{
			options.Languages.Add(new LanguageInfo("en", "en", "English"));
		});

#if DEBUG
		context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
	}
}