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
  -PhaseName "Phase 559 Live Execution Boundary Final Signoff" `
  -ScriptFile "smoke-codexforge-live-execution-boundary-final-signoff.ps1" `
  -Domain "src\lib\codexforge\live-execution-boundary-final-signoff" `
  -Route "src\app\live-execution-boundary-final-signoff" `
  -MainPanel "LiveExecutionBoundaryFinalSignoffPanel" `
  -CommandLabel "Go to Live Execution Boundary Final Signoff" `
  -Modules @("live-execution-boundary-final-signoff-types.ts", "live-execution-boundary-final-signoff-summary.ts", "index.ts") `
  -Components @("LiveExecutionBoundaryFinalSignoffPanel.tsx", "index.ts") `
  -Exports @("buildLiveExecutionBoundaryFinalSignoffStableKey", "buildLiveExecutionBoundaryFinalSignoff", "buildLiveExecutionBoundaryFinalSignoffs", "buildLiveExecutionBoundaryFinalSignoffBoundary", "buildLiveExecutionBoundaryFinalSignoffModel", "summarizeLiveExecutionBoundaryFinalSignoff", "LIVE_EXECUTION_BOUNDARY_FINAL_SIGNOFF_LANGUAGE") `
  -PhaseMarkers @("Live execution boundary final signoff", "Live execution boundary final signoff does not sign off live execution automatically", "Live execution requires explicit operator approval at every boundary", "Unresolved live boundary blockers stay blocked", "Boundary signoff groups", "Rollback stop checklist") `
  -PlainEnglish @("Live execution boundary final signoff identity", "Provider/local/connector/automation checklist", "File/test execution checklist", "Audit/evidence/logging checklist", "Denied signoff actions", "Unresolved boundary signoff blockers", "Daily Beta candidate route", "Operator handoff route", "next recommended action", "no live boundary signoff automation", "no go-live behavior", "no live provider/local/connector/automation traffic routing") `
  -RouteHref "/live-execution-boundary-final-signoff" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 559 live execution boundary final signoff smoke passed."
