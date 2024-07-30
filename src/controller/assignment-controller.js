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

const updateAssignment = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;

        const request = req.body;

        const result = await assignmentService.update(assignmentCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const detailAssignment = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;

        const result = await assignmentService.detail(assignmentCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const createFileAssignment = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.createFile(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getFilesByAssignment = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;

        const result = await assignmentService.getFilesByAssignment(assignmentCode);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const removeFile = async (req, res, next) => {
    try {
        const fileCode = req.params.fileCode;

        const result = await assignmentService.removeFile(fileCode);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const createMultichoice = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.createMultichoice(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getAllMultichoice = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;

        const result = await assignmentService.getAllMultichoice(assignmentCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getMultichoiceDetail = async (req, res, next) => {
    try {
        const multichoiceCode = req.params.multichoiceCode;

        const result = await assignmentService.getMultichoiceDetail(multichoiceCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const updateMultichoice = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.updateMultichoice(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const deleteMultichoice = async (req, res, next) => {
    try {
        const multichoiceCode = req.params.multichoiceCode;

        await assignmentService.deleteMultichoice(multichoiceCode);

        res.status(200).json({
            data: "ok"
        })
    } catch (e) {
        next(e)
    }
}

const submitAssignment = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.submitAssignment(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getAllSubmissions = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;

        const result = await assignmentService.getAllSubmissions(assignmentCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getSubmissionDetail = async (req, res, next) => {
    try {
        const submitCode = req.params.submitCode;

        const result = await assignmentService.getSubmissionDetail(submitCode);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getSubmissionStudent = async (req, res, next) => {
    try {
        const assignmentCode = req.params.assignmentCode;
        const studentCode = req.params.studentCode;

        const result = await assignmentService.getSubmissionStudent(assignmentCode, studentCode);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const createScore = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.createScore(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const updateScore = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await assignmentService.updateScore(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    getByClassSubject,
    deleteAssignment,
    updateAssignment,
    detailAssignment,
    createFileAssignment,
    getFilesByAssignment,
    removeFile,
    createMultichoice,
    getAllMultichoice,
    getMultichoiceDetail,
    updateMultichoice,
    deleteMultichoice,
    submitAssignment,
    getAllSubmissions,
    getSubmissionDetail,
    getSubmissionStudent,
    createScore,
    updateScore
}