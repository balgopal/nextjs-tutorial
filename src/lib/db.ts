import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma =
globalForPrisma.prisma ?? 
new PrismaClient({
    log: ['query']
})
if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


const connect = async () => {
    try{
        await prisma.$connect();
    } catch(err){
        return Error("Database connection failed.")
    }
};
  
const disconnect = async () => {
    await prisma.$disconnect();
};

export { prisma, connect, disconnect }