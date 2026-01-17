## 1. Goal
Implement the secure user authentication system (Signup, Login, Logout) and connect the application to Supabase. This phase receives users from the Landing Page (Phase 0) and converts them into registered users.

## 2. Tech Stack Config (Continued from Phase 0)
- **Frontend**: Next.js (Already initialized in Phase 0).
- **Styling**: Vanilla CSS (Using system defined in Phase 0).
- **Database/Auth**: Supabase.

## 3. Implementation Steps

### 3.1 Next.js Configuration
*Project was initialized in Phase 0. We now focus on Auth Config.*
1. Clean up default structure if not done.
2. Ensure environment variables for Supabase are set up (`.env.local`).

### 3.2 Design System
*Refer to Phase 0 for the Global Variables (`globals.css`).*
Ensure the `AuthForm` components utilize the existing `--primary` and `--bg-card` variables to match the Landing Page aesthetic.

### 3.3 Supabase Configuration
1. Create a new Supabase Project.
2. Install client: `npm install @supabase/supabase-js`.
3. Create generic `utils/supabase/server.ts` and `client.ts` for App Router authentication helpers.

### 3.4 Authentication Module
**Features:**
- **Sign Up Page**: `/auth/signup` (Email, Password, Institute Name).
- **Login Page**: `/login`.
- **Auth Actions**: Server actions for `signUp`, `signIn`, `signOut`.

**Components:**
- `AuthForm`: Reusable card-style form with "Glassmorphism" effect.
- `Button`: Primary/Secondary variants with hover transitions (`transform: translateY(-1px)`).

### 3.5 Database Initial Setup
Enable Supabase Auth Provider (Email/Password).

**Initial SQL (Run in Supabase Editor):**
```sql
-- Trigger to create a public profile on auth.signup
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  role text default 'school_admin', -- 'super_admin' or 'school_admin'
  primary key (id)
);
```

## 4. Deliverables
- [ ] Application running (from Phase 0).
- [ ] Supabase project connected.
- [ ] User can Sign Up (redirected from Landing Page).
- [ ] User can Log In.
- [ ] Protected Route Middleware working.

## 5. Connection to Next Phase
Once Auth is working, we can distinguish between users. Phase 2 will introduce the concept of "Schools" and "Tenancy".
