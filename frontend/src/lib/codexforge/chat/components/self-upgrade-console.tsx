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

const MAX_UPGRADE_CANDIDATES = 64;
const MAX_UPGRADE_LIST_ITEMS = 32;
const UNSAFE_UPGRADE_TEXT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]|\p{Cf}|\p{Cs}/u;

function recordValue(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function boundedUpgradeText(value: unknown, maximum = 2_000): string | null {
  return typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximum &&
    !UNSAFE_UPGRADE_TEXT.test(value)
    ? value
    : null;
}

function boundedUpgradeList(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length > MAX_UPGRADE_LIST_ITEMS) return null;
  const result: string[] = [];
  for (const item of value) {
    const text = boundedUpgradeText(item);
    if (text === null) return null;
    result.push(text);
  }
  return result;
}

function parseUpgradeCandidate(value: unknown): UpgradeCandidate | null {
  const record = recordValue(value);
  if (!record) return null;
  const id = boundedUpgradeText(record.id, 200);
  const title = boundedUpgradeText(record.title, 500);
  const capabilityId = boundedUpgradeText(record.capabilityId, 200);
  const rationale = boundedUpgradeText(record.rationale);
  const nextAction = boundedUpgradeText(record.nextAction);
  const deliverables = boundedUpgradeList(record.deliverables);
  const validationCommands = boundedUpgradeList(record.validationCommands);
  const safetyGates = boundedUpgradeList(record.safetyGates);
  const blockedBy = boundedUpgradeList(record.blockedBy);
  if (
    id === null ||
    title === null ||
    capabilityId === null ||
    rationale === null ||
    nextAction === null ||
    deliverables === null ||
    validationCommands === null ||
    safetyGates === null ||
    blockedBy === null ||
    !["p0", "p1", "p2", "p3"].includes(String(record.priority)) ||
    !["ready", "planned", "approval-gated", "blocked"].includes(String(record.status)) ||
    !["low", "medium", "high", "critical"].includes(String(record.riskLevel))
  ) {
    return null;
  }
  return {
    id,
    title,
    capabilityId,
    priority: record.priority as UpgradeCandidate["priority"],
    status: record.status as UpgradeCandidate["status"],
    riskLevel: record.riskLevel as UpgradeCandidate["riskLevel"],
    rationale,
    nextAction,
    deliverables,
    validationCommands,
    safetyGates,
    blockedBy,
  };
}

function boundedCount(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= MAX_UPGRADE_CANDIDATES
    ? value
    : null;
}

function parseSelfUpgradeResponse(value: unknown): SelfUpgradeResponse | null {
  const record = recordValue(value);
  const candidatesValue = record?.candidates;
  const safety = recordValue(record?.safetySummary);
  if (
    !record ||
    record.ok !== true ||
    !Array.isArray(candidatesValue) ||
    candidatesValue.length > MAX_UPGRADE_CANDIDATES ||
    !safety
  ) {
    return null;
  }
  const candidates = candidatesValue
    .map(parseUpgradeCandidate)
    .filter((candidate): candidate is UpgradeCandidate => candidate !== null);
  if (
    candidates.length !== candidatesValue.length ||
    new Set(candidates.map((candidate) => candidate.id)).size !== candidates.length
  ) {
    return null;
  }
  const version = boundedUpgradeText(record.version, 200);
  const bridgeVersion = boundedUpgradeText(record.bridgeVersion, 200);
  const candidateCount = boundedCount(record.candidateCount);
  const readyCount = boundedCount(record.readyCount);
  const approvalGatedCount = boundedCount(record.approvalGatedCount);
  const blockedCount = boundedCount(record.blockedCount);
  const topCandidate = record.topCandidate === null ? null : parseUpgradeCandidate(record.topCandidate);
  const canonicalTopCandidate = topCandidate === null
    ? null
    : candidates.find((candidate) => candidate.id === topCandidate.id) ?? null;
  const localPcControl = boundedUpgradeText(safety.localPcControl, 200);
  const cameraAccess = boundedUpgradeText(safety.cameraAccess, 200);
  const webAccess = boundedUpgradeText(safety.webAccess, 200);
  const creativeAppAutomation = boundedUpgradeText(safety.creativeAppAutomation, 200);
  const tradingResearch = boundedUpgradeText(safety.tradingResearch, 200);
  const brokerExecution = boundedUpgradeText(safety.brokerExecution, 200);
  if (
    version === null ||
    bridgeVersion === null ||
    candidateCount !== candidates.length ||
    readyCount !== candidates.filter((candidate) => candidate.status === "ready").length ||
    approvalGatedCount !== candidates.filter((candidate) => candidate.status === "approval-gated").length ||
    blockedCount !== candidates.filter((candidate) => candidate.status === "blocked").length ||
    (record.topCandidate !== null && topCandidate === null) ||
    (topCandidate !== null && canonicalTopCandidate === null) ||
    localPcControl === null ||
    cameraAccess === null ||
    webAccess === null ||
    creativeAppAutomation === null ||
    tradingResearch === null ||
    brokerExecution !== "blocked"
  ) {
    return null;
  }
  return {
    ok: true,
    version,
    bridgeVersion,
    candidateCount,
    readyCount,
    approvalGatedCount,
    blockedCount,
    topCandidate: canonicalTopCandidate,
    candidates,
    safetySummary: {
      localPcControl,
      cameraAccess,
      webAccess,
      creativeAppAutomation,
      tradingResearch,
      brokerExecution,
    },
  };
}

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

type SelfUpgradeConsoleProps = Readonly<{
  onUsePrompt?: (prompt: string) => void;
}>;

export function SelfUpgradeConsole({ onUsePrompt }: SelfUpgradeConsoleProps = {}) {
  const [data, setData] = useState<SelfUpgradeResponse | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSelfUpgradeBacklog() {
      setError("");

      try {
        const response = await fetch("/api/codexforge/tools/self-upgrade", {
          cache: "no-store",
          redirect: "error",
          headers: { Accept: "application/json" },
        });
        const contentType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
        const payload = contentType === "application/json"
          ? parseSelfUpgradeResponse(await response.json())
          : null;

        if (cancelled) return;

        if (!response.ok || !payload) {
          setError("Self-upgrade backlog is not available yet.");
          return;
        }

        setData(payload);
      } catch (fetchError) {
        if (!cancelled) {
          void fetchError;
          setError("Self-upgrade backlog could not be loaded safely.");
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

    setCopyStatus("");
    if (!navigator.clipboard?.writeText) {
      setCopied(false);
      setCopyStatus("Clipboard access is unavailable. Select and copy the visible plan prompt manually.");
      return;
    }

    try {
      await navigator.clipboard.writeText(planPrompt);
      setCopied(true);
      setCopyStatus("Plan prompt copied to the clipboard.");
      window.setTimeout(() => {
        setCopied(false);
        setCopyStatus("");
      }, 1800);
    } catch {
      setCopied(false);
      setCopyStatus("Clipboard access was denied. Select and copy the visible plan prompt manually.");
    }
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
          role="alert"
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

                <div className="flex flex-wrap gap-2">
                  {onUsePrompt ? (
                    <button
                      type="button"
                      data-codexforge-self-upgrade-use-plan
                      onClick={() => onUsePrompt(planPrompt)}
                      className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20"
                    >
                      Use in Jarvis chat
                    </button>
                  ) : null}
                  <button
                    type="button"
                    data-codexforge-self-upgrade-copy-plan
                    onClick={copyPlanPrompt}
                    className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20"
                  >
                    {copied ? "Plan prompt copied" : "Copy plan prompt"}
                  </button>
                </div>
                {copyStatus ? (
                  <p
                    role="status"
                    data-codexforge-self-upgrade-copy-status
                    className="mt-2 max-w-xl text-xs leading-5 text-cyan-100"
                  >
                    {copyStatus}
                  </p>
                ) : null}
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
