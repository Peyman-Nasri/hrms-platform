import * as contracts from "@/server/contracts/contracts.service";

export async function POST(req: Request) {
  const body = await req.json();
  const created = await contracts.create(body);
  return Response.json({ data: created }, { status: 201 });
}
