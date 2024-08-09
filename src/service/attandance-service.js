import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { attandanceCodeValidation, clockInValidation } from "../validation/attandance-validation.js"
import { validate } from "../validation/validation.js"
import { v4 as uuid } from "uuid";

const create = async (request, isClockOut, attandanceCode) => {
    request = validate(clockInValidation, request);

    if (isClockOut) {
        attandanceCode = validate(attandanceCodeValidation, attandanceCode);
    }

    const checkStudent = await prismaClient.students.findFirst({
        where: {
            school_code: request.school_code,
            student_code: request.student_code
        }
    });

    if (!checkStudent) {
        throw new ResponseError(404, 'Student is not found.');
    }

    const dateNow = new Date();
    const clockHour = (dateNow.getHours() < 10) ? '0' + dateNow.getHours() : dateNow.getHours();
    const clockMinutes = (dateNow.getMinutes() < 10) ? '0' + dateNow.getMinutes() : dateNow.getMinutes();

    const clockIn = clockHour + ':' + clockMinutes;

    const getGrade = await prismaClient.grade.findFirst({
        where: {
            grade_code: checkStudent.grade_code
        }
    });

    let status = "ontime";

    if (getGrade.grade_type == "SMA") {
        let getSchool = await prismaClient.school.findFirst({
            where: {
                school_code: checkStudent.school_code
            }
        });

        const schoolClockIn = getSchool.clock_in_limit.split(':');
        const schoolClockOut = getSchool.clock_out_limit.split(':');

        if (!isClockOut) {
            if (clockHour > schoolClockIn[0] && clockMinutes > schoolClockIn[1]) {
                status = "late";
            }
        } else {
            if (clockHour < schoolClockOut[0] && clockMinutes < schoolClockOut[1]) {
                status = "early";
            }
        }
    }

    const dataTransaction = {
        student_code: request.student_code,
        school_code: request.school_code,
        clock_in: clockIn,
        clock_out: '-',
        signature: request.signature,
        status: status
    };

    const selectTransaction = {
        attandence_code: true,
        student: {
            select: {
                student_code: true,
                student_name: true
            }
        },
        signature: true,
        status: true
    };

    if (!isClockOut) {
        const generate = uuid().toString();
        attandanceCode = generate.substring(0, 8);

        dataTransaction['attandence_code'] = attandanceCode;

        return prismaClient.attandence.create({
            data: dataTransaction,
            select: selectTransaction
        });
    }

    return prismaClient.attandence.update({
        where: {
            attandence_code: attandanceCode
        },
        data: dataTransaction,
        select: selectTransaction
    });
}

export default {
    create
}