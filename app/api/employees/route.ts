import * as employees from "@/server/employees/employees.service";

export async function GET() {
  const data = await employees.list();
  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await employees.create(body);
  return Response.json({ data: created }, { status: 201 });
}
