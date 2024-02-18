import templateService from "../service/template-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user.username;

        const request = req.body;

        const result = await templateService.create(user, request);

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
        const templateCode = req.params.templateCode;

        const result = await templateService.get(username, templateCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const all = async (req, res, next) => {
    try {
        const user = req.user.username;
        const request = {
            page: req.query.page,
            size: req.query.size
        };

        const result = await templateService.all(user, request);

        res.status(200).json({
            page: result.page,
            data: result.data
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const templateCode = req.params.templateCode;

        await templateService.remove(templateCode);

        res.status(200).json({
            data: 'OK'
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const templateCode = req.params.templateCode;
        const request = req.body;

        const update = await templateService.update(templateCode, request);

        res.status('200').json({
            data: 'OK',
            requestData: request,
            update: update
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    all,
    remove,
    update
}