# 🚀 Speedo Backend API

A scalable, high-performance vehicle tracking backend built with **Node.js**, **Express**, and **TypeScript**. This project implements a robust **Dependency Injection** architecture and the **Repository Pattern** to ensure a clean separation of concerns, making the codebase highly maintainable and professional.

---

## 📌 Tech Stack

* **Node.js** (ES Modules)
* **Express.js**
* **TypeScript**
* **MongoDB + Mongoose**
* **InversifyJS** (Dependency Injection)
* **JWT Authentication** (Access & Refresh Tokens)
* **Multer** (CSV Data Processing)

---

## ✨ Features

* **Secure Authentication**: JWT-based auth with Access & Refresh tokens stored in secure cookies.
* **GPS Data Processing**: High-speed parsing of vehicle GPS data from CSV files.
* **Automated Geocoding**: Real-time start/end location naming via OpenStreetMap integration.
* **Trip Analytics**: Automatic calculation of distance, duration, average speed, and overspeeding detection.
* **Robust Validation**: Type-safe request validation using **Zod**.
* **Smart File Handling**: Structured CSV upload and storage management.

---

## 📂 Project Structure

```
src/
├── controllers/     # Handles request & response mapping
├── service/         # Core business logic layer
├── repositories/    # Data access layer (Repository Pattern)
├── di/              # InversifyJS Dependency Injection bindings
├── models/          # Mongoose schemas & models
├── routes/          # API route definitions
├── dto/             # Data Transfer Objects for validation
├── mapper/          # Data Mappers for clean API responses
├── middlewares/     # Auth, error handling & upload middleware
├── utils/           # Helper functions (JWT, math, geocoding)
├── app.ts           # Express application configuration
└── server.ts        # Server entry point
```

---

## 🧠 Architecture - Professional Patterns

This project leverages the **Repository Pattern** and **Dependency Injection** to achieve high modularity:

* **Controllers** → Handle HTTP requests and DTO validation.
* **Services** → Contain complex business logic (e.g., trip math, geocoding coordination).
* **Repositories** → Handle raw database operations using Mongoose.
* **DI Layer** → Decouples components using InversifyJS for better testability.

### 🔄 Request Flow

```
Client → Route → Middleware → Controller → Service → Repository → Database
```

### ✅ Benefits

* **Clean Separation**: Business logic is completely isolated from the database and transport layers.
* **Easy Testing**: Services and Repositories can be easily mocked via DI.
* **Scalable**: Adding new modules (e.g., User profiles, Reports) follows a proven, rigid structure.

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/A-A-dx2y/speedo-backend.git

# Navigate into the project
cd speedo-backend

# Install dependencies
npm install

# Setup your .env file with MONGO_URI and JWT_SECRETS

# Run development server
npm run dev
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server with tsx watch
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build from dist/
npm run lint     # Run ESLint for code quality
```


## 👨‍💻 Author

* **achu** ([@A-A-dx2y](https://github.com/A-A-dx2y))

---

## 📄 License

This project is licensed under the ISC License.
