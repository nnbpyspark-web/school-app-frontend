# Phase 3: Academic Management Modules

## 1. Goal
Build the core operational features: managing Batches (Classes), Students, and daily Attendance. This is the primary value proposition for the users.

## 2. Database Schema Expansion

### 2.1 Batches
- **Table**: `batches`
  - `id` (UUID, PK)
  - `school_id` (FK)
  - `name` (e.g., "Class 10 - A")
  - `start_date`, `end_date`

### 2.2 Students
- **Table**: `students`
  - `id` (UUID, PK)
  - `school_id` (FK)
  - `full_name`
  - `email` (Optional)
  - `roll_number`
  - `status` ('active', 'inactive')

### 2.3 Student-Batch Enrollment
- **Table**: `student_batches` (Junction Table)
  - `student_id` (FK)
  - `batch_id` (FK)
  - `school_id` (FK) -- specific inclusion for easier RLS

### 2.4 Attendance
- **Table**: `attendance`
  - `id` (UUID)
  - `student_id` (FK)
  - `batch_id` (FK)
  - `date` (Date)
  - `status` ('present', 'absent', 'excused')
  - `school_id` (FK)

## 3. Frontend Implementation

### 3.1 Batch Management (`/dashboard/batches`)
- **List View**: Cards showing Batch Name + Student Count.
- **Create Modal**: Simple form to add a new batch.

### 3.2 Student Directory (`/dashboard/students`)
- **Searchable Table**: Filter by Batch.
- **Add Student**: Form with basic validation.
- **UI Details**: Use specific "Action Buttons" (Edit/Delete) with icon-only styles to keep UI clean.

### 3.3 Attendance Interface (`/dashboard/attendance`)
- **Selector**: Select Batch -> Select Date (Default: Today).
- **List**: List of students in that batch.
- **Interaction**: Toggle Switch or Buttons (Present/Absent).
  - *Micro-animation*: When clicked, the button pulses briefly or changes color smoothly (`transition: all 0.2s ease`).

## 4. Components required
- `Modal`: Reusable accessible modal for "Add New" actions.
- `ToggleSwitch`: Custom CSS checkbox for attendance status.
- `DatePicker`: Native or lightweight custom styled input.

## 5. Deliverables
- [ ] CRUD operations for Batches.
- [ ] CRUD operations for Students.
- [ ] Ability to assign students to batches.
- [ ] Attendance marking interface is functional and saves to DB.

## 6. Connection to Next Phase
With the core data structure in place, Phase 4 will introduce the external Backend service (FastAPI) to handle more complex tasks like File Uploads for assignments and communication features.
