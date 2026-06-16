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
  -PhaseName "Phase 558 End-to-End Rollout Hardening Pass" `
  -ScriptFile "smoke-codexforge-end-to-end-rollout-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\end-to-end-rollout-hardening-pass" `
  -Route "src\app\end-to-end-rollout-hardening-pass" `
  -MainPanel "EndToEndRolloutHardeningPassPanel" `
  -CommandLabel "Go to End-to-End Rollout Hardening Pass" `
  -Modules @("end-to-end-rollout-hardening-pass-types.ts", "end-to-end-rollout-hardening-pass-summary.ts", "index.ts") `
  -Components @("EndToEndRolloutHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndRolloutHardeningPassStableKey", "buildEndToEndRolloutHardeningPass", "buildEndToEndRolloutHardeningPasses", "buildEndToEndRolloutHardeningPassBoundary", "buildEndToEndRolloutHardeningPassModel", "summarizeEndToEndRolloutHardeningPass", "END_TO_END_ROLLOUT_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("End-to-end rollout hardening pass", "End-to-end rollout hardening pass does not apply changes", "Rollout hardening changes require explicit operator approval", "Unresolved rollout hardening blockers stay blocked", "Hardening groups", "Boundary readiness checklist") `
  -PlainEnglish @("Rollout hardening pass identity", "Rollout review status", "Feedback status", "Regression status", "Denied hardening actions", "Unresolved hardening blockers", "Final live boundary signoff route", "Daily Beta candidate route", "next recommended action", "no rollout hardening apply behavior", "no hardening apply behavior", "no live boundary signoff automation") `
  -RouteHref "/end-to-end-rollout-hardening-pass" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 558 end-to-end rollout hardening pass smoke passed."
