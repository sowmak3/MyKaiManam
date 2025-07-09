// src/pages/Products/Products.jsx
import React, { useContext, useState } from 'react';
import './Products.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';

const Products = () => {
  const { food_list, url } = useContext(StoreContext); // ✅ Include url from context
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Podis', 'Mixes', 'Pickles'];

  const filteredList = selectedCategory === 'All'
    ? food_list
    : food_list.filter(item => item.category === selectedCategory);

  return (
    <div className="products">
      <div className="products-heading-wrapper">
        <h2 className="products-heading">Our Products</h2>
      </div>

      <div className="products-filter">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="products-list">
        {filteredList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={`${url}/images/${item.image}`} // ✅ Correct image path
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
