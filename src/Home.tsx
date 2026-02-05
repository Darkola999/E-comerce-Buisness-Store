import React, { useRef, useState } from 'react';
import './Styles/Home.css';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
import {
  FaChartLine,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt,
  FaTruck,
  FaUtensils,

} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import brandLogo from './assets/bourchanin new logo_Plan de travail 1.png';
import cataloguePreview from './assets/CatalogueBourcha_page-0026.jpg';
import cataloguePreviewAlt from './assets/CatalogueBourcha_page-0030.jpg';
import banner1 from './assets/Banner/Banner1.png';
import banner2 from './assets/Banner/banner2.png';
import banner3 from './assets/Banner/Banner3.png';
import banner4 from './assets/Banner/Banner4.png';

function Home() {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<number | null>(null);
  const TruckIcon = FaTruck as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const ShieldIcon = FaShieldAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const TrendIcon = FaChartLine as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const UtensilsIcon = FaUtensils as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  const carouselItems = [
    {
      image: banner1,
      label: 'NOUVEAU',
      button: 'Decouvrir',
      title: 'Nouveautes Spiritueux',
      subtitle: 'Collection Premium 2024',
      description: "Whiskies rares et cognacs d'exception maintenant disponibles",
    },
    {
      image: banner2,
      label: 'EXCLUSIF',
      button: 'Explorer',
      title: 'Collection Exclusive',
      subtitle: "Decouvrez nos produits d'exception",
      description: 'Selection rigoureuse de vins et spiritueux pour professionnels exigeants',
    },
    {
      image: banner3,
      label: 'EXPRESS',
      button: 'Commander',
      title: 'Livraison Express',
      subtitle: 'Commande avant 14h = Livraison le jour meme',
      description: 'Service premium pour vos commandes urgentes en Ile-de-France',
    },
    {
      image: banner4,
      label: 'PROMO',
      button: 'Voir les offres',
      title: 'Offre Speciale Automne',
      subtitle: "Jusqu'a -25% sur nos vins de Bordeaux",
      description: 'Decouvrez notre selection premium de grands crus a prix exceptionnels',
      meta: "Jusqu'au 30 Nov 2024",
    },
  ];
  const productItems = [
    {
      title: 'Top Ventes Vins',
      description: 'Nos grands crus les plus demandés .',
      image: cataloguePreview,
    },
    {
      title: 'Nouveautés Spiritueux',
      description: 'Collections exclusives 2024.',
      image: cataloguePreview,
    },
    {
      title: 'Sélection Food Gourmetse',
      description: 'Épicerie fine & produits du terroir.',
      image: cataloguePreview,
    },
  ];

  const flickityOptions = {
    cellAlign: 'center',
    contain: true,
    groupCells: 1,
    pageDots: true,
    prevNextButtons: true,
    wrapAround: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: true,
  };

  const showToast = (id: number, message: string) => {
    setToast({ id, message });
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  return (
    <div className="App">
      <main className="main-content">
        <section className="carousel-section" aria-label="Carousel">
          <Flickity className="carousel" elementType="div" options={flickityOptions}>
            {carouselItems.map((item, index) => (
              <article key={`${item.title}-${index}`} className="carousel-cell">
                <div
                  className="carousel-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => showToast(index, item.title)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      showToast(index, item.title);
                    }
                  }}
                >
                  {toast?.id === index ? (
                    <div className="carousel-toast" role="status">
                      {toast.message}
                    </div>
                  ) : null}
                  <img className="carousel-image" src={item.image} alt={`Carousel ${index + 1}`} />
                  <div className={`carousel-overlay${index === 0 ? ' carousel-overlay--dark' : ''}`}>
                    <span className="carousel-label">{item.label}</span>
                    {item.meta ? (
                      <button className="carousel-meta-button" type="button">
                        <span className="carousel-meta__icon" aria-hidden="true">⏱</span>
                        {item.meta}
                      </button>
                    ) : null}
                    <h3 className="carousel-title">{item.title}</h3>
                    <h4 className="carousel-subtitle">{item.subtitle}</h4>
                    <p className="carousel-description">{item.description}</p>
                    <button className="carousel-button" type="button">
                      {item.button}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </Flickity>
        </section>
        <section className="catalogue-cta" aria-label="Catalogue">
          <p className="catalogue-title">Votre partenaire vins & saveurs</p>
          <p className="catalogue-subtitle">Pour la restauration et la distribution</p>
          <a className="catalogue-button" href="/catalogue">
            Decouvrir notre catalogue
          </a>
          <img
            className="catalogue-preview"
            src={cataloguePreview}
            alt="Catalogue Bourchanin"
          />
        </section>

        <section className="product-grid" aria-label="Produits">
          {productItems.map((item) => (
            <article key={item.title} className="product-card">
              <div className="product-image-wrap">
                <img className="product-image" src={item.image} alt={item.title} />
              </div>
              <h3 className="product-title">{item.title}</h3>
              <p className="product-description">{item.description}</p>
              <a className="product-button" href="/catalogue">
                Voir le produit
              </a>
            </article>
          ))}
        </section>
        <section className="catalogue-preview-secondary" aria-label="Catalogue second">
          <img
            className="catalogue-preview"
            src={cataloguePreviewAlt}
            alt="Catalogue Bourcha page 0030"
          />
        </section>
        <section className="why-section" aria-label="Pourquoi nous choisir">
          <h2 className="why-title">Pourquoi nous choisir ?</h2>
          <div className="why-grid">
            <article className="why-card">
              <span className="why-icon" aria-hidden="true">
                <TruckIcon />
              </span>
              <h3 className="why-card__title">Livraison Express</h3>
              <p className="why-card__text">
                Commande avant 14h = Livraison le jour même en Île-de-France
              </p>
            </article>
            <article className="why-card">
              <span className="why-icon" aria-hidden="true">
                <ShieldIcon />
              </span>
              <h3 className="why-card__title">Paiement Sécurisé</h3>
              <p className="why-card__text">
                Conditions de paiement adaptées à vos besoins B2B .
              </p>
            </article>
            <article className="why-card">
              <span className="why-icon" aria-hidden="true">
                <TrendIcon />
              </span>
              <h3 className="why-card__title">Tarifs Dégressifs</h3>
              <p className="why-card__text">
                Plus vous commandez, plus vous économisez .
              </p>
            </article>
            <article className="why-card">
              <span className="why-icon" aria-hidden="true">
                <UtensilsIcon />
              </span>
              <h3 className="why-card__title">Conseils Experts</h3>
              <p className="why-card__text">
                Accords mets-vins et recommandations personnalisées .
              </p>
            </article>
          </div>
        </section>

        <section className="monthly-section" aria-label="Nouveautes du mois">
          <div className="monthly-card">
            <h2 className="monthly-title">Nouveautes du mois</h2>
            <p className="monthly-description">
              Decouvrez notre selection de millesimes exceptionnels et spiritueux rares
            </p>
            <div className="monthly-actions">
              <a className="monthly-button monthly-button--primary" href="/catalogue">
                Voir le catalogue
              </a>
              <a className="monthly-button monthly-button--ghost" href="/contact">
                Contacter un expert
              </a>
            </div>
          </div>
        </section>
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
                  <FaPhone className="footer-icon" aria-hidden="true" />
                  <a href="tel:0123456789">01 23 45 67 89</a>
                </li>
                <li>
                  <FaEnvelope className="footer-icon" aria-hidden="true" />
                  <a href="mailto:contact@voxup.com">contact@voxup.com</a>
                </li>
                <li>
                  <FaMapMarkerAlt className="footer-icon" aria-hidden="true" />
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
      </main>
    </div>
  );
}

export default Home;
