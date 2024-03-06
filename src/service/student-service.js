import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getSchoolValidation } from "../validation/school-validation.js";
import { createStudentAddressValidation, createStudentValidation, getAllStudentValidation, getStudentValidation } from "../validation/student-validation.js"
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createStudentValidation, request);

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: request.school_code
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found');
    }

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: request.faculty_code,
            school_code: school.school_code
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: request.major_code,
            faculty_code: faculty.faculty_code
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: request.grade_code,
            major_code: major.major_code
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    const generate = uuid().toString();
    let studentCode = generate.substring(0, 8);

    const save = await prismaClient.students.create({
        data: {
            student_code: studentCode,
            student_name: request.student_name,
            school_code: request.school_code,
            faculty_code: request.faculty_code,
            major_code: request.major_code,
            grade_code: request.grade_code
        }
    });

    const studentId = (save.id).toString();

    const date = new Date();

    studentCode = date.getFullYear() + studentId.padStart(5, "0");

    return prismaClient.students.update({
        where: {
            id: parseInt(studentId)
        },
        data: {
            student_code: studentCode
        },
        select: {
            student_code: true,
            student_name: true,
            grade: true,
            major: true,
            school: true,
            student_address: true
        }
    });
}

const createAddress = async (request) => {
    request = validate(createStudentAddressValidation, request);

    const student = await prismaClient.students.findFirst({
        where: {
            student_code: request.student_code
        }
    });

    if (!student) {
        throw new ResponseError(404, 'Student is not found');
    }

    const district = await prismaClient.district.findFirst({
        where: {
            district_code: request.district_code
        }
    });

    if (!district) {
        throw new ResponseError(404, 'District is not found');
    }

    return prismaClient.student_Address.create({
        data: {
            complete_address: request.complete_address,
            district_code: request.district_code,
            student_code: request.student_code
        }
    })
}

const allBySchool = async (schoolCode, request) => {
    schoolCode = validate(getSchoolValidation, schoolCode);
    request = validate(getAllStudentValidation, request);

    const skip = (request.page - 1) * request.size;

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: schoolCode
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found');
    }

    const students = await prismaClient.students.findMany({
        where: {
            school_code: schoolCode
        },
        select: {
            student_name: true,
            major: true,
            grade: true,
            student_address: true
        },
        take: request.size,
        skip: skip
    });

    const total_items = students.length;

    let result = {};
    result.school_name = school.school_name;
    result.paging = {
        page: request.page,
        total_items: total_items,
        total_page: Math.ceil(total_items / request.size)
    };
    result.students = students;

    return result;
}

export default {
    create,
    createAddress,
    allBySchool
}