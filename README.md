# Sign In / Sign Up — Fullstack Auth App

A learning fullstack project: registration and login forms with JWT authentication, a protected dashboard, and session persistence across page reloads.

### Demo
![homepage](https://signin-signup-ohda.vercel.app/)
<img src="https://github.com/nrkam/signin-signup/blob/main/frontend/scrins/2026-08-20_13-43-28.png" width="500"> 

### Features
- **Registration** — Sign Up form (first name, last name, email, password) with real-time validation
- **Login** — Sign In form (email, password)
- **Protected `/dashboard` route** — accessible only to authenticated users, shows the name and email from the token, includes a Logout button
- **Automatic redirects**:
  - an authenticated user can't reach `/login` or `/register` — redirected to `/dashboard`
  - an unauthenticated user trying to open `/dashboard` — redirected to `/login`
  - any unknown path (`*`) redirects to `/dashboard` or `/register` depending on auth status
- **Persisted session** — token and user data are stored in `localStorage` via `redux-persist`, so a page refresh doesn't log you out
- **Client-side form validation** (Yup):
  - first and last name are required
  - email must be a valid format
  - password must be at least 8 characters
  - errors appear under the field once it's been touched
- **Server-side password hashing** with bcrypt — plaintext passwords never reach the database
- **JWT tokens** — issued on registration and login, valid for 1 day, used to access `/api/profile`
- **Automatic token attachment** — an Axios interceptor pulls the token from the persisted store and adds `Authorization: Bearer <token>` to every request
- **Social login placeholders** — Google / GitHub buttons are present in the UI (the OAuth logic itself isn't implemented yet — a placeholder for future work)
- **Reusable custom `InputField`** — a single input component handling label, error message, and invalid-state styling
- **Shared page layout** — a `Sidebar` component with a background image, logo, and tagline, shared by the Login and Register pages

### Tech Stack & Tools

### Frontend (`/frontend`)
- TypeScript
- React 19
- Vite
- React Router DOM v7
- Redux Toolkit + React Redux
- redux-persist
- Formik
- Yup
- Axios
- PostCSS + Autoprefixer
- Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
  
### Backend (`/backend`)
- Node.js
- Express 5
- bcryptjs
- jsonwebtoken (JWT)
- cors
- dotenv
- db.json

### API (backend)
| Method | Path | Description | Request body |
|---|---|---|---|
| `POST` | `/api/register` | Registers a new user, returns a JWT | `{ firstName, lastName, email, password }` |
| `POST` | `/api/login` | Logs in, returns a JWT | `{ email, password }` |
| `GET` | `/api/profile` | Returns the current user's data based on the token | header `Authorization: Bearer <token>` |

Passwords are hashed with `bcrypt.hash(password, 10)` before being stored. Tokens are signed with `jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })`.

---
© Nurullina Kamila, 2026
