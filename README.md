# FoodExpress — MERN Online Food Ordering Demo

A working end-to-end demo of an online food ordering app built with MongoDB, Express, React (Vite) and Node.

## Features

- User registration & login (JWT auth, bcrypt password hashing)
- Browse a seeded food menu with category filters
- Add items to cart (persisted in localStorage)
- Place an order (delivery address + line items)
- View past orders with status
- Prices in ₹ (Indian Rupees)
- Persistent database — MongoDB Community is installed locally via Homebrew
  and runs as a background service (`brew services`), so data survives restarts.
  If `MONGO_URI` isn't set, the backend falls back to an in-memory MongoDB instead.

## Project structure

```
server/   Express + Mongoose API (port 5001)
client/   React app built with Vite (port 5173)
```

## Running it

### 1. Backend

```bash
cd server
npm install
npm start
```

This starts the API on `http://localhost:5001`. On first boot it:
- connects to the local MongoDB instance at `mongodb://127.0.0.1:27017/food-ordering`
- auto-seeds 10 sample food items if the `foods` collection is empty

Requires MongoDB to be running locally (see "Checking / managing the database" below).

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Checking / managing the database

MongoDB Community was installed via Homebrew (`mongodb/brew` tap) and runs as a
background service, so it starts automatically at login:

```bash
brew services list              # check it's running (mongodb-community: started)
brew services start mongodb/brew/mongodb-community   # start it if stopped
brew services stop mongodb/brew/mongodb-community    # stop it
```

To browse the data:

```bash
mongosh mongodb://127.0.0.1:27017/food-ordering
> show collections        # users, foods, orders
> db.foods.find().pretty()
> db.orders.find().pretty()
```

Or point a GUI like [MongoDB Compass](https://www.mongodb.com/products/compass)
at `mongodb://127.0.0.1:27017/food-ordering`.

`server/.env` controls the connection:

```
MONGO_URI=mongodb://127.0.0.1:27017/food-ordering
```

Leave `MONGO_URI` empty to fall back to an ephemeral in-memory MongoDB instead
(useful for quick throwaway testing — data disappears when the server stops).

To re-seed sample food items into the real database at any time: `npm run seed`
(from `server/`) — note this clears and replaces the `foods` collection.

## Notes on the demo

- Auth: JWT stored in `localStorage`, attached via Axios interceptor.
- Cart: kept client-side in React Context + `localStorage` (no server cart model —
  kept simple for the demo).
- Admin: `POST /api/foods` exists for adding menu items but requires a user with
  `isAdmin: true` (there's no UI for this in the demo — flip it directly in the DB
  if you want to try it).
- Port 5000 is intentionally avoided since macOS's AirPlay Receiver commonly
  binds it; the API runs on 5001 instead.

This is a demo focused on showing the full MERN flow working, not production
hardening (e.g. no rate limiting, no email verification, no payment integration).
