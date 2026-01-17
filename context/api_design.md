# API Design

## 1. Supabase (Standard REST/Graph)
The majority of the app uses the auto-generated PostgREST API provided by Supabase.
- **Resource**: Tables (`students`, `batches`, `attendance`, etc.)
- **Endpoints**: Not explicit; accessed via JS Client (`supabase.from(...)`).
- **Security**: Handled by RLS.

## 2. FastAPI (Custom Microservice)
Base URL: `http://localhost:8000/api/v1`

### Media
- **POST** `/media/upload`
    - **Headers**: `Authorization: Bearer <token>`
    - **Body**: `multipart/form-data` { `file`: binary }
    - **Response**: `{ "url": "https://..." }`

### Payments
- **POST** `/payments/create-checkout-session`
    - **Body**: `{ "plan_id": "pro", "school_id": "uuid" }`
    - **Response**: `{ "url": "https://checkout.stripe.com/..." }`
- **POST** `/payments/webhook`
    - **Headers**: `Stripe-Signature`
    - **Body**: Raw Stripe Event
    - **Response**: `{ "status": "success" }`
