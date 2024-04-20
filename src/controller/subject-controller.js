import { logger } from "../application/logging.js";
import subjectService from "../service/subject-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await subjectService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getByTeacher = async (req, res, next) => {
    try {
        const teacher = req.params.teacherCode;

        const result = await subjectService.getByTeacher(teacher);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body;

        const subjectCode = req.params.subjectCode;

        const result = await subjectService.update(subjectCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
} 

const deleteSubject = async (req, res, next) => {
    try {
        const subject = req.params.subjectCode;

        const result = await subjectService.deleteSubject(subject);

        res.status(200).json({
            data: "ok"
        })
    } catch (e) {
        next(e)
    }
}

const assingToClass = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await subjectService.assingToClass(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getSubjectByClass = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;
        
        const result = await subjectService.getSubjectByClass(classCode);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    getByTeacher,
    update,
    deleteSubject,
    assingToClass,
    getSubjectByClass
}