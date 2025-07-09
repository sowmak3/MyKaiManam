import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list, url } = useContext(StoreContext);

  // Define the specific IDs for best sellers (replace these with correct ObjectIDs from your DB)
  const bestSellerIds = [
    "685fd4b88e3daeacd657bb03",
    "685fcd9f8e3daeacd657bacb",
    "685fd1b18e3daeacd657bae4",
    "685fd09f8e3daeacd657bad7",
    "685fd2b28e3daeacd657baec"
  ];

  // Filter the food list to include only the best sellers
  const bestSellers = food_list.filter(item => bestSellerIds.includes(item._id));

  console.log("food_list from context:", food_list);
  console.log("Filtered best sellers:", bestSellers);

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-heading-wrapper'>
        <h2>Our Signature Favourites</h2>
      </div>
      <div className='food-display-list'>
        {bestSellers.map((item, index) => {
          console.log("Signature item image value:", item.image);

          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={`${url}/images/${item.image}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
