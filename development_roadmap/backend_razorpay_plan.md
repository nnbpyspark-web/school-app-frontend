# Backend Development Plan: FastAPI & Razorpay Integration

This plan outlines the roadmap for implementing a robust Python FastAPI backend to handle payment processing using Razorpay. The system is designed to be secure, scalable, and easily integrated with the Next.js frontend.

## Phase 1: FastAPI Backend Implementation

**Goal:** Establish the foundation of the Python backend and prepare the structure for payment logic.

### 1.1 Environment Setup
*   **Directory**: Ensure the `backend/` directory is set up.
*   **Virtual Environment**: Create and activate a Python virtual environment.
*   **Dependencies**: Install necessary packages via `requirements.txt`:
    *   `fastapi`
    *   `uvicorn`
    *   `razorpay`
    *   `pydantic`
    *   `python-dotenv`
    *   `supabase` (for updating database status)

### 1.2 Core Application Structure
*   **Entry Point (`main.py`)**: Initialize the `FastAPI` app.
*   **CORS Configuration**: Allow requests from the frontend URL (e.g., `http://localhost:3000`).
*   **Routers**: Create a dedicated router for payments (e.g., `routers/payments_razorpay.py`) to keep code modular.

### 1.3 Data Models (Pydantic)
Define Request/Response schemas to ensure type safety.
*   **OrderCreateRequest**: `{ "plan_id": str, "amount": int, "currency": "INR" }`
*   **PaymentVerificationRequest**: `{ "razorpay_order_id": str, "razorpay_payment_id": str, "razorpay_signature": str }`

### 1.4 Rules & Best Practices
*   **Validation**: Use Pydantic for all incoming data.
*   **Async/Await**: Use `async` functions for all non-blocking operations.
*   **Secrets**: NEVER hardcode API keys. Load them strictly from `.env`.

---

## Phase 2: Razorpay Integration & Frontend Connection

**Goal:** Implement the specific logic to create orders and verify payments, and connect it to the Next.js frontend.

### 2.1 Backend Logic: Create Order
*   **Endpoint**: `POST /api/v1/payments/create-order`
*   **Logic**:
    1.  Receive `amount` and `currency`.
    2.  Initialize Razorpay Client using `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
    3.  Call `client.order.create(data)`.
    4.  Return the `order_id` to the frontend.

### 2.2 Backend Logic: Verify Payment
*   **Endpoint**: `POST /api/v1/payments/verify-payment`
*   **Logic**:
    1.  Receive `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`.
    2.  Use the Razorpay utility to verify the signature (`client.utility.verify_payment_signature(...)`).
    3.  **If Valid**:
        *   Update the database (Supabase) to set the user's/school's `subscription_status` to `'active'`.
        *   Return `{ "status": "success" }`.
    4.  **If Invalid**: Raise an HTTP 400 Bad Request error.

### 2.3 Integrated Frontend Flow (Next.js)
1.  **User Action**: User clicks "Buy Now" on the Pricing Page.
2.  **Order Creation**: Frontend calls `POST /api/v1/payments/create-order`.
3.  **Razorpay Checkout**:
    *   Frontend initializes `window.Razorpay(options)`.
    *   Pass the `order_id` received from backend.
    *   `handler`: This function triggers on successful payment.
4.  **Verification**:
    *   Inside the `handler`, capture the response (`payment_id`, `signature`).
    *   Call Frontend `POST /api/v1/payments/verify-payment` with these details.
5.  **Success**: On success response from backend, redirect user to Dashboard.

---

## Phase 3: Production Readiness & Deployment

**Goal:** Secure the application and deploy it for live traffic.

### 3.1 Environment Configuration
Create a `.env` file in the `backend/` directory with the following keys:

```ini
# Server Options
PORT=8000
ENVIRONMENT=production

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh... (Required for updating subscription status securely)

# Frontend URL (For CORS)
FRONTEND_URL=https://your-school-app.vercel.app
```

### 3.2 Security Checklist
*   **Deprecate Test Keys**: Switch all Razorpay keys from Test (`rzp_test_...`) to Live (`rzp_live_...`).
*   **CORS**: Update `allow_origins` in `main.py` to ONLY allow your production frontend domain.
*   **Service Role Safety**: Ensure `SUPABASE_SERVICE_ROLE_KEY` is never exposed in logs or client-side code.

### 3.3 Deployment Steps
1.  **Containerize**: (Optional) Create a `Dockerfile` for the FastAPI app.
2.  **Host**: Deploy to a platform like **Railway**, **Render**, or **AWS Lambda**.
3.  **HTTPS**: Ensure the backend is served over HTTPS to prevent signature tampering.
4.  **Webhooks (Optional)**: Configure Razorpay Webhooks as a backup to handle payments where the frontend might close before verification completes.

---

## Summary of Post-Payment Logic
Validation is the critical step. The backend **must not** trust the frontend saying "payment successful".
1.  The frontend sends the *signature*.
2.  The backend *mathematically validates* that the signature was generated by Razorpay using your Secret Key.
3.  **Only then** does the backend connect to the Database (Supabase) and upgrade the user's plan.
