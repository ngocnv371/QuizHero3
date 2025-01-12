using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using QuizHero.Permissions;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace QuizHero.Certs
{
	public class CertsAppService(IConfiguration configuration) : QuizHeroAppService, ICertsAppService
	{
		[Authorize(QuizHeroPermissions.Certificates.Default)]
		public async Task GenerateCertsAsync()
		{
			var passphrase = configuration["AuthServer:CertificatePassPhrase"];
			GenerateEncryptionCert(passphrase: passphrase);
			GenerateSigningCert(passphrase: passphrase);
			GenerateSigningCert("openiddict.pfx", passphrase);
		}

		private static void GenerateEncryptionCert(string fileName = "server-encryption-certificate.pfx", string passphrase = "")
		{
			using var algorithm = RSA.Create(keySizeInBits: 2048);

			var subject = new X500DistinguishedName("CN=Fabrikam Server Encryption Certificate");
			var request = new CertificateRequest(subject, algorithm, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
			request.CertificateExtensions.Add(new X509KeyUsageExtension(X509KeyUsageFlags.KeyEncipherment, critical: true));

			var certificate = request.CreateSelfSigned(DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddYears(2));

			File.WriteAllBytes(fileName, certificate.Export(X509ContentType.Pfx, passphrase));
		}

		private static void GenerateSigningCert(string fileName = "server-signing-certificate.pfx", string passphrase = "")
		{
			using var algorithm = RSA.Create(keySizeInBits: 2048);

			var subject = new X500DistinguishedName("CN=Fabrikam Server Encryption Certificate");
			var request = new CertificateRequest(subject, algorithm, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
			request.CertificateExtensions.Add(new X509KeyUsageExtension(X509KeyUsageFlags.KeyEncipherment, critical: true));

			var certificate = request.CreateSelfSigned(DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddYears(2));

			File.WriteAllBytes(fileName, certificate.Export(X509ContentType.Pfx, passphrase));
		}
	}
}