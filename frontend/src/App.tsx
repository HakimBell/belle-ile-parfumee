import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminProducts from './pages/admin/AdminProducts';
import AdminClients from './pages/admin/AdminClients';
import AdminOrders from './pages/admin/AdminOrders';
import ProductDetail from "./pages/ProductDetail.tsx";
import ParfumsPage from './pages/ParfumsPage';
import NouveautesPage from './pages/NouveautesPage';
import SearchResults from './pages/SearchResults';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:productCode" element={<ProductDetail />} />
                    <Route path="/parfums/:category" element={<ParfumsPage />} />
                    <Route path="/nouveautes" element={<NouveautesPage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/clients" element={<AdminClients />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;