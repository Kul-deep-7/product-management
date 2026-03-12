# Productr

A fully functional product management web application where users can log in via OTP, 
manage products (create, edit, delete), upload images, and publish/unpublish products. 

---
 
## Live Demo
- **Frontend:** https://product-management-frontend-78ef.onrender.com
- **Backend API:** https://product-management-t4f6.onrender.com
 
---
## Tech Stack
 
| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + httpOnly Cookies |
| Image Upload | Multer + Cloudinary |
| HTTP Client | Axios |
| Routing | React Router DOM v6 |
| Deployment | Render |

---
## Folder Structure

```
root/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── login/
│   │   │   ├── Login.jsx     # Email/phone input, send OTP
│   │   │   └── Otp.jsx       # 6-digit OTP verification
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Published/Unpublished product tabs
│   │   │   └── DisplayProducts.jsx  # All products, add/edit/delete
│   │   |   └── ProductCard.jsx      # Reusable product card
│   │   │   └── ProductForm.jsx      # Reusable add/edit form
│   │   │   
│   │   │    
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state
|   |   |   └── ProtectedRoute.jsx   # Auth guard for protected pages
│   │   └── App.jsx
│   |
│   └── package.json
│
└── backend/                         # Node.js backend
    ├── public/                      # to store images before pushing on cloudinary
    ├── src/
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   └── product.controller.js
    │   ├── models/
    │   │   ├── user.model.js
    │   │   └── product.model.js
    │   ├── routes/
    │   │   └── routes.js
    │   ├── middleware/
    │   │   ├── auth.middleware.js
    │   │   └── multer.middleware.js
    │   └── utils/
    │       ├── cloudinary.js
    │       ├── ApiError.js
    |       ├── asynchandler.js
    │       └── ApiResponse.js
    ├── .env
    ├── app.js
    ├── index.js
    ├── db.js
    ├── env.js
    └── package.json
```

---

## Backend Setup
```bash
cd backend
npm install mongoose env cors cloudinary cookie-parser express multer jsonwebtoken        #install required packages
node index.js                                                                             #to run the backend
```

## Frontend Setup
```bash
npm create vite@latest frontend                                                            #to create vite react app
cd frontend
npm run dev                                                                                #to run the frontend
```

Create a `.env` file in the `backend/` directory:
 
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/productr
ACCESS_TOKEN_SECRET=your jwt secret key
CLOUDINARY_CLOUD_NAME=your cloudinary cloud name
CLOUDINARY_API_KEY=your cloudinary api key
CLOUDINARY_API_SECRET=your cloudinary api secret
```
---
 

##  Features Implemented
 
-  OTP-based login (email or phone number)
-  JWT authentication with httpOnly cookies
-  Protected routes — unauthenticated users cant access protected route/pages
-  Create products with multiple image uploads (up to 5)
-  Edit product details and images
-  Delete product 
-  Publish / Unpublish toggle
-  Published & Unpublished product tabs on Home
-  Reusable components 
-  Images hosted on Cloudinary

---
##  Known Limitations

- Logout functionality is not implemented in the current version. 
  The JWT token expires automatically after 1 day. To force logout manually, 
  clear the token cookie via DevTools → Application → Cookies.
-

---
## 🔧 Customization

- **Shared product pool:** Currently each user only sees their own products. 
  To show all users' products to everyone, simply remove the `req.user._id` 
  filter from the `getAllProducts` controller.
