import { isApplyExecutionPolicySatisfied } from "./execution-policy-confirmation";
import { validateApplyExecutionRequestPacket } from "./execution-request-packet";
import { buildApplyExecutionResultContract } from "./execution-result-contract";
import {
  buildApplyDiffExecutionGateStableKey,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionBridgePayload,
  type ApplyExecutionRequestPacket,
  type ApplyExecutionResultContract,
} from "./apply-execution-gate-types";

type ApplyExecutionFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function extractChangedFiles(body: unknown): string[] {
  if (!isRecord(body)) return [];
  const result = isRecord(body.result) ? body.result : null;
  const content = isRecord(result?.content) ? result?.content : null;
  const json = isRecord(content?.json) ? content?.json : null;
  const raw = isRecord(result?.raw) ? result?.raw : null;

  return uniqueApplyDiffExecutionGateStrings([
    typeof json?.relativePath === "string" ? json.relativePath : null,
    typeof raw?.relativePath === "string" ? raw.relativePath : null,
    ...stringList(json?.changedFiles),
  ]);
}

function extractWarnings(body: unknown): string[] {
  if (!isRecord(body)) return [];
  const result = isRecord(body.result) ? body.result : null;
  const warnings = Array.isArray(result?.warnings) ? result?.warnings : [];
  return uniqueApplyDiffExecutionGateStrings(
    warnings.map((warning) => (isRecord(warning) && typeof warning.message === "string" ? warning.message : null))
  );
}

function extractErrors(body: unknown): string[] {
  if (!isRecord(body)) return [];
  const result = isRecord(body.result) ? body.result : null;
  const error = isRecord(result?.error) ? result?.error : null;
  return uniqueApplyDiffExecutionGateStrings([
    typeof body.error === "string" ? body.error : null,
    typeof error?.message === "string" ? error.message : null,
  ]);
}

function resultReportsDryRun(body: unknown): boolean {
  if (!isRecord(body)) return false;
  const result = isRecord(body.result) ? body.result : null;
  const content = isRecord(result?.content) ? result?.content : null;
  const json = isRecord(content?.json) ? content?.json : null;
  return json?.dryRun === true;
}

function routeResultOk(body: unknown): boolean {
  if (!isRecord(body)) return false;
  const result = isRecord(body.result) ? body.result : null;
  return body.ok === true && result?.ok === true;
}

export function buildApplyExecutionBridgePayload(packet: ApplyExecutionRequestPacket): ApplyExecutionBridgePayload {
  const validation = validateApplyExecutionRequestPacket(packet);
  const blockedReasons: string[] = [...validation.blockedReasons];

  if (packet.toolName !== "apply-diff") blockedReasons.push("Bridge refuses non apply-diff tool requests.");
  if (!packet.approvalState.satisfied) blockedReasons.push("Bridge refuses mutation without approval.");
  if (!isApplyExecutionPolicySatisfied(packet.policyConfirmation)) blockedReasons.push("Bridge refuses mutation without satisfied policy confirmation.");
  if (packet.policyConfirmation.blockedTools.includes("broker-execution")) {
    blockedReasons.push("Bridge refuses broker-execution.");
  }
  if (packet.policyConfirmation.blockedTools.includes("write-file")) {
    blockedReasons.push("Bridge refuses direct write-file.");
  }
  if (packet.policyConfirmation.blockedTools.includes("run-command")) {
    blockedReasons.push("Bridge refuses direct run-command.");
  }
  if (packet.policyConfirmation.pseudoOnlyPatchBlocksExecution) blockedReasons.push("Bridge refuses pseudo-only patch.");
  if (!packet.policyConfirmation.realPatchPresent) blockedReasons.push("Bridge refuses missing real patch.");

  const uniqueBlockedReasons = uniqueApplyDiffExecutionGateStrings(blockedReasons);
  const canDispatch = uniqueBlockedReasons.length === 0 && packet.ready;
  const requestBody = canDispatch
    ? {
        toolName: "apply-diff" as const,
        mode: "execute" as const,
        input: packet.toolInputPreview,
        context: {
          requestId: packet.requestId,
          userIntent: packet.patchSummary[0] ?? "Dispatch approved apply request.",
          metadata: {
            executionGateId: packet.executionGateId,
            approvalPacketId: packet.approvalState.approvalId,
            approvalLabel: packet.approvalState.approvalLabel,
            boundary: "/api/codexforge/tools/execute" as const,
          },
        },
        approvalState: {
          approved: true as const,
          approvalId: packet.approvalState.approvalId,
          approvedAt: packet.approvalState.approvedAtLabel,
          approvedBy: packet.approvalState.approvalSource,
          reason: packet.approvalState.approvalNote,
        },
      }
    : null;

  return {
    id: `apply-diff-execution-bridge:${buildApplyDiffExecutionGateStableKey(packet.id, canDispatch)}`,
    requestId: packet.requestId,
    bridgeMode: "execute-route-enabled",
    boundary: "/api/codexforge/tools/execute",
    method: "POST",
    canDispatch,
    requestBody,
    blockedReasons: uniqueBlockedReasons,
    safetyNotes: [
      "bridge does not auto-run on render",
      "bridge uses existing execute route only if implemented",
      "bridge refuses mutation without approval",
      "bridge refuses broker-execution, direct write-file, and direct run-command",
      "execute route is the guarded boundary",
    ],
    summary: [
      canDispatch
        ? "Guarded execute route bridge is ready for explicit button dispatch."
        : "Guarded execute route bridge is blocked until packet, approval, and policy are ready.",
      "No request is sent while building this bridge payload.",
    ],
  };
}

export async function executeApprovedApplyDiffRequest(args: {
  packet: ApplyExecutionRequestPacket;
  fetcher?: ApplyExecutionFetch;
}): Promise<ApplyExecutionResultContract> {
  const packet = args.packet;
  const bridge = buildApplyExecutionBridgePayload(packet);

  if (!bridge.canDispatch || !bridge.requestBody) {
    return buildApplyExecutionResultContract({
      requestId: packet.requestId,
      status: packet.approvalState.satisfied ? "blocked" : "approval-required",
      ok: false,
      summary: ["Bridge blocked the apply-diff mutation request before dispatch."],
      errors: bridge.blockedReasons,
      verificationNextSteps: packet.verificationChecks,
      rollbackNextSteps: packet.rollbackNotes,
      evidenceRefs: [bridge.id],
    });
  }

  const fetcher = args.fetcher ?? fetch;

  try {
    const response = await fetcher(bridge.boundary, {
      method: bridge.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bridge.requestBody),
    });

    const body = (await response.json().catch(() => null)) as unknown;
    const dryRunOnly = resultReportsDryRun(body);
    const ok = response.ok && routeResultOk(body) && !dryRunOnly;
    const errors = uniqueApplyDiffExecutionGateStrings([
      ...extractErrors(body),
      dryRunOnly ? "Bridge result reported dryRun=true, so completed mutation is not claimed." : null,
      response.ok ? null : `Execute route returned HTTP ${response.status}.`,
    ]);

    return buildApplyExecutionResultContract({
      requestId: packet.requestId,
      resultId: `apply-diff-execution-result:${buildApplyDiffExecutionGateStableKey(packet.requestId, response.status, ok)}`,
      ok,
      status: ok ? "completed" : "failed",
      summary: [
        ok
          ? "Guarded apply-diff execution completed through the execute route."
          : "Guarded apply-diff execution did not complete successfully.",
      ],
      changedFiles: extractChangedFiles(body),
      warnings: extractWarnings(body),
      errors,
      verificationNextSteps: packet.verificationChecks,
      rollbackNextSteps: packet.rollbackNotes,
      evidenceRefs: [bridge.id, packet.id],
    });
  } catch (error) {
    return buildApplyExecutionResultContract({
      requestId: packet.requestId,
      status: "failed",
      ok: false,
      summary: ["Guarded apply-diff execution request failed before a normalized route result was captured."],
      errors: [error instanceof Error ? error.message : "Unknown execute route bridge failure."],
      verificationNextSteps: packet.verificationChecks,
      rollbackNextSteps: packet.rollbackNotes,
      evidenceRefs: [bridge.id, packet.id],
    });
  }
}

export function summarizeApplyExecutionBridge(bridge: ApplyExecutionBridgePayload): string[] {
  return [
    `Bridge ${bridge.id}: mode=${bridge.bridgeMode}; canDispatch=${bridge.canDispatch}.`,
    `Boundary ${bridge.boundary}; method ${bridge.method}.`,
    bridge.canDispatch ? "Dispatch requires explicit button click." : `${bridge.blockedReasons.length} bridge blocked reason(s).`,
    "No auto-run, no direct apply-diff UI call, and no shell command execution.",
  ];
}
