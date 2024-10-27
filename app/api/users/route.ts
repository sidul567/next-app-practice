// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../db/connection";
import { drizzle } from "drizzle-orm/mysql2";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const user: typeof usersTable.$inferInsert = {
      name: "John Doe",
      age: Math.ceil(Math.random() * 100),
      email: `abc${Math.ceil(Math.random() * 100)}@gmail.com`,
    };

    await db.insert(usersTable).values(user);

    const users = await db.select().from(usersTable);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) {
      return NextResponse.json(
        {
          error: {
            id: ["ID is missing"],
          },
        },
        { status: 422 }
      );
    }

    await db.update(usersTable).set(rest).where(eq(usersTable.id, id));

    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));

    return NextResponse.json({
      status: "success",
      message: "Update successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
