# Folder Structure

```
d:/Antigravity/school-app/
├── .agent/                 # Agent workflows
├── backend/                # Python FastAPI Backend
│   ├── routers/            # API Route Modules
│   │   ├── media.py        # File Upload Logic
│   │   └── payments.py     # Stripe Payment Logic
│   ├── main.py             # App Entry Point
│   └── requirements.txt    # Python Dependencies
├── context/                # Project Context / Documentation (You are here)
├── development_roadmap/    # Phase-wise plans
├── public/                 # Static Assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── auth/           # Authentication Routes (login, signup)
│   │   ├── dashboard/      # Main App Interface
│   │   │   ├── academic/   # Assignments functionality
│   │   │   ├── announcements/
│   │   │   ├── attendance/
│   │   │   ├── batches/
│   │   │   ├── billing/    # Subscription page
│   │   │   ├── settings/
│   │   │   ├── students/
│   │   │   ├── layout.tsx  # Dashboard Shell (Sidebar/Nav)
│   │   │   └── page.tsx    # Dashboard Home
│   │   ├── error.tsx       # Global Error Boundary
│   │   ├── layout.tsx      # Root Layout
│   │   ├── not-found.tsx   # Custom 404
│   │   └── page.tsx        # Landing Page
│   ├── components/
│   │   ├── blocks/         # Large UI Blocks (e.g. Testimonials)
│   │   ├── layout/         # Layout components (Sidebar, Navbar)
│   │   ├── ui/             # Reusable UI Atoms (Button, Card, Input)
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts        # Helper functions (cn, etc.)
│   ├── scripts/            # Utility scripts (e.g. check_db.js)
│   └── utils/
│       └── supabase/       # Supabase Client Generators
│           ├── client.ts   # Browser Client
│           ├── server.ts   # Server Client (Cookies)
│           └── middleware.ts # Auth Protection Middleware
├── .env.local              # Environment Variables
├── next.config.mjs         # Next.js Config
├── package.json            # Node Dependencies
├── supabase_schema*.sql    # Database Migration Files
└── tsconfig.json           # TypeScript Config
```
