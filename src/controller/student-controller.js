import studentService from "../service/student-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await studentService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const createAddress = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await studentService.createAddress(request);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const allBySchool = async (req, res, next) => {
    try {
        const schoolCode = req.params.schoolCode;

        const request = req.query;

        const result = await studentService.allBySchool(schoolCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const allByFaculty = async (req, res, next) => {
    try {
        const facultyCode = req.params.facultyCode;

        const request = req.query;

        const result = await studentService.allByFaculty(facultyCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const allByMajor = async (req, res, next) => {
    try {
        const majorCode = req.params.majorCode;

        const request = req.query;

        const result = await studentService.allByMajor(majorCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const allByGrade = async (req, res, next) => {
    try {
        const gradeCode = req.params.gradeCode;

        const request = req.query;

        const result = await studentService.allByGrade(gradeCode, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const studentDetail = async (req, res, next) => {
    try {
        const studentCode = req.params.studentCode;

        const result = await studentService.studentDetail(studentCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const addressId = req.params.addressId;

        const request = req.body;

        await studentService.updateAddres(addressId, request);

        res.status(200).json({
            data: 'OK'
        });
    } catch (e) {
        next(e)
    }
}

const assignClass = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await studentService.assignClass(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getStudentClass = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;

        const result = await studentService.getStudentClass(classCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    createAddress,
    allBySchool,
    allByFaculty,
    allByMajor,
    allByGrade,
    studentDetail,
    updateAddress,
    assignClass,
    getStudentClass
}