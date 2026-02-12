import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import InsightsIcon from '@mui/icons-material/Insights';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaidIcon from '@mui/icons-material/Paid';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PageShell from './PageShell';
import { useOrders } from '../context/OrdersContext';
import { PRODUCTS } from '../data/products';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const openOrders = orders.filter(
    (order) => order.status !== 'Livre' && order.status !== 'Annule'
  ).length;
  const productCount = PRODUCTS.length;
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthKey = (year: number, month: number) => year * 12 + month;
  const getMonthKey = (date: Date) => monthKey(date.getFullYear(), date.getMonth());
  const currentKey = monthKey(currentYear, currentMonth);
  const previousKey = monthKey(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );
  const totalForMonthKey = (key: number) =>
    orders
      .filter((order) => order.status !== 'Annule')
      .filter((order) => {
        const parsed = new Date(order.date);
        if (Number.isNaN(parsed.getTime())) {
          return false;
        }
        return getMonthKey(parsed) === key;
      })
      .reduce((sum, order) => sum + order.total, 0);
  const currentTotal = totalForMonthKey(currentKey);
  const previousTotal = totalForMonthKey(previousKey);
  const fallbackCurrentTotal = 146000;
  const targetTotal = 200000;
  const displayCurrentTotal = currentTotal > 0 ? currentTotal : fallbackCurrentTotal;
  const displayPreviousTotal = previousTotal > 0 ? previousTotal : displayCurrentTotal / 1.18;
  const progressPercent = Math.min(
    100,
    Math.round((displayCurrentTotal / targetTotal) * 100)
  );
  const changePercent = displayPreviousTotal > 0
    ? Math.round(((displayCurrentTotal - displayPreviousTotal) / displayPreviousTotal) * 100)
    : 0;
  const formatMoney = (value: number) =>
    value.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
  const stats = [
    {
      id: 'orders',
      label: 'Commandes a traiter',
      value: String(openOrders),
      trend: '',
      icon: <ShoppingCartIcon fontSize="small" />,
      tone: 'orders',
    },
    {
      id: 'revenue',
      label: 'Revenus mensuels',
      value: '--',
      trend: '',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 16l5-5 4 3 7-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 8V4h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tone: 'revenue',
    },
    {
      id: 'clients',
      label: 'Clients actifs',
      value: '--',
      trend: '',
      icon: <PeopleAltIcon fontSize="small" />,
      tone: 'clients',
    },
    {
      id: 'products',
      label: 'Produits en catalogue',
      value: String(productCount),
      trend: '',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 7h14v12H5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tone: 'products',
    },
  ];
  const quickActions = [
    {
      id: 'order',
      label: 'Commander',
      href: '/catalogue',
      className: 'quick-action quick-action--order',
      icon: <ShoppingCartIcon fontSize="small" />,
    },
    {
      id: 'renew',
      label: 'Renouveler',
      href: '/orders',
      className: 'quick-action quick-action--renew',
      icon: <AutorenewIcon fontSize="small" />,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: '/analytics',
      className: 'quick-action quick-action--analytics',
      icon: <InsightsIcon fontSize="small" />,
    },
    {
      id: 'support',
      label: 'Support',
      href: '/support',
      className: 'quick-action quick-action--support',
      icon: <SupportAgentIcon fontSize="small" />,
    },
  ];

  return (
    <PageShell
      title="Tableau de bord"
      subtitle="Vue d'ensemble en temps reel de votre activite commerciale."
      className="page--dashboard"
    >
      <section className="dashboard-grid" aria-label="Indicateurs principaux">
        {stats.map((stat, index) => (
          <article
            key={stat.id}
            className={`dashboard-card dashboard-card--${stat.tone}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="dashboard-card__header">
              <span className="dashboard-card__label">{stat.label}</span>
              <span className="dashboard-card__icon">{stat.icon}</span>
            </div>
            <div className="dashboard-card__value">{stat.value}</div>
            {stat.trend ? (
              <div className="dashboard-card__meta">
                <span className="dashboard-card__pill">{stat.trend}</span>
              </div>
            ) : null}
          </article>
        ))}
      </section>
      <section className="dashboard-lower" aria-label="Actions rapides et activite recente">
        <div className="dashboard-actions">
          <div className="dashboard-actions__panel">
            <div className="dashboard-actions__header">
              <h2 className="dashboard-actions__title">Actions rapides</h2>
            </div>
          <div className="dashboard-actions__grid">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className={action.className}
                  type="button"
                  onClick={() => navigate(action.href)}
                >
                  <span className="quick-action__icon">{action.icon}</span>
                  <span className="quick-action__label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div
            className="dashboard-goal"
            style={
              {
                '--goal-width': '100%',
                '--goal-height': '210px',
              } as React.CSSProperties
            }
          >
            <div className="dashboard-goal__header">
              <div>
                <p className="dashboard-goal__eyebrow">Objectif de ventes mensuel</p>
                <h3 className="dashboard-goal__title">
                  {formatMoney(displayCurrentTotal)} MAD / {formatMoney(targetTotal)} MAD
                </h3>
              </div>
              <span className="dashboard-goal__badge">+{changePercent}% vs mois dernier</span>
            </div>
            <div className="dashboard-goal__progress">
              <div className="dashboard-goal__bar">
                <span
                  className="dashboard-goal__fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="dashboard-goal__meta">
                <span>{progressPercent}% atteint</span>
                <span>Reste {formatMoney(Math.max(0, targetTotal - displayCurrentTotal))} MAD</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="dashboard-activity" aria-label="Activite recente">
          <div className="dashboard-activity__panel">
            <div className="dashboard-activity__header">
              <h2 className="dashboard-activity__title">Activite recente</h2>
            </div>
            <div className="dashboard-activity__list">
              <div className="activity-item activity-item--red">
                <span className="activity-icon">
                  <LocalMallIcon fontSize="small" />
                </span>
                <div className="activity-body">
                  <span className="activity-skeleton activity-skeleton--title"></span>
                  <span className="activity-skeleton activity-skeleton--time"></span>
                </div>
              </div>
              <div className="activity-item activity-item--green">
                <span className="activity-icon">
                  <PaidIcon fontSize="small" />
                </span>
                <div className="activity-body">
                  <span className="activity-skeleton activity-skeleton--title"></span>
                  <span className="activity-skeleton activity-skeleton--time"></span>
                </div>
              </div>
              <div className="activity-item activity-item--blue">
                <span className="activity-icon">
                  <Inventory2Icon fontSize="small" />
                </span>
                <div className="activity-body">
                  <span className="activity-skeleton activity-skeleton--title"></span>
                  <span className="activity-skeleton activity-skeleton--time"></span>
                </div>
              </div>
              <div className="activity-item activity-item--yellow">
                <span className="activity-icon">
                  <SupportAgentIcon fontSize="small" />
                </span>
                <div className="activity-body">
                  <span className="activity-skeleton activity-skeleton--title"></span>
                  <span className="activity-skeleton activity-skeleton--time"></span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
};

export default Dashboard;
