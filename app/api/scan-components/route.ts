// app/api/scan-components/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const componentsDir = path.join(process.cwd(), "app", "_components");

    const components = fs
      .readdirSync(componentsDir)
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => {
        const name = file.replace(".tsx", "");
        const fullPath = path.join(componentsDir, file);
        const content = fs.readFileSync(fullPath, "utf-8");

        return {
          name,
          path: `_components/${file}`,
          isClientComponent: content.includes("use client"),
          isLayout: name.toLowerCase().includes("layout"),
        };
      });

    return NextResponse.json({
      components,
      totalCount: components.length,
      directory: "_components",
    });
  } catch (error) {
    console.error("Error scanning components:", error);
    return NextResponse.json(
      { error: "Failed to scan components" },
      { status: 500 }
    );
  }
}
