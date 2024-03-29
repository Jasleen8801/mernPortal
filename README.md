# Bean to Bond

Welcome to Bean to Bond Portal! This platform bridges the gap between aspiring tech talents and businesses, creating strong connections that foster growth and success.

## Overview 

Bean to Bond is a feature-rich web application that provides a seamless experience for students and businesses alike. This portal serves as a platform for students to find internships and showcase their skills, while businesses can discover talented individuals for their projects.

## Features

- Student Dashboard: Students can create personalized profiles, highlight their technical expertise, and explore a wide range of internship opportunities.

- Business Dashboard: Businesses can post internships, review student profiles, and connect with potential candidates.

- Project Showcase: Students can proudly showcase their completed projects, giving businesses insight into their abilities.

- Secure Authentication: Utilizes JWT (JSON Web Tokens) for secure authentication and authorization.

## Technologies used

- Frontend: React, HTML, CSS, Bootstrap.
- Backend: Node.js, Express.js.
- Database: MongoDB.

## Getting Started

1. Clone the repository: git clone `https://github.com/your-username/bean-to-bond.git`
2. Navigate to the project directory: `cd bean-to-bond`
3. Install frontend dependencies: `npm install`
4. Start the frontend development server: `npm start`
5. Navigate to the backend directory: `cd backend`
6. Install backend dependencies: `npm install`
7. Start the backend server: `npm start`

## Configuration

Make sure to create a `.env` file in the `backend` directory and provide the following information:

```bash
PORT=<PORT_FOR_NODE_APP>
EMAIL=<YOUR_MAIL_ID>
EMAIL_PASSWORD=<YOUR_EMAIL_ID_PWD>
ADMIN_SECRET=<ADMIN_SECRET_FOR_JWT>
BUSINESS_SECRET=<BUSINESS_SECRET_FOR_JWT>
STUDENT_SECRET=<STUDENT_SECRET_FOR_JWT>
DB_PASS=<ANY_DATABASE_PASS>
MONGO_URI=<MONGODB_URI_CONNECTION_STRING>
SECRET_KEY=<RANDOM_KEY>
```

Similarly create a `.env` file in the `frontend` directory and provide the following information:

```bash
PORT=<PORT_FOR_REACT_APP>
REACT_APP_SERVER=`http://localhost${PORT_FOR_NODE_APP}/`
```

