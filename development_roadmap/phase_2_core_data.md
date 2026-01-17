# Phase 2: Core Data & User Management

## 1. Goal
Implement the multi-tenant architecture, allowing distinct "Schools" to exist with isolated data, and create the Dashboard skeletons for both Platform Admin and School Admin.

## 2. Technical Implementation

### 2.1 Database Schema (Multi-tenancy)
We need a structure where every piece of data belongs to a `school_id`.

**New Tables:**
1. **`schools`**:
   - `id` (UUID, PK)
   - `name` (Text)
   - `slug` (Text, unique - for potential subdomains/IDs)
   - `logo_url` (Text)
   - `created_at` (Timestamp)
   - `subscription_status` (Text: 'active', 'inactive')

2. **`user_roles` (Update to Profile)**:
   - Add `school_id` FK to `public.profiles`.
   - This links a logged-in user to a specific school.

**Row Level Security (RLS) is Critical:**
- **`schools`**: Readable by members of that school (or Super Admin).
- **Generic Policy**: `auth.uid() IN (SELECT user_id FROM profiles WHERE school_id = current_table.school_id)` (Conceptual).

### 2.2 Onboarding Flow
- **After Signup**: User is redirected to `/onboarding`.
- **Create School Form**: User enters "School Name".
- **Backend Action**:
  - Creates a row in `schools`.
  - Updates user's `profile` with the new `school_id`.

### 2.3 Dashboard Layouts
**Platform Admin (Super Admin)** (`/admin`):
- Sidebar: Schools, Settings.
- View: List of all registered schools.

**School Admin** (`/dashboard`):
- Sidebar: Dashboard, Batches, Students, Attendance, Announcements.
- **Top Bar**: School Name & User Profile.
- **Visuals**: Clean, white sidebar or dark sidebar (var `--bg-sidebar`), with active states using `--primary-light` (low opacity).

### 2.4 Profile Management
- **School Settings Page**: Edit School Name, Address.
- **Design Requirement**: Use "Card" components with ample padding (`24px`) and subtle shadows (`--shadow-sm`).

## 3. Key Components
- `SidebarNavigation`: Responsive sidebar.
- `DataGrid`: Reusable table component for listing schools/users (Vanilla CSS grid/flex).
- `StatusBadge`: CSS component for 'Active' (Green) / 'Inactive' (Red) states.

## 4. Deliverables
- [ ] Database Table `schools` created.
- [ ] RLS Policies enforced (User A cannot query User B's school).
- [ ] Onboarding flow linking User -> School.
- [ ] Dashboard Shell (Layout) implemented.

## 5. Connection to Next Phase
Now that we have "Schools" and "Users" configured, Phase 3 will populate the dashboards with the actual day-to-day academic data (Students, Batches).
