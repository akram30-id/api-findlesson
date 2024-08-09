import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import { createProfileValidation, updateProfileValidation } from "../validation/profile-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const getUser = (username, select = {}) => {
    return prismaClient.user.findFirst({
        where: {
            username: username
        },
        select: select
    });
}

const createProfile = async (user, request) => {
    logger.info("log username: " + user);
    user = validate(getUserValidation, user);

    const checkUser = await prismaClient.user.findFirst({
        where: {
            username: user
        },
        select: {
            username: true
        }
    });

    if (!checkUser) {
        throw new ResponseError(404, 'User is not found');
    }

    request = validate(createProfileValidation, request);

    const checkProfile = await prismaClient.profile.findFirst({
        where: {
            username: user
        }
    });

    if (checkProfile) {
        throw new ResponseError(403, 'Profil sudah ada')
    }

    return prismaClient.profile.create({
        data: {
            name: request.name,
            avatar: request.avatar,
            username: user,
            phone: request.phone,
            address: request.address
        },
        select: {
            id: true,
            name: true,
            avatar: true,
            username: true,
            phone: true,
            address: true
        }
    })
}

const updateProfile = async (user, request) => {
    user = validate(getUserValidation, user);

    if (!getUser(user)) {
        throw new ResponseError(404, 'No account / user found.');
    }

    request = validate(updateProfileValidation, request);

    return prismaClient.profile.update({
        where: {
            username: user
        },
        data: request,
        select: {
            id: true,
            name: true,
            avatar: true,
            username: true,
            phone: true,
            address: true
        }
    });
}

const get = async (user) => {
    user = validate(getUserValidation, user);

    const checkUser = await prismaClient.user.findFirst({
        where: {
            username: user
        }
    });

    if (!checkUser) {
        throw new ResponseError(404, 'user is not found');
    }

    return prismaClient.profile.findFirst({
        where: {
            username: user
        },
        select: {
            name: true,
            address: true,
            avatar: true,
            phone: true,
            username: true,
            user: {
                select: {
                    email: true,
                    role: true,
                    token: true
                }
            }
        }
    })
}

export default {
    createProfile,
    updateProfile,
    get
}