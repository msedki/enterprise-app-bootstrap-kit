import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ status: "ok", service: "enterprise-app-bootstrap", timestamp: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
