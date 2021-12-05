import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
    };

    const fetchCart = async () => {
      const resp = await commerce.cart.retrieve();
      setCart(resp);
    };

    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_unique_items} />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Products productsList={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route exact path='/cart' element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
