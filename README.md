# SkillRoute: A Community Driven Learning Path Platform

SkillRoute is a full stack web application where users share structured learning paths created from their own learning experiences. Each path contains steps, and each step includes resources such as YouTube videos, GitHub repositories, research papers, articles, and AI prompts.

The platform helps learners follow real human learning journeys instead of browsing random unstructured content.

---

## Live Demo

Coming soon

---

## Features

- User authentication using JSON Web Tokens  
- Create and publish learning paths  
- Add steps inside each path  
- Add resources inside steps  
- Support for free and premium resources  
- Search skills by keyword  
- Discover random skills  
- Creator dashboard pages already prepared  
- Protected endpoints with authentication middleware  
- Production ready backend structure  
- State management with Redux Toolkit  
- Clean and modular folder architecture  

---

## Tech Stack

### Frontend
- React JS  
- Vite  
- Tailwind CSS  
- Redux Toolkit  
- React Router  
- Axios  

### Backend
- Node JS  
- Express JS  
- MongoDB with Mongoose  
- JWT authentication  
- bcryptjs for password hashing  
- CORS  
- MVC architecture  

### Database
- MongoDB Atlas  

### Deployment
- Frontend on Vercel  
- Backend on Railway or Render  
- Database on MongoDB Atlas  

---
```
SkillRoute/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── pages/
    │   ├── store/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── vite.config.js
    ├── package.json
    └── .env
```
---
## Backend Installation

### Clone the repository
```bash
git clone https://github.com/AshishRajx7/SkillRoute.git
cd SkillRoute/backend
Install dependencies
bash
Copy code
npm install
Add environment variables
Create an .env file inside the backend folder:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
Start the development server
bash
Copy code
npm run dev
You should see
Server running on port 5000
MongoDB connected

Frontend Installation
Navigate to frontend
bash
Copy code
cd ../frontend
Install dependencies
bash
Copy code
npm install
Start the development server
bash
Copy code
npm run dev
The frontend will be available at:
http://localhost:5173

API Overview
Auth Routes
POST api/auth/signup creates a user

POST api/auth/login logs in the user and returns a JWT

Skill Path Routes
POST api/paths/create creates a new skill path

GET api/paths/:id returns a path by id

GET api/paths/search searches skills by keyword

GET api/paths/random returns a random skill

Step Routes
POST api/steps/add adds a step to a path

GET api/steps/:id returns step details

Resource Routes
POST api/resources/add adds a resource to a step

GET api/resources/:id returns resource details

Protected Route Usage
Send the token in the request header:

makefile
Copy code
Authorization: Bearer token
Authentication Flow
User signs up and the password is hashed with bcrypt

User logs in and receives a JWT

JWT is stored in Redux

Protected routes are verified through authentication middleware

User details are attached to req.user

Environment Variables Summary
Backend
PORT

MONGO_URI

JWT_SECRET

NODE_ENV

Frontend
bash
Copy code
VITE_API_URL=http://localhost:5000/api
Deployment Guide
Backend on Railway or Render
Push the project to GitHub

Create a new service

Add environment variables

Connect MongoDB Atlas

Deploy

Frontend on Vercel
Import the GitHub repository

Add environment variable

bash
Copy code
VITE_API_URL=https://your backend url/api
Build

Deploy

Future Enhancements
Payment system with Stripe or Razorpay

Creator payouts

Skill recommendations using machine learning

User profiles and follow system

Comments and upvotes

Mobile application

Author
Developed by Ashish Raj
GitHub: https://github.com/AshishRajx7
