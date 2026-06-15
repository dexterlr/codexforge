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
  -PhaseName "Phase 545 First Approved File Patch Dry-Run" `
  -ScriptFile "smoke-codexforge-first-approved-file-patch-dry-run.ps1" `
  -Domain "src\lib\codexforge\first-approved-file-patch-dry-run" `
  -Route "src\app\first-approved-file-patch-dry-run" `
  -MainPanel "FirstApprovedFilePatchDryRunPanel" `
  -CommandLabel "Go to First Approved File Patch Dry-Run" `
  -Modules @("first-approved-file-patch-dry-run-types.ts", "first-approved-file-patch-dry-run-summary.ts", "index.ts") `
  -Components @("FirstApprovedFilePatchDryRunPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedFilePatchDryRunStableKey", "buildFirstApprovedFilePatchDryRun", "buildFirstApprovedFilePatchDryRuns", "buildFirstApprovedFilePatchDryRunBoundary", "buildFirstApprovedFilePatchDryRunModel", "summarizeFirstApprovedFilePatchDryRun", "FIRST_APPROVED_FILE_PATCH_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("First approved file patch dry-run", "First approved file patch dry-run does not apply patches from UI", "File patch dry-runs require explicit operator approval at the boundary", "Unapproved patch dry-run paths remain blocked", "Patch dry-run groups", "Approved root checklist") `
  -PlainEnglish @("First approved file patch dry-run identity", "Diff/patch checklist", "Rollback checklist", "Test readiness checklist", "Denied patch dry-run actions", "Unresolved patch dry-run blockers", "Test execution boundary route", "Unified execution gap report route", "next recommended action") `
  -RouteHref "/first-approved-file-patch-dry-run" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 545 first approved file patch dry-run smoke passed."
