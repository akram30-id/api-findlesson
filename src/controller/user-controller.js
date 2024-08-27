import { logger } from "../application/logging.js";
import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username);

        res.status(200).json({
            data: 'OK'
        });
    } catch (e) {
        next(e)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const update = await userService.updatePassword(req.body, req.user);

        res.status(200).json({
            data: update
        });
    } catch (e) {
        next(e);
    }
}

const resetPassword = async (req, res , next) => {
    try {
        const username = req.body.username;
        const role = req.user.role;

        const update = await userService.resetPassword(username, role);

        res.status(200).json({
            data: update
        });
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    logout,
    updatePassword,
    resetPassword
}