import { NextResponse } from "next/server";
import {
  PrivateAlphaStoreError,
  createPrivateAlphaStore,
} from "@/lib/codexforge/private-alpha/private-alpha-store.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const store = createPrivateAlphaStore();

function failure(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function toErrorResponse(error: unknown) {
  if (error instanceof PrivateAlphaStoreError) {
    return failure(error.status, error.message);
  }

  return failure(500, "Unexpected private-alpha server error.");
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const runs = await store.listRuns(url.searchParams.get("limit"));
    return NextResponse.json({ ok: true, runs });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return failure(400, "Invalid JSON payload.");
  }

  try {
    const result = await store.createRun(
      body,
      request.headers.get("Idempotency-Key")
    );

    return NextResponse.json(
      {
        ok: true,
        created: result.created,
        run: result.run,
      },
      { status: result.created ? 201 : 200 }
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
