import teacherService from "../service/teacher-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await teacherService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const assignToSubject = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await teacherService.assignToSubject(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getTeacherBySubject = async (req, res, next) => {
    try {
        const subjectCode = req.params.subjectCode;

        const result = await teacherService.getTeacherBySubject(subjectCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    assignToSubject,
    getTeacherBySubject
}