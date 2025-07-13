import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);

  // Replace these with actual ObjectIDs of best sellers from your DB
  const bestSellerIds = [
    "685fd4b88e3daeacd657bb03",
    "685fcd9f8e3daeacd657bacb",
    "685fd1b18e3daeacd657bae4",
    "685fd09f8e3daeacd657bad7",
    "685fd2b28e3daeacd657baec"
  ];

  const bestSellers = food_list.filter(item => bestSellerIds.includes(item._id));

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
            image={item.image} // ✅ Use Cloudinary URL directly
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
