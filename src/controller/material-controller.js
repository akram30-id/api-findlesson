import materialService from "../service/material-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await materialService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body;

        const material = req.params.materialCode;

        const result = await materialService.update(material, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getMaterial = async (req, res, next) => {
    try {
        const subjectCode = req.params.subjectCode;

        const result = await materialService.getMaterial(subjectCode);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const deleteMaterial = async (req, res, next) => {
    try {
        const material = req.params.materialCode;

        const result = await materialService.deleteMaterial(material);

        res.status(200).json({
            data: "ok"
        })
    } catch (e) {
        next(e)
    }
}

const searchMaterial = async (req, res, next) => {
    try {
        const grade = req.params.gradeCode;

        const search = req.query.search;

        const result = await materialService.searchByTitle(grade, search);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    getMaterial,
    deleteMaterial,
    searchMaterial
}