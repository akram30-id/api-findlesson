import { prismaClient } from "../application/database.js"

const getSubject = async (subjectCode) => {
    return prismaClient.subject.findFirst({
        where: {
            subject_code: subjectCode
        }
    });
}

export default {
    getSubject
}