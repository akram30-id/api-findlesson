import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { allTemplateValidation, createTemplateValidation, getTemplateValidation } from "../validation/template-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (user, request) => {
    user = validate(getUserValidation, user);
    request = validate(createTemplateValidation, request);

    const checkUser = await prismaClient.user.findFirst({
        where: {
            username: user
        }
    });

    if (!checkUser) {
        throw new ResponseError(404, 'user is not found');
    }

    const template_code = uuid().toString();
    request.template_code = template_code;

    const regex = /\//;

    if (!regex.test(request.path)) {
        throw new ResponseError(400, 'Path Template must contain /');
    }

    return prismaClient.template.create({
        data: {
            template_code: request.template_code,
            template_name: request.template_name,
            path: request.path
        }
    });
}

const get = async (user, templateCode) => {
    user = validate(getUserValidation, user);

    const checkUser = await prismaClient.user.findFirst({
        where: {
            username: user
        }
    });

    if (!checkUser) {
        throw new ResponseError(404, 'user is not found');
    }

    templateCode = validate(getTemplateValidation, templateCode);

    const checkTemplate = await prismaClient.template.findFirst({
        where: {
            template_code: templateCode
        },
        select: {
            id: true,
            path: true,
            template_name: true,
            template_code: true
        }
    });

    if (!checkTemplate) {
        throw new ResponseError(404, 'template is not found');
    }

    return checkTemplate;
}

const all = async (user, request) => {
    user = validate(getUserValidation, user);

    const checkUser = await prismaClient.user.findFirst({
        where: {
            username: user
        }
    });

    if (!checkUser) {
        throw new ResponseError(404, 'user is not found');
    }

    request = validate(allTemplateValidation, request);

    const skip = (request.page - 1) * request.size;

    const templates = await prismaClient.template.findMany({
        take: request.size,
        skip: skip
    });

    if (!templates) {
        throw new ResponseError(404, 'template is not found');
    }

    return {
        data: templates,
        page: request.page
    };
}

const remove = async (templateCode) => {
    templateCode = validate(getTemplateValidation, templateCode);

    const checkTemplate = await prismaClient.template.findFirst({
        where: {
            template_code: templateCode
        }
    });

    if (!checkTemplate) {
        throw new ResponseError(404, 'template is not found');
    }

    return prismaClient.template.delete({
        where: {
            template_code: templateCode
        }
    });
}

const update = async (templateCode, request) => {

    templateCode = validate(getTemplateValidation, templateCode);

    const template = await prismaClient.template.findFirst({
        where: {
            template_code: templateCode
        }
    });

    if (!template) {
        throw new ResponseError(404, 'template is not found');
    }

    return prismaClient.template.update({
        where: {
            template_code: templateCode
        },
        data: {
            template_name: request.template_name,
            path: request.path
        }
    });
}

export default {
    create,
    get,
    all,
    remove,
    update
}