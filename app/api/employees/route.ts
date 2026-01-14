import { NextResponse } from "next/server";
import { employees } from "@/lib/data/employees";

export async function GET() {
  return NextResponse.json({ data: employees });
}
