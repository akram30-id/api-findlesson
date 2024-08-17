import majorService from "../service/major-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await majorService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const majorCode = req.params.majorCode;
        const request = req.body;

        const result = await majorService.update(majorCode, request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const all = async (req, res, next) => {
    try {
        const facultyCode = req.params.facultyCode;

        const page = req.query.page ?? 1;
        const size = req.query.size ?? 10;
        const search = req.query.search ?? null;
        const major = req.query.major ?? null;

        const result = await majorService.all(facultyCode, page, size, search, major);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const majorCode = req.params.majorCode;

        const result = await majorService.remove(majorCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    all,
    remove
}