# 🔗 URL Shortener – Backend + Frontend (Next.js 16 + Express + Postgres + Prisma)

This project is a  **URL shortener**, consisting of a backend built with **Express + TypeScript**, using **PostgreSQL** and **Prisma**, along with a frontend built with **Next.js 16 (App Router)**.

The goal is to allow users to generate short URLs easily, with optional support for custom codes.

---

## 🚀 Technologies used

### **Backend**
- Node.js + TypeScript  
- Express  
- Prisma ORM  
- PostgreSQL (in Docker container)  
- Docker Compose  
- Validation with Prisma (unique constraint)  

### **Frontend**
- Next.js 16 (App Router)  
- TypeScript  
- Fetch API for backend communication  

---

## 🧭 Project architecture

```
root
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── prisma/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/schema.prisma
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── [code]/
    │       └── page.tsx
    ├── public/
    ├── next.config.js
    ├── package.json
    └── .env.local
```

---

## 💡 Features

### **Backend**
- Create a short URL  
- Error handling for existing codes  
- Endpoint to redirect to original URL  
- PostgreSQL connection via Prisma  

### **Frontend**
- Form to shorten URLs  
- Support for custom codes  
- Dynamic redirection (`/[code]`)  
- Minimalist UI built with Tailwind  

---

## ⚙️ Prerequisites

- Node.js >= 18  
- Docker and Docker Compose  
- pnpm / npm / yarn  

---

# 🐘 Initialize the backend (local)

### 1. Enter the directory
```bash
cd backend
```

### 2. Copy environment variables
Create the file:
```
.env
```

And add:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/urlshortener"
BASE_URL="http://localhost:4000"
```

### 3. Start the database in Docker
```bash
docker compose up -d
```

### 4. Run Prisma migrations
```bash
npx prisma migrate deploy
```

### 5. Install dependencies
```bash
npm install
```

### 6. Start the server
```bash
npm run dev
```

The backend will be available at:
```
http://localhost:4000
```

---

# 🖥️ Initialize the frontend (local)

### 1. Enter the directory
```bash
cd frontend
```

### 2. Create environment variables
File:
```
.env
```

Content:
```
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start Next.js
```bash
npm run dev
```

Frontend available at:
```
http://localhost:3000
```

---

# 🧪 Main endpoints

### **POST /shorten**
Create short URL.

Request:
```json
{
  "url": "https://example.com",
  "customCode": "hello"
}
```

Response:
```json
{
  "code": "hello",
  "shortUrl": "http://localhost:4000/hello",
  "targetUrl": "https://example.com"
}
```

### **GET /:code**
Redirects to the original URL.

---

# 📜 License
MIT License.
