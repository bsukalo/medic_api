# medic_api

The backend part of a project that uses a REST API to manage a database of users.

Routes:
```
/login               // Log in
/users               // Return all users
/users/details/(id)  // Return user details by ID
/users/block/(id)    // Block user by ID
/users/update/(id)   // Update user details by ID
/logout              // Log out
/register            // Register new user
```

Made with Node.js, Express & MongoDB
