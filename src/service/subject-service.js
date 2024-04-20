import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import subjectModel from "../models/subject-model.js";
import classModel from "../models/class-model.js";
import { getClassValidation } from "../validation/class-validation.js";
import { assingToClassValidation, createSubjectValidation, getSubjectValidation, updateSubjectValidation } from "../validation/subject-validation.js";
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

    const checkSubject = await subjectModel.getSubject(subject);

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

const deleteSubject = async (subject) => {
    subject = validate(getSubjectValidation, subject);

    const checkSubject = await subjectModel.getSubject(subject);

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    return prismaClient.subject.delete({
        where: {
            subject_code: subject
        }
    });
}

const assingToClass = async (request) => {
    request = validate(assingToClassValidation, request);

    const checkClass = await classModel.getClass(request.class_code);

    const checkSubject = await subjectModel.getSubject(request.subject_code);

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found');
    }

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const generate = uuid().toString();
    const classSubjCode = generate.substring(0, 8);

    return prismaClient.class_Subject.create({
        data: {
            class_subject_code: classSubjCode,
            class_code: request.class_code,
            subject_code: request.subject_code
        },
        select: {
            class: {
                select: {
                    class_name: true,
                    grade_code: true
                }
            },
            subject: {
                select: {
                    subject_name: true,
                    teacher: {
                        select: {
                            name: true,
                            teacher_code: true
                        }
                    }
                }
            }
        }
    })
}

const getSubjectByClass = async (classCode) => {
    classCode = validate(getClassValidation, classCode);

    const checkClass = await classModel.getClass(classCode);
    
    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found.');
    }

    return prismaClient.class_Subject.findMany({
        where: {
            class_code: classCode
        },
        select: {
            class_code: true,
            subject_code: true,
            class_subject_code: true,
            class: {
                select: {
                    class_name: true,
                    grade: {
                        select: {
                            grade_code: true,
                            grade_name: true
                        }
                    }
                }
            },
            subject: {
                select: {
                    subject_name: true,
                    teacher: {
                        select: {
                            teacher_code: true,
                            name: true,
                            birthdate: true
                        }
                    }
                }
            }
        }
    })
}

export default {
    create,
    getByTeacher,
    update,
    deleteSubject,
    assingToClass,
    getSubjectByClass
}

