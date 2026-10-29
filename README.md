# Noesis Hub

Noesis Hub is a modern e-class platform designed for an academic community, bringing course management, study sessions, assessments, and AI Tutors with guardrails into one learning environment.

Developed as a thesis project, the platform aims to support learning through guided assistance and clear educational boundaries.

## Platform scope

- Student dashboard and profile.
- Courses and learning materials.
- Study sessions and calendar.
- Assignment submissions and quizzes.
- AI Tutors, including Sofoula, the owl tutor.
- English and Greek interface options, with English as the default for new users.

## AI Tutors and guardrails

AI Tutors with guardrails are a core part of the platform's intended design. Planned guardrails include keeping assistance within the selected course context, grounding explanations in approved learning materials, and encouraging understanding rather than completing assessed work on a student's behalf.

These are design goals, not verified capabilities of the current prototype. The current tutor uses predefined, rule-based responses. A model integration, server-side guardrail enforcement, and evaluation of those guardrails remain to be implemented.

## Current implementation

The repository currently contains a React and Vite frontend prototype with sample data. Sign-in is a demonstration flow without authentication, assignment submissions are simulated locally, and tutor replies are predefined. The prototype does not yet include a backend or a connection to an AI service.

## Run locally

Install Node.js and npm. The initial version was checked with Node.js 24.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite in your terminal.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The production build is generated in `dist`. The preview command serves that build locally.

## Project structure

- `src/`: React pages, components, layouts, translations, and styles.
- `public/`: public static assets.
- `package-lock.json`: locked dependency versions.

Dependencies, build output, and local environment files are excluded from Git. The written thesis documents are maintained separately from this platform repository.
