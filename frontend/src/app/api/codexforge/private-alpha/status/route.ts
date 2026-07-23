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

export async function GET() {
  try {
    const status = await store.getStatus();
    return NextResponse.json({ ok: true, ...status });
  } catch (error) {
    return toErrorResponse(error);
  }
}
