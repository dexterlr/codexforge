import { NextResponse } from "next/server";
import type {
  CodexForgeFileKind,
  CodexForgeFileRiskLevel,
} from "@/lib/codexforge/files/file-types";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";

export const dynamic = "force-dynamic";

const VALID_RISKS = new Set(["all", "low", "medium", "high", "critical"]);
const VALID_KINDS = new Set([
  "all",
  "route",
  "component",
  "runtime",
  "memory",
  "tool",
  "smoke",
  "library",
  "style",
  "config",
  "docs",
]);

function optionalParam(url: URL, name: string): string | undefined {
  const value = url.searchParams.get(name)?.trim();
  return value ? value : undefined;
}

function parseLimit(url: URL): number | undefined {
  const raw = url.searchParams.get("limit");
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const risk = optionalParam(url, "risk");
  const kind = optionalParam(url, "kind");
  const response = await buildCodexForgeFilesContext({
    q: optionalParam(url, "q"),
    path: optionalParam(url, "path"),
    risk: VALID_RISKS.has(risk ?? "all") ? (risk as CodexForgeFileRiskLevel | "all") : "all",
    kind: VALID_KINDS.has(kind ?? "all") ? (kind as CodexForgeFileKind | "all") : "all",
    limit: parseLimit(url),
  });

  return NextResponse.json(response);
}
