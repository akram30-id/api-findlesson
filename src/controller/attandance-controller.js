import attandanceService from "../service/attandance-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const isClockOut = req.params.isClockOut;

        const attandanceCode = req.params.attandanceCode;

        const result = await attandanceService.create(request, isClockOut, attandanceCode);

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