import { NextResponse } from "next/server";
import * as z from "zod";
import { PrismaClient } from "@prisma/client";
import { itemFormSchema, itemSchema } from "../types";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const reqJson = await req.json();
    const item = itemFormSchema.parse(reqJson);
    await prisma.item.create({ data: item });
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const reqJson = await req.json();
    const item = itemSchema.parse(reqJson);
    await prisma.item.update({ where: { id: item.id }, data: item });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const schema = z.object({ id: z.number() });
  try {
    const reqJson = await req.json();
    const { id: number } = schema.parse(reqJson);
    await prisma.item.delete({ where: { id: number } });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
