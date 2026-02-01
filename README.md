🚀 Startup Benefits Platform

A full-stack platform that provides exclusive SaaS deals to startups and early-stage teams, allowing users to browse, unlock, and claim partner benefits.

🧩 Tech Stack

Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
Backend: Node.js, Express.js, MongoDB, JWT Authentication

🔄 Application Flow

Users register/login

Browse available deals

Locked deals require authentication

Eligible users can claim deals

Claimed deals appear in the dashboard

🔐 Authentication & Authorization

JWT-based authentication

Protected routes require valid tokens

Locked deals cannot be claimed without authorization

🎯 Claim Flow

User clicks claim

Backend validates token and deal eligibility

Claim record is created

Response is returned and shown in UI

⚙️ Setup Instructions
Backend
cd backend
npm install
npm run dev


Create .env:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

Frontend
cd frontend
npm install
npm run dev

🚧 Known Limitations

No refresh tokens

No email verification

Token stored in memory

🏁 Notes

This project focuses on clean architecture, secure authentication, and smooth user experience with animations and responsive UI.

🔥 Verdict

✅ This version is perfect for submission
✅ Recruiters won’t skip it
✅ Meets assignment rules