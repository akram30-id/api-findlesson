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

export default {
    create
}