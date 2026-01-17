# Naming Conventions

## 1. Files & Directories
- **React Components**: PascalCase (e.g., `DashboardWidgets.tsx`, `Sidebar.tsx`).
- **Pages (Next.js)**: `page.tsx` (Required).
- **Utilities**: camelCase (e.g., `supabaseClient.ts`, `utils.ts`).
- **Folders**: lowercase-dashed (e.g., `school-app`, `dashboard-widgets`) OR matching the route name (`dashboard`, `auth`).

## 2. Variables & Functions
- **Variables**: camelCase (`studentCount`, `isActive`).
- **Constants**: UPPER_SNAKE_CASE (`NEXT_PUBLIC_SUPABASE_URL`).
- **Functions**: camelCase (`fetchData`, `handleSubmit`).
- **React Hooks**: `use` prefix (`useState`, `useEffects`).

## 3. Database
- **Tables**: plural_snake_case (`students`, `batches`, `student_batches`).
- **Columns**: snake_case (`first_name`, `school_id`).
- **Foreign Keys**: `target_id` (e.g., `batch_id`).
