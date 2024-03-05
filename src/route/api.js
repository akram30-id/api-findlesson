import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import profileController from "../controller/profile-controller.js";
import schoolController from "../controller/school-controller.js";
import templateController from "../controller/template-controller.js";
import { superadminMiddleware } from "../middleware/superadmin-middleware.js";
import lmsController from "../controller/lms-controller.js";
import paymentController from "../controller/payment-controller.js";
import facultyController from "../controller/faculty-controller.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);

// USER API
userRouter.delete('/api/users/logout', userController.logout);

// PROFILE API
userRouter.post('/api/profile', profileController.create);
userRouter.patch('/api/profile', profileController.update);
userRouter.get('/api/profile', profileController.get);

// TEMPLATE API
userRouter.post('/api/templates', superadminMiddleware, templateController.create);
userRouter.get('/api/templates', templateController.all);
userRouter.get('/api/templates/:templateCode', templateController.get);
userRouter.delete('/api/templates/:templateCode', superadminMiddleware, templateController.remove);
userRouter.patch('/api/templates/:templateCode', superadminMiddleware, templateController.update);

// LMS API
userRouter.post('/api/lms/:templateCode', lmsController.create);
userRouter.get('/api/lms', lmsController.get);

// SCHOOL API
userRouter.post('/api/school', schoolController.create);
userRouter.post('/api/school/:schoolCode', schoolController.createAddress);
userRouter.get('/api/school', schoolController.all);
userRouter.get('/api/school/detail', schoolController.get);

// PAYMENT GATEWAY
// POSTPONED
userRouter.get('/api/payment/:orderID', paymentController.getStatusPayment);

// FACULTY API
userRouter.post('/api/faculty', facultyController.create);
userRouter.patch('/api/faculty/:facultyCode', facultyController.update);
userRouter.get('/api/faculty/:schoolCode', facultyController.all);

export {
    userRouter
}