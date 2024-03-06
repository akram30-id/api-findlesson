import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getFacultyValidation } from "../validation/faculty-validation.js";
import { createMajorValidation, getMajorValidation } from "../validation/major-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createMajorValidation, request);

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: request.faculty_code
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    const generate = uuid().toString();
    const majorCode = generate.substring(0, 8);

    return prismaClient.major.create({
        data: {
            major_code: majorCode,
            major_name: request.major_name,
            faculty_code: request.faculty_code
        }
    });
}

const update = async (majorCode, request) => {
    majorCode = validate(getMajorValidation, majorCode);

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: majorCode
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    return prismaClient.major.update({
        where: {
            major_code: majorCode
        },
        data: {
            major_name: request.major_name,
        }
    });
}

const all = async (facultyCode) => {
    facultyCode = validate(getFacultyValidation, facultyCode);

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    return prismaClient.major.findMany({
        where: {
            faculty_code: facultyCode
        }
    });
}

const remove = async (majorCode) => {
    majorCode = validate(getMajorValidation, majorCode);

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: majorCode
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    return prismaClient.major.delete({
        where: {
            major_code: majorCode
        }
    });
}

export default {
    create,
    update,
    all,
    remove
}