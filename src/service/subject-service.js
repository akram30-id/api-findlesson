import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createSubjectValidation, getSubjectValidation, updateSubjectValidation } from "../validation/subject-validation.js";
import { getTeacherValidation } from "../validation/teacher-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const create = async (request) => {

    request = validate(createSubjectValidation, request);

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: request.school_code,
        },
        select: {
            faculty: {
                select: {
                    major: {
                        where: {
                            major_code: request.major_code
                        }
                    },
                    faculty_code: true
                }
            },
            teacher: {
                where: {
                    teacher_code: request.teacher_code
                },
                select: {
                    teacher_code: true
                }
            }
        }
    });

    if (!school) {
        throw new ResponseError(404, 'No data school is found.');
    }

    const generate = uuid().toString();
    const subject_code = generate.substring(0, 8);

    return prismaClient.subject.create({
        data: {
            subject_code: subject_code,
            subject_name: request.title,
            teacher_code: request.teacher_code,
            major_code: request.major_code,
            school_code: request.school_code
        },
        select: {
            subject_code: true,
            subject_name: true,
            school_code: true,
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            },
            major: {
                select: {
                    major_code: true,
                    major_name: true
                }
            }
        }
    });

}

const getByTeacher = async (teacher) => {
    teacher = validate(getTeacherValidation, teacher);

    const checkTeacher = await prismaClient.teacher.findFirst({
        where: {
            teacher_code: teacher
        }
    });

    if (!checkTeacher) {
        throw new ResponseError(404, 'Teacher is not found.');
    }

    return prismaClient.subject.findMany({
        where: {
            teacher_code: teacher
        },
        select: {
            subject_code: true,
            subject_name: true,
            school_code: true,
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            },
            major: {
                select: {
                    major_code: true,
                    major_name: true
                }
            }
        }
    });
}

const update = async (subject, request) => {
    subject = validate(getSubjectValidation, subject);
    request = validate(updateSubjectValidation, request);

    const checkSubject = await prismaClient.subject.findFirst({
        where: {
            subject_code: subject
        }
    });

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    return prismaClient.subject.update({
        data: {
            subject_name: request.title,
            teacher_code: request.teacher_code,
            major_code: request.major_code
        },
        where: {
            subject_code: subject
        },
        select: {
            subject_code: true,
            subject_name: true,
            school_code: true,
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            },
            major: {
                select: {
                    major_code: true,
                    major_name: true
                }
            }
        }
    })
}

export default {
    create,
    getByTeacher
}