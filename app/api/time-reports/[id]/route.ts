import * as timeReports from "@/server/time-report/time-report.service";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const report = await timeReports.getById(id);

  if (!report) {
    return Response.json({ error: "Time report not found" }, { status: 404 });
  }

  return Response.json({ data: report });
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await timeReports.update(id, body);
    return Response.json({ data: updated });
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ error: err.message }, { status: 400 });
    }

    return Response.json(
      { error: "Failed to update time report" },
      { status: 400 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  try {
    const deleted = await timeReports.remove(id);
    return Response.json({ data: deleted });
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ error: err.message }, { status: 400 });
    }

    return Response.json(
      { error: "Failed to delete time report" },
      { status: 400 },
    );
  }
}
