import React, { useState, useEffect } from 'react';
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
    <div>
      <Navbar totalItems={cart.total_unique_items} />
      {/* <Products productsList={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
