import React from 'react';
import '../Styles/pages.css';

type PageShellProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const PageShell: React.FC<PageShellProps> = ({ title, subtitle, children }) => (
  <main className="page">
    <div className="page__inner">
      <header className="page__header">
        <h1 className="page__title">{title}</h1>
        {subtitle ? <p className="page__subtitle">{subtitle}</p> : null}
      </header>
      {children ? <div className="page__content">{children}</div> : null}
    </div>
  </main>
);

export default PageShell;
