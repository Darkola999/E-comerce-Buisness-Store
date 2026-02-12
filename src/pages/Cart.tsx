import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from './PageShell';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '@react-aria/toast';
import { useToastState } from '@react-stately/toast';
import { useToastRegion } from '@react-aria/toast';

type CartToast = {
  title: string;
  variant?: 'info' | 'success' | 'error';
};

const CartToastItem: React.FC<{
  toast: { key: string; content: CartToast };
  state: ReturnType<typeof useToastState<CartToast>>;
}> = ({ toast, state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { toastProps, titleProps, closeButtonProps } = useToast(
    { toast },
    state,
    ref
  );
  return (
    <div
      {...toastProps}
      ref={ref}
      className={`cart-toast cart-toast--${toast.content.variant ?? 'info'}`}
    >
      <span {...titleProps}>{toast.content.title}</span>
      <button className="cart-toast__close" type="button" {...closeButtonProps}>
        ×
      </button>
    </div>
  );
};

const CartToastRegion: React.FC<{ state: ReturnType<typeof useToastState<CartToast>> }> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { regionProps } = useToastRegion({ 'aria-label': 'Notifications' }, state, ref);
  return (
    <div {...regionProps} ref={ref} className="cart-toast-region">
      {state.visibleToasts.map((toast) => (
        <CartToastItem key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [isFinalizing, setIsFinalizing] = useState(false);
  const {
    cartItems,
    cartCount,
    increaseQty,
    decreaseQty,
    setQty,
    removeItem,
    clearCart,
  } = useCart();
  const { addOrder } = useOrders();

  const toastState = useToastState<CartToast>({ maxVisibleToasts: 3 });

  const showToast = (title: string, variant: CartToast['variant'] = 'info') => {
    toastState.add({ title, variant }, { timeout: 2200 });
  };

  return (
    <PageShell title="Panier" className="page--cart">
      {cartItems.length === 0 ? (
        <section className="cart-section" aria-label="Contenu du panier">
          <div className="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img" focusable="false">
              <path
                d="M20 50a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm24 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 10h6l5 30h26l5-20H24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="cart-body">
            <h2 className="cart-title">Votre panier est pret.</h2>
            <p className="cart-text">Ajoutez des articles ou finalisez votre commande.</p>
            <button className="cart-cta" type="button" onClick={() => navigate('/catalogue')}>
              Decouvrez nos produits
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`cart-page${isFinalizing ? ' cart-page--finalizing' : ''}`}
          aria-label="Produits du panier"
        >
          <header className="cart-page__header">
            <div>
              <h2 className="cart-page__title">Votre panier</h2>
              <p className="cart-page__subtitle">{cartCount} article(s)</p>
            </div>
            <button
              className="cart-clear"
              type="button"
              onClick={() => {
                clearCart();
                showToast('Panier vide', 'info');
              }}
            >
              Vider le panier
            </button>
          </header>

          <div className="cart-table">
            <div className="cart-table__head">
              <span>Produit</span>
              <span>Prix unitaire</span>
              <span>Quantite</span>
              <span>Total</span>
              <span>Actions</span>
            </div>
            <div className="cart-table__body">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-row">
                  <div className="cart-cell cart-cell--product">
                    {item.image ? (
                      <img className="cart-item__image" src={item.image} alt="" />
                    ) : (
                      <div className="cart-item__image cart-item__image--placeholder" aria-hidden="true">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <span className="cart-item__title">{item.name}</span>
                  </div>
                  <div className="cart-cell">
                    <span className="cart-item__price">{item.price.toFixed(2)} MAD</span>
                  </div>
                  <div className="cart-cell">
                    <div className="cart-item__controls">
                      <button
                        className="cart-qty"
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        aria-label={`Retirer un ${item.name}`}
                      >
                        -
                      </button>
                      <input
                        className="cart-qty__input"
                        type="number"
                        min={0}
                        value={item.qty}
                        onChange={(event) => setQty(item.id, Number(event.target.value))}
                        aria-label={`Quantite de ${item.name}`}
                      />
                      <button
                        className="cart-qty cart-qty--add"
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        aria-label={`Ajouter un ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-cell">
                    <span className="cart-item__total">
                      {(item.price * item.qty).toFixed(2)} MAD
                    </span>
                  </div>
                  <div className="cart-cell">
                    <button
                      className="cart-remove"
                      type="button"
                      onClick={() => {
                        removeItem(item.id);
                        showToast('Article retire du panier', 'error');
                      }}
                      aria-label={`Supprimer ${item.name}`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M7 9h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z"
                          fill="currentColor"
                        />
                        <path
                          d="M9 6h6v2h4v2H5V8h4z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="cart-summary" aria-label="Recapitulatif de commande">
            <h3 className="cart-summary__title">Recapitulatif de commande</h3>
            <div className="cart-summary__row">
              <span>Sous-total</span>
              <span>
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.qty, 0)
                  .toFixed(2)} MAD
              </span>
            </div>
            <div className="cart-summary__row">
              <span>Livraison</span>
              <span>45.00 MAD</span>
            </div>
            <div className="cart-summary__total">
              <span>Total TTC</span>
              <span>
                {(
                  cartItems.reduce((sum, item) => sum + item.price * item.qty, 0) + 45
                ).toFixed(2)} MAD
              </span>
            </div>
            <button
              className="cart-checkout"
              type="button"
              aria-label="Finaliser la commande"
              onClick={() => {
                if (isFinalizing) {
                  return;
                }
                const orderItems = cartItems.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  unitPrice: item.price,
                }));
                const orderTotal = cartItems.reduce(
                  (sum, item) => sum + item.price * item.qty,
                  0
                );
                setIsFinalizing(true);
                showToast('Veuillez patienter...', 'info');
                window.setTimeout(() => {
                  addOrder({ items: orderItems, total: orderTotal });
                  showToast('Votre commande est finalise', 'success');
                  window.setTimeout(() => {
                    clearCart();
                    navigate('/orders');
                  }, 800);
                }, 2200);
              }}
            >
              Finaliser la commande
            </button>
          </aside>
        </section>
      )}
      <CartToastRegion state={toastState} />
    </PageShell>
  );
};

export default Cart;
