import lmsService from "../service/lms-service.js";

const create = async (req, res, next) => {
    try {
        const templateCode = req.params.templateCode;
        const user = req.user.username;

        const result = await lmsService.create(templateCode, user);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username;

        const result = await lmsService.get(username);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get
}