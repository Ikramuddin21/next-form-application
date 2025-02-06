import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// post
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const filePath = path.join(process.cwd(), "data.json");

    let fileData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      fileData = JSON.parse(fileContent);
    }

    fileData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

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

// // get
// export async function GET() {
//   const res = await fetch("/data.json");
//   const data = await res.json();
//   console.log("testData", data);

//   return NextResponse.json({ success: true, data });
// }
