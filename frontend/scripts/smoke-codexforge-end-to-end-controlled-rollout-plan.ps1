param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-end-to-end-workflow-release-candidate",
  "/end-to-end-controlled-rollout-plan",
  "/end-to-end-controlled-rollout-review",
  "/end-to-end-rollout-feedback-inbox",
  "/end-to-end-rollout-regression-review",
  "/end-to-end-rollout-hardening-pass",
  "/live-execution-boundary-final-signoff",
  "/codexforge-end-to-end-daily-beta-candidate",
  "/end-to-end-daily-beta-operator-handoff"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 554 End-to-End Controlled Rollout Plan" `
  -ScriptFile "smoke-codexforge-end-to-end-controlled-rollout-plan.ps1" `
  -Domain "src\lib\codexforge\end-to-end-controlled-rollout-plan" `
  -Route "src\app\end-to-end-controlled-rollout-plan" `
  -MainPanel "EndToEndControlledRolloutPlanPanel" `
  -CommandLabel "Go to End-to-End Controlled Rollout Plan" `
  -Modules @("end-to-end-controlled-rollout-plan-types.ts", "end-to-end-controlled-rollout-plan-summary.ts", "index.ts") `
  -Components @("EndToEndControlledRolloutPlanPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndControlledRolloutPlanStableKey", "buildEndToEndControlledRolloutPlan", "buildEndToEndControlledRolloutPlans", "buildEndToEndControlledRolloutPlanBoundary", "buildEndToEndControlledRolloutPlanModel", "summarizeEndToEndControlledRolloutPlan", "END_TO_END_CONTROLLED_ROLLOUT_PLAN_LANGUAGE") `
  -PhaseMarkers @("End-to-end controlled rollout plan", "End-to-end controlled rollout plan does not execute rollout", "Rollout actions require explicit operator approval", "Unapproved rollout paths remain blocked", "Rollout stage groups", "Operator cohort checklist") `
  -PlainEnglish @("Controlled rollout plan identity", "Approval gate checklist", "Rollback checklist", "Monitoring/evidence checklist", "Denied rollout plan actions", "Unresolved rollout plan blockers", "Rollout review route", "Rollout feedback inbox route", "next recommended action", "no controlled rollout execution", "no live boundary signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e data sending without approval") `
  -RouteHref "/end-to-end-controlled-rollout-plan" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 554 end-to-end controlled rollout plan smoke passed."
