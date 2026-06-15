param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate",
  "/daily-beta-1-controlled-trial-result-review",
  "/daily-beta-1-controlled-trial-recovery-review",
  "/daily-beta-1-controlled-trial-hardening",
  "/live-backend-boundary-inventory",
  "/provider-execution-boundary-readiness-review",
  "/local-model-execution-boundary-readiness-review",
  "/connector-execution-boundary-readiness-review",
  "/automation-execution-boundary-readiness-review",
  "/file-mutation-boundary-readiness-review",
  "/test-execution-boundary-readiness-review",
  "/unified-execution-boundary-gap-report",
  "/first-approved-provider-execution-trial",
  "/first-approved-local-model-execution-trial",
  "/first-approved-connector-access-trial",
  "/first-approved-automation-dry-run-trial",
  "/first-approved-file-patch-dry-run"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 540 Unified Execution Boundary Gap Report" `
  -ScriptFile "smoke-codexforge-unified-execution-boundary-gap-report.ps1" `
  -Domain "src\lib\codexforge\unified-execution-boundary-gap-report" `
  -Route "src\app\unified-execution-boundary-gap-report" `
  -MainPanel "UnifiedExecutionBoundaryGapReportPanel" `
  -CommandLabel "Go to Unified Execution Boundary Gap Report" `
  -Modules @("unified-execution-boundary-gap-report-types.ts", "unified-execution-boundary-gap-report-summary.ts", "index.ts") `
  -Components @("UnifiedExecutionBoundaryGapReportPanel.tsx", "index.ts") `
  -Exports @("buildUnifiedExecutionBoundaryGapReportStableKey", "buildUnifiedExecutionBoundaryGapReport", "buildUnifiedExecutionBoundaryGapReports", "buildUnifiedExecutionBoundaryGapReportBoundary", "buildUnifiedExecutionBoundaryGapReportModel", "summarizeUnifiedExecutionBoundaryGapReport", "UNIFIED_EXECUTION_BOUNDARY_GAP_REPORT_LANGUAGE") `
  -PhaseMarkers @("Unified execution boundary gap report", "Unified execution boundary gap report does not run probes", "Execution gaps require implementation and explicit approval before use", "Review UI is not proof of live execution", "Execution boundary groups", "Highest-risk gaps") `
  -PlainEnglish @("Unified execution gap identity", "Provider/local/connector/automation status", "File/test execution status", "Evidence/logging/audit status", "Denied gap report actions", "Unresolved execution gaps", "First approved provider trial route", "First approved local model trial route", "next recommended action") `
  -RouteHref "/unified-execution-boundary-gap-report" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 540 unified execution boundary gap report smoke passed."
