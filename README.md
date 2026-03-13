# Team Expense Tracker

A full-stack expense tracking application built with the MERN stack and TypeScript.

## Tech Stack

**Backend:** Node.js, Express 5, MongoDB, Mongoose, express-validator, TypeScript
**Frontend:** React 19, Vite, Tailwind CSS v4, TanStack React Query, Axios, react-hot-toast, TypeScript

## Prerequisites

- Node.js >= 18
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd team-expense-tracker

# 2. Install all dependencies
npm run install:all

# 3. Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Start both servers
npm run dev

# 5. alternate
    # 1. cd backend > npm install > npm run dev
    # 2. cd frontend > npm install > npm run dev
```

The backend runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)

| Variable      | Description               | Default                                          |
| ------------- | ------------------------- | ------------------------------------------------ |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/team-expense-tracker` |
| `PORT`        | Server port               | `5000`                                           |
| `CORS_ORIGIN` | Allowed CORS origin       | `http://localhost:5173`                          |

### Frontend (`frontend/.env`)

| Variable                | Description           | Default                     |
| ----------------------- | --------------------- | --------------------------- |
| `VITE_API_BASE_URL`     | Axios base URL        | `http://localhost:5000/api` |
| `VITE_API_PROXY_TARGET` | Vite dev proxy target | `http://localhost:5000`     |

## API Endpoints

All endpoints are prefixed with `/api/expenses`.

| Method   | Endpoint   | Description                                  |
| -------- | ---------- | -------------------------------------------- |
| `GET`    | `/`        | List expenses (optional `?category` filter)  |
| `POST`   | `/`        | Create an expense                            |
| `GET`    | `/summary` | Category-based aggregation (totals + counts) |
| `GET`    | `/:id`     | Get a single expense                         |
| `PUT`    | `/:id`     | Update an expense (partial)                  |
| `DELETE` | `/:id`     | Delete an expense                            |

## Project Structure

```
team-expense-tracker/
├── package.json                 (root — concurrently scripts)
├── backend/
│   ├── src/
│   │   ├── index.ts             (entry — DB connect, server start)
│   │   ├── config/db.ts         (mongoose connection)
│   │   ├── models/Expense.ts    (schema + model)
│   │   ├── controllers/         (route handlers)
│   │   ├── routes/              (express routes)
│   │   ├── middleware/           (asyncHandler, errorHandler, validateObjectId)
│   │   ├── validators/          (express-validator rules)
│   │   ├── constants/           (shared validation constants)
│   │   └── types/               (IExpense, Category)
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── main.tsx             (QueryClientProvider + Toaster)
│   │   ├── App.tsx              (layout + state)
│   │   ├── api/axios.ts         (pre-configured Axios instance)
│   │   ├── hooks/               (useExpenses, useExpenseSummary, useExpenseMutations, useExpenseForm)
│   │   ├── components/          (ExpenseList, ExpenseCard, ExpenseForm, CategorySummary, FilterBar, Modal, ConfirmModal, Button, FormField, DeleteButton, LoadingSpinner, EmptyState)
│   │   ├── constants/           (validation, category colors)
│   │   ├── types/               (Expense, ExpenseSummary, FormData, ApiError)
│   │   └── utils/format.ts      (formatCurrency, formatDate)
│   └── .env.example
└── README.md
```

## Features

- Full CRUD for expenses (create, read, update, delete)
- Category-based expense summary via MongoDB aggregation pipeline
- Real-time UI updates with React Query cache invalidation
- Modal-based forms for creating and editing expenses
- Delete confirmation modal
- Category filtering
- Client-side and server-side validation
- Loading spinners and error states with retry
- Responsive design (mobile, tablet, desktop)
- Toast notifications for all actions
