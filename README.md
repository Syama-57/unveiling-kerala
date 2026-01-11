Unveiling Kerala — Revealing the Unknown

A full-stack web application focused on the myths, legends, folklore, and hidden stories of Kerala.
The platform allows users to explore cultural stories, while authenticated users can submit, manage, and control their own content through a personal dashboard.
All content moderation is handled through the Django Admin Panel.

Tech Stack
Frontend

React (Vite)

React Router DOM

Axios (API communication)

CSS (custom styling)

Framer Motion (page transitions & animations)

Backend

Django

Django REST Framework

JWT Authentication (Login & Signup)

Django Admin Panel

Key Characteristics

✅ Full-stack web application

✅ JWT-based authentication

✅ Axios-based API communication

✅ Slug-based routing

✅ User-owned content management

✅ Admin-moderated publishing workflow

Features
Public Access

Browse myths, legends, folklore, and district-based stories

Slug-based story detail pages

Dark, immersive folklore-themed UI

Authentication

User Signup & Login

JWT tokens stored in localStorage

Axios automatically attaches tokens for protected requests

Protected routes with automatic redirect on unauthorized access

Stories & Content

Short descriptions loaded from frontend data

Full story content fetched from backend using Axios

Image support for stories

SEO-friendly slug URLs

User Dashboard

Each user has a personal dashboard

Users can:

View their own submitted stories

Edit their own stories

Delete their own stories

Users cannot access or modify other users’ content

All access control enforced by the backend

Story Submission

Only authenticated users can submit stories

Submitted stories:

Are marked as pending approval

Become publicly visible only after admin approval

Secure form validation on frontend and backend

Admin Management

Admin controls everything via Django Admin Panel

Admin can:

Approve or reject submitted stories

Manage users

Edit or delete any story

No direct database manipulation from the frontend

Project Structure
MyProject/
│
├── unveiling-kerala/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── assets/
│   │   ├── api/axios.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── unveiling-kerala-backend/          # Django Backend
│   ├── manage.py
│   ├── unveiling_kerala/
│   └── destinations/
│
└── README.md

API Communication (Axios)

Axios is used for all backend communication

Centralized Axios instance:

Base URL configured

JWT token automatically attached

Example endpoints:

GET /api/stories/

GET /api/stories/<slug>/

POST /api/submit/

GET /api/my-stories/

PUT /api/stories-manage/<id>/

DELETE /api/stories-manage/<id>/

Slug-Based Routing

Stories are accessed using readable slugs instead of numeric IDs:

/stories/mannarasala-temple


This improves:

SEO

Readability

Maintainability

Purpose of the Project

Build a production-style full-stack web application

Implement real authentication and authorization flows

Design a user-owned content system

Preserve and present Kerala’s cultural stories through modern web technologies

Author

Syama M
Full-Stack Developer

Unveiling Kerala is an exploration of stories that live beyond maps — whispered through hills, temples, forests, and forgotten paths.