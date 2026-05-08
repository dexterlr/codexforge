import type { CodexForgeToolApprovalState } from "@/lib/codexforge/tools/tool-policy-guard";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import type { CodexForgeToolApprovalActionPayload } from "@/lib/codexforge/tools/tool-approval-lifecycle";

type CodexForgeToolApprovalRetryFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export type CodexForgeToolApprovalRetryRequest = {
  toolName: string;
  mode: "execute";
  input: {
    approvalRetry: true;
    approvalId: string;
  };
  context: {
    domain: string;
  };
  approvalState: CodexForgeToolApprovalState;
};

export type CodexForgeToolApprovalRetryResult = {
  ok: boolean;
  status: number;
  message: string;
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

export function buildToolApprovalRetryRequest(
  visible: CodexForgeVisibleToolPolicy,
  payload: CodexForgeToolApprovalActionPayload
): CodexForgeToolApprovalRetryRequest {
  const toolName = extractVisiblePolicyValue(visible, "Tool") ?? "unknown-tool";
  const domain = extractVisiblePolicyValue(visible, "Domain") ?? "general";

  return {
    toolName,
    mode: "execute",
    input: {
      approvalRetry: true,
      approvalId: payload.approvalId,
    },
    context: {
      domain,
    },
    approvalState: payload.approvalState,
  };
}

export async function retryApprovedToolPolicy(args: {
  visible: CodexForgeVisibleToolPolicy;
  payload: CodexForgeToolApprovalActionPayload;
  fetcher?: CodexForgeToolApprovalRetryFetcher;
}): Promise<CodexForgeToolApprovalRetryResult> {
  const fetcher = args.fetcher ?? fetch;
  const request = buildToolApprovalRetryRequest(args.visible, args.payload);

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
    body,
  };
}
