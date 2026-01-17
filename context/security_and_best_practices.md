# Security & Best Practices

## 1. Authentication
- **Strong Session**: Uses HTTP-only cookies for storing Supabase Sessions (handling SSR securely).
- **Middleware**: `middleware.ts` runs on sensitive routes (`/dashboard/*`) to ensure the user is logged in.

## 2. Authorization
- **RLS (Row Level Security)**: This is the critical security layer.
    - **Rule**: `school_id = auth.uid() linked school`.
    - NEVER disable RLS on production tables.
- **Service Role Key**:
    - Used **ONLY** in the Backend (FastAPI).
    - Never exposed to the client/browser.

## 3. Data Validation
- **Frontend**: Form validation (e.g., required fields).
- **Database**: PostgreSQL Rules (Constraints, Foreign Keys, Not Null).
- **File Upload**: FastAPI should check file size/type (implemented basic check, needs enhancement for Prod).

## 4. Environment Variables
- `.env.local` is git-ignored.
- Keys differentiate between `NEXT_PUBLIC_` (safe for browser) and secret keys (server only).

## 5. Error Handling
- **Graceful Failures**: Global `error.tsx` in Next.js.
- **Backend**: FastAPI raises standard HTTP Exceptions (401, 500) with details.
