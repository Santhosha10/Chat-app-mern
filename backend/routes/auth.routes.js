import express from 'express'
import { signup,login,logout } from '../Controllers/auth.controller.js';

const rotuer = express.Router();


// signup route
rotuer.post('/signup',signup);

// Login route
rotuer.post('/login',login);

//Logout route
rotuer.post('/logout',logout);


export default rotuer;