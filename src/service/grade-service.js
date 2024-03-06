import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createGradeValidation, getGradeValidation } from "../validation/grade-validation.js";
import { getMajorValidation } from "../validation/major-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createGradeValidation, request);

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: request.major_code
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    const generate = uuid().toString();
    const gradeCode = generate.substring(0, 8);

    return prismaClient.grade.create({
        data: {
            grade_code: gradeCode,
            grade_name: request.grade_name,
            major_code: request.major_code
        }
    });
}

const all = async (majorCode) => {
    majorCode = validate(getMajorValidation, majorCode);

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: majorCode
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    return prismaClient.grade.findMany({
        where: {
            major_code: majorCode
        }
    });
}

const update = async (gradeCode, request) => {
    gradeCode = validate(getGradeValidation, gradeCode);

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: gradeCode
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    return prismaClient.grade.update({
        where: {
            grade_code: gradeCode
        },
        data: {
            grade_name: request.grade_name
        }
    });
}

const remove = async (gradeCode) => {
    gradeCode = validate(getGradeValidation, gradeCode);

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: gradeCode
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    return prismaClient.grade.delete({
        where: {
            grade_code: gradeCode
        }
    });
}

export default {
    create,
    all,
    update,
    remove
}