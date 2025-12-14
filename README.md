# 🍬 MithaiMart – Sweet Store Application

MithaiMart is a full-stack web application that allows users to browse, search, filter, and purchase traditional Rajasthani sweets.  
The application also includes an admin panel to manage sweets inventory.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📁 Project Structure

incubyte/
 sweets-frontend/   # React frontend
 sweets-backend/    # Express backend

---

## 🔧 Backend Setup & Management

### Navigate to backend directory
```bash
cd sweets-backend

npm install

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

node seed.js

npm run dev
# OR
node server.js

http://localhost:3000
```

### 🎨 Frontend Setup
```bash

cd sweets-frontend

npm install

VITE_API_URL=http://localhost:3000

npm run dev

http://localhost:5173
```
