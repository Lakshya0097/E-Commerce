# E-Commerce
Shoplane is a full-stack e-commerce platform built with Spring Boot, Java 21, MySQL, and Vanilla JavaScript. It features secure BCrypt authentication, REST APIs, real-time product search, shopping cart management, order history tracking, responsive UI, and a premium dark-themed shopping experience
Shoplane

Shoplane is a full-stack e-commerce web application that is powered by Spring Boot, MySQL, and Vanilla JavaScript. I built this project to deepen my knowledge of backend development, REST APIs, database relationships, authentication and frontend integration.

The application covers end-to-end shopping experience starting from browsing the items, searching for them in real time, adding to cart, placing an order and seeing their order history. The front-end and back-end parts are independent and are communicate through REST APIs.

Features

-   User registration and login
-   Secure storage of passwords using BCrypt hashing
-   Product catalog with categories and filtering
-   Real-time search functionality
-   Shopping cart functionality
-   Order placing and tracking
-   User's own order history
-   Responsive UI (Desktop/Mobile)
-   Toast notification for user actions
-   RESTful API Architecture

Tech Stack

Front-end
-   HTML5
-   CSS3
-   JavaScript (ES6)
-   Bootstrap 5
-   Font Awesome

Back-end
-   Java 21
-   Spring Boot
-   Spring Data JPA
-   Hibernate

Database
-   MySQL

Tools
-   Maven
-   Git
-   VS Code
-   IntelliJ IDEA

Project Structure

``text
Ecomm/
  controller
  model
  repository
  service
  util
  resources

Ecomm-UI/
  css
  js
  index.html
  cart.html
  login.html
`

Getting Started

Clone the repository

`bash
git clone https://github.com/your-username/shoplane.git
`

Setup MySQL database

Create database and update database credentials in application.properties

Run back-end

`bash
./mvnw spring-boot:run
`

Run front-end

Open Ecomm-UI/` folder in Live Server or any other static web server.

What I Learned

-   Building REST API with Spring Boot
-   Entity relationships using JPA and Hibernate
-   Authentication and secure password storing
-   Front-end and back-end interaction using Fetch API
-   Database design and integration
-   Developing a full stack application

Future Enhancements

-   JWT Authentication
-   Payment Gateway Integration
-   Product Reviews and Ratings
-   Admin dashboard
-   Wishlist Functionality
-   Cloud Deployment

---

Feel free to open an issue or a pull request for any suggestion or fix.
