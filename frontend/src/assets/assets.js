// ✅ ICONS & GENERAL ASSETS
import logo from './logo.png';
import header_img from './header_img.jpg';
import search_icon from './search_icon.png';
import basket_icon from './basket_icon.png';
import newsearchicon from './newsearchicon.png';
import newcarticon from './newcarticon.png';
import newprofileicon from './newprofileicon.png';
import newlogouticon from './newlogouticon.png';
import newbagicon from './newbagicon.png';


import add_icon_white from './add_icon_white.png';
import add_icon_green from './add_icon_green.png';
import remove_icon_red from './remove_icon_red.png';
import app_store from './app_store.png';
import play_store from './play_store.png';
import linkedin_icon from './linkedin_icon.png';
import facebook_icon from './facebook_icon.png';
import twitter_icon from './twitter_icon.png';
import cross_icon from './cross_icon.png';
import selector_icon from './selector_icon.png';
import rating_starts from './rating_starts.png';
import profile_icon from './profile_icon.png';
import logout_icon from './logout_icon.png';
import bag_icon from './bag_icon.png';
import parcel_icon from './parcel_icon.png';
import whatsapp_icon from './whatsapp_icon.png';
import instagram_icon from './instagram_icon.png';
import facebook from './facebook.png';
import upiQR from './upiQR.jpg';

// ✅ MENU ICONS
import menu1 from './menu1.jpg';
import menu2 from './menu2.jpg';
import menu3 from './menu3.jpg';
import menu4 from './menu4.jpg';

// ✅ FOOD IMAGES
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';
import food5 from './food5.jpg';
import food6 from './food6.jpg';
import food7 from './food7.jpg';
import food8 from './food8.jpg';
import food9 from './food9.jpg';
import food10 from './food10.jpg';
import food11 from './food11.jpg';
import food12_temp from './food12_temp.jpg';
import food13_temp from './food13_temp.jpg';
import food14 from './food14.jpg';
import food15 from './food15.jpg';
import food16 from './food16.jpg';
import food17 from './food17.jpg';

export const assets = {
  logo,
  header_img,
  search_icon,
  basket_icon,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  rating_starts,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
  newsearchicon,     
  newcarticon,
  whatsapp_icon,
  instagram_icon,
  facebook,
  newprofileicon,
  newlogouticon,
  newbagicon,
  upiQR
};

export const menu_list = [
  { menu_name: "All", menu_image: menu1 },
  { menu_name: "Podis", menu_image: menu2 },
  { menu_name: "Mixes", menu_image: menu3 },
  { menu_name: "Pickles", menu_image: menu4 }
];

export const food_list = [
  // PODIS
  { _id: "1", name: "Verkadalai Podi", image: food1, price: 430, category: "Podis" },
  { _id: "2", name: "Rasam Podi", image: food2, price: 465, category: "Podis" },
  { _id: "3", name: "Paruppu Podi", image: food3, price: 370, category: "Podis" },
  { _id: "4", name: "Bisibelebath Podi", image: food4, price: 435, category: "Podis" },
  { _id: "5", name: "Poondu Podi", image: food5, price: 650, category: "Podis" },
  { _id: "6", name: "Vathakuzhambu Premix Podi", image: food6, price: 470, category: "Podis" },
  { _id: "7", name: "Karuvepilai Podi", image: food7, price: 325, category: "Podis" },
  { _id: "8", name: "Idli Podi", image: food8, price: 375, category: "Podis" },
  { _id: "9", name: "Morekuzhambu premix podi", image: food9, price: 460, category: "Podis" },


  // MIXES
  { _id: "10", name: "Tomato Thokku", image: food10, price: 400, category: "Mixes" },
  { _id: "11", name: "Kothamalli Thokku", image: food11, price: 370, category: "Mixes" },
  { _id: "12", name: "Mango Thokku", image: food12_temp, price: 370, category: "Mixes"  },
  { _id: "13", name: "Small Onion Thokku", image: food13_temp, price: 370, category: "Mixes"},
  { _id: "14", name: "Pulikachal", image: food14, price: 450, category: "Mixes" },

  // PICKLES
  { _id: "15", name: "Organic lemon pickle", image: food15, price: 425, category: "Pickles" },
  { _id: "16", name: "Amla Pickle", image: food16, price: 400, category: "Pickles" },
  { _id: "17", name: "Avakkai Pickle", image: food17, price: 450, category: "Pickles" }
];
