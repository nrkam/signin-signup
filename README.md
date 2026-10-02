# Sign In / Sign Up — Fullstack Auth SPA

A fullstack single-page application with user registration and login. The React + TypeScript frontend talks to a Node.js/Express API that issues JWT tokens and stores passwords as bcrypt hashes.

**Live demo:** [Open live site](https://signin-signup-ohda.vercel.app/) 

<img src="https://github.com/nrkam/signin-signup/blob/main/frontend/scrins/2026-08-20_13-43-28.png" width="500"> 

## Features

- Registration and login with client-side form validation (Formik + Yup)
- Password hashing with bcrypt, stateless authentication with JWT
- Protected routes: unauthenticated users are redirected to the sign-in page
- Global auth state managed with Redux Toolkit
- Clear error messages for invalid credentials and already-registered emails

## Tech stack

| Layer    | Technologies                                        |
| -------- | --------------------------------------------------- |
| Frontend | React, TypeScript, Vite, Redux Toolkit, Formik, Yup |
| Backend  | Node.js, Express, JWT, bcrypt                       |

## Project structure

```
signin-signup/
├── backend/    # Express API: routes, controllers, auth middleware
└── frontend/   # React app: pages, components, Redux store
```

## Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/nrkam/signin-signup.git
cd signin-signup
```

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

**Frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

### Environment variables

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `PORT`       | Port the API listens on              |
| `JWT_SECRET` | Secret used to sign JWT tokens       |
| `<other>`    | <database URL, token lifetime, etc.> |


| Method | Endpoint             | Description                    | Auth |
| ------ | -------------------- | ------------------------------ | ---- |
| POST   | `/api/auth/register` | Create a new user              | No   |
| POST   | `/api/auth/login`    | Log in and receive a JWT       | No   |
| GET    | `/api/auth/me`       | Get the current user's profile | Yes  |

## How authentication works

1. On sign up, the password is hashed with bcrypt before being stored.
2. On sign in, the server verifies the password and returns a signed JWT.
3. The frontend keeps the token in the Redux store and sends it in the `Authorization: Bearer <token>` header.
4. Express middleware verifies the token on protected routes.

## Roadmap

- [ ] Refresh tokens and httpOnly cookies
- [ ] Unit and integration tests (Vitest, React Testing Library, Supertest)
- [ ] CI with GitHub Actions (lint, test, build)
- [ ] Docker setup

## Author

**Kamila Nurullina** — junior frontend developer (React, TypeScript), Moscow
GitHub: [@nrkam](https://github.com/nrkam)
