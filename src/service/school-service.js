import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import { getLmsValidation } from "../validation/lms-validation.js";
import { createSchoolAddressValidation, createSchoolValidation, getSchoolValidation } from "../validation/school-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createSchoolValidation, request);

    const lms = await prismaClient.lms.findFirst({
        where: {
            lms_code: request.lms_code
        }
    });

    if (!lms) {
        throw new ResponseError(404, 'LMS Code is not found');
    }

    const generate = uuid().toString();
    const schoolCode = generate.substring(0, 8);

    return prismaClient.school.create({
        data: {
            is_online: 1,
            school_code: schoolCode,
            school_name: request.school_name,
            lms_code: request.lms_code
        }
    });
}

const createAddress = async (schoolCode, request) => {
    schoolCode = validate(getSchoolValidation, schoolCode);
    request = validate(createSchoolAddressValidation, request);

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: schoolCode
        }
    });

    const district = await prismaClient.district.findFirst({
        where: {
            district_code: request.district_code
        }
    });

    if (!district) {
        throw new ResponseError(404, 'District is not found.');
    }

    if (!school) {
        throw new ResponseError(404, 'School is not found.')
    }

    return prismaClient.schoolAddress.create({
        data: {
            complete_address: request.complete_address,
            district_code: request.district_code,
            school_code: schoolCode
        }
    });
}

const all = async (lmsCode) => {
    lmsCode = validate(getLmsValidation, lmsCode);

    const lms = await prismaClient.lms.findFirst({
        where: {
            lms_code: lmsCode
        }
    });

    if (!lms) {
        throw new ResponseError(404, 'LMS is not found.');
    }

    return prismaClient.school.findMany({
        where: {
            lms_code: lmsCode
        }
    });
}

const get = async (schoolCode) => {
    schoolCode = validate(getSchoolValidation, schoolCode);

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: schoolCode
        },
        include: {
            lms: true,
            school_address: true
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found.');
    }

    return school;
}

export default {
    create,
    all,
    get,
    createAddress
}