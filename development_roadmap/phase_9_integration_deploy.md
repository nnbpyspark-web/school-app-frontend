# Phase 9: Frontend Integration & Deployment

## 1. Goal
Connect the Next.js frontend to the new Razorpay backend endpoints and prepare the entire system for a production release.

## 2. Frontend Implementation

### 2.1 Razorpay Script
- **Load Script**: Dynamically load `https://checkout.razorpay.com/v1/checkout.js` in the React component (e.g., `useScript` hook or simple standard logic).

### 2.2 Payment Flow (Billing Page)
- **User Action**: Click "Upgrade" button.
- **Step 1 (Order)**:
    - User clicks button -> Call `POST /create-order`.
    - Receive `order_id` and `key`.
- **Step 2 (Checkout UI)**:
    - Initialize `options = { key, amount, order_id, handler: function(response){...} }`
    - Call `window.Razorpay(options).open()`
- **Step 3 (Verification)**:
    - Inside `handler(response)`:
    - Call `POST /verify-payment` with `response.razorpay_payment_id`, etc.
    - **On Success**: Show "Success" Toast/Modal and auto-refresh page (to reflect 'active' status).

### 2.3 User Experience
- **Loading States**: Show spinner while creating order.
- **Feedback**: Show distinct Success/Error messages based on Verification result.

## 3. Production Readiness

### 3.1 Key Swapping
- **Test Mode**: During dev, use `rzp_test_...`
- **Live Mode**: When deploying, switch `.env` vars to `rzp_live_...`.

### 3.2 Security Headers & CORS
- Ensure Backend CORS allow-list strictly matches the Production Frontend Domain (e.g., `https://my-school-app.vercel.app`).

### 3.3 Deployment
- **Backend**: Deploy FastAPI to Railway/Render.
- **Frontend**: Deploy Next.js to Vercel.
- **Env Vars**: Add all keys (Supabase, Razorpay) to the deployment platform's environment variables settings.

## 4. Deliverables
- [ ] Billing Page fully functional with Razorpay popup.
- [ ] Successful payment upgrades the user instantly.
- [ ] Production-ready configuration.

## 5. Connections
- Completion of this phase marks the end of the Payment Feature migration.
