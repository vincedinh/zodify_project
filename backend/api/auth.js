// Middleware function to check if the user is authorized
exports.check = (req, res, next) => {
  // Check if the user is authorized (e.g., based on user roles or permissions)
  // You should implement your own logic to determine if the user is authorized.

  // // For example, you can check if the user has a specific role:
  if (true) {
    // return res.json({ redirectTo: 'http://localhost:3000/about' });
    return res.redirect('http://localhost:3000/about');
  }
  // User is authorized, continue to the route handler
  next();
};