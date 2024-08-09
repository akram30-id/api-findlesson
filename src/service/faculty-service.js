import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import facultyModel from "../models/faculty-model.js";
import { createFacultyValidation, getFacultyValidation, pageFacultyValidation, sizeFacultyValidation } from "../validation/faculty-validation.js";
import { getSchoolValidation } from "../validation/school-validation.js";
import { validate } from "../validation/validation.js";
import {v4 as uuid} from "uuid";

const create = async (request) => {
    request = validate(createFacultyValidation, request);

    const school = await prismaClient.school.findFirst({
        where: {
             school_code: request.school_code
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found');
    }

    const generate = uuid().toString();
    const facultyCode = generate.substring(0, 8);

    return prismaClient.faculty.create({
        data: {
            faculty_code: facultyCode,
            school_code: school.school_code,
            faculty_name: request.faculty_name
        }
    });
}

const update = async (facultyCode, request) => {
    facultyCode = validate(getFacultyValidation, facultyCode);

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    return prismaClient.faculty.update({
        where: {
            faculty_code: facultyCode
        },
        data: {
            faculty_name: request.faculty_name
        }
    });
}

const all = async (schoolCode, page = 1, size = 10, search = null, facultyCode = null) => {
    schoolCode = validate(getSchoolValidation, schoolCode);

    if (facultyCode) {
        return facultyModel.getFaculty(facultyCode);
    }

    page = validate(pageFacultyValidation, page);
    size = validate(sizeFacultyValidation, size);

    const skip = (page - 1) * size;

    // Create a filter for the search query
    const searchFilter = search ? {
        OR: [
            { faculty_name: { contains: search, lte: 'insensitive' } },
            { faculty_code: { contains: search, lte: 'insensitive' } }
        ]
    } : {};

    const faculty = await prismaClient.faculty.findMany({
        where: {
            school_code: schoolCode,
            ...searchFilter
        },
        select: {
            faculty_code: true,
            faculty_name: true
        },
        take: size,
        skip: skip
    });

    if (faculty.length < 1) {
        throw new ResponseError(404, 'No Faculty found.');
    }

    return faculty;
}

const remove = async (facultyCode) => {
    facultyCode = validate(getFacultyValidation, facultyCode);

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    return prismaClient.faculty.delete({
        where: {
            faculty_code: facultyCode
        }
    });
}

export default {
    create,
    update,
    all,
    remove
}