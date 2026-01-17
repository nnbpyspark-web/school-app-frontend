# 🏫 Institute Management SaaS  
## Product Requirement Document (PRD)

---

## 1. Product Overview

The **Institute Management SaaS** is a cloud-based platform designed to help **schools, coaching centers, and training institutes** manage their daily academic operations digitally.

The platform enables institutes to:
- Manage students and batches
- Track daily attendance
- Share announcements and assignments
- View basic reports
- Operate as a SaaS where each school is an independent customer

This is a **multi-tenant SaaS**, where multiple schools use the same platform while their data remains completely isolated.

---

## 2. Target Users

### 2.1 Platform Admin (Super Admin)
- Owner of the SaaS platform
- Manages all registered schools
- Controls access and activation

### 2.2 School Admin
- Admin of an individual school/institute
- Manages all school-level operations
- No visibility into other schools

---

## 3. Public Website (Landing Pages)

### 3.1 Home Page (Landing Page)

**Purpose:**  
Explain the product and encourage schools to sign up.

**Sections:**
- Hero section with product tagline
- Brief description of what the platform does
- “How it works” section
- Features overview
- Pricing section
- Call-to-action buttons (Get Started / Login)

---

### 3.2 Features Page

**Purpose:**  
Explain platform capabilities clearly.

**Key Features Highlighted:**
- School profile management
- Batch & class management
- Student management
- Attendance tracking
- Announcements & academic content
- Reports & dashboards

---

### 3.3 Pricing Page

**Purpose:**  
Display available plans.

**Details:**
- Plan name (Basic / Pro)
- Features included
- “Choose Plan” button

> Note: Payment flow can be temporary or mocked for MVP.

---

## 4. Authentication & Access Flow

- Schools sign up using email and password
- After signup, access is restricted until a plan is activated
- Once payment is completed (or approved), access is granted to the dashboard

---

## 5. Platform Admin Dashboard (Super Admin)

### Purpose
Allow the platform owner to manage all schools using the SaaS.

### Features

#### Dashboard Overview
- Total number of schools
- Active schools
- Inactive schools
- Recently registered schools

#### School Management
- View list of all schools
- View school details
- Activate or deactivate schools
- Monitor subscription status

---

## 6. School Admin Dashboard

Each school gets its own private dashboard after login and activation.

---

### 6.1 Dashboard Overview

**Purpose:**  
Give a snapshot of school activity.

**Widgets:**
- Total students
- Total batches
- Today’s attendance summary
- Latest announcements

---

### 6.2 School Profile Management

**Features:**
- Add/edit school name
- Upload school logo
- Update address and contact details

---

### 6.3 Batch / Class Management

**Features:**
- Create batches/classes
- Edit batch details
- Assign students to batches
- View batch-wise student list

---

### 6.4 Student Management

**Features:**
- Add students
- Edit student details
- Assign students to batches
- Activate/deactivate students
- View complete student list

---

### 6.5 Attendance Management

**Purpose:**  
Track daily attendance digitally.

**Features:**
- Select batch
- Select date
- Mark students as Present / Absent
- Save attendance records
- View past attendance by date or batch

---

## 7. Academic Management (Lightweight)

### 7.1 Academic Content / Assignments

**Purpose:**  
Share academic materials and tasks.

**Features:**
- Create academic content or assignment
- Add title and description
- Assign to specific batch
- Upload reference file (optional)
- View list of created items

---

## 8. Communication Module (Announcements)

### Purpose
Enable institutes to communicate important updates clearly and centrally.

---

### 8.1 Announcement Features

- Create announcement
- Title + message body
- Optional batch selection
- View all announcements in dashboard
- Display latest announcement on dashboard

---

### 8.2 Announcement Message Examples

#### Example 1: General Announcement
**Title:** Holiday Notice  
**Message:**  
Tomorrow (15th August) will be a holiday on account of Independence Day. Regular classes will resume from Monday.

---

#### Example 2: Attendance Reminder
**Title:** Attendance Reminder  
**Message:**  
All students are requested to maintain regular attendance. Attendance will be strictly monitored from this week onwards.

---

#### Example 3: Assignment Announcement
**Title:** New Assignment Uploaded  
**Message:**  
A new assignment has been uploaded for the AI Batch. Please check the Academic section and submit before Friday.

---

#### Example 4: Fee Reminder (Informational Only)
**Title:** Fee Payment Reminder  
**Message:**  
This is a reminder to clear any pending fees at the earliest. Please contact the office for details.

---

#### Example 5: Exam / Test Update
**Title:** Weekly Test Announcement  
**Message:**  
A weekly test will be conducted this Saturday for all students of Batch B. Please be prepared.

---

## 9. Reports & Insights (Basic)

**Purpose:**  
Provide visibility without complexity.

**Reports Included:**
- Total student count
- Batch-wise student count
- Today’s attendance percentage
- List of absent students (today)

---

## 10. Data Isolation (Product Concept)

- Each school can view and manage only its own data
- No school can see another school’s students, batches, or attendance
- Platform admin has only school-level visibility

---

## 12. Success Criteria

The product is considered successful if:
- Schools can sign up and log in
- Schools can manage students, batches, attendance, and announcements
- Platform admin can manage schools
- Data is isolated per school
- The platform works as a true SaaS

---

## 13. Future Enhancements (Post-MVP)

- Fee collection and invoices
- Teacher and student portals
- Parent access
- Advanced reports
- Mobile app
- Notification integrations

---

## 14. Summary

This Institute Management SaaS is:
- A real multi-tenant SaaS product
- Simple, scalable, and production-ready
- Focused on daily institute operations
- Ideal for teaching full-stack SaaS product thinking

---
