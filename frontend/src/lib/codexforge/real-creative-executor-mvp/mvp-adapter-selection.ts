import type {
  MvpAdapterSelection,
  MvpAdapterSelectionCriterion,
  MvpAdapterSelectionScore,
  RealCreativeMvpCandidate,
} from "./real-creative-mvp-types";

const CRITERIA: readonly MvpAdapterSelectionCriterion[] = [
  { criterionId: "smallest-blast-radius", label: "smallest blast radius", weight: 12, detail: "Prefer one bounded review loop." },
  { criterionId: "no-real-render-by-default", label: "no real render by default", weight: 12, detail: "Real render execution stays blocked." },
  { criterionId: "no-external-network", label: "no external network", weight: 10, detail: "No provider or external network dependency." },
  { criterionId: "no-arbitrary-shell", label: "no arbitrary shell", weight: 10, detail: "No arbitrary command execution." },
  { criterionId: "single-output-boundary", label: "single output boundary", weight: 9, detail: "One artifact boundary is reviewable." },
  { criterionId: "easy-artifact-review", label: "easy artifact review", weight: 8, detail: "Review board can explain provenance." },
  { criterionId: "easy-kill-switch", label: "easy kill-switch", weight: 7, detail: "Cancellation posture is simple." },
  { criterionId: "easy-manual-fallback", label: "easy manual fallback", weight: 6, detail: "Operator can complete it manually." },
  { criterionId: "useful-to-operator", label: "useful to operator", weight: 6, detail: "Creates product value before execution." },
  { criterionId: "smoke-coverage-exists", label: "smoke coverage exists", weight: 5, detail: "Assertions can verify design-only posture." },
  { criterionId: "ux-clarity", label: "UX clarity", weight: 5, detail: "One primary action remains visible." },
];

function scoreCandidate(candidate: RealCreativeMvpCandidate): MvpAdapterSelectionScore {
  const rejectedAsFirstMvp =
    candidate.candidateId === "blocked-mixed-pipeline" ||
    candidate.executorKind === "mixed-pipeline" ||
    candidate.currentStatus === "blocked" ||
    candidate.riskLevel === "blocked";
  const base =
    candidate.candidateId === "artifact-capture-only" ? 89 :
    candidate.candidateId === "manual-export-review-loop" ? 82 :
    candidate.currentStatus === "probe-ready" ? 58 :
    candidate.currentStatus === "sandbox-ready" ? 64 :
    candidate.riskLevel === "high" ? 30 : 40;
  const penalty = rejectedAsFirstMvp ? 100 : candidate.blockedReasons.length * 6;

  return {
    candidateId: candidate.candidateId,
    label: candidate.label,
    score: Math.max(0, base - penalty),
    rejectedAsFirstMvp,
    reasons: [
      rejectedAsFirstMvp ? "rejects mixed-pipeline as first MVP" : "eligible for design comparison",
      candidate.recommended ? "strong default recommendation" : "secondary or blocked candidate",
      candidate.currentStatus,
    ],
  };
}

export function rankMvpAdapterCandidates(candidates: readonly RealCreativeMvpCandidate[]): MvpAdapterSelectionScore[] {
  return candidates.map(scoreCandidate).sort((a, b) => b.score - a.score || a.candidateId.localeCompare(b.candidateId));
}

export function selectRecommendedMvpAdapter(candidates: readonly RealCreativeMvpCandidate[]): RealCreativeMvpCandidate {
  if (candidates.length === 0) {
    throw new Error("Cannot select MVP adapter without candidates.");
  }
  const ranked = rankMvpAdapterCandidates(candidates);
  const selectedId = ranked.find((score) => !score.rejectedAsFirstMvp)?.candidateId ?? candidates[0].candidateId;
  return candidates.find((candidate) => candidate.candidateId === selectedId) ?? candidates[0];
}

export function buildMvpAdapterSelection(candidates: readonly RealCreativeMvpCandidate[]): MvpAdapterSelection {
  const scores = rankMvpAdapterCandidates(candidates);
  const selected = selectRecommendedMvpAdapter(candidates);
  const rejectedFirstMvpCandidateIds = scores.filter((score) => score.rejectedAsFirstMvp).map((score) => score.candidateId);
  const selection: Omit<MvpAdapterSelection, "summary"> = {
    selectionId: "real-creative-mvp-adapter-selection",
    recommendedCandidateId: selected.candidateId,
    rejectedFirstMvpCandidateIds,
    criteria: [...CRITERIA],
    scores,
  };

  return { ...selection, summary: summarizeMvpAdapterSelection(selection) };
}

export function summarizeMvpAdapterSelection(selection: Omit<MvpAdapterSelection, "summary"> | MvpAdapterSelection): string[] {
  return [
    `Recommended MVP adapter candidate: ${selection.recommendedCandidateId}.`,
    `Selection criteria: ${selection.criteria.length} safety and operator-value checks.`,
    `Rejected as first MVP: ${selection.rejectedFirstMvpCandidateIds.join(", ") || "none"}.`,
    "Mixed-pipeline is rejected as first MVP.",
  ];
}
