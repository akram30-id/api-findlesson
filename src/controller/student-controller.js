import studentService from "../service/student-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await studentService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const createAddress = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await studentService.createAddress(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const allBySchool = async (req, res, next) => {
    try {
        const schoolCode = req.params.schoolCode;

        const request = req.query;

        const result = await studentService.allBySchool(schoolCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    createAddress,
    allBySchool
}