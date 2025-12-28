import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminProducts from './pages/admin/AdminProducts';
import ProductDetail from "./pages/ProductDetail.tsx";
import ParfumsPage from './pages/ParfumsPage';
import Cart from './pages/Cart';
import './App.css';

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:productCode" element={<ProductDetail />} />
                    <Route path="/parfums/:category" element={<ParfumsPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;