import { prismaClient } from "../application/database.js";

export const getMajor = async (majorCode) => {

    return prismaClient.major.findFirst({
        where: {
            major_code: majorCode
        },
        select: {
            major_code: true,
            major_name: true,
            faculty: {
                select: {
                    faculty_code: true,
                    faculty_name: true
                }
            }
        }
    })

}