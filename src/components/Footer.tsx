export function Footer({ disclaimer }: { disclaimer: string }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copyright">
            © 2026 熵序前言（上海）教育科技有限公司. All Rights Reserved.
          </p>
          <a href="https://beian.miit.gov.cn/" className="footer-link" target="_blank" rel="noopener">
            沪ICP备2026033811号
          </a>
          <p className="footer-disclaimer">{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
