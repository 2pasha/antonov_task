# Flight Booking Application

# [DEMO LINK](https://2pasha.github.io/antonov_task/)

A single-page application (SPA) for browsing and booking flight tickets, built with React, TypeScript, and Material-UI.

## 🚀 Features

- **Flight Listing**
  - Browse available flights in card format
  - Filter and sort flights
  - Real-time API data fetching
  - Loading state indicators
  - Favorite flights system

- **Flight Details**
  - Interactive seat selection grid (10x6)
  - Visual seat status indicators
  - Real-time seat availability
  - Detailed flight information display

- **Shopping Cart**
  - Persistent cart storage
  - Add/remove flight tickets
  - Total price calculation
  - LocalStorage integration
  - Cart state preservation across page reloads

## 🛠 Tech Stack

- **Core**
  - Vite
  - React with TypeScript
  - Material-UI (MUI)
  - Redux Toolkit
  - React Router
  - Axios

- **State Management**
  - Redux for cart and favorites
  - LocalStorage persistence

- **UI/UX**
  - Material-UI components
  - Material Icons
  - Responsive design
  - Loading indicators
  - Error handling

## 🚦 API Endpoints

- GET `/flights` - Retrieve all flights
- GET `/flights/:id` - Get specific flight details

### Installation

1. Clone the repository: `git clone https://github.com/2pasha/antonov_task.git`

2. Install dependencies: `npm install`

3. Start the development server: `npm run dev`