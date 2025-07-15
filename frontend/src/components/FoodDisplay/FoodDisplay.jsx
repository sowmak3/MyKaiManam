import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);

  // ✅ Filter items marked as bestSeller
  const bestSellers = food_list.filter(item => item.bestSeller === true);

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-heading-wrapper'>
        <h2>Our Signature Favourites</h2>
      </div>
      <div className='food-display-list'>
        {bestSellers.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
