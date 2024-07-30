import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import subjectModel from "../models/subject-model.js";
import { getSubjectValidation } from "../validation/subject-validation.js";
import { assignToSubjectValidation, createTeacherValidation, getTeacherValidation } from "../validation/teacher-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

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

const assignToSubject = async (request) => {
    request = validate(assignToSubjectValidation, request);

    const getSubject = await prismaClient.subject.findFirst({
        where: {
            subject_code: request.subject_code
        },
        select: {
            school_code: true
        }
    });

    if (!getSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const getTeacher = await prismaClient.teacher.findFirst({
        where: {
            teacher_code: request.teacher_code
        },
        select: {
            school_code: true
        }
    })

    if (!getTeacher) {
        throw new ResponseError(404, 'Teacher is not found.');
    }

    if (getTeacher.school_code != getSubject.school_code) {
        throw new ResponseError(400, 'Invalid teacher\'s school.')
    }

    const generate = uuid().toString();
    const teacherSubjectCode = generate.substring(0, 8);

    return prismaClient.teacherSubject.create({
        data: {
            teacher_subject_code: teacherSubjectCode,
            subject_code: request.subject_code,
            teacher_code: request.teacher_code
        },
        select: {
            teacher_subject_code: true,
            created_at: true,
            subject: {
                select: {
                    subject_name: true,
                    subject_code: true,
                    class_schedule: {
                        select: {
                            class_code: true,
                            day: true,
                            clock_start: true,
                            clock_end: true
                        }
                    }
                }
            },
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            }
        }
    })
}

const getTeacherBySubject = async (subjectCode) => {
    subjectCode = validate(getSubjectValidation, subjectCode);

    const getSubject = await subjectModel.getSubject(subjectCode);

    if (!getSubject) {
        throw new ResponseError(404, 'Subject is not found');
    }

    const getTeacher = await prismaClient.teacherSubject.findFirst({
        where: {
            subject_code: subjectCode
        },
        select: {
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            },
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true
                }
            }
        }
    });

    if (!getTeacher) {
        throw new ResponseError(404, 'Teacher is not found');
    }

    return getTeacher;
}

const deleteAssignation = async (request) => {
    try {
        request.teacher_code = validate(getTeacherValidation, request.teacher_code);
        request.subject_code = validate(getSubjectValidation, request.subject_code);

        const getTeacherSubject = await prismaClient.teacherSubject.findFirst({
            where: {
                subject_code: request.subject_code,
                teacher_code: request.teacher_code
            }
        });

        if (!getTeacherSubject) {
            throw new ResponseError(404, 'Guru pelajaran tidak ditemukan.');
        }

        return prismaClient.teacherSubject.delete({
            where: {
                subject_code: request.subject_code,
                teacher_code: request.teacher_code
            }
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    assignToSubject,
    getTeacherBySubject,
    deleteAssignation
}