import { NextResponse, NextRequest } from "next/server";
import { prisma, connect, disconnect } from "@/lib/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try{
        const id = req.url.split("/books/")[1];
        await connect();
        const book = await prisma.books.findFirst({ where: {id} });
        if(!book)
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        return NextResponse.json({ message: "Success", book }, { status: 200});
    } catch(err) {
        return NextResponse.json({ message: "Error", err}, { status: 500 });
    } finally{
        await disconnect();
    }
}

export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
        const id = req.url.split("/books/")[1];
        const { bookTitle, language, publishedYear, category, description } = await req.json();
        await connect();
        const exist = await prisma.books.findFirst({ where: {id} });
        if(!exist)
            return NextResponse.json({ message: "Not Found "}, { status: 404 });
        const book = await prisma.books.update({
            data: { bookTitle, language, publishedYear, category, description },
            where: {id}
        });
        return NextResponse.json({ message: "Success", book }, { status: 200 });
    } catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await disconnect();
    }
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    try {
        const id = req.url.split("/books/")[1];
        await connect();
        const exist = await prisma.books.findFirst({ where: {id} });
        if(!exist)
            return NextResponse.json({ message: "Not Found"}, { status: 404 })
        const book = await prisma.books.delete({
            where: {id}
        });
        return NextResponse.json({ message: "Success", book }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await disconnect();
    }
}