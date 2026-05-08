"use client";

import { useEffect, useMemo, useState } from "react";

type UpgradeCandidate = {
  id: string;
  title: string;
  capabilityId: string;
  priority: "p0" | "p1" | "p2" | "p3";
  status: "ready" | "planned" | "approval-gated" | "blocked";
  riskLevel: "low" | "medium" | "high" | "critical";
  rationale: string;
  nextAction: string;
  deliverables: string[];
  validationCommands: string[];
  safetyGates: string[];
  blockedBy: string[];
};

type SelfUpgradeResponse = {
  ok: true;
  version: string;
  bridgeVersion: string;
  candidateCount: number;
  readyCount: number;
  approvalGatedCount: number;
  blockedCount: number;
  topCandidate: UpgradeCandidate | null;
  candidates: UpgradeCandidate[];
  safetySummary: {
    localPcControl: string;
    cameraAccess: string;
    webAccess: string;
    creativeAppAutomation: string;
    tradingResearch: string;
    brokerExecution: string;
  };
};

function statusTone(status: UpgradeCandidate["status"]): string {
  if (status === "ready") return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
  if (status === "approval-gated") return "border-amber-400/30 bg-amber-500/10 text-amber-100";
  if (status === "blocked") return "border-rose-400/30 bg-rose-500/10 text-rose-100";

  return "border-slate-400/20 bg-slate-500/10 text-slate-100";
}

function riskTone(risk: UpgradeCandidate["riskLevel"]): string {
  if (risk === "critical") return "border-rose-400/30 bg-rose-500/10 text-rose-100";
  if (risk === "high") return "border-orange-400/30 bg-orange-500/10 text-orange-100";
  if (risk === "medium") return "border-amber-400/30 bg-amber-500/10 text-amber-100";

  return "border-cyan-400/30 bg-cyan-500/10 text-cyan-100";
}

function safeList(items: string[] | undefined, limit = 4): string[] {
  return Array.isArray(items) ? items.filter(Boolean).slice(0, limit) : [];
}

function buildPlanPrompt(candidate: UpgradeCandidate): string {
  return [
    `Plan CodexForge self-upgrade: ${candidate.title}`,
    "",
    `Capability: ${candidate.capabilityId}`,
    `Priority: ${candidate.priority}`,
    `Status: ${candidate.status}`,
    `Risk: ${candidate.riskLevel}`,
    "",
    "Goal:",
    candidate.nextAction,
    "",
    "Deliverables:",
    ...candidate.deliverables.map((item) => `- ${item}`),
    "",
    "Safety gates:",
    ...candidate.safetyGates.map((item) => `- ${item}`),
    "",
    "Validation:",
    ...candidate.validationCommands.map((item) => `- ${item}`),
  ].join("\n");
}

export function SelfUpgradeConsole() {
  const [data, setData] = useState<SelfUpgradeResponse | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSelfUpgradeBacklog() {
      setError("");

      try {
        const response = await fetch("/api/codexforge/tools/self-upgrade", {
          cache: "no-store",
        });
        const payload = (await response.json()) as SelfUpgradeResponse | { ok?: false; error?: string };

        if (cancelled) return;

        if (!response.ok || payload.ok !== true) {
          setError("Self-upgrade backlog is not available yet.");
          return;
        }

        setData(payload);
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load self-upgrade backlog.");
        }
      }
    }

    void loadSelfUpgradeBacklog();

    return () => {
      cancelled = true;
    };
  }, []);

  const topCandidate = data?.topCandidate ?? null;
  const visibleCandidates = data?.candidates.slice(0, 5) ?? [];

  const planPrompt = useMemo(
    () => (topCandidate ? buildPlanPrompt(topCandidate) : ""),
    [topCandidate]
  );

  async function copyPlanPrompt() {
    if (!planPrompt) return;

    await navigator.clipboard.writeText(planPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      data-codexforge-self-upgrade-console
      className="rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/20"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Self-upgrade console
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            CodexForge upgrade queue
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            A ranked, safety-gated roadmap generated from CodexForge capability bridges, adapters, and smoke contracts.
          </p>
        </div>

        <div
          data-codexforge-self-upgrade-safety-summary
          className="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs text-slate-200"
        >
          <div>PC: {data?.safetySummary.localPcControl ?? "loading"}</div>
          <div>Camera: {data?.safetySummary.cameraAccess ?? "loading"}</div>
          <div>Broker: {data?.safetySummary.brokerExecution ?? "blocked"}</div>
        </div>
      </div>

      {error ? (
        <div
          data-codexforge-self-upgrade-error
          className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100"
        >
          {error}
        </div>
      ) : null}

      {!data && !error ? (
        <div
          data-codexforge-self-upgrade-loading
          className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300"
        >
          Loading self-upgrade backlog...
        </div>
      ) : null}

      {data ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Candidates</div>
              <div className="mt-1 text-2xl font-semibold text-white">{data.candidateCount}</div>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">Ready</div>
              <div className="mt-1 text-2xl font-semibold text-white">{data.readyCount}</div>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-amber-200">Approval gated</div>
              <div className="mt-1 text-2xl font-semibold text-white">{data.approvalGatedCount}</div>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-rose-200">Blocked</div>
              <div className="mt-1 text-2xl font-semibold text-white">{data.blockedCount}</div>
            </div>
          </div>

          {topCandidate ? (
            <div
              data-codexforge-self-upgrade-top-candidate
              className="mt-5 rounded-3xl border border-cyan-400/25 bg-cyan-400/10 p-4"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${statusTone(topCandidate.status)}`}>
                      {topCandidate.status}
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${riskTone(topCandidate.riskLevel)}`}>
                      {topCandidate.riskLevel} risk
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                      {topCandidate.priority}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-white">{topCandidate.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{topCandidate.rationale}</p>
                  <p className="mt-3 text-sm font-medium text-cyan-100">{topCandidate.nextAction}</p>
                </div>

                <button
                  type="button"
                  data-codexforge-self-upgrade-copy-plan
                  onClick={copyPlanPrompt}
                  className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20"
                >
                  {copied ? "Plan prompt copied" : "Copy plan prompt"}
                </button>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Deliverables</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {safeList(topCandidate.deliverables).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Safety gates</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {safeList(topCandidate.safetyGates).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Validation</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {safeList(topCandidate.validationCommands, 3).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          <div data-codexforge-self-upgrade-candidate-list className="mt-5 space-y-3">
            {visibleCandidates.map((candidate) => (
              <article
                key={candidate.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">{candidate.title}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] ${statusTone(candidate.status)}`}>
                    {candidate.status}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] ${riskTone(candidate.riskLevel)}`}>
                    {candidate.riskLevel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{candidate.nextAction}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
