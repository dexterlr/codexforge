import { NextResponse } from "next/server";
import {
  CODEXFORGE_WEB_RESEARCH_VERSION,
  executeCodexForgeWebResearch,
  parseCodexForgeWebResearchInput,
} from "@/lib/codexforge/tools/web-research-executor";

type WebResearchRouteBody = {
  query?: unknown;
  sources?: unknown;
  urls?: unknown;
  approvalState?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function stableHash(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

function buildApprovalId(body: WebResearchRouteBody): string {
  const input = parseCodexForgeWebResearchInput(body);
  return `approval:web-research:${stableHash(`${input.query}:${input.sources.join("|")}`)}`;
}

function isApproved(body: WebResearchRouteBody): boolean {
  const approvalState = asRecord(body.approvalState);
  return (
    approvalState.approved === true ||
    approvalState.status === "approved" ||
    approvalState.state === "approved"
  );
}

function buildReplayRequest(body: WebResearchRouteBody) {
  const input = parseCodexForgeWebResearchInput(body);

  return {
    toolName: "web-research",
    mode: "execute",
    input,
    context: {
      capability: "web-research",
      approvalRequired: true,
      networkAccess: "explicit-source-only",
    },
  };
}

function buildToolPolicySummary(body: WebResearchRouteBody) {
  return {
    toolName: "web-research",
    label: "Approved web research",
    status: isApproved(body) ? "approved" : "approval-required",
    tone: isApproved(body) ? "allowed" : "approval-required",
    approvalId: buildApprovalId(body),
    requiresApproval: true,
    approvalSatisfied: isApproved(body),
    blocked: false,
    policySource: "codexforge-web-research-route",
    nextAction: isApproved(body)
      ? "Execute approved explicit-source web research."
      : "Approve this web research request before any network access.",
    safety: {
      noSilentBrowsing: true,
      explicitSourcesOnly: true,
      privateNetworkBlocked: true,
      citationsRequired: true,
    },
  };
}

async function parseBody(request: Request): Promise<WebResearchRouteBody> {
  try {
    const body = await request.json();
    return isRecord(body) ? body : {};
  } catch {
    return {};
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    version: CODEXFORGE_WEB_RESEARCH_VERSION,
    toolName: "web-research",
    status: "approval-required",
    safety: {
      noSilentBrowsing: true,
      explicitSourcesOnly: true,
      privateNetworkBlocked: true,
      citationsRequired: true,
    },
  });
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const body = await parseBody(request);
  const toolPolicySummary = buildToolPolicySummary(body);

  if (!isApproved(body)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Web research requires explicit approval before network access.",
        toolPolicySummary,
        toolPolicyReplayRequest: buildReplayRequest(body),
        meta: {
          durationMs: Date.now() - startedAt,
          approvalId: toolPolicySummary.approvalId,
          requiresApproval: true,
          approvalSatisfied: false,
          toolName: "web-research",
        },
      },
      { status: 428 }
    );
  }

  try {
    const input = parseCodexForgeWebResearchInput(body);
    const result = await executeCodexForgeWebResearch(input);

    return NextResponse.json({
      ok: true,
      result,
      toolPolicySummary,
      toolPolicyReplayRequest: buildReplayRequest(body),
      meta: {
        durationMs: Date.now() - startedAt,
        approvalId: toolPolicySummary.approvalId,
        requiresApproval: true,
        approvalSatisfied: true,
        toolName: "web-research",
        citationCount: result.citations.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Web research failed.",
        toolPolicySummary,
        toolPolicyReplayRequest: buildReplayRequest(body),
        meta: {
          durationMs: Date.now() - startedAt,
          approvalId: toolPolicySummary.approvalId,
          requiresApproval: true,
          approvalSatisfied: true,
          toolName: "web-research",
        },
      },
      { status: 400 }
    );
  }
}
