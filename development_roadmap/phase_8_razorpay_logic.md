# Phase 8: Razorpay Integration & Logic

## 1. Goal
Implement the core payment logic using the Razorpay Python SDK. This includes creating orders, signing signatures, determining payment success, and updating the application database state accordingly.

## 2. API Endpoints

### 2.1 Create Order
- **Endpoint**: `POST /api/v1/payments/create-order`
- **Input**: `OrderRequest` (amount, currency, plan_id)
- **Logic**:
    1.  Initialize Razorpay Client: `razorpay.Client(auth=(KEY_ID, KEY_SECRET))`
    2.  Data Payload: `{ "amount": amount, "currency": "INR", "payment_capture": 1 }`
    3.  Call `client.order.create(data)`
    4.  Return `{ "order_id": "order_xyz...", "key": KEY_ID }`
- **Security Check**: Ensure `amount` corresponds to the actual Plan Price (don't trust frontend amount blindly in a real app, but for MVP we can Validate or Map internal prices).

### 2.2 Verify Payment
- **Endpoint**: `POST /api/v1/payments/verify-payment`
- **Input**: `VerificationRequest` (order_id, payment_id, signature)
- **Logic**:
    1.  Construct dictionary: `{ "razorpay_order_id": ..., "razorpay_payment_id": ..., "razorpay_signature": ... }`
    2.  **Signature Check**: `client.utility.verify_payment_signature(data)`
    3.  **On Success**:
        - Use Supabase Service Client.
        - Update `schools` table: SET `subscription_status = 'active'`.
        - (Optional) Record transaction in a `payments` table.
        - Return `{ "status": "success", "message": "Plan Activated" }`
    4.  **On Failure**:
        - Raise `HTTPException(400, "Invalid Signature")`.

## 3. Environment Variables (.env)
The backend must have access to:
- `RAZORPAY_KEY_ID`: Public key (safe to send to frontend).
- `RAZORPAY_KEY_SECRET`: Private key (NEVER share).
- `SUPABASE_SERVICE_ROLE_KEY`: For DB updates.

## 4. Deliverables
- [ ] Functional `create-order` endpoint returning valid Razorpay Order IDs.
- [ ] Functional `verify-payment` endpoint that correctly accepts or rejects signatures.
- [ ] Database logic that actually flips the user's status to 'active' upon success.

## 5. Connections
- Connects to **Phase 9** (Frontend Integration) where these endpoints will be consumed.
