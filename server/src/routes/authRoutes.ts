import { Router } from "express"
import { forgotPassword, login, register, resetPassword, verify } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
const router = Router();


// @POST api for Register new user
router.post('/register',register);

// @Post api for login user
router.post('/login',login);

// @Post api for sending forget password otp
router.post('/forget-password',forgotPassword);

// @Post api for reseting password
router.post('/reset-password',resetPassword);

// @Get api for verify user
router.get('/verify',authMiddleware,verify)

export default router;