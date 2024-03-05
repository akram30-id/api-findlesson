import axios from "axios";
import { logger } from "../application/logging.js";

const instance = axios.create({
    baseURL: 'https://api.sandbox.midtrans.com/v2',
    timeout: 5000,
    headers: {
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1JUUJNR2s3NTQ4UW1vX2ozWjF5eWFXX2Q='
    }
});

const getStatus = (orderID) => {
    return new Promise((resolve, reject) => {
        instance.get(`/${orderID}/status`)
            .then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
    })
}

export default {
    getStatus
}