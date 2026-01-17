# Phase 7: Backend Core - FastAPI Implementation

## 1. Goal
Establish the Python FastAPI backend to handle specialized tasks (Payments with Razorpay). This phase focuses purely on setting up the server, the environment, and the request models, ensuring a solid foundation before integrating external APIs.

## 2. Technical Requirements
- **Language**: Python 3.10+
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Validation**: Pydantic
- **Database Access**: Supabase Python Client (for user/subscription updates)

## 3. Implementation Steps

### 3.1 Environment & Dependencies
1.  Navigate to `backend/`.
2.  Update `requirements.txt` to include:
    ```txt
    fastapi
    uvicorn
    pydantic
    python-dotenv
    razorpay
    supabase
    ```
3.  Install dependencies: `pip install -r requirements.txt`

### 3.2 FastAPI Application Structure
1.  **Main Entry**: `main.py`
    - Initialize `FastAPI`.
    - Configure **CORS** middleware to allow requests from the frontend URL (`http://localhost:3000`).
2.  **Router Setup**: Create `routers/payments_razorpay.py`.
    - This keeps the payment logic separate from file upload logic.

### 3.3 Data Models (Pydantic)
Create a `models.py` or define inside the router to validate incoming JSON.
1.  **OrderRequest**:
    - `amount`: int (in lowest currency unit, e.g., paise)
    - `currency`: str (default "INR")
    - `plan_id`: str (e.g., "basic", "pro") - helpful for identifying what is being bought.
2.  **VerificationRequest**:
    - `razorpay_order_id`: str
    - `razorpay_payment_id`: str
    - `razorpay_signature`: str

### 3.4 Supabase Service Client
1.  Ensure the backend initializes a **Service Role** Supabase client.
2.  This is required because the backend needs to update the `schools` table (subscription status) which might be restricted by RLS for standard users.

## 4. Deliverables
- [ ] `backend/requirements.txt` updated.
- [ ] `backend/main.py` running with CORS configured.
- [ ] `backend/routers/payments_razorpay.py` created with basic placeholder endpoints.
- [ ] Pydantic models defined for robustness.

## 5. Connections
- Connects to **Phase 8** (Razorpay Integration) where the actual API logic will be implemented.
