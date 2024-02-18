import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

export default {
    register,
    login,
    logout
}