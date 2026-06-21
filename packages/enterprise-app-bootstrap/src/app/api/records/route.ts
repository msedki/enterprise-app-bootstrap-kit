import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSession } from "@/features/auth/session";
import { createRecord, listRecords } from "@/server/services/records.service";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";

function toErrorResponse(error: unknown) {
  if (error instanceof UnauthorizedError) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (error instanceof ForbiddenError) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (error instanceof ZodError) return NextResponse.json({ error: "validation_error", details: error.flatten() }, { status: 400 });
  console.error(error);
  return NextResponse.json({ error: "internal_error" }, { status: 500 });
}

export async function GET() {
  try { return NextResponse.json({ data: await listRecords(await getSession()) }); } catch (error) { return toErrorResponse(error); }
}
export async function POST(request: Request) {
  try { return NextResponse.json({ data: await createRecord(await getSession(), await request.json()) }, { status: 201 }); } catch (error) { return toErrorResponse(error); }
}
