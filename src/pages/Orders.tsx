import React, { useEffect, useState } from 'react';
import PageShell from './PageShell';
import { useOrders } from '../context/OrdersContext';

const Orders: React.FC = () => {
  const { orders } = useOrders();
  const [expandedId, setExpandedId] = useState<string | null>(orders[0]?.id ?? null);

  useEffect(() => {
    if (!expandedId && orders.length > 0) {
      setExpandedId(orders[0].id);
    }
  }, [expandedId, orders]);

  const toggleOrder = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <PageShell title="Mes Commandes" className="page--orders">
      {orders.length === 0 ? (
        <p className="page__subtitle">Aucune commande pour le moment.</p>
      ) : (
        <section className="orders-list" aria-label="Mes commandes">
          {orders.map((order) => {
            const isOpen = expandedId === order.id;
            return (
              <article key={order.id} className={`order-card${isOpen ? ' is-open' : ''}`}>
                <header
                  className="order-card__header"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="order-card__meta">
                    <p className="order-card__date">{order.date}</p>
                    <p className="order-card__total">{order.total.toFixed(2)} MAD</p>
                  </div>
                  <div className="order-card__title">
                    <h2>Commande {order.id}</h2>
                  </div>
                  <div className="order-card__status">
                    <span className={`order-status order-status--${order.status.replace(' ', '-').toLowerCase()}`}>
                      {order.status}
                    </span>
                    <button
                      className="order-toggle"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`order-${order.id}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOrder(order.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M6 9l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </header>
                <div
                  id={`order-${order.id}`}
                  className="order-details"
                  role="region"
                  aria-label={`Details de la commande ${order.id}`}
                  aria-hidden={!isOpen}
                >
                  <div className="order-table">
                    <div className="order-table__head">
                      <span>Produit</span>
                      <span>Quantite</span>
                      <span>Prix unitaire</span>
                      <span>Total</span>

                    </div>
                    <div className="order-table__body">
                      {order.items.map((item) => (
                        <div key={item.name} className="order-table__row">
                          <span className="order-table__cell order-table__cell--product">{item.name}</span>
                          <span className="order-table__cell">
                            <span className="order-qty">{item.qty}</span>
                          </span>
                          <span className="order-table__cell">{item.unitPrice.toFixed(2)} MAD</span>
                          <span className="order-table__cell">
                            {(item.unitPrice * item.qty).toFixed(2)} MAD
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </PageShell>
  );
};

export default Orders;
