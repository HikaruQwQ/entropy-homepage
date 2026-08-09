export const polarisI18n = {
  zh: {
    home: '首页',
    team: '团队',
    polaris: '极星黑客松',
    pageTitle: '极星黑客松',
    pageBody: '页面内容即将上线，敬请期待。',
    backHome: '返回首页',
    cookieSettings: 'Cookie 设置',
    disclaimer: '免责声明 本网站所引用的 AdventureX 商标由杭州宇徐科技有限公司所有，TechCrunch 商标由科技媒体控股国际有限责任公司持有，SegmentFault 商标由武汉复临科技有限公司持有。本网站仅为叙述与说明目的引用上述商标，不用于商业用途，不代表与上述权利人存在任何关联或合作关系。所有商标权利归其各自权利人所有。'
  },
  en: {
    home: 'Home',
    team: 'Team',
    polaris: 'Polaris',
    pageTitle: 'Polaris Hackathon',
    pageBody: 'Content coming soon. Stay tuned.',
    backHome: 'Back to Home',
    cookieSettings: 'Cookie Preferences',
    disclaimer: 'Disclaimer: The AdventureX trademark referenced on this website is owned by Hangzhou Yuxu Technology Co., Ltd.; the TechCrunch trademark is held by Tech Media Holdings International LLC; the SegmentFault trademark is owned by Wuhan Fulin Technology Co., Ltd. This website references the above trademarks solely for narrative and illustrative purposes, not for commercial use, and does not imply any affiliation or partnership with the rights holders. All trademark rights belong to their respective owners.'
  }
} as const;

export type PolarisI18nKey = keyof typeof polarisI18n.zh;
