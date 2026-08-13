import { NextResponse } from "next/server";

const LEGACY_CHAT_RETIRED_RESPONSE = {
  ok: false,
  error: {
    code: "CODEXFORGE_LEGACY_CHAT_RETIRED",
    message: "The legacy chat endpoint is retired. Use the canonical Jarvis workspace.",
  },
  canonicalRoute: "/jarvis",
} as const;

export function POST(): Response {
  return NextResponse.json(LEGACY_CHAT_RETIRED_RESPONSE, {
    status: 410,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
