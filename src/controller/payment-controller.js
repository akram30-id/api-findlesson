import paymentService from "../service/payment-service.js";

const getStatusPayment = async (req, res, next) => {
    try {
        const orderID = req.params.orderID;

        const statusService = await paymentService.get(orderID);

        res.status(200).json({
            data: statusService
        });
    } catch (e) {
        next(e)
    }
}

export default {
    getStatusPayment
}