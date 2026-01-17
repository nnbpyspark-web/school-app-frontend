# 🚀 How to Start the EduSaaS Application

Follow these steps to get the full stack running locally.

## Prerequisities
- Node.js (v18+)
- Python (v3.10+)
- Supabase Project (URL & Keys)
- Stripe Account (Test keys)

## 1. Environment Setup
Ensure your `.env.local` file in the root directory contains the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Start the Backend (FastAPI)
The backend handles file uploads and payments.

1. Open a terminal.
2. Navigate to the project root:
   ```powershell
   cd d:\Antigravity\school-app
   ```
3. Install Python dependencies:
   ```powershell
   pip install -r backend/requirements.txt
   ```
4. Start the server:
   ```powershell
   cd backend
   uvicorn main:app --reload --port 8000
   ```
   *Server will run at: http://localhost:8000*

## 3. Start the Frontend (Next.js)
The frontend is the main user interface.

1. Open a **new** terminal window.
2. Navigate to the project root:
   ```powershell
   cd d:\Antigravity\school-app
   ```
3. Install Node dependencies (if you haven't yet):
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```
   *App will run at: http://localhost:3000*

## 4. Verification
1. Go to **http://localhost:3000**.
2. Log in or Sign up.
3. Navigate to **Dashboard**.
4. Test **Assignments** (requires Backend) to ensure file uploads work.
5. Test **Billing** (requires Backend) to ensure Stripe Checkout works.
