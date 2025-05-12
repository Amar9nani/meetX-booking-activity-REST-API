import { verifyToken } from '../utils/jwtUtils.js';

/**
 * Authentication middleware to protect routes
 */
const authenticate = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  
  // Verify the token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
  }
  
  // Add the user data to the request
  req.user = decoded;
  next();
};

export default authenticate;