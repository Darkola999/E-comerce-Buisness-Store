import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import brandLogo from '../assets/bourchanin new logo_Plan de travail 1.png';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, clearCart, removeItem } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const notificationTimer = useRef<number | null>(null);
  const [openPanel, setOpenPanel] = useState<'notifications' | 'cart' | 'profile' | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nouvelle commande #1', time: 'Il y a 5 min', read: false },
    { id: 2, title: 'Stock : Hennesey ', time: 'Il y a 10 min', read: false },
    { id: 3, title: 'Livraison confirmée', time: 'Hier', read: true },
  ]);

  const navItems = [
    {
      label: 'VOXUP',
      href: '/voxup',
      weight: 600,

    },
    {
      label: 'Tableau de bord',
      href: '/dashboard',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      label: 'Catalogue',
      href: '/catalogue',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4h7v16H4z" />
          <path d="M13 4h7v16h-7z" />
        </svg>
      ),
    },
    {
      label: 'Panier',
      href: '/cart',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
          <path d="M3 4h2l2.4 9.6a2 2 0 0 0 2 1.4h7.2a2 2 0 0 0 2-1.4L21 7H7" />
        </svg>
      ),
    },
    {
      label: 'Commandes',
      href: '/orders',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 6h12" />
          <path d="M8 12h12" />
          <path d="M8 18h12" />
          <path d="M4 6h.01" />
          <path d="M4 12h.01" />
          <path d="M4 18h.01" />
        </svg>
      ),
    },
    {
      label: 'Analyses',
      href: '/analytics',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19h16" />
          <path d="M7 16V8" />
          <path d="M12 16V5" />
          <path d="M17 16v-6" />
        </svg>
      ),
    },
    {
      label: 'Utilisateurs',
      href: '/users',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="3" />
          <circle cx="17" cy="9" r="3" />
          <path d="M2 20a6 6 0 0 1 12 0" />
          <path d="M14 20a5 5 0 0 1 8 0" />
        </svg>
      ),
    },
    {
      label: 'Profil',
      href: '/profile',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
    {
      label: 'Support',
      href: '/support',
      weight: 700,
      icon: (
        <svg
          className="nav-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a7 7 0 0 0-7 7v4a3 3 0 0 0 3 3h1v-6H8" />
          <path d="M12 2a7 7 0 0 1 7 7v4a3 3 0 0 1-3 3h-1v-6h1" />
          <path d="M9 18h6" />
        </svg>
      ),
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMenu();
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2200);
  };

  const markNotificationsRead = () => {
    setNotifications([]);
    setHasNotifications(false);
    setNotificationMessage('All notifications marked as read.');
    setOpenPanel(null);
    showToast('Toutes les notifications ont ete lues.');

    if (notificationTimer.current) {
      window.clearTimeout(notificationTimer.current);
    }

    notificationTimer.current = window.setTimeout(() => {
      setNotificationMessage('');
    }, 2000);
  };

  const togglePanel = (panel: 'notifications' | 'cart' | 'profile') => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };

  const handleLogout = () => {
    setOpenPanel(null);
    navigate('/login');
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setHasNotifications(false);
    showToast('Notification supprimee.');
  };

  const handleCartItemClick = (id: string) => {
    removeItem(id);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/voxup" onClick={handleNavClick}>
          <img
            src={brandLogo}
            alt="Bourchann & Co"
            className="navbar-brand__img"
          />
        </NavLink>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={item.href}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                style={{ fontWeight: item.weight }}
                onClick={handleNavClick}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button
            className={`action-icon ${hasNotifications ? 'has-badge' : ''}`}
            type="button"
            aria-label="Notifications"
            onClick={() => togglePanel('notifications')}
          >
            <svg
              className="action-icon__svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
              <path d="M9 17a3 3 0 0 0 6 0" />
            </svg>
            {hasNotifications ? (
              <span className="badge badge--dot" aria-hidden="true"></span>
            ) : null}
          </button>
          {openPanel === 'notifications' ? (
            <div className="panel panel--notifications">
              <div className="panel-header">
                <span className="panel-title">Notifications</span>
                <button className="panel-action" type="button" onClick={markNotificationsRead}>
                  Mark all as read
                </button>
              </div>
              <div className="panel-body">
                {notifications.length === 0 ? (
                  <span className="panel-empty">Aucune notification.</span>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      className={`panel-item ${item.read ? 'is-read' : ''}`}
                      type="button"
                      onClick={() => handleNotificationClick(item.id)}
                    >
                      <span className="panel-item__title">{item.title}</span>
                      <span className="panel-item__time">{item.time}</span>
                    </button>
                  ))
                )}
              </div>
              {notificationMessage ? (
                <div className="panel-footer">
                  <span className="notification-message" role="status">
                    {notificationMessage}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            className={`action-icon ${cartCount > 0 ? 'has-badge' : ''}`}
            type="button"
            aria-label="Cart"
            onClick={() => togglePanel('cart')}
          >
            <svg
              className="action-icon__svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M3 4h2l2.4 9.6a2 2 0 0 0 2 1.4h7.2a2 2 0 0 0 2-1.4L21 7H7" />
            </svg>
            {cartCount > 0 ? (
              <span className="badge" aria-hidden="true">
                {cartCount}
              </span>
            ) : null}
          </button>
          {openPanel === 'cart' ? (
            <div className="panel panel--cart">
              <div className="panel-header">
                <span className="panel-title">Panier</span>
                <button className="panel-action" type="button" onClick={clearCart}>
                  Vider
                </button>
              </div>
              <div className="panel-body">
                {cartItems.length === 0 ? (
                  <span className="panel-empty">Votre panier est vide.</span>
                ) : (
                  cartItems.map((item) => (
                    <button
                      key={item.id}
                      className="panel-item panel-item--cart"
                      type="button"
                      onClick={() => handleCartItemClick(item.id)}
                    >
                      {item.image ? (
                        <img className="panel-item__image" src={item.image} alt="" />
                      ) : null}
                      <span className="panel-item__title">{item.name}</span>
                      <span className="panel-item__meta">
                        {item.price.toFixed(2)} MAD · x{item.qty}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : null}
          <div className="profile-avatar" aria-label="Profile">
            <button
              className="profile-button"
              type="button"
              aria-label="Profile menu"
              onClick={() => togglePanel('profile')}
            >
              <img src={brandLogo} alt="Bourchann profile" />
              <span className="profile-status" aria-hidden="true"></span>
            </button>
          </div>
          {openPanel === 'profile' ? (
            <div className="panel panel--profile">
              <div className="panel-header">
                <span className="panel-title">Profil</span>
              </div>
              <div className="panel-body">
                <button className="panel-item" type="button">
                  <span className="panel-item__title">Mon compte</span>
                </button>
                <button className="panel-item" type="button">
                  <span className="panel-item__title">Parametres</span>
                </button>
                <button className="panel-item" type="button" onClick={handleLogout}>
                  <span className="panel-item__title">Deconnexion</span>
                </button>
              </div>
            </div>
          ) : null}
          {toastMessage ? (
            <div className="nav-toast" role="status">
              {toastMessage}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
