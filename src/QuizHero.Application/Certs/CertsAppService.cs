using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace QuizHero.Certs
{
	[Authorize(AuthenticationSchemes = "OpenIddict.Validation.AspNetCore")]
	public class CertsAppService(IConfiguration configuration) : QuizHeroAppService, ICertsAppService
	{
		public async Task GenerateCertsAsync()
		{
			var passphrase = configuration["AuthServer:CertificatePassPhrase"];
			GenerateEncryptionCert(passphrase: passphrase);
			GenerateEncryptionCert("openiddict.pfx", passphrase);
			GenerateSigningCert(passphrase: passphrase);
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

		private static void GenerateSigningCert(string fileName = "server-encryption-certificate.pfx", string passphrase = "")
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