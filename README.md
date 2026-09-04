# Input Components

A collection of custom, reusable Angular input components and utilities — built from scratch to explore real-world form UX problems (async validation, OTP entry, recursive tree selection, and more) rather than relying on a component library.

Built with **Angular 18** (standalone components, new `@for`/`@if` control-flow syntax) and **RxJS**.

## Components

- **OTP Input** — Multi-box one-time-password input with auto-focus on type, backspace-to-previous navigation, numeric-only entry, and paste support.
- **Nested Checkbox** — Recursive tree checkbox that propagates state both ways: checking a parent checks all children, and a parent auto-checks when every child is checked.
- **File Path** — Expandable/collapsible file-tree view for displaying nested directory structures.
- **Unique-Value Input** — Text input with async, debounced validation against a backend check (e.g. confirming a value isn't already taken), built on a reusable `asyncUniqueValidator` utility.

## Directives

- **`renderWhen`** — A structural directive built from scratch as a `*ngIf` replica, for understanding how Angular's template/view container APIs work under the hood.
- **`trackVisibility`** — Uses `IntersectionObserver` + RxJS to emit an event when an element has stayed visible in the viewport for a set duration (useful for "seen" / impression tracking).

## Getting Started

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Tech Stack

- Angular 18 (standalone components)
- RxJS
- TypeScript
- Reactive Forms
