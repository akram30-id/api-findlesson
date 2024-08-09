import { prismaClient } from "../application/database.js";

const getClass = async (classCode) => {
    return prismaClient.class.findFirst({
        where: {
            class_code: classCode
        }
    })
}

export default {
    getClass
}