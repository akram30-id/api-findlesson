import gradeService from "../service/grade-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await gradeService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const all = async (req, res, next) => {
    try {
        const majorCode = req.params.majorCode;

        const result = await gradeService.all(majorCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const gradeCode = req.params.gradeCode;

        const request = req.body;

        const result = await gradeService.update(gradeCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const gradeCode = req.params.gradeCode;

        const result = await gradeService.remove(gradeCode);

        res.status(200).json({
            data: 'OK'
        })
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