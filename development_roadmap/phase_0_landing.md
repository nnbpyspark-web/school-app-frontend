# Phase 0: Project Setup & Public Landing Website

## 1. Goal
Initialize the Next.js application, establish the global design system, and build the high-quality public-facing marketing pages that serve as the entry point for users.

## 2. Technical Initialization (Moved from Phase 1)
1. **Next.js Setup**:
   ```bash
   npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --import-alias "@/*"
   ```
   *Rationale: We need the framework running to build the landing pages.*
2. **Global CSS Variables (`globals.css`)**:
   Define the Core Design System here. Focus on "Premium Institute" aesthetics (Deep Blues, Clean Whites, Subtle Shadows).
   *See Phase 1 for specific variable reference, but implement them now.*

## 3. Public Pages Implementation
All public pages should reside in the root `app/` directory (e.g., `app/page.tsx`, `app/features/page.tsx`).

### 3.1 Home Page (Landing Page) - `src/app/page.tsx`
**Design Philosophy**: High impact, smooth scroll, engaging typography.
- **Navbar**: Sticky top bar.
  - Links: Home, Features, Pricing, Contact.
  - **CTA**: "Login" (Secondary style), "Get Started" (Primary style) -> Links to `/auth/signup`.
- **Hero Section**:
  - H1: "Transform Your Institute's Digital Journey."
  - Subtext: "The all-in-one platform for schools, coaching centers, and educators."
  - Primary CTA: "Start for Free" -> Links to `/auth/signup`.
  - Visual: Abstract clean graphic or UI mockup of the dashboard (use `generate_image` or placeholders).
- **"How it Works" Steps**: 3-step icon grid (Register -> Add Students -> Manage).
- **Footer**: Standard links (Privacy, Terms, Contact).

### 3.2 Features Page - `src/app/features/page.tsx`
**Purpose**: detailed breakdown of capabilities.
- Sections for:
  - **Student Management**: "Track every detail."
  - **Attendance**: "Digital marking in seconds."
  - **Communication**: "Seamless announcements."
- **Design**: Alternating layout (Text Left/Image Right -> Text Right/Image Left).

### 3.3 Pricing Page (UI Only) - `src/app/pricing/page.tsx`
**Purpose**: Display plans (Basic vs Pro).
- **Cards**:
  - **Basic**: "Free" or Low cost. List basic features.
  - **Pro**: "Premium". List advanced features.
- **Buttons**:
  - "Choose Plan" -> Links to `/auth/signup?plan=basic` or `/auth/signup?plan=pro`.
  - *Note*: Actual payment processing is handled in Phase 5. For now, this just passes a query parameter to the signup flow.

## 4. UI/UX Requirements
- **Micro-animations**: Use simple CSS `hover` effects on cards (lift up) and buttons (scale).
- **Responsive**: Must look perfect on Mobile (Hamburger menu for Navbar).
- **Fonts**: Integrate a premium font like 'Inter' or 'Outfit' via `next/font`.

## 5. Deliverables
- [ ] Project initialized & running.
- [ ] Global CSS variables defined.
- [ ] Responsive Navbar & Footer.
- [ ] High-conversion Landing Page.
- [ ] Features & Pricing pages created.
- [ ] "Get Started" buttons link to `/auth/signup`.

## 6. Connection to Next Phase
Users arriving at the Landing Page need a place to go. Clicking "Get Started" will lead them to the **Authentication** screens, which we will build in Phase 1.
