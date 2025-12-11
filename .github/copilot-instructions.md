# Admin Panel - Copilot Instructions

## Architecture Overview

This is a React admin panel application using **Create React App** with the following key characteristics:

- **Routing**: React Router v7 with nested routes via `Outlet` pattern (see `App.js`)
- **State Management**: React Context API for auth (not Redux)
- **Authentication**: Custom `Authprovider` context managing `accessToken` and `admin` user data
- **Styling**: Tailwind CSS + PostCSS for utility-first styling
- **API Client**: Axios instance with centralized header management in `utils/api.js`
- **Backend**: Uses **MockAPI** (https://mockapi.io/) for all data - admin login, applications, case studies, contacts

## Project Structure

- `src/components/` - React components:
  - `Login.jsx` - Auth entry point; uses MockAPI for admin credentials
  - `ProtectedRoute.jsx` - Route wrapper checking `accessToken` presence
  - `Authcontext.jsx` - Auth context with `useAuth()` hook
  - `Dashboard.jsx` - Protected main view
  - `ApplicationForm.jsx`, `Applications.jsx` - Job application management
  - `CaseStudies.jsx`, `CaseStudy.jsx` - Case study CRUD
  - `ContactForm.jsx`, `Contact.jsx` - Contact form submission
- `src/utils/api.js` - Axios client with dynamic `Authorization` header injection
- `src/index.js` - ReactDOM entry point
- Tailwind config: `tailwind.config.js`, `postcss.config.js`

## Key Patterns & Conventions

### Authentication Flow
1. Login form posts credentials to MockAPI endpoint for admin validation
2. On success, `login(jwt, adminData)` stores token in context and axios headers
3. Protected routes check `accessToken` with `ProtectedRoute` wrapper
4. Logout clears token and resets axios headers to `null`

**Key file**: `src/components/Authcontext.jsx` - understand this first for any auth changes.

### API Communication
- All axios calls use the shared `api` instance from `utils/api.js`
- Token injection happens automatically via `setAuthToken()` function after login
- Direct axios calls (like in `Login.jsx`) bypass the shared instance for credential fetch
- Base URL: `https://api.escuelajs.co/api/` (configurable in api.js)

**Example pattern** (from `ApplicationForm.jsx`):
```javascript
const newApplication = { applicantName, email, phone, coverLetter, resumeUrl, status: "pending", appliedAt };
await axios.post(BASE_URL, newApplication);
```

### Form Handling
- Use React hooks (`useState`) for form state
- Convert files to Base64 before submission (e.g., resume upload in `ApplicationForm.jsx`)
- Include timestamps (`appliedAt: new Date().toISOString()`)
- Alert user feedback (consider replacing with toast notifications later)

### Styling
- Tailwind utility classes directly in JSX (e.g., `className='flex h-screen items-center justify-center bg-gray-100'`)
- Responsive design via Tailwind breakpoints
- No CSS Modules or styled-components

## Development Workflows

### Running the App
```bash
npm start        # Starts dev server at http://localhost:3000
npm test         # Jest in watch mode
npm run build    # Production bundle to ./build/
```

### Adding New Routes
1. Create component in `src/components/`
2. Import in `App.js`
3. Add route object to `approuter` children array with proper path
4. Wrap with `<ProtectedRoute>` if auth required

### Adding API Calls
- Use `api` instance from `utils/api.js` for authenticated endpoints
- Direct `axios` calls only for public endpoints (e.g., login credential check)
- Always include error handling with try/catch and user-facing alerts

## Important Constraints & Gotchas

- **MockAPI endpoint for login is hardcoded**: `https://69247d9f3ad095fb8474688f.mockapi.io/adminlogin` (line 13 in `Login.jsx`)
- **JWT is fake**: Mocked with `"mock-jwt-" + Date.now()` - not a real token
- **No form validation library**: Basic HTML5 validation only; consider adding Zod/Yup for complex forms
- **No toast/notification system**: Using browser alerts for feedback (blocking, poor UX)
- **Tests exist but minimal**: See `setupTests.js` and `App.test.js` - add meaningful tests as features grow

## Questions to Ask Before Starting Work

- Which MockAPI endpoint should changes target?
- Is this a new route/feature or modifying existing?
- Do auth/context changes affect multiple components?
- Should new data models be added to MockAPI first?
