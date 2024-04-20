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

// const update = async (req)

export default {
    create,
    getByTeacher
}