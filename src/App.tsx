import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Analytics from './pages/Analytics';
import Cart from './pages/Cart';
import Catalogue from './pages/Catalogue';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Users from './pages/Users';

const App: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/voxup" replace />} />
      <Route path="/voxup" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<Navigate to="/voxup" replace />} />

    </Routes>
  </>
);

export default App;
