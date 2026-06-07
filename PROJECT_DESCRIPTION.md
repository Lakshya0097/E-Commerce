# Shoplane: Premium Full-Stack E-Commerce Platform

A premium, fully responsive full-stack e-commerce storefront utilizing a decoupled client-server architecture. The project features a fast vanilla JavaScript frontend connected to a robust Java Spring Boot REST API and a relational MySQL database.

---

## 🌟 Key Features

- **Decoupled Architecture**: Independent frontend codebase communicating with a backend API via RESTful JSON endpoints.
- **Premium storefront UI**: A modern, dark-themed responsive layout styled with custom CSS variables, smooth scroll indicators, glassmorphic dropdowns, and dynamic hover transformations.
- **Real-Time Catalog Search**: Instant client-side search parsing matching product names and descriptions as the user types, without page reloads.
- **Interactive Details Modals**: Responsive product detail popups allowing users to browse detailed descriptions, rating statistics, and select sizes, colors, or hardware bundles.
- **Secure Password Hashing**: User authentication (registration/login) protected on the backend using **BCrypt** password encryption with a work-factor salt of 12.
- **Personalized Transaction History**: Account profile dashboard that queries and displays the user's historical orders (nested lists of purchased items, quantities, total checkout prices, status badges, and formatted timestamps) directly from MySQL relationships.
- **Interactive Toast Notifications**: Lightweight, slide-in animated alert messages (success/error states) built from scratch to replace native browser popups.
- **Pre-Seeded Catalog**: Includes a curated database seed of 45 real-world products complete with high-definition stock images matching the item categories (Trending, Clothing, and Electronics).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3, JavaScript (ES6+), Bootstrap 5, FontAwesome 6 |
| **Backend** | Java 21, Spring Boot 3.4.3, Spring Web, Spring Data JPA |
| **Database** | MySQL 8.0, Hibernate ORM |
| **Security** | BCrypt Encryption |
| **Tools** | Maven Wrapper, Git |

---

## 📂 Codebase Structure

```
E-commerce/
├── Ecomm/                     # Spring Boot Java Backend
│   ├── src/main/java/com/lakshyakumrawat/Ecomm/
│   │   ├── controller/        # REST Controllers (User, Product, Order endpoints)
│   │   ├── model/             # JPA Relational Entities (User, Product, Orders, OrderItem)
│   │   ├── service/           # Service Layer (Business rules, Order creation, BCrypt matching)
│   │   └── util/              # Hashing Utility (BCrypt password salting)
│   ├── src/main/resources/    # Application properties (MySQL credentials)
│   └── pom.xml                # Maven Dependencies (Spring Boot, JPA, MySQL, JBCrypt)
│
└── Ecomm-UI/                  # Vanilla Web Frontend
    ├── css/
    │   └── styles.css         # Custom dark theme variables, card hover animations, toasts
    ├── js/
    │   ├── api.js             # API Fetch, Search, and Product Details Modal renderer
    │   └── cart.js            # Cart array storage, Checkout handler, Toast engine, Order History modal
    ├── index.html             # Storefront homepage
    ├── cart.html              # Interactive Cart checklist
    └── login.html             # Auth portal (Login & Register toggles)
```
