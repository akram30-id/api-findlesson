import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import { getClassValidation } from "../validation/class-validation.js";
import { getFacultyValidation } from "../validation/faculty-validation.js";
import { getGradeValidation } from "../validation/grade-validation.js";
import { getMajorValidation } from "../validation/major-validation.js";
import { getSchoolValidation } from "../validation/school-validation.js";
import { createStudentAddressValidation, createStudentValidation, getAllStudentValidation, getStudentAddressValidation, getStudentValidation, studentAssignToClassValidation, updateStudentAddressValidation } from "../validation/student-validation.js"
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';

const create = async (request) => {
    request = validate(createStudentValidation, request);

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: request.school_code
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found');
    }

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: request.faculty_code,
            school_code: school.school_code
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: request.major_code,
            faculty_code: faculty.faculty_code
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: request.grade_code,
            major_code: major.major_code
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    const generate = uuid().toString();
    let studentCode = generate.substring(0, 8);

    const save = await prismaClient.students.create({
        data: {
            student_code: studentCode,
            student_name: request.student_name,
            school_code: request.school_code,
            faculty_code: request.faculty_code,
            major_code: request.major_code,
            grade_code: request.grade_code
        }
    });

    const studentId = (save.id).toString();

    const date = new Date();

    studentCode = date.getFullYear() + studentId.padStart(5, "0");

    registerStudentAsUser(studentCode);

    return prismaClient.students.update({
        where: {
            id: parseInt(studentId)
        },
        data: {
            student_code: studentCode
        },
        select: {
            student_code: true,
            student_name: true,
            grade: true,
            major: true,
            school: true,
            student_address: true
        }
    });
}


/**
 * Register a student as user, so they can logging in.
 * 
 * @param {String} studentCode 
 */
const registerStudentAsUser = async (studentCode) => {
    const password = await bcrypt.hash('default', 10);

    return prismaClient.user.create({
        data: {
            email: studentCode + '@findlesson.com',
            password: password,
            username: studentCode ,
            role: 'student'
        }
    })
}

const createAddress = async (request) => {
    request = validate(createStudentAddressValidation, request);

    const student = await prismaClient.students.findFirst({
        where: {
            student_code: request.student_code
        }
    });

    if (!student) {
        throw new ResponseError(404, 'Student is not found');
    }

    const district = await prismaClient.district.findFirst({
        where: {
            district_code: request.district_code
        }
    });

    if (!district) {
        throw new ResponseError(404, 'District is not found');
    }

    const studentAddress = await prismaClient.student_Address.count({
        where: {
            student_code: request.student_code
        }
    });

    if (studentAddress >= 3) {
        throw new ResponseError(404, 'Alamat siswa sudah mencapai maximum.');
    }

    return prismaClient.student_Address.create({
        data: {
            complete_address: request.complete_address,
            district_code: request.district_code,
            student_code: request.student_code
        }
    })
}

const allBySchool = async (schoolCode, request) => {
    schoolCode = validate(getSchoolValidation, schoolCode);
    request = validate(getAllStudentValidation, request);

    const skip = (request.page - 1) * request.size;

    const school = await prismaClient.school.findFirst({
        where: {
            school_code: schoolCode
        }
    });

    if (!school) {
        throw new ResponseError(404, 'School is not found');
    }

    const students = await prismaClient.students.findMany({
        where: {
            school_code: schoolCode
        },
        select: {
            student_name: true,
            student_code: true,
            major: {
                select: {
                    major_name: true
                }
            },
            grade: {
                select: {
                    grade_name: true
                }
            },
            faculty_code: true
        },
        take: request.size,
        skip: skip
    });

    const total_items = students.length;

    let result = {};
    result.school_name = school.school_name;
    result.paging = {
        page: request.page,
        total_items: total_items,
        total_page: Math.ceil(total_items / request.size)
    };
    result.students = students;

    return result;
}

const allByFaculty = async (facultyCode, request) => {
    facultyCode = validate(getFacultyValidation, facultyCode);
    request = validate(getAllStudentValidation, request);

    const skip = (request.page - 1) * request.size;

    const faculty = await prismaClient.faculty.findFirst({
        where: {
            faculty_code: facultyCode
        }
    });

    if (!faculty) {
        throw new ResponseError(404, 'Faculty is not found');
    }

    const students = await prismaClient.students.findMany({
        where: {
            faculty_code: facultyCode,
            school_code: faculty.school_code
        },
        select: {
            student_name: true,
            student_code: true,
            major: {
                select: {
                    major_name: true,
                    major_code: true
                }
            },
            grade: {
                select: {
                    grade_name: true
                }
            }
        },
        take: request.size,
        skip: skip
    });

    const total_items = students.length;

    let result = {};
    result.faculty_name = faculty.faculty_name;
    result.paging = {
        page: request.page,
        total_items: total_items,
        total_page: Math.ceil(total_items / request.size)
    };
    result.students = students;

    return result;
}

const allByMajor = async (majorCode, request) => {
    majorCode = validate(getMajorValidation, majorCode);
    request = validate(getAllStudentValidation, request);

    const skip = (request.page - 1) * request.size;

    const major = await prismaClient.major.findFirst({
        where: {
            major_code: majorCode
        }
    });

    if (!major) {
        throw new ResponseError(404, 'Major is not found');
    }

    const students = await prismaClient.students.findMany({
        where: {
            major_code: majorCode,
            faculty_code: major.faculty_code
        },
        select: {
            student_name: true,
            student_code: true,
            grade: {
                select: {
                    grade_name: true,
                    grade_code: true
                }
            }
        },
        take: request.size,
        skip: skip
    });

    const total_items = students.length;

    let result = {};
    result.major_name = major.major_name;
    result.paging = {
        page: request.page,
        total_items: total_items,
        total_page: Math.ceil(total_items / request.size)
    };
    result.students = students;

    return result;
}

const allByGrade = async (gradeCode, request) => {
    gradeCode = validate(getGradeValidation, gradeCode);
    request = validate(getAllStudentValidation, request);

    const skip = (request.page - 1) * request.size;

    const grade = await prismaClient.grade.findFirst({
        where: {
            grade_code: gradeCode
        }
    });

    if (!grade) {
        throw new ResponseError(404, 'Grade is not found');
    }

    const students = await prismaClient.students.findMany({
        where: {
            grade_code: gradeCode,
            major_code: grade.major_code
        },
        select: {
            student_name: true,
            student_code: true,
            student_address: {
                select: {
                    complete_address: true,
                    district: {
                        select: {
                            district_code: true,
                            district_name: true,
                            city: {
                                select: {
                                    city_name: true,
                                    province: {
                                        select: {
                                            province_name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        take: request.size,
        skip: skip
    });

    const total_items = students.length;

    let result = {};
    result.grade_name = grade.grade_name;
    result.paging = {
        page: request.page,
        total_items: total_items,
        total_page: Math.ceil(total_items / request.size)
    };
    result.students = students;

    return result;
}

const studentDetail = async (studentCode) => {
    studentCode = validate(getStudentValidation, studentCode);

    const student = await prismaClient.students.findFirst({
        where: {
            student_code: studentCode
        },
        select: {
            student_code: true,
            student_name: true,
            student_address: {
                select: {
                    complete_address: true,
                    id: true
                }
            },
            grade: {
                select: {
                    grade_name: true,
                    grade_code: true
                }
            },
            major: {
                select: {
                    major_name: true,
                    major_code: true
                }
            },
            school: {
                select: {
                    school_code: true,
                    school_name: true
                }
            }
        }
    });

    if (!student) {
        throw new ResponseError(404, 'Student is not found.');
    }

    return student;
}

const updateAddres = async (addressId, request) => {
    addressId = validate(getStudentAddressValidation, addressId);
    request = validate(updateStudentAddressValidation, request);

    const studentAddress = await prismaClient.student_Address.findFirst({
        where: {
            id: addressId
        }
    });

    if (!studentAddress) {
        throw new ResponseError(404, 'Student Address is not found');
    }

    const district = await prismaClient.district.findFirst({
        where: {
            district_code: request.district_code
        }
    });

    if (!district) {
        throw new ResponseError(404, 'District is not found');
    }

    return prismaClient.student_Address.update({
        where: {
            id: addressId
        },
        data: {
            complete_address: request.complete_address,
            district_code: request.district_code
        }
    })
}

const assignClass = async (request) => {
    request = validate(studentAssignToClassValidation, request);

    const student = await prismaClient.students.findFirst({
        where: {
            student_code: request.student_code
        }
    });

    if (!student) {
        throw new ResponseError(404, 'Student is not found');
    }

    // ambil kelas berdasarkan grade si student
    const getClass = await prismaClient.class.findFirst({
        where: {
            class_code: request.class_code,
            grade_code: student.grade_code
        }
    });

    if (!getClass) {
        throw new ResponseError(404, 'Class is not found.')
    }

    // cek ke table, apakah student yg ingin di-assign sudah ada di sebuah kelas
    const studentClass = await prismaClient.student_Class.count({
        where: {
            student_code: request.student_code
        }
    });

    if (studentClass > 0) {
        throw new ResponseError(403, 'Murid sudah terdaftar di dalam kelas');
    }

    const generate = uuid().toString();
    const studentClassCode = generate.substring(0, 8);

    return prismaClient.student_Class.create({
        data: {
            student_class_code: studentClassCode,
            class_code: request.class_code,
            student_code: request.student_code
        },
        select: {
            student_class_code: true,
            student: {
                select: {
                    student_code: true,
                    student_name: true,
                    grade: {
                        select: {
                            grade_name: true,
                            grade_code: true
                        }
                    }
                }
            },
            class: {
                select: {
                    class_code: true,
                    class_name: true
                }
            },
        }
    });
}

const getStudentClass = async (classCode) => {
    classCode = validate(getClassValidation, classCode);

    const studentClass = await prismaClient.student_Class.findMany({
        where: {
            class_code: classCode
        },
        select: {
            student_class_code: true,
            student_code: true,
            student: {
                select: {
                    student_name: true
                }
            },
            class: {
                select: {
                    class_code: true,
                    class_name: true
                }
            }
        }
    });

    return studentClass;
}

export default {
    create,
    createAddress,
    allBySchool,
    allByFaculty,
    allByMajor,
    allByGrade,
    studentDetail,
    updateAddres,
    assignClass,
    getStudentClass
}