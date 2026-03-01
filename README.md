Unveiling Kerala — Revealing the Unknown

A full-stack web application dedicated to the myths, legends, and forgotten folklore of Kerala. The platform provides an immersive storytelling experience where users can explore "Sacred Geography" through interactive maps, listen to narrations, and curate their own library of legends.

Tech Stack
Frontend

 React(Vite): Component-based UI development.
 
 Framer Motion: Powering the "Book-Style" scroll animations and transitions.
 
 Leaflet & React-Leaflet: Interactive map rendering for legendary sites.
 
 Web Speech API: Integrated audio narration for accessibility and immersion.
 
 Axios: Centralized API communication with JWT interceptors.
 
 Backend
 
 Django & Django REST Framework: Robust API development.
 
 JWT Authentication (SimpleJWT): Secure user sessions and protected routes.
 
 Django Admin Panel: Streamlined content moderation and story approval.
 
 Relational Database: Optimized for slug-based lookups and user relationships.
 
 🌟 Core Advanced Features📍
 
 Interactive Myth MapsEvery legend is pinned to its real-world location in Kerala.
 
 Spatial Storytelling: Using Leaflet, users can view stories mapped across the 14 districts.
 
 Custom Markers: Visualizing the "Sacred Geography" behind ancient myths.
 
 🔊 Audio Narrator (Text-to-Speech)Experience folklore through sound.
 
 Immersive Listening: A built-in audio narrator reads the full story to the user.
 
 Playback Control: Users can toggle the narrator on or off directly from the story interface.
 
 ❤️ User Bookmark SystemBuild a personal archive of Kerala’s mysteries.
 
 Favorites Library: Authenticated users can "heart" stories to save them to their dashboard.
 
 Persistent Storage: Bookmarks are saved to the backend database, ensuring they stay synced across devices.
 
 Features
 
 Public AccessDistrict-Based Exploration: Filter stories by Kerala's districts.
 
 Immersive UI: A dark, folklore-themed interface designed for focused reading.
 
 Slug-Based SEO: Clean URLs like /stories/mannarasala-temple for better sharing and search ranking.
 
 Authentication & SecurityJWT Workflow: Secure login and signup with tokens stored in localStorage.
 
 Protected Submissions: Only registered users can contribute to the archive.
 
 Owner-Only Permissions: Users can only edit or delete the stories they created.
 
 Content Moderation
 
 Admin Approval System: User-submitted stories remain "Pending" until verified by an admin.
 
 CRUD Operations: Full Create, Read, Update, and Delete capabilities for authorized content owners.
 
 Project Structure
 
MyProject/
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/              # Navbar, MythMap, StoryControls
│   │   ├── pages/                   # StoryDetails, Dashboard, Archive
│   │   ├── data/                    # mythsData.js (Local Reference)
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/         # Django Backend
│   ├── manage.py
│   ├── unveiling_kerala/            # Project Core & Settings
│   └── destinations/                # Story, User, & Bookmark Models/Views
│
└── README.md

Endpoint,Method,Purpose

/api/stories/,GET,List all approved folklore

/api/stories/<slug>/,GET,Detailed view of a specific legend

/api/bookmark/<id>/,POST,Add/Remove a story from user favorites

/api/my-stories/,GET,List stories submitted by the logged-in user

Author
Syama M Full-Stack Developer
"Unveiling Kerala is an exploration of stories that live beyond maps — whispered through hills, temples, forests, and forgotten paths."