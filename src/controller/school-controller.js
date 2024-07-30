import schoolService from "../service/school-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await schoolService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const all = async (req, res, next) => {
    try {
        const lmsCode = req.query.lms_code;

        const page = req.query.page;
        const size = req.query.size;

        const result = await schoolService.all(lmsCode, page, size);

        res.status(200).json({
            page: page,
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const schoolCode = req.query.school_code;
        const result = await schoolService.get(schoolCode);

        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e)
    }
}

const createAddress = async (req, res, next) => {
    try {
        const schoolCode = req.params.schoolCode;
        const request = req.body;
        const result = await schoolService.createAddress(schoolCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    all,
    get,
    createAddress
}