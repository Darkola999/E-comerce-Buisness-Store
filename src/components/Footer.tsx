import React from 'react';
import '../Styles/Footer.css';
import type { IconType } from 'react-icons';
import { FaEnvelope, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import brandLogo from '../assets/bourchanin new logo_Plan de travail 1.png';

const Footer: React.FC = () => (
  <footer className="footer" aria-label="Footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <img
          className="footer-logo footer-logo--zoom"
          src={brandLogo}
          alt="Bourchanin logo"
        />
        <p className="footer-text">
          Votre partenaire de confiance pour la distribution d'alcools et spiritueux
          auprès des professionnels.
        </p>
      </div>
      <div className="footer-column">
        <h3 className="footer-title">Services</h3>
        <ul className="footer-list">
          <li><a href="/catalogue">Catalogue en ligne</a></li>
          <li><a href="/livraison">Livraison express</a></li>
          <li><a href="/conseils">Conseils personnalises</a></li>
          <li><a href="/formation">Formation equipes</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3 className="footer-title">Support</h3>
        <ul className="footer-list">
          <li><a href="/aide">Centre d'aide</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/conditions">Conditions generales</a></li>
          <li><a href="/confidentialite">Politique de confidentialite</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3 className="footer-title">Contact</h3>
        <ul className="footer-list footer-contact">
          <li>
            {React.createElement(FaPhone as IconType, {
              className: 'footer-icon',
              'aria-hidden': true,
            })}
            <a href="tel:0123456789">01 23 45 67 89</a>
          </li>
          <li>
            {React.createElement(FaEnvelope as IconType, {
              className: 'footer-icon',
              'aria-hidden': true,
            })}
            <a href="mailto:contact@voxup.com">contact@voxup.com</a>
          </li>
          <li>
            {React.createElement(FaMapMarkerAlt as IconType, {
              className: 'footer-icon',
              'aria-hidden': true,
            })}
            <a href="https://maps.google.com/?q=123+Avenue+des+Vignes+75001+Paris+France">
              123 Avenue des Vignes
              <span>75001 Paris, France</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-social">
        <a className="footer-social__link" href="https://www.linkedin.com" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a className="footer-social__link" href="https://www.x.com" aria-label="X">
          <FaXTwitter />
        </a>
        <a className="footer-social__link" href="https://www.facebook.com" aria-label="Facebook">
          <FaFacebookF />
        </a>
      </div>
    </div>
    <div className="footer-divider"></div>
    <div className="footer-legal">
      <span>© 2025 Delta Cloud. Tous droits réservés.</span>
      <div className="footer-legal__links">
        <a href="/mentions-legales">Mentions legales</a>
        <a href="/cookies">Cookies</a>
        <a href="/plan-du-site">Plan du site</a>
      </div>
    </div>
  </footer>
);

export default Footer;
