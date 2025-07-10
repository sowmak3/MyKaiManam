import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Products from './pages/Products/Products';
import AboutUs from './pages/AboutUs/AboutUs'; // ✅ newly added
import Contact from './pages/Contact/Contact'; // ✅ newly added

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ThankYou from "./pages/ThankYou/ThankYou";
import MyOrders from './pages/MyOrders/MyOrders';
import OrderConfirmed from "./pages/OrderConfirmed/OrderConfirmed";



const App = () => {

  const [showLogin, setShowLogin] = useState(false)


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />


        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
