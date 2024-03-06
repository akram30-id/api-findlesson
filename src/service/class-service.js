import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createClassValidation, getClassValidation } from "../validation/class-validation.js"
import { getGradeValidation } from "../validation/grade-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createClassValidation, request);

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: request.grade_code
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    let classCode = request.class_code;

    if (classCode == undefined || classCode == null || classCode == "") {
        const generate = uuid().toString();
        classCode = generate.substring(0, 8);
    }

    return prismaClient.class.create({
        data: {
            class_code: classCode,
            class_name: request.class_name,
            grade_code: request.grade_code
        }
    });
}

const all = async (gradeCode) => {
    gradeCode = validate(getGradeValidation, gradeCode);

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: gradeCode
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    return prismaClient.class.findMany({
        where: {
            grade_code: gradeCode
        }
    });
}

const update = async (classCode, request) => {
    classCode = validate(getClassValidation, classCode);

    const checkClass = await prismaClient.class.findFirst({
        where: {
            class_code: classCode
        }
    });

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found');
    }

    return prismaClient.class.update({
        where: {
            class_code: classCode
        },
        data: {
            class_name: request.class_name
        }
    });
}

const remove = async (classCode) => {
    classCode = validate(getClassValidation, classCode);

    const checkClass = await prismaClient.class.findFirst({
        where: {
            class_code: classCode
        }
    });

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found');
    }

    return prismaClient.class.delete({
        where: {
            class_code: classCode
        }
    });
}

export default {
    create,
    all,
    update,
    remove
}