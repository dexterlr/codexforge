import { NextResponse } from "next/server";
import {
  PrivateAlphaFreeFirstRoutingError,
  routePrivateAlphaFreeFirst,
} from "@/lib/codexforge/private-alpha/private-alpha-free-first-routing.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function failure(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return failure(400, "Invalid JSON payload.");
  }

  try {
    const result = await routePrivateAlphaFreeFirst(body);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    if (error instanceof PrivateAlphaFreeFirstRoutingError) {
      return failure(error.status, error.message);
    }

    return failure(500, "Unexpected private-alpha free-first routing server error.");
  }
}
