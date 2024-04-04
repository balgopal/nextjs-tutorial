import { NextRequest, NextResponse } from "next/server"; 
import { prisma, connect, disconnect } from "@/lib/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connect();
        const books = await prisma.books.findMany();
        return NextResponse.json({ message: "Success", books}, { status: 200 });
    } catch(err) {
        return NextResponse.json({ message: "Error", err}, { status: 500 });
    } finally{
        await disconnect();
    }

}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { bookTitle, language, publishedYear, category, description } = await req.json();
        await connect();
        const book = await prisma.books.create({ data: { bookTitle, language, publishedYear, category, description }});
        return NextResponse.json({ message: "Success", book }, { status: 200 });
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await disconnect();
    }
}