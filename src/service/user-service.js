import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updatePasswordValidation } from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import e from "express";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const getUser = await prismaClient.user.findFirst({
        where: {
            username: user.username,
            email: user.email
        }
    });

    if (getUser) {
        throw new ResponseError(403, 'username or email is already exist');
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.role = "admin";

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            email: true
        }
    })
}

const login = async (request) => {
    const userLogin = validate(loginUserValidation, request);

    let whereLogin = {}

    if (userLogin.username) {
        whereLogin['username'] = userLogin.username;
    }

    if (userLogin.email) {
        whereLogin['email'] = userLogin.email;
    }

    const checkLogin = await prismaClient.user.findUnique({
        where: whereLogin,
        select: {
            username: true,
            password: true
        }
    });

    if (!checkLogin) {
        throw new ResponseError(404, 'Account is not found');
    }

    const isPasswordValid = await bcrypt.compare(userLogin.password, checkLogin.password);

    if (!isPasswordValid) {
        throw new ResponseError(404, 'username/email or password wrong')
    }

    const token = uuid().toString();

    return prismaClient.user.update({
        data: {
            token: token
        },
        where: whereLogin,
        select: {
            token: true
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findFirst({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, 'User is not found');
    }

    return prismaClient.user.update({
        data: {
            token: null
        },
        where: {
            username: username
        },
        select: {
            username: true
        }
    });
}

const updatePassword = async (request, user) => {
    request = validate(updatePasswordValidation, request);
 
    const validateUser = await prismaClient.user.findFirst({
        where: {
            token: user.token
        },
        select: {
            username: true
        }
    });

    if (!validateUser) {
        throw new ResponseError(404, "User is not found.");
    }

    if (validateUser.username !== request.username) {
        throw new ResponseError(403, "Invalid user!");
    }

    const encryptOldPwd = bcrypt.hash(request.old_password, 10);

    const validateOldPassword = await prismaClient.user.findFirst({
        where: {
            username: request.username,
            password: encryptOldPwd
        }
    });

    if (!validateOldPassword) {
        throw new ResponseError(403, "Invalid old password");
    }

    if (request.new_password !== request.confirm_password) {
        throw new ResponseError(400, "New Password and Confirmation Password is not match");
    }

    const encryptNewPwd = await bcrypt.hash(request.new_password, 10);

    return prismaClient.user.update({
        where: {
            username: request.username
        },
        data: {
            password: encryptNewPwd
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });
}

const resetPassword = async (username, role) => {
    username = validate(getUserValidation, username);

    const getUser = await prismaClient.user.findFirst({
        where: {
            username: username
        }
    });

    if (!getUser) {
        throw new ResponseError(404, "User is not found.");
    }

    if (role == 'admin' && (getUser.role == 'superadmin' || getUser.role == 'admin')) {
        throw new ResponseError(403, "Unauthorized previllage.");
    }

    const newPassword = await bcrypt.hash('default', 10);

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            password: newPassword
        },
        select: {
            id: true,
            email: true,
            username: true
        }
    });
}

export default {
    register,
    login,
    logout,
    updatePassword,
    resetPassword
}