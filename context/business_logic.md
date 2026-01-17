# Business Logic & Rules

## 1. Multi-Tenancy (Schools)
- **Concept**: Each user belongs to a "School". A School is the tenant.
- **Rule**: Users (Admins) can ONLY see data (students, batches, etc.) associated with their `school_id`.
- **Implementation**: Enforced via PostgreSQL RLS policies checking `auth.uid() -> profiles.school_id`.

## 2. Authentication & Roles
- **System**: Supabase Auth (Email/Password).
- **Structure**:
    - `auth.users`: Core identity.
    - `public.profiles`: Extended profile linking User <-> School.
- **Roles**: Currently supports `school_admin`. Future scope includes `teacher` and `student`.

## 3. Subscription Model (SaaS)
- **Free Trial**: New schools start as active but may have limits (logic TBD).
- **Plans**:
    - **Basic**: Entry-level features.
    - **Pro**: Includes Media Uploads, Unlimited Students.
- **Access Control**:
    - If `subscription_status` is not `active`, the system should restrict access (Middleware implementation pending rigorous enforcement, currently visual indicators).

## 4. Academic Data
- **Batches**: A student can belong to one or more batches (Many-to-Many via `student_batches`).
- **Attendance**:
    - One record per Student per Batch per Date.
    - Statuses: `present`, `absent`, `excused`.
- **Assignments**:
    - Linked to a specific Batch.
    - Contains an optional File Attachment (managed via FastAPI).

## 5. File Handling
- **Constraint**: Files are user-specific but viewable by anyone in the school with the link (currently public URLs for simplicity, but RLS on storage bucket prevents unauthorized uploads).
- **Flow**: Frontend -> FastAPI (Admin Upload) -> Supabase Storage -> URL returned to Frontend -> Saved in DB.
