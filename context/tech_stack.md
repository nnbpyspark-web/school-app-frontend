# Technology Stack

## Frontend
- **Framework**: **Next.js 14** (App Router)
- **Language**: **TypeScript** (Strict mode)
- **Styling**:
    - **Tailwind CSS**: Utility-first styling.
    - **Shadcn/UI**: Key component library (built on Radix UI).
    - **Lucide React**: Iconography.
    - **Framer Motion**: Animations and transitions.
    - **Recharts**: Data visualization (charts).
- **State Management**: React Server Components (Server State) + React Hooks (Client State).

## Backend
- **Primary API**: **Supabase** (PostgreSQL + PostgREST)
    - Accessed directly from Frontend via `@supabase/ssr` client.
- **Secondary API (Heavy Lifting)**: **FastAPI** (Python 3.10+)
    - Handles complex logic not suitable for direct DB access or Edge functions.
    - **Uvicorn**: ASGI Server.
    - **Python-Multipart**: For file handling.
    - **Stripe**: Python SDK for payments.

## Database & Storage
- **Database**: **PostgreSQL** (hosted via Supabase).
- **Storage**: **Supabase Storage** (Buckets for media/files).
- **Authentication**: **Supabase Auth** (GoTrue).

## Infrastructure & DevOps
- **Package Manager**: `npm`
- **Environment Management**: `.env.local`
- **Deployment (Planned)**:
    - Frontend: Vercel
    - Backend: Railway/Render
    - Database: Supabase Cloud

## Key Libraries
- `@supabase/ssr`: For Next.js SSR/Cookie-based auth.
- `stripe`: Payment processing.
- `clsx` & `tailwind-merge`: For dynamic class generation.
