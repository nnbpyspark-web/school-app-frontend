# Phase 4: Communication, Media & Backend Integration

## 1. Goal
Integrate the FastAPI backend to handle "heavy lifting" tasks—specifically File Uploads and Media Management—and build the Communication (Announcements) and Assignments modules.

## 2. Backend Implementation (FastAPI)

### 2.1 Service Setup
1. Create a folder `backend/`.
2. Initialize a Python FastAPI project.
   - `main.py`: Entry point.
   - `routers/media.py`: File handling.
3. **Run Script**: `uvicorn main:app --reload`.

### 2.2 Media Upload Endpoint
- **Function**: Accepts file binary.
- **Process**:
  1. Validates file type/size.
  2. Uploads to **Supabase Storage** (using `supabase-py` admin client) or AWS S3.
  3. Returns the public URL.
- **Endpoint**: `POST /api/v1/upload`
- **Security**: Validate JWT token from the request header (Supabase Auth Token) to ensure user belongs to the correct school.

## 3. Frontend Implementation

### 3.1 Announcements (`/dashboard/announcements`)
- **Table**: `announcements`
  - `title`, `message`, `target_batch_id` (nullable, null = all), `school_id`.
- **UI**: A bulletin board style layout.
- **Create Flow**: Form to post updates.

### 3.2 Assignments (`/dashboard/academic`)
- **Table**: `assignments`
  - `title`, `description`, `file_url`, `batch_id`, `school_id`.
- **Upload Feature**:
  - User selects file.
  - Frontend calls `POST` to FastAPI Endpoint.
  - FastAPI returns URL.
  - Frontend saves Assignment record with URL to Supabase.

## 4. UI/UX Focus
- **Upload State**: Show a progress bar or spinner while FastAPI processes the file.
- **Empty States**: If no announcements exist, show a friendly illustration or text ("No news is good news!").

## 5. Deliverables
- [ ] FastAPI Service running locally on port 8000.
- [ ] `/upload` endpoint functional.
- [ ] Announcements Module complete.
- [ ] Assignment creation with file attachment working.

## 6. Connection to Next Phase
The system is now fully functional operationally. Phase 5 will implement the "SaaS" aspect—monetization—by integrating Payment Gateways via the same FastAPI backend.
