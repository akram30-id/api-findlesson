import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import subjectModel from "../models/subject-model.js";
import classModel from "../models/class-model.js";
import { getClassValidation } from "../validation/class-validation.js";
import { assignToClassScheduleValidation, assingToClassValidation, createSubjectValidation, getDaysValidation, getScheduleValidation, getSubjectValidation, updateSubjectValidation } from "../validation/subject-validation.js";
import { getTeacherValidation } from "../validation/teacher-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import { getGradeValidation } from "../validation/grade-validation.js";
const days = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];

const create = async (request) => {
    request = validate(createSubjectValidation, request);

    const getGrade = await prismaClient.grade.findFirst({
        where: {
            grade_code: request.grade_code,
            major_code: request.major_code
        },
        select: {
            grade_code: true,
            major: {
                select: {
                    faculty: {
                        select: {
                            school_code: true
                        }
                    }
                }
            }
        }
    });

    if (!getGrade) {
        throw new ResponseError(404, 'Grade or major is not found.');
    }

    const schoolCode = getGrade.major.faculty.school_code;

    const generate = uuid().toString();
    const subject_code = generate.substring(0, 8);

    return prismaClient.subject.create({
        data: {
            subject_code: subject_code,
            subject_name: request.title,
            grade_code: getGrade.grade_code,
            major_code: request.major_code,
            school_code: schoolCode
        },
        select: {
            subject_name: true,
            subject_code: true,
            major: {
                select: {
                    major_code: true,
                    major_name: true,
                    grade: {
                        select: {
                            grade_code: true,
                            grade_name: true
                        }
                    }
                }
            }
        }
    });

}

const getSubjectByGrade = async (grade) => {
    grade = validate(getGradeValidation, grade);

    const getSubject = await prismaClient.subject.findMany({
        where: {
            grade_code: grade
        },
        select: {
            subject_code: true,
            subject_name: true,
            major: {
                select: {
                    major_code: true,
                    major_name: true,
                    grade: {
                        select: {
                            grade_code: true,
                            grade_name: true
                        }
                    }
                }
            }
        }
    });

    return getSubject;
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
            subject_name: request.title
        },
        where: {
            subject_code: subject
        },
        select: {
            subject_code: true,
            subject_name: true,
            major: {
                select: {
                    major_code: true,
                    major_name: true,
                    grade: {
                        select: {
                            grade_code: true,
                            grade_name: true
                        }
                    }
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

const assignSubjectToClassSchedule = async (request) => {
    request = validate(assignToClassScheduleValidation, request);

    const getTeacher = await prismaClient.teacher.findFirst({
        where: {
            teacher_code: request.teacher_code
        }
    });

    const getClass = await prismaClient.class.findFirst({
        where: {
            class_code: request.class_code
        }
    });

    const getSubject = await prismaClient.subject.findFirst({
        where: {
            subject_code: request.subject_code
        }
    });

    if (!getTeacher) {
        throw new ResponseError(404, 'Teacher is not found.');
    }

    if (!getClass) {
        throw new ResponseError(404, 'Class is not found.');
    }

    if (!getSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const isSubjectAssigned = await prismaClient.class_Schedule.findFirst({
        where: {
            class_code: request.class_code,
            day: request.day,
            AND: [
                {
                    OR: [
                        {
                            clock_start: request.clock_start
                        },
                        {
                            clock_end: request.clock_end
                        }
                    ]
                }
            ]
        }
    });

    if (isSubjectAssigned) {
        throw new ResponseError(400, 'Subject is already assigned.');
    }

    const generate = uuid().toString();
    const classScheduleCode = generate.substring(0, 8);

    return prismaClient.class_Schedule.create({
        data: {
            class_schedule_code: classScheduleCode,
            clock_start: request.clock_start,
            clock_end: request.clock_end,
            day: request.day,
            class_code: request.class_code,
            teacher_code: request.teacher_code,
            subject_code: request.subject_code
        },
        select: {
            class_schedule_code: true,
            clock_start: true,
            clock_end: true,
            day: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true
                }
            }
        }
    })
}

const getClassSchedule = async (classCode, dayReq) => {
    classCode = validate(getClassValidation, classCode);
    dayReq = validate(getDaysValidation, dayReq);

    let response = {};

    const getClassSchedule = await prismaClient.class_Schedule.findMany({
        where: {
            class_code: classCode
        },
        select: {
            day: true,
            clock_start: true,
            clock_end: true,
            class_schedule_code: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true
                }
            },
            class: {
                select: {
                    class_code: true,
                    class_name: true
                }
            },
            teacher: {
                select: {
                    teacher_code: true,
                    name: true
                }
            }
        }
    });

    // Group results by day
    days.forEach((day) => {

        if (dayReq) {
            if (dayReq.toUpperCase() !== day) {
                return;
            }
        }

        response[day] = [];

        getClassSchedule.forEach((schedule) => {
            if (schedule.day == day) {
                delete schedule.day;
                response[day].push(schedule);
            }
        });
    });

    return response;
}

const updateClassSchedule = async (schedule, request) => {
    schedule = validate(getScheduleValidation, schedule);

    const day = request.day;

    const checkSchedule = await prismaClient.class_Schedule.findFirst({
        where: {
            class_schedule_code: schedule
        }
    });

    if (!checkSchedule) {
        throw new ResponseError(404, 'Schedule is not found');
    }

    const isScheduleExist = await prismaClient.class_Schedule.findFirst({
        where: {
            NOT: [
                {
                    subject_code: checkSchedule.subject_code
                }
            ],
            AND: [
                {
                    OR: [
                        {
                            clock_start: request.clock_start
                        },
                        {
                            clock_end: request.clock_end
                        }
                    ]
                },
                {
                    day: day.toUpperCase()
                }
            ]
        }
    });

    if (isScheduleExist) {
        throw new ResponseError(400, 'Schedule Bentrok')
    }

    return prismaClient.class_Schedule.update({
        where: {
            class_schedule_code: schedule
        },
        data: {
            day: request.day,
            teacher_code: request.teacher_code,
            clock_start: request.clock_start,
            clock_end: request.clock_end
        },
        select: {
            class_schedule_code: true,
            day: true,
            clock_start: true,
            clock_end: true,
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
    })
}

export default {
    create,
    update,
    deleteSubject,
    assignSubjectToClassSchedule,
    days,
    getClassSchedule,
    getSubjectByGrade,
    updateClassSchedule
}

