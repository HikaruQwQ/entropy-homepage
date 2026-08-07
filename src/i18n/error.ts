export const errorI18n = {
  zh: {
    homeLogoLabel: '返回首页',
    errorEyebrow: '错误',
    errorTitle: 'something went wrong',
    errorMsg1: '发生了一些问题，请稍后重试。',
    errorMsg2Pre: '如果问题依然存在，请联系 ',
    notfoundEyebrow: '404',
    notfoundTitle: 'page not found',
    notfoundMsg1: '你访问的页面不存在或已被移动。',
    notfoundMsg2Pre: '请检查网址，或',
    notfoundMsg2Post: '。',
    backHome: '返回首页',
  },
  en: {
    homeLogoLabel: 'Back to home',
    errorEyebrow: 'Error',
    errorTitle: 'something went wrong',
    errorMsg1: 'Something went wrong. Please try again later.',
    errorMsg2Pre: 'If the problem persists, please contact ',
    notfoundEyebrow: '404',
    notfoundTitle: 'page not found',
    notfoundMsg1: 'The page you are looking for does not exist or has been moved.',
    notfoundMsg2Pre: 'Please check the address, or ',
    notfoundMsg2Post: '.',
    backHome: 'go back home',
  }
} as const;

export type ErrorI18nKey = keyof typeof errorI18n.zh;
