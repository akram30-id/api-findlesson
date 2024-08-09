import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import { createLmsValidation } from "../validation/lms-validation.js";
import { getTemplateValidation } from "../validation/template-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid"

const create = async (templateCode, user) => {
    templateCode = validate(getTemplateValidation, templateCode);
    user = validate(getUserValidation, user);

    const template = await prismaClient.template.findFirst({
        where: {
            template_code: templateCode
        }
    });

    if (!template) {
        throw new ResponseError(404, 'Template is not found');
    }

    const profile = await prismaClient.profile.findFirst({
        where: {
            username: user
        },
        select: {
            id: true
        }
    });

    if (!profile) {
        throw new ResponseError(404, 'Profile is not found');
    }

    logger.info('profile id : ' + profile.id);

    const isLMSExist = await prismaClient.lms.count({
        where: {
            profile_id: profile.id
        }
    });

    if (isLMSExist >= 1) {
        throw new ResponseError(400, 'LMS using this account is already exist');
    }

    const lmsCode = uuid().toString();

    validate(createLmsValidation, {templateCode, lmsCode});

    return prismaClient.lms.create({
        data: {
            template_code: templateCode,
            lms_code: lmsCode,
            profile_id: profile.id
        }
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const profile = await prismaClient.profile.findFirst({
        where: {
            username: username
        },
        select: {
            id: true
        }
    });

    if (!profile) {
        throw new ResponseError(404, 'Account is not found. Please complete your profile.');
    }

    const profileId = profile.id;

    return prismaClient.lms.findFirst({
        where: {
            profile_id: profileId
        }
    });
}

export default {
    create,
    get
}