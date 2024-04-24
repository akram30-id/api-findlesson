import assignmentService from "../service/assignment-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getByClassSubject = async (req, res, next) => {
    try {
        const subject = req.params.subjectCode;
        const classCode = req.params.classCode;

        const result = await assignmentService.getByClassSubject(classCode, subject);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const deleteAssignment = async (req, res, next) => {
    try {
        const assignment = req.params.assignmentCode;

        const result = await assignmentService.deleteAssignment(assignment);

        res.status(200).json({
            data: "ok"
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    getByClassSubject,
    deleteAssignment
}