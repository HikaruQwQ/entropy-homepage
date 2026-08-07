export const cookieI18n = {
  zh: {
    ariaLabel: 'Cookie 与数据使用提示',
    title: 'Cookie 与数据使用',
    message:
      '我们使用 Cookie 及类似技术进行性能监控、错误收集、用户行为分析与网站优化，以持续改善您的访问体验。相关数据仅会在您同意后通过网站脚本收集，您的选择将被保存在本地浏览器中。',
    accept: '接受',
    decline: '拒绝',
  },
  en: {
    ariaLabel: 'Cookie and data usage notice',
    title: 'Cookies & Data Usage',
    message:
      'We use cookies and similar technologies for performance monitoring, error collection, user behavior analysis, and website optimization to continuously improve your experience. Data is collected via JavaScript only after you consent. Your choice is stored locally in your browser.',
    accept: 'Accept',
    decline: 'Decline',
  },
} as const;

export type CookieI18nKey = keyof typeof cookieI18n.zh;
