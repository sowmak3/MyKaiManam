import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import WhyUS from '../../components/WhyUS/WhyUS';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';


const Home = () => {
  return (
    <div>
      
      <Header/>
      <WhyUS />
      <FoodDisplay />
    </div>
  )
}

export default Home
