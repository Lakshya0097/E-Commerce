# Shoplane E-Commerce: Portfolio Deployment Guide

This guide walks you through the steps to host and publish the **Shoplane** E-commerce project on GitHub to showcase it in your portfolio.

Since this project consists of a static frontend (`Ecomm-UI`) and a dynamic Java/MySQL backend (`Ecomm`), deployment requires two parts:
1. **Hosting the Static Frontend**: Free via **GitHub Pages**.
2. **Hosting the Java API & MySQL Database**: Free/low-cost via cloud providers like **Render** or **Railway**.

---

## Step 1: Create a GitHub Repository & Push Your Code

1. Create a new repository on your GitHub account (e.g., `shoplane-ecommerce`).
2. Open your terminal in `D:\E-commerce` and run the following commands to initialize Git (if not already initialized) and push the code:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "feat: complete e-commerce platform with search, modals, orders, and bcrypt auth"

# Rename default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/shoplane-ecommerce.git

# Push the code
git push -u origin main
```

---

## Step 2: Deploy the MySQL Database

A Spring Boot server needs a running database. You can host a free MySQL instance on cloud providers:

### Option A: Railway (Recommended)
1. Sign up/Log in on [Railway.app](https://railway.app/).
2. Click **New Project** -> **Provision MySQL**.
3. Once provisioned, click the MySQL service box and navigate to the **Variables** tab.
4. Copy the connection parameters:
   - `MYSQLUSER` (e.g., `root`)
   - `MYSQLPASSWORD`
   - `MYSQLHOST`
   - `MYSQLPORT` (e.g., `3306`)
   - `MYSQLDATABASE` (default is `railway`)

### Option B: Aiven or Clever Cloud
- Both provide free tier MySQL instances with standard JDBC connection parameters.

---

## Step 3: Deploy the Java Spring Boot Backend (`Ecomm`)

You can deploy the Java Spring Boot jar on **Render** or **Railway** directly from your GitHub repository.

### Hosting on Render (Free Web Service)
1. Sign up on [Render.com](https://render.com/) and connect your GitHub account.
2. Click **New +** -> **Web Service**.
3. Choose your repository `shoplane-ecommerce`.
4. Configure the Web Service settings:
   - **Name**: `shoplane-api`
   - **Root Directory**: `Ecomm` (This points Render to compile only the Spring Boot folder, not the frontend)
   - **Runtime**: `Docker` or `Java` (Select **Java** / **Maven**)
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Ecomm-0.0.1-SNAPSHOT.jar`
5. Add your Database **Environment Variables** in the Render settings tab:
   - `SPRING_DATASOURCE_URL` = `jdbc:mysql://YOUR_DATABASE_HOST:PORT/YOUR_DATABASE_NAME`
   - `SPRING_DATASOURCE_USERNAME` = `YOUR_DATABASE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD` = `YOUR_DATABASE_PASSWORD`
6. Click **Deploy Web Service**. Render will build the project and assign you a public URL (e.g., `https://shoplane-api.onrender.com`).

*Note: In [application.properties](file:///D:/E-commerce/Ecomm/src/main/resources/application.properties), you can modify the database connection lines to read environment variables so you don't expose your password in Git:*
```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
```

---

## Step 4: Configure the Frontend API URL

Once your backend is running in the cloud, you need to point your frontend to it instead of `localhost:8080`.

1. Open [Ecomm-UI/js/api.js](file:///D:/E-commerce/Ecomm-UI/js/api.js) and [Ecomm-UI/js/cart.js](file:///D:/E-commerce/Ecomm-UI/js/cart.js).
2. Change the base URL constant at the very top of both files:
   ```javascript
   // Old: const BASE_URL = "http://localhost:8080";
   const BASE_URL = "https://shoplane-api.onrender.com"; // Replace with your Render URL
   ```
3. In `cart.js`:
   ```javascript
   // Old: const CART_BASE_URL = "http://localhost:8080";
   const CART_BASE_URL = "https://shoplane-api.onrender.com"; // Replace with your Render URL
   ```
4. Push these changes to GitHub:
   ```bash
   git add Ecomm-UI/js/api.js Ecomm-UI/js/cart.js
   git commit -m "config: point API URL to production backend"
   git push origin main
   ```

---

## Step 5: Host the Frontend on GitHub Pages

Since the frontend is just standard HTML, CSS, and JS, you can host it for free using **GitHub Pages** directly from your repository:

1. Open your repository on GitHub.
2. Go to **Settings** -> **Pages** (under the Code and automation section).
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / Folder: **/(root)** (or `/docs` if you restructure it)
4. If your frontend is inside a folder named `Ecomm-UI`, your page will load at `https://YOUR_USERNAME.github.io/shoplane-ecommerce/Ecomm-UI/index.html`.
5. Click **Save**.

### 💡 Portfolio Presentation Tips:
- **Write a clean README.md**: Add screenshots, describe the features (Search, Details Modals, Toasts, BCrypt, Order History), and list the technology stack.
- **Add a "Live Demo" Link**: Place the GitHub Pages link right at the top of your GitHub repository's description.
- **Include Database Seed Instructions**: Mention that the project is seeded with 45 sample items from Unsplash.
