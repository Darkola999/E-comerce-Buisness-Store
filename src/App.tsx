import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Analytics from './pages/Analytics';
import Cart from './pages/Cart';
import Catalogue from './pages/Catalogue';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Support from './pages/Support';
import Users from './pages/Users';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';

const App: React.FC = () => (
  <OrdersProvider>
    <CartProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/voxup" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  </OrdersProvider>
);

export default App;
