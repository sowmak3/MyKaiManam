# HomeMade Products – E-Commerce Website

A full-stack e-commerce web application built for a home-based business to sell handmade products like pickles, podis, and mixes. The platform enables seamless product browsing, cart management, manual UPI-based checkout, and admin-level control over product and order management.

## Tech Stack

### Frontend
- React.js (with React Router)
- Context API for global state management
- CSS (fully responsive with media queries)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication & authorization

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

##  Features

###  User Features
- Browse products by category
- Add items to cart
- Manual checkout via UPI QR code
- Order confirmation screen
- Responsive design for all devices

###  Admin Features
- Secure admin login
- Add / edit / delete products
- View and manage orders in real time
- Access protected dashboard

---

##  Authentication
- JWT-based token stored in localStorage
- Role-based access for user vs admin

---

##  Folder Structure
```
MyKaiManam/
├── backend/ # Node.js + Express backend
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── .env
│ └── server.js
├── frontend/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.js
```



## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB Atlas URI
- Vercel and Render accounts (for deployment)

### 1. Clone the Repo

```
```bash
git clone https://github.com/sowmak3/mykai-manam.git
cd MyKaiManam
```
2. Setup Backend
```
cd backend
npm install
# Create a .env file with the following:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_secret_key
npm start
```
3. Setup Frontend
```
cd ../frontend
npm install
npm start
```
## Live Demo
Frontend: Vercel Deployment

Backend: Hosted on Render

## Future Improvements
Online payment integration (e.g., Razorpay)



Admin analytics dashboard

### Credits
This website was built with love to support a home-based business. Maintained by Sowmya.

### License
This project is licensed under the MIT License.
