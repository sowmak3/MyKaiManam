import React from 'react';
import './WhyUS.css';

import noPreservatives from '../../assets/no-preservatives.png';
import freshlyMade from '../../assets/freshlymade.png';
import coldPressedOil from '../../assets/oil.png';
import homemade from '../../assets/homemade.png';

const WhyUs = () => {
  const features = [
    { icon: homemade, title: 'Homemade with Love' },
    { icon: noPreservatives, title: 'No Preservatives' },
    { icon: freshlyMade, title: 'Freshly Made on Order' },
    { icon: coldPressedOil, title: 'Cold-Pressed Gingelly Oil' },
    
  ];

  return (
    <div className="why-us">
      <h2>Why Us?</h2>
      <div className="why-us-features">
        {features.map((item, index) => (
          <div className="why-us-item" key={index}>
            <img src={item.icon} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
