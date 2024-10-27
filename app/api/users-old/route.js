import { NextResponse } from "next/server";
import pool from "../../libs/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parser
    },
};

async function ensureDirectoryExists(dir) {
    try {
        await mkdir(dir, { recursive: true });
    } catch (error) {
        console.error("Error creating directory:", error);
        throw new Error("Failed to create directory.");
    }
}

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const s = searchParams.get("s");
        const limit = parseInt(searchParams.get("limit"), 10) || 10; // Default limit to 10 if not provided
        const page = parseInt(searchParams.get("page"), 10) || 1; // Default page to 1 if not provided

        if (limit <= 0 || page <= 0) {
            return NextResponse.json({
                error: "Invalid limit or page number."
            }, { status: 400 });
        }

        const offset = (page - 1) * limit;

        const db = await pool.getConnection();
        let query = 'SELECT * FROM account WHERE email LIKE ? OR username LIKE ?';

        // Add pagination to the query
        query += ` LIMIT ? OFFSET ?`;
        const [rows] = await db.execute(query, [`%${s || ""}%`, `%${s || ""}%`, limit, offset]);

        // Fetch total count for pagination info
        const countQuery = 'SELECT COUNT(*) AS total FROM account WHERE email LIKE ? OR username LIKE ?';
        const [totalRows] = await db.execute(countQuery, [`%${s || ""}%`, `%${s || ""}%`]);
        const total = totalRows[0].total;

        db.release();

        // Calculate pagination details
        const totalPages = Math.ceil(total / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        const baseUrl = req.nextUrl.origin + req.nextUrl.pathname;

        const response = {
            status: "success",
            data: {
                data: rows,
                total,
                currentPage: page,
                prevPage: hasPrevPage ? `${baseUrl}?page=${page - 1}` : null,
                nextPage: hasNextPage ? `${baseUrl}?page=${page + 1}` : null,
                firstPage: 1,
                lastPage: totalPages
            },

        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(req) {

    try {
        const formData = await req.formData();

        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        // const image = formData.get('image');

        // const buffer = Buffer.from(await image.arrayBuffer());
        // const filename = image.name.replaceAll(" ", "_");

        // const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        // const uniqueFilename = `${timestamp}-${filename}`;

        // const uploadDir = path.join(process.cwd(), "public/assets");
        // const filePath = path.join(uploadDir, uniqueFilename);

        // try {
        //     // Ensure the directory exists
        //     await ensureDirectoryExists(uploadDir);

        //     await writeFile(filePath, buffer);
        // } catch (error) {
        //     console.log("Error occured ", error);
        //     return NextResponse.json({ Message: "Failed", status: 500 });
        // }


        const db = await pool.getConnection()
        const query = 'INSERT INTO account(email, username, password) VALUES (?, ?, ?)'
        const [result] = await db.execute(query, [email, username, password]);

        // Retrieve the created user
        const newUserQuery = 'SELECT * FROM account WHERE id = ?';
        const [newUser] = await db.execute(newUserQuery, [result.insertId]);

        db.release()

        // const imagePath = `/assets/${uniqueFilename}`;

        return NextResponse.json({
            status: "success",
            data: newUser[0],
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}