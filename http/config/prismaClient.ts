import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
console.log("Primsa client is initiated")

export default prisma; 