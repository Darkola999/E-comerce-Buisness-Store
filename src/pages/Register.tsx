import React from 'react';
import PageShell from './PageShell';

const Register: React.FC = () => (
  <PageShell
    title="Inscription"
    subtitle="Rejoignez le catalogue et profitez d'une experience sur mesure."
    className="page--auth"
  >
    <section className="auth-layout" aria-label="Inscription">
      <div className="auth-card">
        <h2 className="auth-title">Creer un compte</h2>
        <p className="auth-text">Quelques informations et vous etes pret.</p>

        <label className="auth-field" htmlFor="register-name">
          Nom complet
          <input
            id="register-name"
            className="auth-input"
            type="text"
            placeholder="Votre nom"
            autoComplete="name"
          />
        </label>
        <label className="auth-field" htmlFor="register-email">
          Email
          <input
            id="register-email"
            className="auth-input"
            type="email"
            placeholder="nom@exemple.com"
            autoComplete="email"
          />
        </label>
        <label className="auth-field" htmlFor="register-password">
          Mot de passe
          <input
            id="register-password"
            className="auth-input"
            type="password"
            placeholder="********"
            autoComplete="new-password"
          />
        </label>
        <label className="auth-field" htmlFor="register-confirm">
          Confirmer le mot de passe
          <input
            id="register-confirm"
            className="auth-input"
            type="password"
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        <label className="auth-check" htmlFor="register-terms">
          <input id="register-terms" type="checkbox" />
          J'accepte les conditions d'utilisation.
        </label>

        <button className="auth-submit" type="button">
          Creer mon compte
        </button>

        <p className="auth-footer">
          Deja inscrit ?{' '}
          <a className="auth-link" href="/login">
            Se connecter
          </a>
        </p>
      </div>

      <div className="auth-hero auth-hero--alt" aria-hidden="true">
        <span className="auth-eyebrow">Bourcha Pro</span>
        <h3 className="auth-hero-title">Des selections premium</h3>
        <p className="auth-hero-text">
          Des comptes dedies aux professionnels pour gerer vos stocks, vos
          livraisons, et vos remises.
        </p>
        <ul className="auth-hero-list">
          <li>Catalogues adaptes a votre activite.</li>
          <li>Acces aux offres en avant-premiere.</li>
          <li>Support prioritaire pour vos demandes.</li>
        </ul>
      </div>
    </section>
  </PageShell>
);

export default Register;
