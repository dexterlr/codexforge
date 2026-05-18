import {
  buildRegressionTriageStableKey,
  uniqueRegressionStrings,
  type RegressionCauseCandidate,
  type RegressionClassification,
  type RegressionSignal,
  type RegressionSuspectedCause,
} from "./regression-triage-types";

function signalText(signal: RegressionSignal): string {
  return `${signal.type} ${signal.title} ${signal.snippet} ${signal.sourceCommand ?? ""} ${signal.relatedFiles.join(" ")}`.toLowerCase();
}

function candidateFromPattern(signal: RegressionSignal, classification?: RegressionClassification): RegressionCauseCandidate {
  const text = signalText(signal);
  let title = "Investigation needed";
  let reason = "The signal does not match a known deterministic regression cause pattern.";
  let confidence = Math.min(0.62, signal.confidence);
  let suggestedInspection = "Inspect failed output and current target files before recommending a fix.";
  let safeNextAction = "Create a Safe Patch Preview handoff only after review.";

  if (signal.type === "duplicate-react-key" || text.includes("duplicate key") || text.includes("unique key")) {
    title = "React key generation / repeated display text";
    reason = "Duplicate key warning points to React key generation or repeated display text in list rendering.";
    confidence = Math.max(signal.confidence, 0.82);
    suggestedInspection = "Inspect mapped list keys and verify stable ids are not derived from repeated display text alone.";
    safeNextAction = "Recommend a key-stability fix through Safe Patch Preview after current file review.";
  } else if (signal.type === "mojibake-risk" || text.includes("mojibake") || /\\u00c3|\\u00c2|\\ufffd/i.test(signal.snippet)) {
    title = "Encoding issue or copied special character issue";
    reason = "Mojibake risk maps to an encoding issue or copied special character issue in visible text or fixtures.";
    confidence = Math.max(signal.confidence, 0.78);
    suggestedInspection = "Inspect the rendered text, source literals, and copied content for encoding drift.";
    safeNextAction = "Recommend encoding cleanup through Safe Patch Preview only.";
  } else if (signal.type === "type-error" || text.includes("typescript") || text.includes("not assignable")) {
    title = "Type contract drift";
    reason = "TypeScript failure maps to type contract drift between domain, component, or route shapes.";
    confidence = Math.max(signal.confidence, 0.8);
    suggestedInspection = "Inspect the changed type, import, export, and call site contract.";
    safeNextAction = "Prepare a type-contract fix candidate and verify build output first.";
  } else if (signal.type === "smoke-failure" && (text.includes("missing marker") || text.includes("expected marker") || text.includes("marker"))) {
    title = "Smoke expectation or export mismatch";
    reason = "Smoke missing marker maps to smoke expectation or export mismatch.";
    confidence = Math.max(signal.confidence, 0.78);
    suggestedInspection = "Inspect the smoke assertion, exported symbol, and rendered marker text.";
    safeNextAction = "Prepare a smoke-marker fix candidate without running or changing tests from the UI.";
  } else if (signal.type === "route-failure" || text.includes("/api/") || text.includes("route")) {
    title = "API/route contract";
    reason = "Route failure maps to API/route contract drift in request, response, or status handling.";
    confidence = Math.max(signal.confidence, 0.74);
    suggestedInspection = "Inspect route handler inputs, output shape, and caller assumptions.";
    safeNextAction = "Prepare a route-contract fix candidate through Safe Patch Preview.";
  } else if (signal.type === "ui-layout-regression" || text.includes("overflow") || text.includes("minwidth") || text.includes("wrap")) {
    title = "Missing wrap/minWidth/overflow guards";
    reason = "Layout overflow maps to missing wrap/minWidth/overflow guards in a dense UI surface.";
    confidence = Math.max(signal.confidence, 0.72);
    suggestedInspection = "Inspect responsive grid, flex wrapping, minWidth, overflowWrap, and overflow guards.";
    safeNextAction = "Prepare a layout-polish fix candidate through Safe Patch Preview.";
  } else if (signal.type === "policy-regression" || text.includes("policy smoke") || text.includes("approval boundary")) {
    title = "Unsafe import or missing approval boundary";
    reason = "Policy smoke failure maps to unsafe import or missing approval boundary.";
    confidence = Math.max(signal.confidence, 0.82);
    suggestedInspection = "Inspect policy files and UI imports for mutation, apply, command, or graph write paths.";
    safeNextAction = "Prepare a policy-boundary fix candidate and keep mutation blocked.";
  } else if (signal.type === "build-failure" || text.includes("build failed") || text.includes("bad import")) {
    title = "Bad import/export or client/server boundary";
    reason = "Build failure after integration maps to bad import/export or client/server boundary.";
    confidence = Math.max(signal.confidence, classification?.confidence ?? 0.76);
    suggestedInspection = "Inspect imports, exports, server/client component boundaries, and referenced modules.";
    safeNextAction = "Prepare an export-contract fix candidate after verifying failed build output.";
  }

  return {
    causeId: buildRegressionTriageStableKey("regression-cause", title, signal.id),
    title,
    reason,
    confidence,
    relatedFiles: signal.relatedFiles,
    signals: [signal.id],
    suggestedInspection,
    safeNextAction,
  };
}

export function buildRegressionCauseCandidate(args: {
  signal?: RegressionSignal | null;
  classification?: RegressionClassification | null;
  title?: string | null;
  reason?: string | null;
  relatedFiles?: readonly string[] | null;
  signals?: readonly string[] | null;
  confidence?: number | null;
}): RegressionCauseCandidate {
  if (args.signal) return candidateFromPattern(args.signal, args.classification ?? undefined);

  const title = args.title?.trim() || "Investigation needed";
  return {
    causeId: buildRegressionTriageStableKey("regression-cause", title, args.signals?.join("|") || "manual"),
    title,
    reason: args.reason?.trim() || "Manual cause candidate requires operator review.",
    confidence: Math.min(1, Math.max(0, args.confidence ?? 0.42)),
    relatedFiles: uniqueRegressionStrings([...(args.relatedFiles ?? [])]),
    signals: uniqueRegressionStrings([...(args.signals ?? [])]),
    suggestedInspection: "Inspect failed output and current files before preparing any fix.",
    safeNextAction: "Use Safe Patch Preview handoff only after review.",
  };
}

export function buildRegressionSuspectedCause(args: {
  signals?: readonly RegressionSignal[] | null;
  classifications?: readonly RegressionClassification[] | null;
} = {}): RegressionSuspectedCause {
  const classifications = args.classifications ?? [];
  const candidates = (args.signals ?? [])
    .map((signal) =>
      buildRegressionCauseCandidate({
        signal,
        classification: classifications.find((classification) => classification.signalIds.includes(signal.id)),
      })
    )
    .sort((a, b) => b.confidence - a.confidence || a.causeId.localeCompare(b.causeId));
  const topCandidate = candidates[0] ?? null;

  return {
    id: "regression-suspected-cause",
    candidates,
    topCandidate,
    summary: summarizeRegressionSuspectedCause({ candidates, topCandidate }),
  };
}

export function summarizeRegressionSuspectedCause(args: RegressionSuspectedCause | {
  candidates: readonly RegressionCauseCandidate[];
  topCandidate: RegressionCauseCandidate | null;
}): string[] {
  return [
    `${args.candidates.length} suspected cause candidates built from deterministic patterns.`,
    args.topCandidate ? `Top suspected cause: ${args.topCandidate.title}.` : "No suspected cause is available yet.",
    "Cause evidence is context, not proof; inspect failed output and current files first.",
  ];
}
