# Sweets Store - Backend API

A Node.js/Express backend API for the Sweets Store application with MongoDB database.

## Features

- 🔐 User authentication (JWT-based)
- 👤 User registration and login
- 🍬 CRUD operations for sweets
- 🛒 Purchase functionality
- 🔒 Admin-only routes protection
- 📊 MongoDB database integration

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env` file and update if needed
   - Default MongoDB URI: `mongodb://localhost:27017/sweets-store`
   - Default JWT Secret: `your-super-secret-jwt-key-change-this-in-production`

3. Make sure MongoDB is running:
   - Install MongoDB if not already installed
   - Start MongoDB service: `mongod` (or use MongoDB Atlas for cloud)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user" // optional, defaults to "user"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Sweets (Public)

- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/:id` - Get single sweet

### Sweets (Admin Only - requires authentication)

- `POST /api/sweets` - Create new sweet
  ```json
  {
    "name": "Chocolate Bar",
    "description": "Delicious chocolate",
    "price": 5.99,
    "quantity": 100,
    "category": "chocolate",
    "emoji": "🍫"
  }
  ```

- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet

### Purchase (Authenticated Users)

- `POST /api/sweets/:id/purchase` - Purchase a sweet
  ```json
  {
    "quantity": 1
  }
  ```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: 'user' | 'admin', default: 'user')

### Sweet
- name (String, required)
- description (String)
- price (Number, required)
- quantity (Number, required, default: 0)
- category (String)
- emoji (String, default: '🍬')

## Environment Variables

Create a `.env` file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sweets-store
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Testing

You can test the API using:

1. **Postman** or **Insomnia**
2. **curl** commands
3. **Frontend application** at `http://localhost:5173`

### Example curl commands:

Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Get all sweets:
```bash
curl http://localhost:3000/api/sweets
```

## Notes

- The server will start even if MongoDB is not connected (for development)
- Passwords are automatically hashed using bcrypt
- JWT tokens expire after 7 days
- Admin routes are protected with both authentication and role checking


