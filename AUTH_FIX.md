## Authentication Fix - Cross-Browser Support

### Problem
User accounts were only stored in browser localStorage, so when you tried to log in from a different browser, the credentials weren't found.

### Solution
Implemented a backend authentication server that stores user data in a persistent `users.json` file that's shared across all browsers.

### What Changed

1. **Created `server.js`** - A Node.js/Express backend server that:
   - Listens on port 5000
   - Stores user credentials in `users.json`
   - Handles `/api/auth/signup` - registers new users
   - Handles `/api/auth/login` - validates login credentials

2. **Updated `App.jsx`** - Changed from local storage to API calls:
   - `handleLogin()` - now calls the backend API
   - `handleSignup()` - now calls the backend API
   - Works across all browsers since data is server-stored

3. **Updated `package.json`** - Added dependencies:
   - `express` - backend framework
   - `cors` - allows frontend to communicate with backend

### How to Run

You now need to run TWO servers:

**Terminal 1 - Backend Server:**
```bash
node server.js
```
This will start the authentication server on port 5000

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
This will start the Vite dev server on port 5178

### Testing
1. Sign up with an account in Browser 1
2. Log out
3. Open a different browser (or private/incognito window)
4. Try to log in with the same credentials
5. It should now work! ✓

### Data Storage
- User accounts are saved in `users.json` in the project root
- This file is automatically created when the first user signs up
