import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getGradeValidation } from "../validation/grade-validation.js";
import { createMaterialValidation, materialCodeValidation, updateMaterialValidation } from "../validation/material-validation.js"
import { getSubjectValidation } from "../validation/subject-validation.js";
import { validate } from "../validation/validation.js"
import { v4 as uuid } from "uuid";

const create = async (request) => {
    request = validate(createMaterialValidation, request);

    const checkSubject = await prismaClient.subject.findFirst({
        where: {
            subject_code: request.subject_code
        }
    });

    if (!checkSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    const generate = uuid().toString();
    const materialCode = generate.substring(0, 8);

    let material = '-';

    if (request.material_files) {
        material = request.material_files;
    }

    return prismaClient.materials.create({
        data: {
            subject_code: request.subject_code,
            description: request.description,
            material_files: material,
            title: request.title,
            subtitle: request.subtitle,
            material_code: materialCode
        },
        select: {
            title: true,
            subtitle: true,
            material_code: true,
            description: true,
            material_files: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true,
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

const getMaterial = async (subject) => {
    subject = validate(getSubjectValidation, subject);

    const getSubject = await prismaClient.materials.findFirst({
        where: {
            subject_code: subject
        }
    });

    if (!getSubject) {
        throw new ResponseError(404, 'Subject is not found.');
    }

    return prismaClient.materials.findMany({
        where: {
            subject_code: subject
        },
        select: {
            material_code: true,
            title: true,
            subtitle: true,
            description: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true
                }
            }
        }
    })
}

const update = async (materialCode, request) => {
    materialCode = validate(materialCodeValidation, materialCode);

    request = validate(updateMaterialValidation, request);

    const checkMaterial = await prismaClient.materials.findFirst({
        where: {
            material_code: materialCode
        }
    });

    if (!checkMaterial) {
        throw new ResponseError(404, 'Material is not found');
    }

    return prismaClient.materials.update({
        where: {
            material_code: materialCode
        },
        data: {
            description: request.description,
            title: request.title,
            subtitle: request.subtitle
        }
    });
}

const deleteMaterial = async (material) => {
    material = validate(materialCodeValidation, material);

    const checkMaterial = await prismaClient.materials.findFirst({
        where: {
            material_code: material
        }
    });

    if (!checkMaterial) {
        throw new ResponseError(404, 'Material is not found.');
    }

    return prismaClient.materials.delete({
        where: {
            material_code: material
        }
    });
}

const searchByTitle = async (grade, title) => {

    grade = validate(getGradeValidation, grade);

    const checkGrade = await prismaClient.grade.findFirst({
        where: {
            grade_code: grade
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found.');
    }

    const materials = await prismaClient.materials.findMany({
        where: {
            subject: {
                grade_code: grade
            },
            title: {
                contains: title
            }
        },
        select: {
            title: true,
            subtitle: true,
            description: true,
            material_code: true,
            material_files: true,
            subject: {
                select: {
                    subject_code: true,
                    subject_name: true
                }
            }
        }
    });

    return materials;
}

export default {
    create,
    update,
    getMaterial,
    deleteMaterial,
    searchByTitle
}