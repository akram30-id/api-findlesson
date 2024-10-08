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

const getByGrade = async (req, res, next) => {
    try {
        const grade = req.params.gradeCode;

        const result = await subjectService.getSubjectByGrade(grade);

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

const assignToSchedule = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await subjectService.assignSubjectToClassSchedule(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getClassSchedule = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;
        const day = req.params.day;

        const result = await subjectService.getClassSchedule(classCode, day);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const updateClassSchedule = async (req, res, next) => {
    try {
        const schedule = req.params.scheduleCode;
        const request = req.body;

        const result = await subjectService.updateClassSchedule(schedule, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const deleteSchedule = async (req, res, next) => {
    try {
        const schedule = req.params.scheduleCode;

        const result = await subjectService.deleteSchedule(schedule);

        res.status(200).json({
            data: "ok"
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    getByGrade,
    update,
    deleteSubject,
    assignToSchedule,
    getClassSchedule,
    updateClassSchedule,
    deleteSchedule
}