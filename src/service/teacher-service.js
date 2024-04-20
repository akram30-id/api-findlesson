import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createTeacherValidation } from "../validation/teacher-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
    request = validate(createTeacherValidation, request);

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: request.major_code
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    return prismaClient.teacher.create({
        data: {
            teacher_code: request.teacher_code,
            school_code: request.school_code,
            name: request.name,
            address: request.address,
            birthdate: request.birthdate,
            born: request.born
        }
    });
}

export default {
    create
}