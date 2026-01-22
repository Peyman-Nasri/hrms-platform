import * as timeReports from "@/server/time-report/time-report.service";

export async function GET() {
  const data = await timeReports.list();
  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await timeReports.create(body);
  return Response.json({ data: created }, { status: 201 });
}
