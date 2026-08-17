import { XIcon } from './icons';
import { Button } from './Button';
import { requestOpenCookieSettings } from '../lib/consent';

export function Footer({ disclaimer, cookieSettingsLabel }: { disclaimer?: string; cookieSettingsLabel?: string }) {
  const labelMatch = disclaimer?.match(/^(免责声明|Disclaimer)[:：]?\s*/);
  const disclaimerLabel = labelMatch ? labelMatch[1] : '';
  const disclaimerContent = disclaimer ? (labelMatch ? disclaimer.slice(labelMatch[0].length) : disclaimer) : '';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <p className="footer-copyright">
              © 2026 熵序前言（上海）教育科技有限公司. All Rights Reserved.
            </p>
            <a href="https://beian.miit.gov.cn/" className="footer-link" target="_blank" rel="noopener noreferrer">
              沪ICP备2026033811号
            </a>
            {cookieSettingsLabel && (
              <Button className="footer-cookie-btn" onClick={requestOpenCookieSettings}>
                {cookieSettingsLabel}
              </Button>
            )}
            <a
              href="https://x.com/_entropyhq"
              className="footer-social"
              target="_blank"
              rel="noopener"
              aria-label="X (Twitter)"
            >
              <XIcon />
            </a>
          </div>
          {disclaimer && (
            <div className="footer-right">
              <p className="footer-disclaimer">
                <span className="footer-disclaimer-label">{disclaimerLabel}</span>
                <span className="footer-disclaimer-content">{disclaimerContent}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
