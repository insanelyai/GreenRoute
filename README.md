
# OneStop Eco Travel 🌍

OneStop Eco Travel is a platform focused on promoting sustainable tourism. Our mission is to make eco-friendly travel accessible and enjoyable. The platform offers:

• Sustainable Transportation: Discover eco-friendly transportation options to reduce your carbon footprint while traveling.

• Green Accommodations: Find eco-lodges and sustainable hotels that support environmental conservation and local communities.

• Responsible Tourism: Engage in local conservation efforts to     make a positive impact on the destinations you visit.

Explore the world responsibly with OneStop Eco Travel!

Here's a setup guide you can add to your GitHub README for a project using Vite on the frontend and Express on the backend:

---

## 🚀 Project Setup Guide

This project uses **Vite** for the frontend and **Express** for the backend. Follow the steps below to set up the development environment.

### Prerequisites

- **Node.js** (version 16 or higher)
- **NPM** or **Yarn** (for package management)

### 📁 Project Structure

```
root/
├── client/        # Frontend (Vite)
└── server/        # Backend (Express)
```

### ⚙️ Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

#### 2. Install dependencies

1. **Frontend (Vite)**:
    ```bash
    cd client
    npm install
    ```
   Or, if using Yarn:
   ```bash
   yarn install
   ```

2. **Backend (Express)**:
    ```bash
    cd ../server
    npm install
    ```
   Or, if using Yarn:
   ```bash
   yarn install
   ```

#### 3. Set up environment variables

Create a `.env` file in the `server/` folder and add the following environment variables:

```env
PORT=8000  # Port for the Express server
DATABASE_URL=your_database_url_here  # Add database URL if using one
```

#### 4. Run the Development Servers

1. **Start Backend (Express)**:
    ```bash
    cd server
    npm run dev
    ```
   This command will start the Express server on `http://localhost:8000` (or the port specified in your `.env` file).

2. **Start Frontend (Vite)**:
    ```bash
    cd ../client
    npm run dev
    ```
   This command will start the Vite development server, typically on `http://localhost:5173`.

#### 5. Access the Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend (API): [http://localhost:8000](http://localhost:8000)

### 📦 Available Scripts

#### Frontend (Vite)

- `npm run dev` - Start the Vite development server.
- `npm run build` - Build the frontend for production.
- `npm run preview` - Preview the production build locally.

#### Backend (Express)

- `npm run dev` - Start the Express server in development mode with live reloading.
- `npm start` - Start the Express server in production mode.

### 🛠️ Additional Tips

- Make sure both servers (frontend and backend) are running concurrently to test the full-stack application.
- Adjust CORS settings in the Express server if the frontend and backend are on different domains/ports during deployment.

---

This setup guide should help you get the development environment up and running smoothly.
