import React from 'react';
import PageShell from './PageShell';

const Login: React.FC = () => (
  <PageShell
    title="Connexion"
    subtitle="Accedez a votre espace pour gerer vos commandes et vos favoris."
    className="page--auth"
  >
    <section className="auth-layout" aria-label="Connexion">
      <div className="auth-card">
        <h2 className="auth-title">Se connecter</h2>
        <p className="auth-text">Renseignez vos informations pour continuer.</p>

        <label className="auth-field" htmlFor="login-email">
          Email
          <input
            id="login-email"
            className="auth-input"
            type="email"
            placeholder="nom@exemple.com"
            autoComplete="email"
          />
        </label>
        <label className="auth-field" htmlFor="login-password">
          Mot de passe
          <input
            id="login-password"
            className="auth-input"
            type="password"
            placeholder="********"
            autoComplete="current-password"
          />
        </label>

        <div className="auth-row">
          <label className="auth-check" htmlFor="login-remember">
            <input id="login-remember" type="checkbox" />
            Se souvenir de moi
          </label>
          <a className="auth-link" href="/support">
            Mot de passe oublie ?
          </a>
        </div>

        <button className="auth-submit" type="button">
          Se connecter
        </button>

        <div className="auth-divider" role="presentation">
          <span>ou</span>
        </div>

        <button className="auth-ghost" type="button">
          Continuer avec Google
        </button>

        <p className="auth-footer">
          Pas de compte ?{' '}
          <a className="auth-link" href="/register">
            Creez un compte
          </a>
        </p>
      </div>

      <div className="auth-hero" aria-hidden="true">
        <span className="auth-eyebrow">Bourcha</span>
        <h3 className="auth-hero-title">Un catalogue vivant</h3>
        <p className="auth-hero-text">
          Decouvrez les selections exclusives, les mises en avant du mois, et les
          recommandations personnalisees.
        </p>
        <ul className="auth-hero-list">
          <li>Acces rapide aux nouvelles sorties.</li>
          <li>Historique des commandes disponible.</li>
          <li>Notifications sur les offres privees.</li>
        </ul>
      </div>
    </section>
  </PageShell>
);

export default Login;
