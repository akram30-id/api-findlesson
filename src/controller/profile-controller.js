import { logger } from "../application/logging.js";
import profileService from "../service/profile-service.js";

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const data = req.body;

        const result = await profileService.createProfile(username, data);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const data = req.body;

        const result = await profileService.updateProfile(username, data);

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

        const result = await profileService.get(username);

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
    get
}