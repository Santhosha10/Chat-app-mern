# ChatWay

ChatWay is a production-minded MERN realtime messaging app built with React, Express, MongoDB, Socket.IO, JWT cookies, Zustand, Tailwind CSS, and DaisyUI.

It is designed as a portfolio-grade full-stack project: authenticated users can discover other users, see online presence, open private conversations, and exchange realtime messages.

## Highlights

- JWT authentication with HTTP-only cookies
- Signup/login/logout flows with validated inputs and clear API errors
- Realtime private messaging with Socket.IO
- Online user presence
- Responsive desktop/mobile chat workspace
- Persistent light/dark theme context with reusable themed UI classes
- Frontend service layer for auth, users, and messaging API calls
- MongoDB models with indexes and schema-level constraints
- Express API health check and production static frontend serving
- Centralized API response helpers and frontend fetch parsing
- Lint and production build verification

## Tech Stack

- Frontend: React 18, Vite, React Router, Zustand, Tailwind CSS, DaisyUI, Socket.IO client
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, bcrypt
- Tooling: ESLint, Nodemon

## Project Structure

```text
backend/
  Controllers/      API controller logic
  DB/               MongoDB connection
  middleware/       Auth middleware
  models/           Mongoose schemas
  routes/           Express routes
  socket/           Socket.IO server
  utils/            Token, validation, response helpers
frontend/
  src/
    Components/     Chat and sidebar UI
    Pages/          Auth and home pages
    context/        Auth and socket providers
    hooks/          API and realtime hooks
    services/       Frontend API service modules
    utils/          Client utilities
```

## Environment

Create `.env` in the project root:

```env
PORT=5000
NODE_ENV=development
MONGO_DB_URI=mongodb://127.0.0.1:27017/chatway
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://localhost:3000
```

Optional frontend override in `frontend/.env` for split frontend/backend deployments only:

```env
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
```

## Run Locally

```bash
npm install
npm install --prefix frontend
npm run dev
```

In a second terminal:

```bash
npm run client
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint --prefix frontend
npm run build --prefix frontend
node --check backend/server.js
node --check backend/socket/socket.js
```

## Production

```bash
npm run build
npm start
```

This project is configured for a single Render web service from the root `package.json`.

Render build command:

```bash
npm run build
```

Render start command:

```bash
npm start
```

Set these backend environment variables in Render:

```env
NODE_ENV=production
MONGO_DB_URI=your_mongodb_uri
JWT_SECRET=your_long_secret
CLIENT_ORIGIN=https://your-app.onrender.com
SERVER_ORIGIN=https://your-app.onrender.com
```

Do not set `VITE_SOCKET_URL` or `VITE_API_URL` for the same-service Render deployment. The frontend is served by Express from `frontend/dist`, API calls use relative `/api/...` routes, and Socket.IO connects to `window.location.origin`.

For Render deployments where the frontend and backend are separate services, set these before building the frontend:

```env
VITE_SOCKET_URL=https://your-backend.onrender.com
VITE_API_URL=https://your-backend.onrender.com
```

Set backend `CLIENT_ORIGIN` to every allowed frontend origin, comma-separated:

```env
CLIENT_ORIGIN=https://your-frontend.onrender.com,https://your-backend.onrender.com
```
