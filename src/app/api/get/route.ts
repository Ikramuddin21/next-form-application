import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = fileContent ? JSON.parse(fileContent) : [];

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
