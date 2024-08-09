import facultyService from "../service/faculty-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await facultyService.create(request);

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

        const facultyCode = req.params.facultyCode;

        const result = await facultyService.update(facultyCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const all = async (req, res, next) => {
    try {
        const schoolCode = req.params.schoolCode;

        const page = req.query.page ?? 1;
        const size = req.query.size ?? 10;
        const search = req.query.search ?? null;

        const facultyCode = req.query.faculty_code ?? null;

        const result = await facultyService.all(schoolCode, page, size, search, facultyCode);

        res.status(200).json({
            page: page,
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const facultyCode = req.params.facultyCode;

        const result = await facultyService.remove(facultyCode);
        
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