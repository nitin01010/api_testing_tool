# 🧭 REST Client Application (Assignment)

A lightweight REST client application (similar to POSTMAN) built with **Next.js** and **MikroORM**.  
Users can send HTTP requests (GET, POST, PUT, DELETE), view responses dynamically, and manage request history stored in a database.

---

## 🚀 Features

- 🔹 Send **GET**, **POST**, **PUT**, and **DELETE** HTTP requests  
- 🔹 Input field for target **URL**, **method selection**, and **optional request body**  
- 🔹 Display API response (status code, headers, and data) **without reloading the page**  
- 🔹 **MikroORM integration** for storing and retrieving request history  
- 🔹 **Pagination / Lazy loading** for large datasets  
- 🔹 Optional **local caching** (via localStorage) for quick access to recent requests  
- 🔹 Clean, minimal UI built with React components (Next.js frontend)

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | Next.js (React + TypeScript) |
| Backend | Next.js API Routes (Node.js) |
| Database | SQLite or PostgreSQL |
| ORM | MikroORM |
| HTTP Client | Axios |
| Styling | Tailwind CSS |

---

## 📁 Project Structure

rest-client/
├── pages/
│ ├── index.tsx # Main UI page
│ ├── api/
│ │ ├── request.ts # API route to send external HTTP requests
│ │ ├── history.ts # API route for fetching paginated request history
├── entities/
│ └── RequestHistory.ts # MikroORM entity for request storage
├── mikro-orm.config.ts # MikroORM configuration
├── utils/
│ └── fetchHelper.ts # Helper for API calls
├── package.json
├── tsconfig.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/rest-client.git
cd rest-client
