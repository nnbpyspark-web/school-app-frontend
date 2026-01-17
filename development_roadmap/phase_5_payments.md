# Phase 5: SaaS Monetization & Payments

## 1. Goal
Transform the tool into a viable business by gating access behind a subscription model. We will use FastAPI to handle secure Payment Gateway interactions (e.g., Stripe/Razorpay) and Webhooks.

## 2. Backend Implementation (FastAPI)

### 2.1 Subscription Schema
- **Table**: `subscriptions`
  - `id`, `school_id`, `plan_id` (Basic/Pro), `status` (active/past_due), `current_period_end`.

### 2.2 Payment Routes (`routers/payments.py`)
1. **Initialize Payment**: `POST /api/v1/payments/create-session`
   - Receives `plan_id` and `school_id`.
   - Calls Payment Provider API to create a checkout session.
   - Returns the Checkout URL to frontend.

2. **Webhook Handling**: `POST /api/v1/payments/webhook`
   - Listens for events (e.g., `payment.succeeded`).
   - Verifies signature.
   - Updates `schools` table (`subscription_status = 'active'`) and `subscriptions` table.

## 3. Frontend Implementation

### 3.1 Pricing Page (Update)
- The Public Pricing Page (`/pricing`) was created in **Phase 0** as a UI shell.
- **Action**: Connect the "Choose Plan" buttons to the backend (`/api/v1/payments/create-session`) or pass the plan ID to the Signup flow if the user is new.
- **UI Update**: If a user is logged in, the button should immediately launch the Stripe Checkout. If not, redirect to `/auth/signup`.

### 3.2 Access Control (Middleware)
- Update Next.js Middleware.
- Check `subscription_status` on login.
- If 'inactive', redirect to `/dashboard/billing` or restrict write access.

### 3.3 Billing Portal (`/dashboard/billing`)
- View current plan.
- Button to "Manage Subscription" (links to Stripe Customer Portal or similar).

## 4. Testing Payments
- Use "Test Mode" credentials of the Payment Gateway.
- Simulate successful and failed payments.

## 5. Deliverables
- [ ] Subscription tables in DB.
- [ ] Payment initiation endpoint in FastAPI.
- [ ] Webhook listener updating DB status.
- [ ] Frontend gating logic (No Pay = No Access).

## 6. Connection to Next Phase
The core product is finished and sellable. Phase 6 focuses on "finishing touches"—ensuring the app feels premium, loads fast, and is ready for production deployment.
