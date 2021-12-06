import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

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
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message);
      console.error(error.data.error.message);
    }
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
          <Route
            exact
            path='/cart'
            element={
              <Cart
                cart={cart}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleUpdateCartQuantity={handleUpdateCartQuantity}
              />
            }
          />

          <Route
            exact
            path='/checkout'
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMsg}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
