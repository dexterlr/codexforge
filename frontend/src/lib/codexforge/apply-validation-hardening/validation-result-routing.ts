import { buildApplyValidationStableId, type ApplyValidationResultStatus, type ValidationOutputReview, type ValidationResultRoute, type ValidationResultRouting } from "./apply-validation-hardening-types";

export function buildValidationResultRoute(input: ValidationResultRoute): ValidationResultRoute {
  return { ...input, noAutoFix: true };
}

export function buildValidationResultRouting(args: { outputReview?: ValidationOutputReview | null; issueType?: "build fail" | "smoke fail" | "git diff check fail" | "apply issue" | "patch issue" | "severe failure" | "unknown" | null } = {}): ValidationResultRouting {
  const routes = [
    buildValidationResultRoute({ id: "all-pass", condition: "all pass", route: "/apply-validation", label: "Completion guidance", detail: "All validation passed; show commit, tag, and push guidance.", noAutoFix: true }),
    buildValidationResultRoute({ id: "build-fail", condition: "build fail", route: "/closed-loop", label: "Closed Loop Fix", detail: "Build fail routes to closed-loop fix workflow.", noAutoFix: true }),
    buildValidationResultRoute({ id: "smoke-fail", condition: "smoke fail", route: "/closed-loop", label: "Regression triage or Closed Loop", detail: "Smoke fail routes to regression triage / closed-loop.", noAutoFix: true }),
    buildValidationResultRoute({ id: "git-diff-check-fail", condition: "git diff check fail", route: "/apply-validation", label: "Fix whitespace before apply completion", detail: "Diff check fail routes back to files/apply-validation review.", noAutoFix: true }),
    buildValidationResultRoute({ id: "apply-issue", condition: "apply issue", route: "/files", label: "Approved Patch Apply", detail: "Apply issue routes back to Approved Patch Apply.", noAutoFix: true }),
    buildValidationResultRoute({ id: "patch-issue", condition: "patch issue", route: "/files", label: "Real Patch Preview", detail: "Patch issue routes back to Real Patch Preview.", noAutoFix: true }),
    buildValidationResultRoute({ id: "unknown", condition: "unknown", route: "/validation", label: "Validation Runner", detail: "Unknown result routes to Validation Runner.", noAutoFix: true }),
    buildValidationResultRoute({ id: "severe-failure", condition: "severe failure", route: "/stabilization", label: "Stabilization", detail: "Severe failure routes to stabilization.", noAutoFix: true }),
  ];
  const status: ApplyValidationResultStatus = args.outputReview?.status ?? "unknown";
  const selected = args.issueType
    ? routes.find((route) => route.condition === args.issueType) ?? routes[6]
    : status === "pass"
      ? routes[0]
      : status === "fail"
        ? routes[1]
        : routes[6];
  const routing: ValidationResultRouting = {
    id: buildApplyValidationStableId("validation-result-routing", selected.id, status),
    selectedRoute: selected,
    routes,
    status,
    summary: [],
  };
  return { ...routing, summary: summarizeValidationResultRouting(routing) };
}

export function summarizeValidationResultRouting(routing: ValidationResultRouting): string[] {
  return [
    `Result route: ${routing.selectedRoute.label} (${routing.selectedRoute.route}).`,
    "No automatic issue creation and no auto-fix.",
  ];
}
