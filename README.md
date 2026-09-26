# FitLog

A simple workout tracking website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse workouts
- View workout details
- Add workouts to My Plan
- Save workouts for later
- Mark workouts as completed
- Store user data in `localStorage`
- Responsive UI

## Tech Stack

- Next.js
- TypeScript
- React Context API
- Tailwind CSS
- REST API
- localStorage

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```text
src/
├── app/
├── components/
├── context/
└── types/
```

The main workout state is managed through `WorkoutContext`.

## Data

Workout information comes from the FitLog API. User-specific data such as plan, saved, and completed workouts are kept in the browser using `localStorage`.

## Build

```bash
npm run build
npm start
```
