🚀 Taskora – Task Marketplace & Workflow Platform

Taskora is a full-stack task marketplace that connects users who need tasks done with runners who complete them.
It follows real-world task workflows, role-based dashboards, and transparent task tracking from creation to completion.

Built as a production-grade full-stack project with authentication, role switching, task lifecycle management, and a modern UI.

✨ Features
👤 User (Task Creator)

Register & login with email verification (OTP)

Create tasks with:

Pickup & drop locations

Description & deadline

Custom task price

View all posted tasks

Track task status in real time

Confirm task completion

Cancel tasks (before completion)

🏃 Runner

Switch between User ↔ Runner mode

Browse open tasks

Accept tasks (only one active task at a time)

Start → Deliver → Complete workflow

Cancel & release tasks back to marketplace

View active & completed tasks

Earnings dashboard (based on completed tasks)

📊 Task Lifecycle
OPEN → ACCEPTED → IN_PROGRESS → DELIVERED → COMPLETED
           ↘
         CANCELLED

🎯 Dashboards

User Dashboard:

Task stats

Quick actions

Runner Dashboard:

Open tasks count

Active tasks

Completed tasks

Total earnings (calculated from task prices)

🧠 Smart UX

Role-based navigation (User / Runner)

Confirmation modals (logout, cancel task, switch role)

Animated status timeline

Typewriter hero animation

Scroll-based UI animations

Protected actions with login prompt modal

🛠 Tech Stack
Frontend

React

React Router

Tailwind CSS

Framer Motion (animations)

Axios

Sonner (toasts)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

OTP Email Verification

Other:

Role-based access control

RESTful API architecture

🔐 Authentication Flow

User registers

OTP sent to email

Email verification

Login with JWT

Role-based routing (User / Runner)

💰 Earnings Logic

Earnings are calculated based on completed tasks only

Total Earnings = Sum of price of all COMPLETED tasks


📌 For MVP simplicity, earnings are calculated on the frontend using accepted task data.
(This can be moved to backend aggregation later.)

📂 Project Structure (Simplified)
Frontend/
 ├── components/
 ├── pages/
 │    ├── auth/
 │    ├── user/
 │    ├── runner/
 │    └── task/
 ├── context/
 ├── utils/
 └── App.jsx

Backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── server.js

🚀 Getting Started
1️⃣ Clone the repo
git clone https://github.com/nitesh45176/taskora.git

2️⃣ Install dependencies

Backend

cd server
npm install


Frontend

cd client
npm install

3️⃣ Environment Variables

Create .env in server/

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

4️⃣ Run the app

Backend

npm run dev


Frontend

npm run dev

🌍 Deployment

Frontend: Vercel 

Backend: Render 

Database: MongoDB Atlas

🧪 Status

✅ Core features completed
🚧 Proof upload & payments intentionally skipped
🔄 Backend earnings aggregation can be added later

📌 Why This Project?

This project demonstrates:

Real-world workflow modeling

Clean role separation

State-based task systems

Full-stack architecture

Production-style UI/UX decisions

🙌 Author

Nitesh Kr. Mishra
B.Tech (IT)
Full-Stack Developer
📧 mishranitesh45176@gmail.com
🔗 https://www.linkedin.com/in/nitesh-mishra-368662321/  |   github.com/nitesh45176

⭐ If you like this project

Give it a ⭐ on GitHub — it really helps!
