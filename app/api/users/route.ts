import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // await prisma.user.create({
    //   data: {
    //     email: `y2Bt${Math.ceil(Math.random() * 100)}@example.com`,
    //     name: "John Doe",
    //   },
    // });

    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || 10;
    const page = searchParams.get("page") || 1;

    const users = await prisma.user.findMany({
      skip: limit * (Number(page) - 1),
      take: limit,
    });

    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      status: "success",
      message: "Users retrived successfully",
      data: {
        current_page: page || 1,
        data: users,
        last_page: Math.ceil(totalUsers / limit),
        total: totalUsers,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err?.message,
      },
      { status: 400 }
    );
  }
}
