export const homeI18n = {
  zh: {
    home: '首页', team: '团队', polaris: '极星黑客松',
    heroCta: '了解此活动',
    entropy: '熵序', entropyBody: '一个由中学生组成，结合技术和艺术的多领域团队\n探索未知边界，寻找技术和人文的十字路口',
    tech: '技术', techTitleText: '涉足软件开发、品牌设计等',
    art: '艺术', artBodyText: '致力于探索艺术和技术的融合，团队拥有多位 Designer\n他们在背后构建和谐，巧妙的视觉秩序',
    teamLink: '团队成员 →',
    teamEntryText: '团队成员 →',
    welcome: '欢迎', welcomeTitle: '让我们点燃篝火。',
    welcomeBody: '我们相信，最疯狂的想法往往诞生于最自由的土壤。在这里，没有 KPI，没有绩效，只有你对创造的原始冲动。',
    joinCard1Title: '创造者', joinCard1Body: '无论你是 Coder、Designer 还是 Maker，只要你对创造充满热情，这里就是你的舞台。',
    joinCard2Title: '自由土壤', joinCard2Body: '没有条条框框，没有 KPI 考核，只有纯粹的创作冲动和一群志同道合的伙伴。',
    joinCard3Title: '无限可能', joinCard3Body: '从一个 idea 到一个产品，你将经历 72 小时最密集的创造之旅，收获远超预期。',
    joinHint: '点按此处，加入我们',
    cookieSettings: 'Cookie 设置',
    disclaimer: '免责声明 本网站所引用的 AdventureX 商标由杭州宇徐科技有限公司所有，TechCrunch 商标由科技媒体控股国际有限责任公司持有，SegmentFault 商标由武汉复临科技有限公司持有。本网站仅为叙述与说明目的引用上述商标，不用于商业用途，不代表与上述权利人存在任何关联或合作关系。所有商标权利归其各自权利人所有。'
  },
  en: {
    home: 'Home', team: 'Team', polaris: 'Polaris',
    heroCta: 'Learn more',
    entropy: 'What is _entropy?', entropyBody: '_entropy is a multi-disciplinary team of students combining technology and art\nExploring unknown boundaries, finding the intersection of tech and humanities',
    tech: 'Tech', techTitleText: 'focuses on software development, brand design, and more, with a coder-heavy team',
    art: 'Art', artBodyText: 'explores the fusion of art and technology, with many designers\nBuilding harmonious, subtle visual order behind the scenes',
    teamLink: 'Team →',
    teamEntryText: 'Our Team →',
    welcome: 'Welcome', welcomeTitle: 'Let us light the bonfire.',
    welcomeBody: 'We believe the craziest ideas are born on the freest soil. No KPIs, no performance reviews — only your primal drive to create.',
    joinCard1Title: 'Creators', joinCard1Body: 'Whether you are a Coder, Designer, or Maker, if you are passionate about creating, this is your stage.',
    joinCard2Title: 'Free Soil', joinCard2Body: 'No rules, no KPIs — only pure creative impulse and like-minded companions.',
    joinCard3Title: 'Infinite Possibilities', joinCard3Body: 'From an idea to a product, you will experience the most intense 72 hours of creation, gaining far more than expected.',
    joinHint: 'Tap here to join us',
    cookieSettings: 'Cookie Preferences',
    disclaimer: 'Disclaimer: The AdventureX trademark referenced on this website is owned by Hangzhou Yuxu Technology Co., Ltd.; the TechCrunch trademark is held by Tech Media Holdings International LLC; the SegmentFault trademark is owned by Wuhan Fulin Technology Co., Ltd. This website references the above trademarks solely for narrative and illustrative purposes, not for commercial use, and does not imply any affiliation or partnership with the rights holders. All trademark rights belong to their respective owners.'
  }
} as const;

export type HomeI18nKey = keyof typeof homeI18n.zh;
