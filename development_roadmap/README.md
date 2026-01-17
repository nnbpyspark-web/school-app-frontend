# Institute Management SaaS Development Roadmap

## 1. Project Overview
This project is a multi-tenant SaaS application designed for educational institutes (Schools, Coaching Centers). It allows institutes to manage their Students, Batches, Attendance, and Announcements digitally.

## 2. Technology Stack
- **Frontend**: Next.js (App Router, TypeScript)
- **Styling**: Vanilla CSS (CSS Modules, Custom Design System)
- **Database & Auth**: Supabase
- **Backend Services**: FastAPI (Python) - *Specifically for File Uploads & Payments*

## 3. Development Phases
The development is divided into 6 distinct, sequential phases. Each phase builds upon the previous one.

| Phase | Title | Key Focus |
| :--- | :--- | :--- |
| - | [🎨 UI/UX Guidelines](./UI_UX_Guidelines.md) | **MANDATORY**: Design System & Style Guide. |
| **00** | [Landing Page & Setup](./phase_0_landing.md) | Project Setup, Design System, Public Website. |
| **01** | [Foundation & Auth](./phase_1_foundation.md) | Supabase Auth Integration, Login/Signup Flows. |
| **02** | [Core Data & User Management](./phase_2_core_data.md) | Database Schema, Multi-tenancy (Schools), Dashboards. |
| **03** | [Academic Management](./phase_3_academic.md) | Batches, Students, Attendance (The Core Features). |
| **04** | [Communication & Media](./phase_4_media_comm.md) | FastAPI Integration, File Uploads, Announcements. |
| **05** | [SaaS Monetization](./phase_5_payments.md) | Payments functionality via FastAPI, Subscriptions. |
| **06** | [Polish & Launch](./phase_6_polish.md) | Reporting, visual polish, SEO, Deployment. |

## 4. How to Use This Roadmap
1. **Sequential Execution**: Do not skip phases. Phase 2 relies on the Auth from Phase 1. Phase 3 relies on the School structure from Phase 2.
2. **Review Checklists**: Each phase file ends with a "Deliverables" section. Ensure all items are checked off before moving to the next.
3. **UI/UX Consistency**: Refer to Phase 1's "Design System" section whenever creating new UI elements to maintain the premium institute aesthetic.

## 5. Development Flow
1. **Start** by setting up the codebase and building the Public Website (`Phase 0`).
2. **Implement** Authentication to allow users to sign up from the website (`Phase 1`).
3. **Build** the database structure that defines a "School" (`Phase 2`).
3. **Implement** the daily usage features (`Phase 3`).
4. **Connect** the heavy-duty backend services (`Phase 4` & `5`).
5. **Refine** and Ship (`Phase 6`).
