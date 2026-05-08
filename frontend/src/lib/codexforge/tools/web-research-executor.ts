export const CODEXFORGE_WEB_RESEARCH_VERSION = "2026-05-08.web-research-executor.v2";

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

export type CodexForgeWebResearchCitation = {
  url: string;
  title: string;
  fetchedAt: string;
};

export type CodexForgeWebResearchMemoryCandidate = {
  id: string;
  kind: "web-research-evidence";
  title: string;
  content: string;
  sourceUrl: string;
  fetchedAt: string;
  importance: number;
  tags: string[];
};

export type CodexForgeWebResearchGroundedContext = {
  summary: string;
  sourceCount: number;
  citationCount: number;
  excerptCount: number;
  evidenceDigest: string[];
  memoryCandidateCount: number;
};

export type CodexForgeWebResearchResult = {
  version: string;
  mode: "research-plan-only" | "source-fetch";
  query: string;
  sourceCount: number;
  needsSources: boolean;
  sourceResults: CodexForgeWebResearchSourceResult[];
  citations: CodexForgeWebResearchCitation[];
  memoryCandidates: CodexForgeWebResearchMemoryCandidate[];
  groundedContext: CodexForgeWebResearchGroundedContext;
  safety: {
    approvalRequired: true;
    credentialHarvestingBlocked: true;
    privateNetworkBlocked: true;
    maxSources: number;
    maxBytesPerSource: number;
    explicitSourcesOnly: true;
    noSilentBrowsing: true;
  };
  nextAction: string;
};

const MAX_QUERY_LENGTH = 500;
const MAX_SOURCES = 3;
const MAX_BYTES_PER_SOURCE = 180_000;
const FETCH_TIMEOUT_MS = 8_000;
const MAX_EXCERPT_LENGTH = 900;
const MAX_DIGEST_ITEMS = 5;
const MAX_MEMORY_CONTENT_LENGTH = 700;

function clampText(value: string, max: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= max
    ? normalized
    : `${normalized.slice(0, Math.max(0, max - 3)).trimEnd()}...`;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(asString).filter(Boolean);
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
  const normalized = hostname.toLowerCase();

  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.endsWith(".local") ||
    normalized.endsWith(".localhost")
  ) {
    return true;
  }

  if (/^10\./.test(normalized)) return true;
  if (/^192\.168\./.test(normalized)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)) return true;
  if (/^169\.254\./.test(normalized)) return true;

  return false;
}

function stableHash(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

function extractTitle(text: string, fallback: string): string {
  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch?.[1]?.replace(/<[^>]+>/g, " ").trim();

  return clampText(rawTitle || fallback, 120);
}

function extractReadableText(text: string): string {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function buildSafetySummary() {
  return {
    approvalRequired: true as const,
    credentialHarvestingBlocked: true as const,
    privateNetworkBlocked: true as const,
    maxSources: MAX_SOURCES,
    maxBytesPerSource: MAX_BYTES_PER_SOURCE,
    explicitSourcesOnly: true as const,
    noSilentBrowsing: true as const,
  };
}

function buildMemoryCandidate(
  query: string,
  source: CodexForgeWebResearchSourceResult
): CodexForgeWebResearchMemoryCandidate | null {
  if (!source.ok || !source.excerpt.trim()) return null;

  const title = clampText(source.title || source.url, 120);
  const content = clampText(
    [
      `Research query: ${query || "untitled research query"}`,
      `Source: ${title}`,
      `Evidence: ${source.excerpt}`,
    ].join(" | "),
    MAX_MEMORY_CONTENT_LENGTH
  );

  return {
    id: `web-research:${stableHash(`${query}:${source.url}:${source.fetchedAt}`)}`,
    kind: "web-research-evidence",
    title,
    content,
    sourceUrl: source.url,
    fetchedAt: source.fetchedAt,
    importance: 7,
    tags: ["codexforge", "web-research", "grounded-evidence"],
  };
}

function buildGroundedContext(
  query: string,
  sourceResults: CodexForgeWebResearchSourceResult[],
  citations: CodexForgeWebResearchCitation[],
  memoryCandidates: CodexForgeWebResearchMemoryCandidate[]
): CodexForgeWebResearchGroundedContext {
  const evidenceDigest = sourceResults
    .filter((source) => source.ok && source.excerpt.trim())
    .slice(0, MAX_DIGEST_ITEMS)
    .map((source, index) =>
      `${index + 1}. ${clampText(source.title || source.url, 90)} - ${clampText(source.excerpt, 220)}`
    );

  return {
    summary:
      citations.length > 0
        ? `Grounded web research captured ${citations.length} cited source(s) for "${query || "untitled research"}".`
        : `No cited sources were captured for "${query || "untitled research"}".`,
    sourceCount: sourceResults.length,
    citationCount: citations.length,
    excerptCount: evidenceDigest.length,
    evidenceDigest,
    memoryCandidateCount: memoryCandidates.length,
  };
}

export function parseCodexForgeWebResearchInput(value: unknown): CodexForgeWebResearchInput {
  const record = asRecord(value);

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
        accept: "text/html, text/plain;q=0.9, application/xhtml+xml;q=0.8",
        "user-agent": "CodexForge-WebResearch/1.0; approval-gated local workspace research",
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const limited = arrayBuffer.slice(0, MAX_BYTES_PER_SOURCE);
    const text = new TextDecoder("utf-8", { fatal: false }).decode(limited);
    const readableText = extractReadableText(text);
    const title = extractTitle(text, parsed.hostname);

    return {
      url: parsed.toString(),
      ok: response.ok,
      status: response.status,
      title,
      excerpt: clampText(readableText, MAX_EXCERPT_LENGTH),
      fetchedAt: new Date().toISOString(),
      contentLength: limited.byteLength,
    };
  } catch (error) {
    return {
      url: parsed.toString(),
      ok: false,
      status: 0,
      title: parsed.hostname,
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
    const sourceResults: CodexForgeWebResearchSourceResult[] = [];
    const citations: CodexForgeWebResearchCitation[] = [];
    const memoryCandidates: CodexForgeWebResearchMemoryCandidate[] = [];

    return {
      version: CODEXFORGE_WEB_RESEARCH_VERSION,
      mode: "research-plan-only",
      query: input.query,
      sourceCount: 0,
      needsSources: true,
      sourceResults,
      citations,
      memoryCandidates,
      groundedContext: buildGroundedContext(input.query, sourceResults, citations, memoryCandidates),
      safety: buildSafetySummary(),
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

  const memoryCandidates = sourceResults
    .map((source) => buildMemoryCandidate(input.query, source))
    .filter((candidate): candidate is CodexForgeWebResearchMemoryCandidate => Boolean(candidate));

  return {
    version: CODEXFORGE_WEB_RESEARCH_VERSION,
    mode: "source-fetch",
    query: input.query,
    sourceCount: sourceResults.length,
    needsSources: false,
    sourceResults,
    citations,
    memoryCandidates,
    groundedContext: buildGroundedContext(input.query, sourceResults, citations, memoryCandidates),
    safety: buildSafetySummary(),
    nextAction:
      citations.length > 0
        ? "Use the captured source excerpts, citations, memory candidates, and grounded context to produce a grounded answer."
        : "No approved source could be fetched. Provide different explicit sources or configure a search-provider adapter.",
  };
}
