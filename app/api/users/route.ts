import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.user.updateMany({
      where: {
        age: null,
      },
      data: {
        age: 0,
      },
    });
    await prisma.user.create({
      data: {
        email: `abc${Math.ceil(Math.random() * 100)}@gmail.com`,
        name: "hello",
        age: 120
      },
    });

    const users = await prisma.user.findMany();
    return NextResponse.json(
      {
        status: "success",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      { status: 404 }
    );
  }
}
