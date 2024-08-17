import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getMajor } from "../models/major-model.js";
import { getFacultyValidation } from "../validation/faculty-validation.js";
import { createMajorValidation, getMajorValidation, pageMajorValidation, sizeMajorValidation } from "../validation/major-validation.js";
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

const all = async (facultyCode, page = 1, size = 10, search = null, majorCode = null) => {
    facultyCode = validate(getFacultyValidation, facultyCode);

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    if (majorCode) {
        const majorDetail = await getMajor(majorCode);

        if (!majorDetail) {
            throw new ResponseError(404, 'Major is not found.');
        }
        
        return majorDetail;
    }

    page = validate(pageMajorValidation, page);
    size = validate(sizeMajorValidation, size);

    const skip = (page - 1) * size;

    // Create a filter for the search query
    const searchFilter = search ? {
        OR: [
            { major_name: { contains: search, lte: 'insensitive' } },
            { major_code: { contains: search, lte: 'insensitive' } }
        ]
    } : {};

    return prismaClient.major.findMany({
        where: {
            faculty_code: facultyCode,
            ...searchFilter
        },
        skip: skip,
        take: size,
        orderBy: {
            created_at: "desc"
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