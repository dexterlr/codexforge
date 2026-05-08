import type { CodexForgeToolApprovalState } from "@/lib/codexforge/tools/tool-policy-guard";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import type { CodexForgeToolApprovalActionPayload } from "@/lib/codexforge/tools/tool-approval-lifecycle";

type CodexForgeToolApprovalRetryFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export type CodexForgeToolApprovalReplayRequest = {
  toolName: string;
  mode?: "execute" | "plan" | "preview";
  input?: Record<string, unknown>;
  context?: Record<string, unknown>;
};

export type CodexForgeToolApprovalRetryRequest = {
  toolName: string;
  mode: "execute";
  input: Record<string, unknown> & {
    approvalRetry: true;
    approvalId: string;
  };
  context: Record<string, unknown> & {
    domain: string;
  };
  approvalState: CodexForgeToolApprovalState;
};

export type CodexForgeToolApprovalRetryResult = {
  ok: boolean;
  status: number;
  message: string;
  request: CodexForgeToolApprovalRetryRequest;
  body: unknown;
};

function extractVisiblePolicyValue(
  visible: CodexForgeVisibleToolPolicy,
  label: string
): string | null {
  const prefix = `${label}: `;
  const source = [...visible.bullets, ...visible.audit];

  for (const item of source) {
    if (item.startsWith(prefix)) {
      const value = item.slice(prefix.length).trim();
      return value.length > 0 ? value : null;
    }
  }

  return null;
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export function buildToolApprovalRetryRequest(args: {
  visible: CodexForgeVisibleToolPolicy;
  payload: CodexForgeToolApprovalActionPayload;
  replayRequest?: CodexForgeToolApprovalReplayRequest | null;
}): CodexForgeToolApprovalRetryRequest {
  const replay = args.replayRequest ?? null;
  const toolName =
    replay?.toolName ??
    extractVisiblePolicyValue(args.visible, "Tool") ??
    "unknown-tool";
  const visibleDomain = extractVisiblePolicyValue(args.visible, "Domain") ?? "general";
  const replayInput = normalizeRecord(replay?.input);
  const replayContext = normalizeRecord(replay?.context);
  const replayDomain =
    typeof replayContext.domain === "string" && replayContext.domain.trim().length > 0
      ? replayContext.domain
      : visibleDomain;

  return {
    toolName,
    mode: "execute",
    input: {
      ...replayInput,
      approvalRetry: true,
      approvalId: args.payload.approvalId,
    },
    context: {
      ...replayContext,
      domain: replayDomain,
    },
    approvalState: args.payload.approvalState,
  };
}

export async function retryApprovedToolPolicy(args: {
  visible: CodexForgeVisibleToolPolicy;
  payload: CodexForgeToolApprovalActionPayload;
  replayRequest?: CodexForgeToolApprovalReplayRequest | null;
  fetcher?: CodexForgeToolApprovalRetryFetcher;
}): Promise<CodexForgeToolApprovalRetryResult> {
  const fetcher = args.fetcher ?? fetch;
  const request = buildToolApprovalRetryRequest({
    visible: args.visible,
    payload: args.payload,
    replayRequest: args.replayRequest,
  });

  const response = await fetcher("/api/codexforge/tools/execute", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  });

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const message =
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
      ? body.error
      : response.ok
        ? "Tool retry request accepted."
        : `Tool retry request failed with HTTP ${response.status}.`;

  return {
    ok: response.ok,
    status: response.status,
    message,
    request,
    body,
  };
}
