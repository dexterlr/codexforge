import type { LocalRuntimeApprovalBoundary, LocalRuntimeApprovalBoundaryBoundary, LocalRuntimeApprovalBoundaryModel } from "./local-runtime-approval-boundary-types";
import { buildLocalRuntimeApprovalBoundaryStableKey } from "./local-runtime-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const LOCAL_RUNTIME_APPROVAL_BOUNDARY_LANGUAGE = [
  "Local runtime approval boundary",
  "Local runtime approval boundary does not start local runtimes",
  "Local runtime execution requires explicit operator approval",
  "Unsafe local runtime paths stay blocked",
  "Runtime groups",
  "Process lifecycle checklist",
] as const;

export function buildLocalRuntimeApprovalBoundary(input: Omit<LocalRuntimeApprovalBoundary, "id"> & { idHint: string }): LocalRuntimeApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildLocalRuntimeApprovalBoundaryStableKey("local-runtime-approval-boundary", idHint, input.status), ...boundary };
}

export function buildLocalRuntimeApprovalBoundaries(): LocalRuntimeApprovalBoundary[] {
  return [
    buildLocalRuntimeApprovalBoundary({
      idHint: "local-runtime-approval-boundary",
      status: "blocked",
      identity: "Local runtime boundary identity: local-runtime-approval-boundary reviews runtime startup, ports, processes, logs, stop plans, and local bridge scope without starting anything.",
      sections: [
        { label: "Runtime groups", items: ["Runtime groups: local app servers, game servers, creative tools, model runtimes, connector bridges, test services, process monitors, and package validators stay blocked until approved."] },
        { label: "Server/runtime preview checklist", items: ["Server/runtime preview checklist: runtime type, command dependency, workspace path, expected port, stop plan, owner, and safety status must be reviewed."] },
        { label: "Port/network checklist", items: ["Port/network checklist: port range, localhost-only posture, denied remote exposure, denied arbitrary endpoints, and no local bridge endpoint calls from arbitrary UI."] },
        { label: "Process lifecycle checklist", items: ["Process lifecycle checklist: start owner, stop owner, timeout, health signal, log redaction, cleanup plan, and recovery route must exist before a future runtime starts."] },
        { label: "Logging/stop checklist", items: ["Logging/stop checklist: logs are not captured automatically here; evidence capture, result review, stop instructions, and retry rules require explicit approval."] },
        { label: "Denied runtime actions", items: ["Denied runtime actions: start servers, start model runtimes, launch game servers, call local bridge endpoints, monitor processes, create background jobs, or run commands from UI."] },
        { label: "Unresolved runtime blockers", items: ["Unresolved runtime blockers: missing approved command boundary, missing port policy, missing stop plan, missing evidence route, and missing package/export boundary keep unsafe local runtime paths blocked."] },
      ],
      routes: ["/command-execution-approval-boundary", "/packaging-export-boundary", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep runtimes stopped, review command and port boundaries, then define packaging/export expectations before explicit operator approval.",
      advancedDetails: `Advanced local runtime approval boundary details: Local runtime approval boundary does not start local runtimes. Local runtime execution requires explicit operator approval. Unsafe local runtime paths stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildLocalRuntimeApprovalBoundaryBoundary(): LocalRuntimeApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeLocalRuntimeApprovalBoundary(model: Pick<LocalRuntimeApprovalBoundaryModel, "localRuntimeApprovalBoundaries">): string {
  return "Local runtime approval boundary reviews " + model.localRuntimeApprovalBoundaries.length + " local runtime boundary packet without starting local runtimes. Local runtime execution requires explicit operator approval, and unsafe local runtime paths stay blocked.";
}

export function buildLocalRuntimeApprovalBoundaryModel(): LocalRuntimeApprovalBoundaryModel {
  const localRuntimeApprovalBoundaries = buildLocalRuntimeApprovalBoundaries();
  const model: LocalRuntimeApprovalBoundaryModel = {
    title: "Local runtime approval boundary",
    summary: "",
    reviewPackets: localRuntimeApprovalBoundaries,
    localRuntimeApprovalBoundaries,
    boundary: buildLocalRuntimeApprovalBoundaryBoundary(),
    language: [...LOCAL_RUNTIME_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Local runtime boundary identity",
      "Runtime groups",
      "Server/runtime preview checklist",
      "Port/network checklist",
      "Process lifecycle checklist",
      "Logging/stop checklist",
      "Denied runtime actions",
      "Unresolved runtime blockers",
      "Command boundary route",
      "Packaging/export boundary route",
      "Next recommended action",
      "advanced local runtime approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeLocalRuntimeApprovalBoundary(model) };
}
