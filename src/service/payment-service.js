import midtrans from "../integration/midtrans.js"

const get = async (orderID) => {
    const getStatus = midtrans.getStatus(orderID);

    return getStatus;
}

export default {
    get
}