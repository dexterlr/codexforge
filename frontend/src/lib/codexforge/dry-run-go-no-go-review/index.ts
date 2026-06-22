import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_GO_NO_GO_REVIEW_LANGUAGE =
  "Dry-run go no-go review | Dry-run go no-go review does not release execution | Dry-run go no-go review requires explicit operator approval | Go no-go review reports dry-run-only status blocked apply run and required future backend guards | Denied dry-run go no-go paths remain blocked | Dry-run go no-go checklist | Go to Dry-Run Go No Go Review";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunGoNoGoReviewStableKey };

export function buildDryRunGoNoGoReviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-go-no-go-review");
}

export function summarizeDryRunGoNoGoReview(model = buildDryRunGoNoGoReviewModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
