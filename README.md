# Campus Buddy — Unified Academic Management Portal

<p align="center">
<img src="frontend/src/assets/cblogo3.png" alt="Campus Buddy Logo" width="120px" height="auto" />
</p>

**CampusBuddy** is a high-performance, full-stack academic management platform architected to streamline the university experience. Developed by **Srishti Gupta**, a Google Student Campus Ambassador, it empowers students at institutions like **Jiwaji University** to monitor attendance, calculate SGPA/CGPA with weighted credit logic, and access centralized study resources.

Built with a professional **"Administrative Command Center"** aesthetic, the platform leverages secure JWT authentication and dynamic data visualization to deliver actionable academic insights.

---

## 🛠️ Tech Stack

### 🔹 Frontend (Client-Side)

* **Library:** React.js (Hooks, Context API)
* **State Management:** Redux Toolkit (Centralized Store)
* **Styling:** Tailwind CSS (Glassmorphism & Professional UI)
* **Visualization:** Recharts (Dynamic Academic Trends)
* **Icons:** Heroicons & React Icons

### 🔹 Backend (Server-Side)

* **Framework:** Spring Boot 3.x (Java)
* **Security:** Spring Security with JWT (Stateless Auth)
* **Persistence:** Spring Data JPA / Hibernate
* **Database:** MySQL (Relational Data Mapping)

---

## ✨ Key Features

* **🔐 Secure Multi-Role Authentication:** Robust login/signup flow with roles for Students and Super Admins.
* **📊 Integrated Academic Dashboard:** Real-time tracking of attendance percentages and cumulative performance.
* **📈 Intelligent Performance Tracker:** Weighted CGPA calculator that accounts for varying semester credits.
* **📚 Digital Asset Repository:** Categorized management of PDFs, PYQs, and YouTube lectures.
* **🛡️ Admin Infrastructure:** Dedicated panel for managing university branches, subjects, and resource allocation.
* **📱 Responsive Architecture:** Optimized for a seamless experience across mobile, tablet, and desktop devices.

---

## 🔒 System Architecture & Flow

1. **Authentication:** User credentials are exchanged for a JWT token.
2. **State Hydration:** Redux Thunk dispatches async actions to fetch user-specific attendance and SGPA data.
3. **Data Processing:** The frontend calculates real-time metrics using the formula: 
$$Attendance Rate = \frac{Present}{Total} \times 100$$


4. **Visual Rendering:** Recharts transforms raw JSON data into interactive Line and Area charts.

---

## 📂 Project Structure

### Frontend (`/frontend`)

```text
src/
├── components/     # Reusable UI elements (Modals, Cards, Navbar)
├── pages/          # Auth, Profile, Dashboard, Resource Explorer
├── State/          # Redux Slices (Auth, Resource, Attendance, SGPA)
├── api/            # Axios interceptors for JWT injection
└── assets/         # Branding (cblogo3.png) and static imagery

```

### Backend (`/college-portal`)

```text
src/main/java/com/college/
├── controller/     # REST Endpoints (Admin & User APIs)
├── service/        # Business Logic (Calculations & Validations)
├── repository/     # JPA Data Access Objects
├── model/          # Entities (User, Branch, Subject, Resource)
└── config/         # Security & CORS Configuration

```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/srishtigupta/CampusBuddy.git
cd CampusBuddy

```

### 2. Configure Backend

* Create a MySQL database named `campus_buddy`.
* Update `src/main/resources/application.properties` with your credentials.

```bash
mvn spring-boot:run

```

### 3. Configure Frontend

```bash
cd frontend
npm install
npm start

```

---

## 👩‍💻 Author

**Srishti Gupta**
*Full Stack Developer & Google Student Campus Ambassador*

* **LinkedIn:** [linkedin.com/in/srishti-gupta](https://www.linkedin.com/in/srishtigupta1/)
* **GitHub:** [github.com/srishtigupta1234](https://github.com/srishtigupta1234)
