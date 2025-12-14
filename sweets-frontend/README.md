# Sweets Store - Frontend Application

A modern, single-page application (SPA) built with React, Vite, and Tailwind CSS for managing and purchasing sweets.

## Features

- 🔐 User authentication (Login/Register)
- 🍬 Dashboard displaying all available sweets
- 🔍 Search and filter functionality
- 🛒 Purchase functionality with stock validation
- 👨‍💼 Admin panel for CRUD operations (Add, Update, Delete sweets)
- 📱 Responsive design with beautiful UI

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
sweets-frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminPanel.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## API Configuration

The application expects a backend API running on `http://localhost:3000`. Make sure your backend is running and accessible before using the application.

### API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Create new sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet

## Features in Detail

### Authentication
- Secure login and registration
- JWT token-based authentication
- Protected routes

### Dashboard
- Grid layout displaying all sweets
- Real-time search functionality
- Category filtering
- Purchase button (disabled when out of stock)
- Stock status indicators

### Admin Panel
- Full CRUD operations for sweets
- Form validation
- Responsive table layout
- Confirmation dialogs for destructive actions

## Customization

### Tailwind Configuration

The Tailwind configuration can be customized in `tailwind.config.js`. The current setup includes a custom purple color scheme.

### API Base URL

To change the API base URL, update the axios calls in:
- `src/context/AuthContext.jsx`
- `src/components/Dashboard.jsx`
- `src/components/AdminPanel.jsx`

## License

MIT


