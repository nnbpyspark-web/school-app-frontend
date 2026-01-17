# Data Flow

## 1. User Authentication
1. User enters credentials on `/auth/login`.
2. Supabase Auth validates and returns a JWT (Session).
3. Session is stored in **Cookies** (via `@supabase/ssr`).
4. `middleware.ts` runs on every route change to verify the session.

## 2. Viewing Data (Read)
Example: **Viewing Students**
1. User visits `/dashboard/students`.
2. **Server Component** (`page.tsx`) calls `supabase.from('students').select('*')`.
3. Supabase Auth (Cookie) identifies the user.
4. Database RLS policy executes: `WHERE school_id = (SELECT school_id FROM profiles WHERE id = auth.uid())`.
5. Data is returned and rendered.

## 3. Creating Data (Write)
Example: **Creating a Batch**
1. User submits form on Client Component.
2. Server Action (`actions.ts`) or Client SDK calls `supabase.from('batches').insert({...})`.
3. Database Trigger/RLS ensures `school_id` matches the user's profile.
4. Record is inserted.

## 4. File Upload (Hybrid)
1. User selects file on Frontend.
2. Frontend POSTs `FormData` to `http://localhost:8000/api/v1/upload` with `Authorization` (Bearer Token).
3. **FastAPI**:
    a. Validates Token.
    b. Uploads file to Supabase Storage (using Admin Key).
    c. Returns Public URL.
4. **Frontend** receives URL.
5. Frontend inserts record (e.g., Assignment) into Supabase DB containing the URL.

## 5. Payments (Stripe)
1. User clicks "Upgrade" on `/dashboard/billing`.
2. Frontend POSTs to `http://localhost:8000/api/v1/payments/create-checkout-session`.
3. **FastAPI**:
    a. Calls Stripe API to create Session.
    b. Returns `checkout_url`.
4. Frontend redirects user to Stripe.
5. User pays on Stripe.
6. Stripe sends **Webhook** to `.../api/v1/payments/webhook`.
7. **FastAPI** verifies signature and updates `schools.subscription_status = 'active'` in DB.
