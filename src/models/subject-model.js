import { prismaClient } from "../application/database.js"

const getSubject = async (subjectCode) => {
    return prismaClient.subject.findFirst({
        where: {
            subject_code: subjectCode
        }
    });
}

const getSubjectClass = async (subjectClassCode) => {
    return prismaClient.class_Subject.findFirst({
        where: {
            class_subject_code: subjectClassCode
        },
        select: {
            subject_code: true,
            class_code: true,
            subject: {
                select: {
                    teacher_code: true
                }
            }
        }
    });
}

const getSubjects = async (subjectCode) => {
    return prismaClient.class_Subject.findMany({
        where: {
            subject_code: subjectCode
        },
        select: {
            subject_code: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true,
                    teacher: {
                        select: {
                            teacher_code: true,
                            name: true
                        }
                    }
                }
            }
        }
    });
}

export default {
    getSubject,
    getSubjectClass,
    getSubjects
}