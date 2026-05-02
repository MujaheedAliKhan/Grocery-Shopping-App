# ⚙️ Backend - Grocery Shopping App

This is the backend of the Grocery E-Commerce application built using Node.js, Express, and MongoDB.

---

## 🚀 Features

- User Authentication (JWT)
- Admin Authorization
- CRUD Operations for Products
- Image Upload using Cloudinary
- Protected Routes

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary
- Multer
- JWT

---

## ⚙️ Setup

```bash
npm install
npm start
``` 

---

## 🔐 Environment Variables

```bash
Create .env file:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
---
## 📡 API Routes
### Auth
- POST /api/auth/register
- POST /api/auth/login

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (Admin)
- PUT /api/products/:id (Admin)
- DELETE /api/products/:id (Admin)

---
## 🔒 Middleware
- Auth Middleware (JWT verification)
- Admin Middleware (role-based access)

---

## ✨ Notes
- Uses Multer for file handling
- Images stored in Cloudinary