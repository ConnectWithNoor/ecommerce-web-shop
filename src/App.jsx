import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Products productsList={products} />
    </div>
  );
}

export default App;
