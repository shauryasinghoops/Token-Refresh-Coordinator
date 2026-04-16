import { Router } from "express";
import { body } from 'express-validator'; // help to validate is email ? or is password...
import * as adminController from '../controllers/admin.Controller.js'
import * as authentication from '../middleware/auth.middleware.js'


const router = Router();


router.post('/login', 
    body('email').isEmail().withMessage("Email must bge a valid Admin email Id"),
    body('password').isLength({min : 6}).withMessage('password must be correct and Atleast 6 digit'),
    adminController.loginController
);

router.post('/logout',authentication.authAdmin, adminController.logoutController);


router.get('/users', authentication.authAdmin,  adminController.getAllUsersController);

router.get('/rotation-log', authentication.authAdmin, adminController.getRotationLog);


export default router;