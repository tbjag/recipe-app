import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    // const cuisine = await prisma.cuisine.createMany({
    //     data: [
    //       { name: 'American' },
    //       { name: 'Surinamese' },
    //       { name: 'Swiss' },
    //       { name: 'Brazilian'},
    //     ],
    //   })
    const cuisine = await prisma.cuisine.findMany()
    console.log(cuisine)
}

main().catch(e => {
    console.log(e.message)
}).finally(async () => {
    await prisma.$disconnect()
})