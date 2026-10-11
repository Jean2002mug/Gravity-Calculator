// Get the Node.js backend URL from the environment.
//
// During local development:
// http://localhost:3000
//
// During production:
// Render will provide VITE_API_URL.
const apiUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

// Remove a trailing slash if one exists.
//
// Example:
// https://api.example.com/
// becomes:
// https://api.example.com
export const API_URL =
    apiUrl.replace(/\/$/, "");