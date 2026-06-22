import express from 'express'
import { signup,login,logout,getMe } from '../Controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const rotuer = express.Router();


// signup route
rotuer.post('/signup',signup);

// Login route
rotuer.post('/login',login);

//Logout route
rotuer.post('/logout',logout);

// Current authenticated user
rotuer.get('/me',protectRoute,getMe);


export default rotuer;
