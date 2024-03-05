import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createFacultyValidation, getFacultyValidation } from "../validation/faculty-validation.js";
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

const all = async (schoolCode) => {
    schoolCode = validate(getSchoolValidation, schoolCode);

    const faculty = await prismaClient.faculty.findMany({
        where: {
            school_code: schoolCode
        },
        select: {
            faculty_code: true,
            faculty_name: true
        }
    });

    if (faculty.length < 1) {
        throw new ResponseError(404, 'No Faculty found.');
    }

    return faculty;
}

export default {
    create,
    update,
    all
}