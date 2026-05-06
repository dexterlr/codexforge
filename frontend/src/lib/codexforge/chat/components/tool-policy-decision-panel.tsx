"use client";

import type { CodexForgeToolPolicyDecision } from "@/lib/codexforge/tools/tool-policy-guard";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import { buildVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";

type ToolPolicyDecisionPanelProps = {
  decision?: CodexForgeToolPolicyDecision | null;
  summary?: CodexForgeVisibleToolPolicy | null;
  compact?: boolean;
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

export function ToolPolicyDecisionPanel({
  decision,
  summary,
  compact = false,
}: ToolPolicyDecisionPanelProps) {
  const visible = summary ?? buildVisibleToolPolicy(decision);

  if (!visible) {
    return null;
  }

  return (
    <section
      className={[
        "rounded-2xl border p-4 shadow-sm",
        shellByTone[visible.tone] ?? shellByTone.error,
      ].join(" ")}
      data-codexforge-tool-policy-panel="true"
      data-codexforge-tool-policy-tone={visible.tone}
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
          </div>

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
