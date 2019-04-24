/**
 * global configuration
 * @type {{copyright: string, logoPath: string, siteName: string, i18n: {defaultLanguage: string, languages: *[]}}}
 */
module.exports = {
  siteName: '客户关系管理系统',
  copyright: `Telecom Industry CRM System ©${new Date().getFullYear()} Created by kongchenglc@gmail.com`,
  logoPath: '/logo.svg',
  adminBasePath: '/app',

  /* I18n configuration */
  i18n: {
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh'
  }
}
