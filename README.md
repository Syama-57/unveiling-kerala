# Unveiling Kerala — Myths, Legends & Folklore Platform

A full‑stack cultural storytelling platform focused on the **myths, legends, folklore, and hidden stories of Kerala**. The project allows authenticated users to read and submit stories, while all content and users are managed centrally through the **Django Admin Panel**.

This project is designed primarily as a **learning‑oriented full‑stack application**, emphasizing authentication, protected routes, form handling, and content management rather than complex database modeling.

---

## Tech Stack

### Frontend

* **React (Vite)**
* **React Router DOM** 
* **CSS (custom styling)**
* Native **Fetch API** 

### Backend

* **Django**
* **Django REST Framework**
* **JWT Authentication** (login & signup)
* **Django Admin Panel** for managing users and stories

---

## Key Characteristics

* ✅ Authentication handled using JWT
* ✅ Stories and users managed via Django Admin
* ✅ Story pages use **slug‑based routing** 

---

## Features

* Public browsing of myths, legends, districts, and folklore
* **User authentication (Login / Signup)** using Django authentication
* **User story submission system**

  * Only logged-in users can submit stories
  * Stories are initially saved as *pending approval*
* **User dashboard**

  * View own submitted stories
  * Edit own stories
  * Delete own stories
* **Admin moderation workflow**

  * Admin reviews submissions via Django Admin
  * Only *approved stories* are visible on public pages
* Slug-based routing for clean URLs
* Dark, immersive UI inspired by folklore themes

### Authentication

* User **Login & Signup**
* JWT token storage using `localStorage`
* Protected routes (submission, dashboard)
* Automatic redirect to login when unauthenticated

### Stories & Legends

* Browse myths and legends by category
* Slug‑based story detail pages
* Short description + full story view
* Image upload support

### Content Submission

* Authenticated users can submit stories
* Edit existing stories (if permitted)
* Form validation on frontend
* Access control enforced by backend

### Admin Management

* All users managed via **Django Admin**
* All stories created, edited, approved via **Django Admin**
* No direct database manipulation from frontend

---

## Project Structure

```
MyProject/
│
├── unveiling-kerala/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── unveiling-kerala-backend/
│   ├── manage.py
│   ├── unveiling_kerala/
│   └── destinations/
│
└── README.md
```

---

## Authentication Flow

1. User attempts to access a protected page
2. If not logged in:

   * Redirected to **Login page**
   * After login, redirected back to original page
3. JWT token stored in `localStorage`
4. Token sent in `Authorization` header for protected requests

---

## Slug‑Based Routing

* Stories are accessed using readable slugs instead of numeric IDs
* Example:

  ```
  /stories/malampuzha-yakshi-legend
  ```
* Improves SEO and readability

---

## Purpose of the Project

* Learn full‑stack integration (React + Django)
* Understand JWT authentication
* Practice protected routing in React
* Explore cultural storytelling through technology

## Author

**Syama M**
Full‑Stack Developer 

---

> *Unveiling Kerala is an exploration of stories that live beyond maps — whispered through hills, temples, forests, and forgotten paths.*
