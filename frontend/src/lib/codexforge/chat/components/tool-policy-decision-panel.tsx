"use client";

import { useMemo, useState } from "react";
import type { CodexForgeToolPolicyDecision } from "@/lib/codexforge/tools/tool-policy-guard";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import { buildVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import {
  retryApprovedToolPolicy,
  type CodexForgeToolApprovalRetryResult,
} from "@/lib/codexforge/tools/tool-approval-retry";
import {
  buildApprovedToolApprovalState,
  buildDeniedToolApprovalState,
  buildToolApprovalLifecycleSnapshot,
  normalizeToolApprovalId,
  type CodexForgeToolApprovalActionPayload,
  type CodexForgeToolApprovalLifecycleStatus,
} from "@/lib/codexforge/tools/tool-approval-lifecycle";

type ToolPolicyDecisionPanelProps = {
  decision?: CodexForgeToolPolicyDecision | null;
  summary?: CodexForgeVisibleToolPolicy | null;
  compact?: boolean;
  onApproveTool?: (payload: CodexForgeToolApprovalActionPayload) => void;
  onDenyTool?: (payload: CodexForgeToolApprovalActionPayload) => void;
  onRetryTool?: (payload: CodexForgeToolApprovalActionPayload) => void;
};

const shellByTone: Record<string, string> = {
  allowed:
    "border-emerald-400/30 bg-emerald-500/10 text-emerald-50",
  "approval-required":
    "border-amber-400/30 bg-amber-500/10 text-amber-50",
  blocked:
    "border-rose-400/30 bg-rose-500/10 text-rose-50",
  error:
    "border-zinc-400/30 bg-zinc-500/10 text-zinc-50",
};

const badgeByTone: Record<string, string> = {
  allowed:
    "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "approval-required":
    "border-amber-300/30 bg-amber-300/10 text-amber-100",
  blocked:
    "border-rose-300/30 bg-rose-300/10 text-rose-100",
  error:
    "border-zinc-300/30 bg-zinc-300/10 text-zinc-100",
};

const actionButton =
  "rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-45";

function getLifecycleLabel(status: CodexForgeToolApprovalLifecycleStatus): string {
  if (status === "approved") return "Approved - retry enabled";
  if (status === "denied") return "Denied - execution remains blocked";
  if (status === "pending") return "Pending operator approval";
  return "No approval action required";
}

export function ToolPolicyDecisionPanel({
  decision,
  summary,
  compact = false,
  onApproveTool,
  onDenyTool,
  onRetryTool,
}: ToolPolicyDecisionPanelProps) {
  const visible = summary ?? buildVisibleToolPolicy(decision);
  const [lifecycleStatus, setLifecycleStatus] =
    useState<CodexForgeToolApprovalLifecycleStatus>("idle");
  const [retrying, setRetrying] = useState(false);
  const [retryResult, setRetryResult] =
    useState<CodexForgeToolApprovalRetryResult | null>(null);

  const approvalId = normalizeToolApprovalId(visible?.approvalId);
  const canReviewApproval =
    !!visible &&
    visible.requiresApproval === true &&
    visible.approvalSatisfied !== true &&
    visible.blocked !== true &&
    !!approvalId;

  const approvedPayload = useMemo<CodexForgeToolApprovalActionPayload | null>(() => {
    if (!visible || !approvalId) return null;

    return {
      approvalId,
      approvalState: buildApprovedToolApprovalState(approvalId),
      visible,
    };
  }, [approvalId, visible]);

  const deniedPayload = useMemo<CodexForgeToolApprovalActionPayload | null>(() => {
    if (!visible || !approvalId) return null;

    return {
      approvalId,
      approvalState: buildDeniedToolApprovalState(approvalId),
      visible,
    };
  }, [approvalId, visible]);

  const lifecycle = useMemo(
    () =>
      visible
        ? buildToolApprovalLifecycleSnapshot({
            visible,
            status: lifecycleStatus === "idle" ? undefined : lifecycleStatus,
            approvalState:
              lifecycleStatus === "approved"
                ? approvedPayload?.approvalState ?? null
                : lifecycleStatus === "denied"
                  ? deniedPayload?.approvalState ?? null
                  : null,
          })
        : null,
    [approvedPayload, deniedPayload, lifecycleStatus, visible]
  );

  if (!visible) {
    return null;
  }

  function approveTool() {
    if (!approvedPayload) return;

    setLifecycleStatus("approved");
    onApproveTool?.(approvedPayload);
  }

  function denyTool() {
    if (!deniedPayload) return;

    setLifecycleStatus("denied");
    onDenyTool?.(deniedPayload);
  }

  async function retryTool() {
    if (!approvedPayload || !visible) return;

    setLifecycleStatus("approved");
    setRetrying(true);
    setRetryResult(null);
    onRetryTool?.(approvedPayload);

    try {
      const result = await retryApprovedToolPolicy({
        visible,
        payload: approvedPayload,
      });

      setRetryResult(result);
    } catch (error) {
      setRetryResult({
        ok: false,
        status: 0,
        message: error instanceof Error ? error.message : "Tool retry request failed.",
        body: null,
      });
    } finally {
      setRetrying(false);
    }
  }

  return (
    <section
      className={[
        "rounded-2xl border p-4 shadow-sm",
        shellByTone[visible.tone] ?? shellByTone.error,
      ].join(" ")}
      data-codexforge-tool-policy-panel="true"
      data-codexforge-tool-policy-tone={visible.tone}
      data-codexforge-tool-policy-approval-id={visible.approvalId ?? ""}
      data-codexforge-tool-policy-lifecycle={lifecycle?.status ?? "idle"}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold">{visible.title}</p>
          <p className="text-xs opacity-80">{visible.summary}</p>
        </div>

        <span
          className={[
            "rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
            badgeByTone[visible.tone] ?? badgeByTone.error,
          ].join(" ")}
        >
          {visible.badge}
        </span>
      </div>

      {!compact ? (
        <>
          <div className="mt-3 rounded-xl border border-white/10 bg-black/10 p-3 text-xs">
            <span className="font-semibold">Next action: </span>
            <span className="opacity-85">{visible.nextAction}</span>
            {visible.approvalId ? (
              <div className="mt-2 opacity-85">
                <span className="font-semibold">Approval ID: </span>
                <code data-codexforge-tool-policy-approval-id-label="true">
                  {visible.approvalId}
                </code>
              </div>
            ) : null}
          </div>

          {canReviewApproval ? (
            <div
              className="mt-3 rounded-xl border border-white/10 bg-black/10 p-3 text-xs"
              data-codexforge-tool-policy-actions="true"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">Approval lifecycle</p>
                  <p
                    className="mt-1 opacity-75"
                    data-codexforge-tool-policy-lifecycle-label="true"
                  >
                    {getLifecycleLabel(lifecycle?.status ?? "pending")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={actionButton}
                    data-codexforge-tool-policy-approve="true"
                    onClick={approveTool}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className={actionButton}
                    data-codexforge-tool-policy-deny="true"
                    onClick={denyTool}
                  >
                    Deny
                  </button>
                  <button
                    type="button"
                    className={actionButton}
                    data-codexforge-tool-policy-retry="true"
                    disabled={retrying || lifecycle?.retryEnabled !== true}
                    onClick={retryTool}
                  >
                    {retrying ? "Retrying" : "Retry"}
                  </button>
                </div>
              </div>

              {lifecycle?.approvalState ? (
                <pre
                  className="mt-3 max-h-40 overflow-auto rounded-lg border border-white/10 bg-black/20 p-2 text-[11px] opacity-85"
                  data-codexforge-tool-policy-approval-state="true"
                >
                  {JSON.stringify({ approvalState: lifecycle.approvalState }, null, 2)}
                </pre>
              ) : null}

              {retryResult ? (
                <pre
                  className="mt-3 max-h-44 overflow-auto rounded-lg border border-white/10 bg-black/20 p-2 text-[11px] opacity-85"
                  data-codexforge-tool-policy-retry-result="true"
                  data-codexforge-tool-policy-retry-status={retryResult.status}
                >
                  {JSON.stringify(retryResult, null, 2)}
                </pre>
              ) : null}
            </div>
          ) : null}

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
                Decision
              </p>
              <ul className="space-y-1 text-xs opacity-85">
                {visible.bullets.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
                Audit
              </p>
              <ul className="space-y-1 text-xs opacity-85">
                {visible.audit.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default ToolPolicyDecisionPanel;
