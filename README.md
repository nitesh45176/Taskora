# 🚀 Taskora – Task Marketplace & Workflow Platform

Taskora is a full-stack task marketplace that connects users who need tasks done with runners who complete them.  
It follows real-world task workflows, role-based dashboards, and transparent task tracking from creation to completion.  
Built as a production-grade full-stack project with authentication, role switching, task lifecycle management, and a modern UI.

---

### Problems that we face in daily life

## 1️⃣ No Time for Small Errands

**Problem:** Busy schedules make it difficult to handle simple tasks like:
- Buying medicines
- Picking up groceries
- Collecting parcels
- Dropping documents

These tasks seem small but often get postponed due to lack of time.

**How Taskora Fixes This:** Users can instantly create a task with pickup and drop locations. Nearby runners can accept and complete the task on their behalf — saving time and reducing stress.

---

## 2️⃣ Standing in Long Queues Wastes Hours

**Problem:** Waiting in lines at:
- Medical stores
- Government offices
- Banks
- Ticket counters

can take hours and disrupt an entire day.

**How Taskora Fixes This:** Users delegate queue-based tasks to runners who handle the waiting while users focus on more important work.

---

## 3️⃣ Urgent Help When No One Is Available

**Problem:** Sometimes friends or family aren't available when urgent help is needed — especially during odd hours or emergencies.

**How Taskora Fixes This:** Taskora provides on-demand assistance by connecting users with available runners in real time, ensuring help is always accessible.

## ✨ Features

### 👤 User (Task Creator)
- Register & login with email verification (OTP)
- Create tasks with:
  - Pickup & drop locations
  - Description & deadline
  - Custom task price
- View all posted tasks
- Track task status in real time
- Confirm task completion
- Cancel tasks (before completion)

### 🏃 Runner
- Switch between User ↔ Runner mode
- Browse open tasks
- Accept tasks (only one active task at a time)
- Start → Deliver → Complete workflow
- Cancel & release tasks back to marketplace
- View active & completed tasks
- Earnings dashboard (based on completed tasks)

---

## 📊 Task Lifecycle
```
OPEN → ACCEPTED → IN_PROGRESS → DELIVERED → COMPLETED
           ↘
         CANCELLED
```

---

## 🎯 Dashboards

### User Dashboard:
- Task stats
- Quick actions

### Runner Dashboard:
- Open tasks count
- Active tasks
- Completed tasks
- Total earnings (calculated from task prices)

---

## 🧠 Smart UX

- Role-based navigation (User / Runner)
- Confirmation modals (logout, cancel task, switch role)
- Animated status timeline
- Typewriter hero animation
- Scroll-based UI animations
- Protected actions with login prompt modal

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Framer Motion (animations)
- Axios
- Sonner (toasts)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- OTP Email Verification

### Other:
- Role-based access control
- RESTful API architecture

---

## 🧱 System Architecture & Design

Taskora is designed as a backend-first system with strict authority boundaries and state validation.

### Core Design Principles
- Backend is the single source of truth
- Frontend never decides permissions
- All task state transitions are centrally validated
- Financial flows are escrow-based and dispute-safe

## 💰 Escrow & Payment Design

Taskora uses an escrow-based payment model to ensure fairness and trust.

### Escrow Flow
1. User creates a task → payment is LOCKED in escrow
2. Runner accepts task → escrow is associated with runner
3. Task delivered:
   - User confirms → escrow RELEASED to runner
   - User raises dispute → escrow FROZEN
4. Admin resolves dispute:
   - User wins → escrow REFUNDED
   - Runner wins → escrow RELEASED

This design prevents:
- Early payouts
- Double payments
- Runner or user fraud


## ⚖️ Dispute Resolution & Admin Arbitration

Taskora supports real-world dispute handling.

### Dispute Rules
- Disputes can only be raised after task delivery
- Once disputed, the task is locked from further actions
- Escrow is frozen until resolution

### Admin Role
- Admin accounts are manually provisioned (no public admin signup)
- Admins can:
  - View all disputes, tasks, and escrows
  - Resolve disputes in favor of user or runner
- Admin decisions are final and enforced at backend level

This mirrors real production systems where privileged roles are tightly controlled.


## 🔄 Task State Machine & Safety

Taskora enforces a hardened task lifecycle:

OPEN → ACCEPTED → IN_PROGRESS → DELIVERED → COMPLETED  
                                ↘ DISPUTE_RAISED

### State Hardening
- All state transitions are centrally validated
- Illegal transitions are rejected (HTTP 409)
- Cron jobs respect task state and disputes
- Prevents accidental or malicious state corruption

This ensures system consistency even under edge cases.


## 🔐 Authentication Flow

1. User registers
2. OTP sent to email
3. Email verification
4. Login with JWT
5. Role-based routing (User / Runner)

---

## 💰 Earnings Logic

- Earnings are calculated based on completed tasks only
- **Total Earnings** = Sum of price of all COMPLETED tasks

> 📌 For MVP simplicity, earnings are calculated on the frontend using accepted task data.  
> (This can be moved to backend aggregation later.)

---

## 📂 Project Structure (Simplified)
```
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
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/nitesh45176/taskora.git
```

### 2️⃣ Install dependencies

**Backend**
```bash
cd server
npm install
```

**Frontend**
```bash
cd client
npm install
```

### 3️⃣ Environment Variables

Create `.env` in `server/`
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Run the app

**Backend**
```bash
npm run dev
```

**Frontend**
```bash
npm run dev
```

---

## 🌍 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🧪 Status

- ✅ Core features completed
- 🚧 Proof upload & payments intentionally skipped
- 🔄 Backend earnings aggregation can be added later

---

## 📌 Why This Project?

This project demonstrates:
- Real-world workflow modeling
- Clean role separation
- State-based task systems
- Full-stack architecture
- Production-style UI/UX decisions

---

## 🙌 Author

**Nitesh Kr. Mishra**  
B.Tech (IT) | Full-Stack Developer

📧 [mishranitesh45176@gmail.com](mailto:mishranitesh45176@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/nitesh-mishra-368662321/) | [GitHub](https://github.com/nitesh45176)

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it really helps!
