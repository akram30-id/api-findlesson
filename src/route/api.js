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
import majorController from "../controller/major-controller.js";
import gradeController from "../controller/grade-controller.js";
import classController from "../controller/class-controller.js";
import studentController from "../controller/student-controller.js";
import teacherController from "../controller/teacher-controller.js";
import subjectController from "../controller/subject-controller.js";
import cors from "cors";

const userRouter = express.Router();

userRouter.use(cors());

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
userRouter.delete('/api/faculty/:facultyCode', facultyController.remove);

// MAJOR API
userRouter.post('/api/major', majorController.create);
userRouter.patch('/api/major/:majorCode', majorController.update);
userRouter.get('/api/major/:facultyCode', majorController.all);
userRouter.delete('/api/major/:majorCode', majorController.remove);

// GRADE API
userRouter.post('/api/grade', gradeController.create);
userRouter.get('/api/grade/:majorCode', gradeController.all);
userRouter.patch('/api/grade/:gradeCode', gradeController.update);
userRouter.delete('/api/grade/:gradeCode', gradeController.remove);

// CLASS API
userRouter.post('/api/class', classController.create);
userRouter.get('/api/class/:gradeCode', classController.all);
userRouter.patch('/api/class/:classCode', classController.update);
userRouter.delete('/api/class/:classCode', classController.remove);

// STUDENT API
userRouter.post('/api/student', studentController.create);
userRouter.post('/api/student/address', studentController.createAddress);
userRouter.get('/api/student/school/:schoolCode', studentController.allBySchool);
userRouter.get('/api/student/faculty/:facultyCode', studentController.allByFaculty);
userRouter.get('/api/student/major/:majorCode', studentController.allByMajor);
userRouter.get('/api/student/grade/:gradeCode', studentController.allByGrade);
userRouter.get('/api/student/detail/:studentCode', studentController.studentDetail);
userRouter.patch('/api/student/address/:addressId', studentController.updateAddress);
userRouter.post('/api/student/class', studentController.assignClass);
userRouter.get('/api/student/class/:classCode', studentController.getStudentClass);

// TEACHER API
userRouter.post('/api/teacher', teacherController.create);

// SUBJCET API
userRouter.post('/api/subject', subjectController.create);
userRouter.get('/api/subject/teacher/:teacherCode', subjectController.getByTeacher);

export {
    userRouter
}