"use client";

import type { RealCreativeMvpCandidate } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpCandidatePanel({ candidates }: { candidates: RealCreativeMvpCandidate[] }) {
  return (
    <MvpPanel title="MVP Candidates" marker="MvpCandidatePanel renders candidates include artifact-capture-only manual-export-review-loop blender-version-probe-only comfyui-health-probe-only stable key helper">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 }}>
        {candidates.map((candidate, index) => (
          <article key={buildRealCreativeMvpReactKey(candidate.candidateId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{candidate.label}</strong>
              <span style={statusPill}>{candidate.currentStatus}</span>
            </div>
            <p style={body}>{candidate.scope}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 110px), 1fr))", gap: 8 }}>
              <MvpMetric label="Kind" value={candidate.executorKind} />
              <MvpMetric label="Risk" value={candidate.riskLevel} />
              <MvpMetric label="Recommended" value={String(candidate.recommended)} />
            </div>
            <MvpList title="Blocked reasons" items={candidate.blockedReasons.length ? candidate.blockedReasons : ["none"]} />
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
