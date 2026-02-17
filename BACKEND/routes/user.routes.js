// home, login , sighnup, dashboard(show all details).



import { Router } from "express";
import { body } from "express-validator";
import * as userController from '../controllers/user.Controller.js'
import * as authentication from '../middleware/auth.middleware.js'

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min : 6}).withMessage('password must be at least 6 character long'),
    userController.createUserController);


router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min : 6}).withMessage('password must be atleast 6 character long'),
    userController.loginController
)

router.get('/dashboard', authentication.authUser ,userController.getUserInfo)


export default router;