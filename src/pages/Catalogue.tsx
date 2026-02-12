import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from './PageShell';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 3500,
  melinismeMin: 1800,
  melinismeMax: 2026,
  origin: 'all',
  category: 'all',
  organicOnly: false,
  discountOnly: false,
};

const ORIGINS = ['all', 'beers', 'beverages', 'food', 'spirits', 'wines'];
const CATEGORIES = ['all', 'wines', 'spirits', 'epicerie', 'beers'];
const CATEGORY_LABELS: Record<string, string> = {
  wines: 'Vins',
  spirits: 'Spiritueux',
  epicerie: 'Epicerie Fine',
  beers: 'Bieres',
};
const ORIGIN_LABELS: Record<string, string> = {
  beers: 'Beers',
  beverages: 'Bevrages',
  food: 'Food',
  spirits: 'Spirits',
  wines: 'Wines',
};

const Catalogue: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    addToCart,
    increaseQty,
    decreaseQty,
    setQty,
    clearCart,
  } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(DEFAULT_FILTERS.priceMin);
  const [priceMax, setPriceMax] = useState(DEFAULT_FILTERS.priceMax);
  const [melinismeMin, setMelinismeMin] = useState(DEFAULT_FILTERS.melinismeMin);
  const [melinismeMax, setMelinismeMax] = useState(DEFAULT_FILTERS.melinismeMax);
  const [origin, setOrigin] = useState(DEFAULT_FILTERS.origin);
  const [category, setCategory] = useState(DEFAULT_FILTERS.category);
  const [organicOnly, setOrganicOnly] = useState(DEFAULT_FILTERS.organicOnly);
  const [discountOnly, setDiscountOnly] = useState(DEFAULT_FILTERS.discountOnly);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [highlightedCartItem, setHighlightedCartItem] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; image?: string } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getRangeStyle = (minValue: number, maxValue: number, minLimit: number, maxLimit: number) => {
    const range = maxLimit - minLimit;
    const minPercent = ((minValue - minLimit) / range) * 100;
    const maxPercent = ((maxValue - minLimit) / range) * 100;
    return {
      '--range-min': `${minPercent}%`,
      '--range-max': `${maxPercent}%`,
    } as React.CSSProperties;
  };

  const handleApplyFilters = () => {
    const nextFilters: string[] = [];

    if (priceMin !== DEFAULT_FILTERS.priceMin || priceMax !== DEFAULT_FILTERS.priceMax) {
      nextFilters.push(`Prix: ${priceMin} - ${priceMax} MAD`);
    }

    if (origin !== DEFAULT_FILTERS.origin) {
      nextFilters.push(`Origine: ${ORIGIN_LABELS[origin] ?? origin}`);
    }

    if (category !== DEFAULT_FILTERS.category) {
      nextFilters.push(`Categorie: ${CATEGORY_LABELS[category] ?? category}`);
    }

    if (melinismeMin !== DEFAULT_FILTERS.melinismeMin || melinismeMax !== DEFAULT_FILTERS.melinismeMax) {
      nextFilters.push(`Melinisme: ${melinismeMin} - ${melinismeMax}`);
    }

    if (organicOnly) {
      nextFilters.push('Bio uniquement');
    }

    if (discountOnly) {
      nextFilters.push('Tarifs degressifs');
    }

    setAppliedFilters(nextFilters);
    setActiveFilters({
      priceMin,
      priceMax,
      melinismeMin,
      melinismeMax,
      origin,
      category,
      organicOnly,
      discountOnly,
    });
  };

  const handleResetFilters = () => {
    setPriceMin(DEFAULT_FILTERS.priceMin);
    setPriceMax(DEFAULT_FILTERS.priceMax);
    setMelinismeMin(DEFAULT_FILTERS.melinismeMin);
    setMelinismeMax(DEFAULT_FILTERS.melinismeMax);
    setOrigin(DEFAULT_FILTERS.origin);
    setCategory(DEFAULT_FILTERS.category);
    setOrganicOnly(DEFAULT_FILTERS.organicOnly);
    setDiscountOnly(DEFAULT_FILTERS.discountOnly);
    setAppliedFilters([]);
    setActiveFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  const triggerCartItemHighlight = (id: string) => {
    setHighlightedCartItem(id);
    window.setTimeout(() => setHighlightedCartItem(null), 600);
  };

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    addToCart(product);
    triggerCartItemHighlight(product.id);
  };

  const handleIncreaseQty = (id: string) => {
    increaseQty(id);
    triggerCartItemHighlight(id);
  };

  const handleDecreaseQty = (id: string) => {
    decreaseQty(id);
    triggerCartItemHighlight(id);
  };

  const handleRemoveItem = (item: { id: string; name: string; category: string; qty: number; image?: string }) => {
    setQty(item.id, 0);
    triggerCartItemHighlight(item.id);
    showToast(`x${item.qty} ${item.name} a ete retire du panier`, item.image);
  };

  const handleQtyInput = (id: string, value: string) => {
    const nextQty = Math.max(0, Number(value));
    if (Number.isNaN(nextQty)) {
      return;
    }
    setQty(id, nextQty);
    triggerCartItemHighlight(id);
  };

  const showToast = (message: string, image?: string) => {
    setToastMessage({ message, image });
    window.setTimeout(() => setToastMessage(null), 2200);
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchSuggestions = isSearchOpen
    ? PRODUCTS.filter((product) => {
      if (!normalizedSearch) {
        return true;
      }
      const haystack = [
        product.name,
        product.description,
        product.category,
        product.origin,
      ].join(' ').toLowerCase();
      return haystack.includes(normalizedSearch);
    })
    : [];
  const filteredProducts = PRODUCTS.filter((product) => {
    if (normalizedSearch) {
      const haystack = [
        product.name,
        product.description,
        product.category,
        product.origin,
      ].join(' ').toLowerCase();
      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    if (product.price < activeFilters.priceMin || product.price > activeFilters.priceMax) {
      return false;
    }

    if (
      product.melinisme < activeFilters.melinismeMin
      || product.melinisme > activeFilters.melinismeMax
    ) {
      return false;
    }

    if (activeFilters.origin !== 'all' && product.origin !== activeFilters.origin) {
      return false;
    }

    if (activeFilters.category !== 'all' && product.category !== activeFilters.category) {
      return false;
    }

    if (activeFilters.organicOnly && !product.bio) {
      return false;
    }

    if (activeFilters.discountOnly && !product.discountEligible) {
      return false;
    }

    return true;
  });

  return (
    <PageShell
      title="Catalogue"
      subtitle="Decouvrez notre selection de vins, spiritueux et epicerie fine."
      className="page--catalogue"
    >
      <section className="catalogue-tools" aria-label="Recherche catalogue">
        <button
          className="catalogue-filter-toggle"
          type="button"
          aria-expanded={isFilterOpen}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <span className="catalogue-filter-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M4 6h16M7 12h10M10 18h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Filtres
        </button>
        <label className="catalogue-search" htmlFor="catalogue-search">
          <span className="catalogue-search__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />

              <path
                d="M16.5 16.5L21 21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            id="catalogue-search"
            className="catalogue-search__input"
            type="search"
            placeholder="Rechercher un produit, une origine, une gamme..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
          />
          {searchSuggestions.length > 0 ? (
            <div className="catalogue-search-suggestions" role="listbox">
              {searchSuggestions.map((product) => (
                <button
                  key={product.id}
                  className="catalogue-search-suggestion"
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setSearchQuery(product.name);
                    setIsSearchOpen(false);
                    const target = document.getElementById(`product-${product.id}`);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    }}
                  >
                  <span className="catalogue-search-suggestion__name">{product.name}</span>
                  <span className="catalogue-search-suggestion__meta">
                    {ORIGIN_LABELS[product.origin] ?? product.origin} · {CATEGORY_LABELS[product.category] ?? product.category}
                    {' '}· {product.price.toFixed(2)} MAD
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </label>
        <div className="catalogue-view-switcher" aria-label="Vue catalogue">
          <div className="catalogue-view-options" role="group" aria-label="Options de vue">
            <button
              type="button"
              className={`catalogue-view-button${viewMode === 'grid' ? ' is-active' : ''}`}
              aria-pressed={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <span className="catalogue-view-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" />
                  <rect x="13" y="4" width="7" height="7" rx="1.5" />
                  <rect x="4" y="13" width="7" height="7" rx="1.5" />
                  <rect x="13" y="13" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              Grid View
            </button>
            <button
              type="button"
              className={`catalogue-view-button${viewMode === 'list' ? ' is-active' : ''}`}
              aria-pressed={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <span className="catalogue-view-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="5" width="16" height="3" rx="1.5" />
                  <rect x="4" y="10.5" width="16" height="3" rx="1.5" />
                  <rect x="4" y="16" width="16" height="3" rx="1.5" />
                </svg>
              </span>
              List View
            </button>
          </div>
        </div>
      </section>

      {appliedFilters.length > 0 ? (
        <section className="catalogue-filter-summary" aria-label="Filtres selectionnes">
          {appliedFilters.map((filter) => (
            <span key={filter} className="catalogue-filter-chip">
              {filter}
            </span>
          ))}
        </section>
      ) : null}

      <section className="catalogue-layout" aria-label="Catalogue">
        <div className="catalogue-main">
          {isFilterOpen ? (
            <section className="catalogue-filters" aria-label="Filtres du catalogue">
              <div className="catalogue-filter-grid">
                <div className="catalogue-filter-field">
                  <div className="catalogue-filter-head">
                    <span>Prix</span>
                    <span className="catalogue-filter-value">{priceMin} - {priceMax} MAD</span>
                  </div>
                  <div
                    className="catalogue-filter-range-group"
                    id="filter-price"
                    style={getRangeStyle(priceMin, priceMax, 0, 3500)}
                  >
                    <input
                      className="catalogue-filter-range catalogue-filter-range--min"
                      type="range"
                      min={0}
                      max={3500}
                      step={50}
                      value={priceMin}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        setPriceMin(Math.min(nextValue, priceMax - 50));
                      }}
                    />
                    <input
                      className="catalogue-filter-range catalogue-filter-range--max"
                      type="range"
                      min={0}
                      max={3500}
                      step={50}
                      value={priceMax}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        setPriceMax(Math.max(nextValue, priceMin + 50));
                      }}
                    />
                  </div>
                </div>
                <label className="catalogue-filter-field" htmlFor="filter-origin">
                  Origine
                  <span className="catalogue-filter-select-wrap">
                    <select
                      id="filter-origin"
                      className="catalogue-filter-select"
                      value={origin}
                      onChange={(event) => setOrigin(event.target.value)}
                    >
                      <option value="all">Toutes les origines</option>
      {ORIGINS.filter((item) => item !== 'all').map((item) => (
        <option key={item} value={item}>
          {ORIGIN_LABELS[item] ?? item}
        </option>
      ))}
                    </select>
                  </span>
                </label>
                <label className="catalogue-filter-field" htmlFor="filter-category">
                  Categorie
                  <span className="catalogue-filter-select-wrap">
                    <select
                      id="filter-category"
                      className="catalogue-filter-select"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="all">Toutes les categories</option>
                      {CATEGORIES.filter((item) => item !== 'all').map((item) => (
                        <option key={item} value={item}>
                          {CATEGORY_LABELS[item] ?? item}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <div className="catalogue-filter-field">
                  <div className="catalogue-filter-head">
                    <span>Melinisme</span>
                    <span className="catalogue-filter-value">{melinismeMin} - {melinismeMax}</span>
                  </div>
                  <div
                    className="catalogue-filter-range-group"
                    id="filter-melinisme"
                    style={getRangeStyle(melinismeMin, melinismeMax, 1800, 2026)}
                  >
                    <input
                      className="catalogue-filter-range catalogue-filter-range--min"
                      type="range"
                      min={1800}
                      max={2026}
                      step={1}
                      value={melinismeMin}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        setMelinismeMin(Math.min(nextValue, melinismeMax - 1));
                      }}
                    />
                    <input
                      className="catalogue-filter-range catalogue-filter-range--max"
                      type="range"
                      min={1800}
                      max={2026}
                      step={1}
                      value={melinismeMax}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        setMelinismeMax(Math.max(nextValue, melinismeMin + 1));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="catalogue-filter-checks">
                <label className="catalogue-check">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(event) => setOrganicOnly(event.target.checked)}
                  />
                  Produits biologiques uniquement
                </label>
                <label className="catalogue-check">
                  <input
                    type="checkbox"
                    checked={discountOnly}
                    onChange={(event) => setDiscountOnly(event.target.checked)}
                  />
                  Tarifs degressifs disponibles
                </label>
              </div>

              <div className="catalogue-filter-actions">
                <button className="catalogue-apply" type="button" onClick={handleApplyFilters}>
                  APPLIQUER LES FILTRES
                </button>
                <button className="catalogue-reset" type="button" onClick={handleResetFilters}>
                  REINITIALISER
                </button>
              </div>
            </section>
          ) : null}

          <section
            className={`catalogue-products catalogue-products--${viewMode}`}
            aria-label="Produits du catalogue"
          >
            {filteredProducts.length === 0 ? (
              <div className="catalogue-empty">
                Aucun produit pour le moment.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <article key={product.id} className="catalogue-product-card">
                  <span className="catalogue-product-anchor" id={`product-${product.id}`} />
                  <div className="catalogue-product-body">
                    <div>
                      <h3 className="catalogue-product-title">{product.name}</h3>
                      <p className="catalogue-product-meta">{product.description}</p>
                      <div className="catalogue-product-details">
                        <p className="catalogue-product-category">
                          {CATEGORY_LABELS[product.category] ?? product.category}
                        </p>
                        {product.bio ? (
                          <span className="catalogue-product-bio">BIO</span>
                        ) : null}
                      </div>
                      <div className="catalogue-product-specs">
                        <span>
                          Origine: {ORIGIN_LABELS[product.origin] ?? product.origin}
                        </span>
                        <span>
                          Melinisme: {product.melinisme}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="catalogue-product-media" aria-hidden="true">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="catalogue-product-footer">
                    <div className="catalogue-product-price-group">
                      <span className="catalogue-product-price">
                        {product.price.toFixed(2)} MAD
                      </span>
                      <span className="catalogue-product-note">Prix degressifs disponibles</span>
                    </div>
                    <button
                      className="catalogue-add"
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>

        <aside className="catalogue-aside" aria-label="Panier rapide">
          <div className="catalogue-cart-card">
            <div className="catalogue-cart-icon" aria-hidden="true">
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
            <div className="catalogue-cart-body">
              <h3 className="catalogue-cart-title">Panier</h3>
              <p className="catalogue-cart-text">{cartCount} article(s)</p>
              <button
                className="catalogue-cart-cta"
                type="button"
                onClick={() => navigate('/cart')}
              >
                Voir le panier
              </button>
              {cartItems.length > 0 ? (
                <button
                  className="catalogue-cart-clear"
                  type="button"
                  onClick={() => {
                    clearCart();
                    showToast('Panier vide.');
                  }}
                >
                  Vider le panier
                </button>
              ) : null}
            </div>
            <div className="catalogue-cart-list">
              {cartItems.length === 0 ? (
                <span className="catalogue-cart-empty">Ajoutez vos articles.</span>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`catalogue-cart-item${highlightedCartItem === item.id ? ' is-new' : ''}`}
                  >
                    <div className="catalogue-cart-item__info">
                      {item.image ? (
                        <img className="catalogue-cart-item__image" src={item.image} alt="" />
                      ) : null}
                      <span className="catalogue-cart-item__name">{item.name}</span>
                    </div>
                    <div className="catalogue-cart-item__controls">
                      <button
                        className="catalogue-cart-qty"
                        type="button"
                        onClick={() => handleDecreaseQty(item.id)}
                        aria-label={`Retirer un ${item.name}`}
                      >
                        -
                      </button>
                      <input
                        className="catalogue-cart-item__qty"
                        type="number"
                        min={0}
                        value={item.qty}
                        onChange={(event) => handleQtyInput(item.id, event.target.value)}
                        aria-label={`Quantite de ${item.name}`}
                      />
                      <button
                        className="catalogue-cart-qty"
                        type="button"
                        onClick={() => handleIncreaseQty(item.id)}
                        aria-label={`Ajouter un ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="catalogue-cart-remove"
                      type="button"
                      onClick={() => handleRemoveItem(item)}
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
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
      {toastMessage ? (
        <div className="catalogue-toast" role="status">
          {toastMessage.image ? (
            <img className="catalogue-toast__image" src={toastMessage.image} alt="" />
          ) : null}
          <span>{toastMessage.message}</span>
        </div>
      ) : null}
    </PageShell>
  );
};

export default Catalogue;
