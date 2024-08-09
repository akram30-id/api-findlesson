import { prismaClient } from "../application/database.js";

const getFaculty = async (facultyCode) => {
    return prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        },
        select: {
            faculty_name: true,
            school_code: true,
            faculty_code: true,
            id: true
        }
    })
}

export default {
    getFaculty
}