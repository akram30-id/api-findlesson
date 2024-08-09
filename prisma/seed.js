import { createProvince, prisma } from "./master/province.js"

const main = async () => {
    createProvince()
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.info(e);
    await prisma.$disconnect();
    process.exit(1);
})