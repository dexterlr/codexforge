import {
  assertJarvisChatRequest,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { readMarketScan } from "@/lib/codexforge/trading-research/market-scan.server";
import type { MarketScan } from "@/lib/codexforge/trading-research/market-scan-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cached: { scan: MarketScan; expires: number } | undefined;
let pending: Promise<MarketScan> | undefined;

function latestScan() {
  if (cached && Date.now() < cached.expires) return Promise.resolve(cached.scan);
  if (!pending) {
    pending = readMarketScan().then((scan) => {
      cached = { scan, expires: Date.now() + (scan.issues.length ? 15_000 : 60_000) };
      return scan;
    }).finally(() => { pending = undefined; });
  }
  return pending;
}

export async function GET(request: Request) {
  try {
    assertJarvisChatRequest(request);
    return jarvisChatJsonResponse(await latestScan());
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
