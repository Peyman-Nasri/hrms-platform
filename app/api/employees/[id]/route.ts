import * as employees from "@/server/employees/employees.service";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await employees.update(id, body);
    return Response.json({ data: updated });
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ error: err.message }, { status: 400 });
    }

    return Response.json(
      { error: "Failed to update employee" },
      { status: 400 },
    );
  }
}
