# System Architecture

## High-Level Diagram
```mermaid
graph TD
    User[Browser / Client] -->|Next.js App Router| Frontend[Frontend (Next.js)]
    
    subgraph "Supabase / Data Layer"
        Auth[Supabase Auth]
        DB[(PostgreSQL)]
        Storage[Object Storage]
    end
    
    subgraph "Backend Services"
        FastAPI[Python FastAPI]
        StripeAPI[Stripe API]
    end
    
    %% Connections
    Frontend -->|Auth / CRUD| Auth
    Frontend -->|Direct DB Access (RLS)| DB
    Frontend -->|Read Files| Storage
    
    Frontend -->|File Uploads / Checkout| FastAPI
    
    FastAPI -->|Admin Write| DB
    FastAPI -->|Upload Files| Storage
    FastAPI -->|Create Session / Webhook| StripeAPI
```

## Description
The architecture follows a hybrid approach: **Serverless-First** combined with a **Microservice**.

### 1. Frontend (Next.js)
- Acts as the primary interface.
- Utilizes **Direct Database Access** via Supabase client for 90% of operations (CRUD on Students, Batches, Attendance, Announcements).
- **Security**: Relies heavily on **Row Level Security (RLS)** policies in PostgreSQL to ensure users only access their own school's data.

### 2. Backend Service (FastAPI)
- A separate Python service running on port 8000.
- **Why?** To handle "heavy lifting" or sensitive operations like:
    - **File Uploads**: Validating and uploading binaries to Supabase Storage using the Service Role.
    - **Payments**: Creating Stripe Checkout sessions and handling Webhook verification (signature validation).
- Connects to Supabase using the `service_role` key (Admin access) to bypass RLS when necessary (e.g., updating subscription status via webhook).

### 3. Database (Supabase / PostgreSQL)
- The single source of truth.
- **Multi-tenancy**: Implemented via a `school_id` column on almost every table. RLS policies enforce tenant isolation.

### 4. Storage
- **Bucket**: `media`
- **Structure**: `{user_id}/{filename}`
- Used for assignment attachments.
