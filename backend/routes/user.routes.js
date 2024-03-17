import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserforSiderbar } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute , getUserforSiderbar);

export default router;