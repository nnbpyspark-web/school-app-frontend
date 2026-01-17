# Coding Standards

## 1. Code Style
- **Indentation**: 4 Spaces.
- **Quotes**: Double quotes `"` preferred for strings/JSX attributes.
- **Semicolons**: Optional (Standard JS/TS style), but consistency is key. Currently mixed, prefer NO semicolons given recent snippets.

## 2. Components (React)
- **Functional Components**: Use `export default function ComponentName() {}`.
- **Client vs Server**:
    - Default to Server Components.
    - Add `"use client"` at the top creating interactive components (hooks, event listeners).
- **Naming**: PascalCase (e.g., `Sidebar.tsx`).

## 3. TypeScript
- **Types**: Use specific types over `any` where possible.
- **Interfaces**: Define interfaces for DB tables (e.g., `Student`, `Batch`).

## 4. CSS / Styling
- **Tailwind**: Use utility classes.
- **Overrides**: Use `style={{}}` only for dynamic values that Tailwind cannot handle easily or for rapid prototyping.

## 5. Comments
- Explain "Why", not "What".
- Use JSDoc for complex functions.
