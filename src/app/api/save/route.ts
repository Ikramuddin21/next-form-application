import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
const filePath = path.join(process.cwd(), "data.json");

// post
export async function POST(req: Request) {
  try {
    const newData = await req.json();

    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      existingData = fileContent ? JSON.parse(fileContent) : [];
    } else {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }

    existingData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "Successfully save data!",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}

// delete
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Id is required" },
        { status: 400 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = fileContent ? JSON.parse(fileContent) : [];

    // Filter out the item with the given id
    const updatedData = data.filter((item: { id: string }) => item.id !== id);

    if (data.length === updatedData.length) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    // Save updated data back to data.json
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Item deleted successfully!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
