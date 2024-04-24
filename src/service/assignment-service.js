import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import subjectModel from "../models/subject-model.js";
import { createAssignmentValidation, getAssignmentValidation } from "../validation/assignment-validation.js";
import { getClassValidation } from "../validation/class-validation.js";
import { getSubjectValidation } from "../validation/subject-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

// Function to adjust timezone offset
const adjustTimezoneOffset = (dateString, timezoneOffset) => {
    const date = new Date(dateString);
    const offsetInMilliseconds = timezoneOffset * 60 * 60 * 1000;
    const adjustedDate = new Date(date.getTime() + offsetInMilliseconds);
    return adjustedDate.toISOString();
}

const create = async (request) => {
    const adjustDate = adjustTimezoneOffset(request.due_date, 7);

    request.due_date = adjustDate;

    request = validate(createAssignmentValidation, request);

    const checkSubject = await subjectModel.getSubject(request.subject_code);

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const checkClass = await prismaClient.class.findFirst({
        where: {
            class_code: request.class_code
        }
    });

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found.');
    }

    const generate = uuid().toString();
    const assignmentCode = generate.substring(0, 8);

    return prismaClient.assignment.create({
        data: {
            assignment_code: assignmentCode,
            assignment_files: request.assignment_files,
            title: request.title,
            description: request.description,
            due_date: request.due_date,
            class_code: request.class_code,
            subject_code: request.subject_code
        },
        select: {
            assignment_code: true,
            title: true,
            description: true,
            due_date: true,
            subjects: {
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
            }
        }
    })
}

const getByClassSubject = async (classCode, subject) => {
    subject = validate(getSubjectValidation, subject);
    classCode = validate(getClassValidation, classCode);

    const checkSubject = subjectModel.getSubject(subject);

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const checkClass = await prismaClient.class.findFirst({
        where: {
            class_code: classCode
        }
    });

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found.');
    }

    return prismaClient.assignment.findMany({
        where: {
            subject_code: subject,
            class_code: classCode
        },
        select: {
            assignment_code: true,
            assignment_files: true,
            class_code: true,
            title: true,
            description: true,
            due_date: true,
            subjects: {
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
            }
        }
    })
}

const deleteAssignment = async (assignment) => {
    assignment = validate(getAssignmentValidation, assignment);

    const checkAssignment = await prismaClient.assignment.findFirst({
        where: {
            assignment_code: assignment
        }
    });

    if (!checkAssignment) {
        throw new ResponseError(404, 'Assignment is not found.');
    }

    return prismaClient.assignment.delete({
        where: {
            assignment_code: assignment
        }
    });
}

export default {
    create,
    getByClassSubject,
    deleteAssignment
}