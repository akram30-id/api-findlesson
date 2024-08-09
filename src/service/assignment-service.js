import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import assignmentModel from "../models/assignment-model.js";
import subjectModel from "../models/subject-model.js";
import { createAssignmentValidation, createMultichoiceValidation, createScoreValidation, getAssignmentFile, getAssignmentValidation, submitAssignmentValidation, updateMultichoiceValidation, updateScoreValidation } from "../validation/assignment-validation.js";
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
            class_code: true,
            title: true,
            due_date: true,
            subjects: {
                select: {
                    subject_code: true,
                    subject_name: true
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

const update = async (assignmentCode, request) => {
    const adjustDate = adjustTimezoneOffset(request.due_date, 7);

    request.due_date = adjustDate;

    request = validate(createAssignmentValidation, request);
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const checkSubject = await subjectModel.getSubject(request.subject_code);

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }
    
    const getAssignment = await assignmentModel.getAssignment(assignmentCode);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found.');
    }


    const checkClass = await prismaClient.class.findFirst({
        where: {
            class_code: request.class_code
        }
    });

    if (!checkClass) {
        throw new ResponseError(404, 'Class is not found.');
    }

    return prismaClient.assignment.update({
        data: {
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
        },
        where: {
            assignment_code: assignmentCode
        }
    });
}

const detail = async (assignmentCode) => {
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const getAssignment = await assignmentModel.getAssignment(assignmentCode);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    return prismaClient.assignment.findFirst({
        where: {
            assignment_code: assignmentCode
        },
        select: {
            assignment_code: true,
            title: true,
            description: true,
            is_multiple: true,
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
                    class_name: true,
                    grade: {
                        select: {
                            grade_code: true,
                            grade_name: true,
                            grade_type: true
                        }
                    }
                }
            }
        }
    })
}

const createFile = async (request) => {
    request = validate(getAssignmentFile, request);

    const getAssignment = assignmentModel.getAssignment(request.assignment_code);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    const generate = uuid().toString();
    const fileCode = generate.substring(0, 8);

    return prismaClient.assignmentFiles.create({
        data: {
            assignment_code: request.assignment_code,
            file_code: fileCode,
            file_path: request.file_path
        },
        select: {
            assignment_code: true,
            file_code: true
        }
    });
}

const getFilesByAssignment = async (assignmentCode) => {
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const getAssignment = await assignmentModel.getAssignment(assignmentCode);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    return prismaClient.assignmentFiles.findMany({
        where: {
            assignment_code: assignmentCode
        },
        select: {
            file_code: true,
            file_path: true
        }
    });
}

const removeFile = async (fileCode) => {
    fileCode = validate(getAssignmentValidation, fileCode);

    const getFile = await prismaClient.assignmentFiles.findFirst({
        where: {
            file_code: fileCode
        }
    });

    if (getFile == null) {
        throw new ResponseError(404, 'File is not found.');
    }

    return prismaClient.assignmentFiles.delete({
        where: {
            file_code: fileCode
        }
    });
}

const createMultichoice = async (request) => {
    request = validate(createMultichoiceValidation, request);

    const getAssignment = await assignmentModel.getAssignment(request.assignment_code);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    const choices = JSON.stringify(request.choices);

    const generate = uuid().toString();
    const assignmentMultiCode = generate.substring(0, 8);

    return prismaClient.assignment_Multichoice.create({
        data: {
            assignment_multi_code: assignmentMultiCode,
            question: request.question,
            answer_key: request.answer_key,
            question_image: request.question_image,
            choices: choices,
            assignment_code: request.assignment_code
        },
        select: {
            assignment_code: true,
            question: true,
            question_image: true,
            assignment_multi_code: true,
            choices: true
        }
    });
}

const getAllMultichoice = async (assignmentCode) => {
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const getAssignment = await assignmentModel.getAssignment(assignmentCode);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found.');
    }

    const results = await prismaClient.assignment_Multichoice.findMany({
        where: {
            assignment_code: assignmentCode
        },
        select: {
            assignment_code: true,
            assignment_multi_code: true,
            question: true,
            choices: true
        }
    });

    // Map hasil query untuk mengubah choices dari string menjadi array
    const updatedResults = results.map(result => {
        return {
            ...result,
            choices: JSON.parse(result.choices) // Mengubah string choices menjadi array
        };
    });

    return updatedResults;
}

const getMultichoiceDetail = async (multichoiceCode) => {
    multichoiceCode = validate(getAssignmentValidation, multichoiceCode);

    let getMultichoice = await prismaClient.assignment_Multichoice.findFirst({
        where: {
            assignment_multi_code: multichoiceCode
        },
        select: {
            assignment_code: true,
            assignment_multi_code: true,
            question: true,
            question_image: true,
            answer_key: true,
            choices: true
        }
    });

    if (!getMultichoice) {
        throw new ResponseError(404, 'Multi-choice question is not found.');
    }

    getMultichoice.choices = JSON.parse(getMultichoice.choices);

    return getMultichoice;
}

const updateMultichoice = async (request) => {
    request = validate(updateMultichoiceValidation, request);

    const getAssignment = await prismaClient.assignment_Multichoice.findFirst({
        where: {
            assignment_multi_code: request.assignment_multi_code
        }
    });

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    const choices = JSON.stringify(request.choices);

    const generate = uuid().toString();
    const assignmentMultiCode = generate.substring(0, 8);

    return prismaClient.assignment_Multichoice.update({
        where: {
            assignment_multi_code: request.assignment_multi_code
        },
        data: {
            assignment_multi_code: assignmentMultiCode,
            question: request.question,
            answer_key: request.answer_key,
            question_image: request.question_image,
            choices: choices,
            assignment_multi_code: request.assignment_multi_code
        },
        select: {
            assignment_code: true,
            question: true,
            question_image: true,
            assignment_multi_code: true,
            choices: true
        }
    });
}

const deleteMultichoice = async (multichoiceCode) => {
    multichoiceCode = validate(getAssignmentValidation, multichoiceCode);

    const getAssignment = await prismaClient.assignment_Multichoice.findFirst({
        where: {
            assignment_multi_code: multichoiceCode
        }
    });

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found');
    }

    return prismaClient.assignment_Multichoice.delete({
        where: {
            assignment_multi_code: multichoiceCode
        }
    });
}

const submitAssignment = async (request) => {
    request = validate(submitAssignmentValidation, request);

    const getAssignment = await assignmentModel.getAssignment(request.assignment_code);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found.');
    }

    const getStudent = await prismaClient.students.findFirst({
        where: {
            student_code: request.student_code
        }
    });

    if (!getStudent) {
        throw new ResponseError(404, 'Student is not found.');
    }

    const classCode = getAssignment.class_code;

    const getStudentClass = await prismaClient.student_Class.findFirst({
        where: {
            student_code: request.student_code,
            class_code: classCode
        }
    });

    if (!getStudentClass) {
        throw new ResponseError(403, 'Invalid: assignment only allow to accessed by ' + classCode + ' class members');
    }

    const generate = uuid().toString();
    const assignmentSubmitCode = generate.substring(0, 8);

    return prismaClient.assignment_Submit.create({
        data: {
            assignment_submit_code: assignmentSubmitCode,
            submit_file: request.submit_file,
            submit_note: request.submit_note,
            assignment_code: request.assignment_code,
            student_code: request.student_code
        },
        select: {
            assignment_submit_code: true,
            student_code: true,
            submit_file: true,
            submit_note: true,
            assignment: {
                select: {
                    assignment_code: true,
                    due_date: true,
                    title: true
                }
            }
        }
    })
}

const getAllSubmissions = async (assignmentCode) => {
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const getAssignment = await assignmentModel.getAssignment(assignmentCode);

    if (!getAssignment) {
        throw new ResponseError(404, 'Assignment is not found.');
    }

    return prismaClient.assignment_Submit.findMany({
        where: {
            assignment_code: assignmentCode
        },
        select: {
            assignment_code: true,
            assignment_submit_code: true,
            student: {
                select: {
                    student_code: true,
                    student_name: true
                }
            }
        }
    })
}

const getSubmissionDetail = async (submitCode) => {
    submitCode = validate(getAssignmentValidation, submitCode);

    const getSubmission = await prismaClient.assignment_Submit.findFirst({
        where: {
            assignment_submit_code: submitCode
        },
        select: {
            assignment_submit_code: true,
            submit_note: true,
            submit_file: true,
            student: {
                select: {
                    student_code: true,
                    student_name: true,
                    student_class: true
                }
            },
            assignment: {
                select: {
                    assignment_code: true,
                    title: true,
                    description: true,
                    due_date: true
                }
            }
        }
    });

    if (!getSubmission) {
        throw new ResponseError(404, 'Submission is not found.');
    }

    return getSubmission;
}

const getSubmissionStudent = async (assignmentCode, studentCode) => {
    studentCode = validate(getAssignmentValidation, studentCode);
    assignmentCode = validate(getAssignmentValidation, assignmentCode);

    const getSubmission = await prismaClient.assignment_Submit.findMany({
        where: {
            assignment_code: assignmentCode,
            student_code: studentCode
        },
        select: {
            assignment_submit_code: true,
            submit_note: true,
            submit_file: true,
            student: {
                select: {
                    student_code: true,
                    student_name: true,
                    student_class: true
                }
            },
            assignment: {
                select: {
                    assignment_code: true,
                    title: true,
                    description: true,
                    due_date: true
                }
            }
        }
    });

    if (!getSubmission) {
        throw new ResponseError(404, 'Submission is not found.');
    }

    return getSubmission;
}

const createScore = async (request) => {
    request = validate(createScoreValidation, request);

    const getSubmission = await prismaClient.assignment_Submit.findFirst({
        where: {
            assignment_submit_code: request.assignment_submit_code
        }
    });

    if (!getSubmission) {
        throw new ResponseError(404, 'Submission is not found')
    }

    const getClass = await prismaClient.class.findFirst({
        include: {
            assignment: {
                where: {
                    assignment_code: getSubmission.assignment_code
                },
                select: {
                    class_code: true
                }
            }
        }
    });

    const getTeacher = await prismaClient.class_Schedule.findFirst({
        where: {
            class_code: getClass.class_code
        },
        select: {
            teacher_code: true
        }
    });

    if (request.teacher_code != getTeacher.teacher_code) {
        throw new ResponseError(403, 'Akses ditolak.');
    }

    const isTeacherSubjectExist = await prismaClient.teacherSubject.findFirst({
        where: {
            subject_code: request.subject_code
        }
    });

    if (isTeacherSubjectExist) {
        throw new ResponseError(400, 'Mata pelajaran sudah diampu.')
    }

    const generate = uuid().toString();
    const assignmentScoreCode = generate.substring(0, 8);

    return prismaClient.assignment_Score.create({
        data: {
            assignment_score_code: assignmentScoreCode,
            assign_submit_code: request.assignment_submit_code,
            score: request.score,
            student_code: getSubmission.student_code,
            teacher_code: user.username
        },
        select: {
            assignment_score_code: true,
            score: true,
            assign_submit_code: true,
            student_code: true,
            teacher_code: true
        }
    })
}

const updateScore = async (request) => {
    request = validate(updateScoreValidation, request);

    const getSubmission = await prismaClient.assignment_Score.findFirst({
        include: {
            assign_submits: {
                select: {
                    assignment_code: true
                }
            }
        },
        where: {
            assignment_score_code: request.assignment_score_code
        }
    });

    if (!getSubmission) {
        throw new ResponseError(404, 'Penilaian tidak ditemukan.')
    }

    const getClass = await prismaClient.class.findFirst({
        include: {
            assignment: {
                where: {
                    assignment_code: getSubmission.assignment_code
                },
                select: {
                    class_code: true
                }
            }
        }
    });

    const getTeacher = await prismaClient.class_Schedule.findFirst({
        where: {
            class_code: getClass.class_code
        },
        select: {
            teacher_code: true
        }
    });

    if (request.teacher_code != getTeacher.teacher_code) {
        throw new ResponseError(403, 'Akses ditolak.');
    }

    const isTeacherSubjectExist = await prismaClient.teacherSubject.findFirst({
        where: {
            subject_code: request.subject_code
        }
    });

    if (isTeacherSubjectExist) {
        throw new ResponseError(400, 'Mata pelajaran sudah diampu.')
    }

    return prismaClient.assignment_Score.update({
        data: {
            score: request.score
        },
        select: {
            assignment_score_code: true,
            score: true,
            assign_submit_code: true,
            student_code: true,
            teacher_code: true
        }
    })
}

export default {
    create,
    getByClassSubject,
    deleteAssignment,
    update,
    detail,
    createFile,
    getFilesByAssignment,
    removeFile,
    createMultichoice,
    getAllMultichoice,
    getMultichoiceDetail,
    updateMultichoice,
    deleteMultichoice,
    submitAssignment,
    getAllSubmissions,
    getSubmissionDetail,
    getSubmissionStudent,
    createScore,
    updateScore
}