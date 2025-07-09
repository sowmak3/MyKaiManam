import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        alert("Failed to fetch food list.");
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      alert("Server error while fetching food list.");
      console.error("Fetch list failed:", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();

    if (response.data.success) {
      alert(response.data.message);  // Show success message
    } else {
      alert("Error removing food."); // Show fallback error
    }
  } catch (error) {
    alert("Server error while removing food."); // Show network error
    console.error("Remove food failed:", error);
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <p>Price</p>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key ={index} className='list-table-format'> 
              <img src={`${url}/images/`+item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick ={()=>removeFood(item._id)}className='cursor'>X</p>
            </div>
          )
        })}
      </div>
      {/* You can render your food items here using the list state */}
    </div>
  );
};

export default List;
