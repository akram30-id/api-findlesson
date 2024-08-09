// import { prismaClient } from "../../src/application/database.js";

import { PrismaClient } from "@prisma/client";

const dataProvince = [
    {
        "code": "ACH",
        "nama": "ACEH"
    },
    {
        "code": "SUT",
        "nama": "SUMATERA UTARA"
    },
    {
        "code": "SBA",
        "nama": "SUMATERA BARAT"
    },
    {
        "code": "RIA",
        "nama": "RIAU"
    },
    {
        "code": "JBI",
        "nama": "JAMBI"
    },
    {
        "code": "SUS",
        "nama": "SUMATERA SELATAN"
    },
    {
        "code": "BKL",
        "nama": "BENGKULU"
    },
    {
        "code": "LPG",
        "nama": "LAMPUNG"
    },
    {
        "code": "KBB",
        "nama": "KEPULAUAN BANGKA BELITUNG"
    },
    {
        "code": "KPR",
        "nama": "KEPULAUAN RIAU"
    },
    {
        "code": "JKT",
        "nama": "DKI JAKARTA"
    },
    {
        "code": "JB",
        "nama": "JAWA BARAT"
    },
    {
        "code": "JT",
        "nama": "JAWA TENGAH"
    },
    {
        "code": "DIY",
        "nama": "DAERAH ISTIMEWA YOGYAKARTA"
    },
    {
        "code": "JTI",
        "nama": "JAWA TIMUR"
    },
    {
        "code": "BTN",
        "nama": "BANTEN"
    },
    {
        "code": "BLI",
        "nama": "BALI"
    },
    {
        "code": "NTB",
        "nama": "NUSA TENGGARA BARAT"
    },
    {
        "code": "NTT",
        "nama": "NUSA TENGGARA TIMUR"
    },
    {
        "code": "KLB",
        "nama": "KALIMANTAN BARAT"
    },
    {
        "code": "KTG",
        "nama": "KALIMANTAN TENGAH"
    },
    {
        "code": "KLS",
        "nama": "KALIMANTAN SELATAN"
    },
    {
        "code": "KTT",
        "nama": "KALIMANTAN TIMUR"
    },
    {
        "code": "KTU",
        "nama": "KALIMANTAN UTARA"
    },
    {
        "code": "SLU",
        "nama": "SULAWESI UTARA"
    },
    {
        "code": "SLT",
        "nama": "SULAWESI TENGAH"
    },
    {
        "code": "SLS",
        "nama": "SULAWESI SELATAN"
    },
    {
        "code": "SLG",
        "nama": "SULAWESI TENGGARA"
    },
    {
        "code": "GT",
        "nama": "GORONTALO"
    },
    {
        "code": "SLB",
        "nama": "SULAWESI BARAT"
    },
    {
        "code": "MLK",
        "nama": "MALUKU"
    },
    {
        "code": "MLU",
        "nama": "MALUKU UTARA"
    },
    {
        "code": "PA",
        "nama": "PAPUA"
    },
    {
        "code": "PB",
        "nama": "PAPUA BARAT"
    }
];

export const prisma = new PrismaClient();

export const createProvince = async () => {
    try {
        dataProvince.forEach(province => {
            prisma.province.upsert({
                where: {
                    province_code: province.code
                },
                create: {
                    province_code: province.code,
                    province_name: province.nama
                },
                update: {}
            });
        });

        console.info("Database has been seeded")
    } catch (e) {
        console.info(e)
    }
}