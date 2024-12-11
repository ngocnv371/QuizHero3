 import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44350/',
  redirectUri: baseUrl,
  clientId: 'QuizHero_App',
  responseType: 'code',
  scope: 'offline_access QuizHero',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'QuizHero',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44350',
      rootNamespace: 'QuizHero',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
