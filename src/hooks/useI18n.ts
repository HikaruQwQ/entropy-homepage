import { useCallback, useEffect, useState } from 'react';

export type Lang = 'zh' | 'en';

type DictPair<K extends string> = Record<'zh' | 'en', Record<K, string>>;

export function useI18n<K extends string>(dict: DictPair<K>) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('langPref');
    return saved === 'en' ? 'en' : 'zh';
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    localStorage.setItem('langPref', lang);
  }, [lang]);

  const t = useCallback((key: K): string => dict[lang][key], [dict, lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'zh' ? 'en' : 'zh'));
  }, []);

  return {
    lang,
    t,
    toggleLang,
    langLabel: lang === 'zh' ? 'Switch to English' : '切换为中文',
  };
}
