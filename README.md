# 🚀 Next.js Dashboard with Content & Trends

A **scalable and modular dashboard application** built with **Next.js 15, Zustand, TanStack Query, Material UI, and Tailwind CSS**.  
Supports **dynamic content loading without full page reloads**, **pagination, search functionality**, and **trends analysis**.

---

## 📖 Table of Contents

- [🛠️ Tech Stack](#-tech-stack)
- [⚡ Features](#-features)
- [🚀 Setup Instructions](#-setup-instructions)
- [🎯 Solution Architecture](#-solution-architecture)
- [🔄 Data Fetching & API](#-data-fetching--api)
- [📊 Table Component](#-table-component)
- [🔐 Authentication](#-authentication)
- [📌 State Management](#-state-management)
- [📏 Code Quality & Best Practices](#-code-quality--best-practices)
- [📎 License](#-license)

---

## 🛠️ Tech Stack

| Technology          | Usage                   |
| ------------------- | ----------------------- |
| **Next.js 15**      | Framework & Routing     |
| **Zustand**         | Global state management |
| **TanStack Query**  | API fetching & caching  |
| **Material UI**     | Prebuilt UI components  |
| **Tailwind CSS**    | Utility-based styling   |
| **Zod**             | Data validation         |
| **React-Hot-Toast** | User notifications      |
| **TypeScript**      | Type safety             |

### ⚡ Features

✔️ **Login Form** with validation (Email & Password)  
✔️ **Dashboard Layout** with Sidebar (Persistent)  
✔️ **Dynamic Content Switching** (No URL Change)  
✔️ **Reusable Table Component** with **Pagination & Search**  
✔️ **Trends Table** with **Clickable Rows (New Tab)**  
✔️ **Create Content** Button (Adds Random Data)  
✔️ **Data Fetching & Caching** (TanStack Query)  
✔️ **Global State Management** (Zustand)  
✔️ **Responsive Desktop Layout**

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

Run the following command to clone the repository and navigate into the project directory:

```sh
git clone https://github.com/yourusername/nextjs-dashboard.git
cd nextjs-dashboard
```

### 2️⃣ Install Dependencies

Run the following command to install required dependencies:

```sh
npm install  # or yarn install
```

### 3️⃣ Start Development Server

```sh
npm run dev  # or yarn dev
🔹 Visit http://localhost:3000 in your browser.
```

## 🎯 Solution Architecture

This project follows a **modular and scalable architecture**, ensuring maintainability and performance.

### 🔹 Next.js 15 (App Router)

- Uses **Next.js App Router** for **efficient routing, layout management, and server-side rendering**.
- Allows component-based layouts and better organization.

### 🔹 Zustand for State Management

- Manages global UI state (e.g., **dashboard views, pagination, user session**) without performance overhead.
- Used in `dashboardStore.ts` and `userStore.ts`.

### 🔹 TanStack Query for Data Fetching

- Handles **API fetching, caching, and background data synchronization**.
- Ensures that **data is always fresh** while reducing API calls.

### 🔹 Modular Component Design

- **Components are split into reusable units** (e.g., `TableComponent.tsx`, `Pagination.tsx`, `EmptyState.tsx`).
- UI logic and business logic are separated for **better maintainability**.

### 🔹 Custom Hooks for Abstraction

- `useDashboardConfig.ts` → Manages **dashboard views** dynamically.
- `useData.ts` → **Fetches API data with caching** (TanStack Query).
- `useDebounce.ts` → **Optimizes search queries** by preventing excessive API calls.
- `useTableConfig.ts` → **Handles table columns dynamically** based on view.

### 🔹 API Layer

- All API requests are managed in **`apiService.ts`**.
- Uses **Zod validation** to **ensure API responses are correct**.

---

## 🔄 Data Fetching & API

### 🔹 API Handling with TanStack Query

- Uses **TanStack Query** for **fetching, caching, and background data synchronization**.
- Ensures minimal API requests by **caching responses**.
- Supports **pagination and search filtering dynamically**.

### 🔹 API Data Validation

- Uses **Zod** (`validation.ts`) to **validate API responses**.
- Ensures that data received from the API is correctly formatted.
- **Prevents unexpected crashes due to malformed API responses**.

### 🔹 Fetching Logic (`useData.ts`)

- The `useData.ts` hook **handles API calls** for both **Content and Trends**.
- Supports **pagination, dynamic searching, and caching**.
- Automatically **revalidates data** when filters or pages change.

### 🔹 API Service (`apiService.ts`)

- Centralized API calls are managed in **`services/apiService.ts`**.
- Uses **fetch with no-store caching** to avoid stale data.
- Ensures **clean separation of concerns** between data fetching and UI.

---

## 📊 Table Component

### 🔹 Fully Reusable & Modular

- The table is designed as a **reusable component** that dynamically adapts based on the selected view (**Content or Trends**).
- The component is **split into subcomponents** for maintainability:
  - `TableComponent.tsx` → **Main table wrapper**
  - `TableHeader.tsx` → **Manages column headers**
  - `TableBody.tsx` → **Handles dynamic row rendering**
  - `Pagination.tsx` → **Manages pagination controls**
  - `RowsPerPage.tsx` → **Dropdown to change rows per page**
  - `EmptyState.tsx` → **Displays when no data is available**

### 🔹 Dynamic Columns Configuration (`useTableConfig.ts`)

- The table **automatically configures columns** based on the selected view.
- **Content View:** Displays **Name** (with avatar) and other content-specific fields.
- **Trends View:** Displays **Title, Date, Summary, and a Clickable Link**.

### 🔹 Pagination & Search

- Uses **Zustand store (`dashboardStore.ts`)** to manage pagination and search state.
- **Pagination is dynamic** and updates smoothly when switching views.
- **Debounced search (`useDebounce.ts`)** prevents excessive API calls.

### 🔹 Clickable Trends Rows

- In **Trends View**, clicking a row **opens the related article in a new tab**.
- Ensures smooth navigation without interfering with Content View.

### 🔹 Empty & Loading States

- **Displays `EmptyState.tsx`** when no data is found.
- **Shows a loading spinner** (`Loader.tsx`) while fetching new data.

---

## 🔐 Authentication

### 🔹 Simulated Login Flow

- The login page (`/login/page.tsx`) **validates user credentials** but does **not implement actual authentication**.
- Uses **basic email and password validation** to simulate a login experience.

### 🔹 Zustand for User State

- The **user state is managed in `userStore.ts`**.
- Stores **user email** and allows for a simple **logout functionality**.
- This can be **easily extended for real authentication (JWT, OAuth, etc.)**.

### 🔹 Protected Routes (Future Expansion)

- `ProtectedRoute.tsx` is a placeholder for implementing **route protection**.
- Currently, **all routes are accessible**, but adding authentication logic here would enforce login before accessing certain pages.

---

## 📌 State Management

### 🔹 Zustand for Global State

- The project uses **Zustand** for lightweight and efficient state management.
- Zustand is used for **dashboard UI state and user session state**.

### 🔹 Dashboard State (`dashboardStore.ts`)

- Manages **selected view**, **pagination settings**, and **search terms**.
- Ensures that **view switching does not reset pagination or search filters**.

### 🔹 User State (`userStore.ts`)

- Stores **user email and authentication state** (for simulation).
- Supports **logout functionality**.

### 🔹 Why Zustand?

- **Minimal boilerplate** compared to Redux.
- **Fast and lightweight** with no unnecessary re-renders.
- **Easily scalable** for future state management needs.

---

## 📏 Code Quality & Best Practices

### 🔹 Separation of Concerns

- UI logic, API fetching, and state management are **separated into different files**.
- **Components only handle UI**, while **hooks manage logic**.

### 🔹 Encapsulated Hooks & Services

- **API calls** are centralized in `apiService.ts`.
- **Reusable custom hooks** (`useData.ts`, `useTableConfig.ts`, `useDebounce.ts`) improve maintainability.

### 🔹 Type Safety with TypeScript

- **Strongly typed API responses** using **Zod validation**.
- Prevents **runtime errors** due to incorrect data structures.

### 🔹 ESLint & Prettier for Code Consistency

- Enforces **consistent code formatting**.
- Automatically fixes **common syntax issues**.

### 🔹 Performance Optimizations

- **Memoization (`useMemo`, `useCallback`)** prevents unnecessary re-renders.
- **TanStack Query caching** reduces redundant API calls.

---

## 📎 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute it.
