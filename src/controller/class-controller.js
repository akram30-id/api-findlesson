import classService from "../service/class-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await classService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const all = async (req, res, next) => {
    try {
        const gradeCode = req.params.gradeCode;

        const result = await classService.all(gradeCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;

        const request = req.body;

        const result = await classService.update(classCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;

        await classService.remove(classCode);

        res.status(200).json({
            data: 'OK'
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    all,
    update,
    remove
}