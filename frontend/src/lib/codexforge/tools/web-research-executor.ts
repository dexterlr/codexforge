export const CODEXFORGE_WEB_RESEARCH_VERSION = "2026-05-08.web-research-executor.v1";

export type CodexForgeWebResearchSourceResult = {
  url: string;
  ok: boolean;
  status: number;
  title: string;
  excerpt: string;
  fetchedAt: string;
  contentLength: number;
  error?: string;
};

export type CodexForgeWebResearchInput = {
  query: string;
  sources: string[];
};

export type CodexForgeWebResearchResult = {
  version: string;
  mode: "research-plan-only" | "source-fetch";
  query: string;
  sourceCount: number;
  needsSources: boolean;
  sourceResults: CodexForgeWebResearchSourceResult[];
  citations: Array<{
    url: string;
    title: string;
    fetchedAt: string;
  }>;
  safety: {
    approvalRequired: true;
    credentialHarvestingBlocked: true;
    privateNetworkBlocked: true;
    maxSources: number;
    maxBytesPerSource: number;
  };
  nextAction: string;
};

const MAX_QUERY_LENGTH = 500;
const MAX_SOURCES = 3;
const MAX_BYTES_PER_SOURCE = 180_000;
const FETCH_TIMEOUT_MS = 8_000;

function clampText(value: string, max: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= max
    ? normalized
    : `${normalized.slice(0, Math.max(0, max - 3))}...`;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => asString(item))
    .filter(Boolean);
}

function normalizeQuery(value: unknown): string {
  return clampText(asString(value), MAX_QUERY_LENGTH);
}

function normalizeSources(value: unknown): string[] {
  const unique = new Set<string>();

  for (const source of asStringArray(value)) {
    unique.add(source);
    if (unique.size >= MAX_SOURCES) break;
  }

  return [...unique];
}

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();

  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host === "::1"
  ) {
    return true;
  }

  if (/^127\./.test(host)) return true;
  if (/^10\./.test(host)) return true;
  if (/^192\.168\./.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
  if (/^169\.254\./.test(host)) return true;

  return false;
}

export function parseCodexForgeWebResearchInput(raw: unknown): CodexForgeWebResearchInput {
  const record = raw && typeof raw === "object" && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : {};

  return {
    query: normalizeQuery(record.query),
    sources: normalizeSources(record.sources ?? record.urls),
  };
}

export function assertSafeWebResearchSource(url: string): URL {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid source URL: ${url}`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`Unsupported source protocol: ${parsed.protocol}`);
  }

  if (isPrivateOrLocalHost(parsed.hostname)) {
    throw new Error(`Blocked private or local network source: ${parsed.hostname}`);
  }

  parsed.hash = "";
  return parsed;
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return "-";

  return clampText(
    match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">"),
    160
  );
}

function extractExcerpt(html: string): string {
  return clampText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">"),
    700
  );
}

async function fetchSource(url: string): Promise<CodexForgeWebResearchSourceResult> {
  const parsed = assertSafeWebResearchSource(url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "accept": "text/html, text/plain;q=0.9, application/xhtml+xml;q=0.8",
        "user-agent": "CodexForge-WebResearch/1.0; approval-gated local workspace research",
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const limited = arrayBuffer.slice(0, MAX_BYTES_PER_SOURCE);
    const text = new TextDecoder("utf-8", { fatal: false }).decode(limited);

    return {
      url: parsed.toString(),
      ok: response.ok,
      status: response.status,
      title: extractTitle(text),
      excerpt: extractExcerpt(text),
      fetchedAt: new Date().toISOString(),
      contentLength: arrayBuffer.byteLength,
    };
  } catch (error) {
    return {
      url: parsed.toString(),
      ok: false,
      status: 0,
      title: "-",
      excerpt: "-",
      fetchedAt: new Date().toISOString(),
      contentLength: 0,
      error: error instanceof Error ? error.message : "Failed to fetch source.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function executeCodexForgeWebResearch(
  input: CodexForgeWebResearchInput
): Promise<CodexForgeWebResearchResult> {
  const safeSources = input.sources.map((source) => assertSafeWebResearchSource(source).toString());

  if (safeSources.length === 0) {
    return {
      version: CODEXFORGE_WEB_RESEARCH_VERSION,
      mode: "research-plan-only",
      query: input.query,
      sourceCount: 0,
      needsSources: true,
      sourceResults: [],
      citations: [],
      safety: {
        approvalRequired: true,
        credentialHarvestingBlocked: true,
        privateNetworkBlocked: true,
        maxSources: MAX_SOURCES,
        maxBytesPerSource: MAX_BYTES_PER_SOURCE,
      },
      nextAction:
        "Provide explicit source URLs or wire a search-provider adapter. CodexForge will not silently browse without approved source scope.",
    };
  }

  const sourceResults = await Promise.all(safeSources.map((source) => fetchSource(source)));
  const citations = sourceResults
    .filter((source) => source.ok)
    .map((source) => ({
      url: source.url,
      title: source.title,
      fetchedAt: source.fetchedAt,
    }));

  return {
    version: CODEXFORGE_WEB_RESEARCH_VERSION,
    mode: "source-fetch",
    query: input.query,
    sourceCount: sourceResults.length,
    needsSources: false,
    sourceResults,
    citations,
    safety: {
      approvalRequired: true,
      credentialHarvestingBlocked: true,
      privateNetworkBlocked: true,
      maxSources: MAX_SOURCES,
      maxBytesPerSource: MAX_BYTES_PER_SOURCE,
    },
    nextAction:
      citations.length > 0
        ? "Use the captured source excerpts and citations to produce a grounded answer."
        : "No approved source could be fetched. Provide different explicit sources or configure a search-provider adapter.",
  };
}
