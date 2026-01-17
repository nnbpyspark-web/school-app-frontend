# 🎨 UI/UX Guidelines

## 1. Design Philosophy
The application follows a **"Modern & Minimal Institute"** aesthetic. It must feel professional, trustworthy, educational, and premium.
- **Keywords**: Clean, Structured, Academic, Trustworthy, Modern.
- **Inspiration**: Linear, Vercel, Modern SaaS dashboards.

## 2. Color Palette
Use these CSS variables globally to maintain consistency.

### Primary Colors
- **`--primary` (#2563EB)**: Main brand color. Used for primary buttons, active states, and links.
- **`--primary-dark` (#1E40AF)**: Hover state for primary actions.
- **`--primary-light` (#60A5FA)**: Accents and subtle highlights.

### Neutral Colors
- **`--bg-body` (#F8FAFC)**: Main application background (Off-white/slate-50).
- **`--bg-card` (#FFFFFF)**: Container background (White).
- **`--text-main` (#0F172A)**: Primary text color (Slate-900).
- **`--text-muted` (#64748B)**: Secondary text, captions (Slate-500).
- **`--border` (#E2E8F0)**: Borders and dividers (Slate-200).

### Status Colors
- **Success**: `#10B981` (Emerald) - For active statuses, attendance present.
- **Error/Danger**: `#EF4444` (Red) - For delete actions, errors, absent.
- **Warning**: `#F59E0B` (Amber) - For pending actions, alerts.

## 3. Typography
**Font Family**: `Inter` (Google Font) or system sans-serif.
- **Headings**: Bold (`700`), Dark (`--text-main`).
- **Body**: Regular (`400`), Readable line-height (`1.5`).
- **Labels**: Medium (`500`), slightly smaller size (`0.875rem`).

## 4. Component Rules

### Buttons
- **Primary**: Solid background (`--primary`), White text, rounded corners (`--radius-md`).
  - *Hover*: slight darkening (`--primary-dark`), `transform: translateY(-1px)`.
- **Secondary**: Outline (`1px solid --border`), White bg, Dark text.
  - *Hover*: `bg-slate-50`.
- **Ghost**: Transparent bg.
  - *Hover*: `bg-slate-100`.

### Cards & Containers
- **Style**: White background, `1px solid --border`, Box Shadow (`--shadow-sm`).
- **Padding**: Generous padding (`24px` / `1.5rem`) to create breathing room.
- **Radius**: `8px` (`--radius-md`).

### Forms
- **Inputs**: Clean borders (`--border`), focus ring (`--primary-light` glow).
- **Labels**: Always visible, bold, placed above input.
- **Validation**: Inline error messages in Red (`text-sm`).

## 5. Interaction & Motion
Motion should be subtle and enhance the feel of "responsiveness".
- **Hover Effects**: All interactive elements must have a hover state.
- **Transitions**: Use `transition: all 0.2s ease-in-out` for generic state changes.
- **Page Transitions**: Soft fade-in for page loads.
- **Loading**: Use **Skeleton Loaders** (Shimmer effect) instead of generic spinners for content.

## 6. Layout Principles
- **Sidebar Layout**: Fixed sidebar on the left (`250px`), scrollable main content area.
- **Max Width**: specific max-width (`1200px`) for dashboard content to prevent "stretching" on huge screens.
- **Grid System**: Use CSS Grid for dashboard widgets (Auto-fit/Auto-fill).

## 7. Accessibility
- **Contrast**: Ensure text passes WCAG AA standards.
- **Focus**: Never remove outline on focus unless replacing with a custom focus ring.
- **Semantic HTML**: Use `<header>`, `<main>`, `<nav>`, `<button>` correctly.
