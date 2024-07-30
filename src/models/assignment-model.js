import { prismaClient } from "../application/database.js";

const getAssignment = async (assignmentCode) => {
    return prismaClient.assignment.findFirst({
        where: {
            assignment_code: assignmentCode
        }
    });
}

export default {
    getAssignment
}