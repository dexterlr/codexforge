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
  "/automation-execution-boundary-readiness-review"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 533 Live Backend Boundary Inventory" `
  -ScriptFile "smoke-codexforge-live-backend-boundary-inventory.ps1" `
  -Domain "src\lib\codexforge\live-backend-boundary-inventory" `
  -Route "src\app\live-backend-boundary-inventory" `
  -MainPanel "LiveBackendBoundaryInventoryPanel" `
  -CommandLabel "Go to Live Backend Boundary Inventory" `
  -Modules @("live-backend-boundary-inventory-types.ts", "live-backend-boundary-inventory-summary.ts", "index.ts") `
  -Components @("LiveBackendBoundaryInventoryPanel.tsx", "index.ts") `
  -Exports @("buildLiveBackendBoundaryInventoryStableKey", "buildLiveBackendBoundaryInventory", "buildLiveBackendBoundaryInventories", "buildLiveBackendBoundaryInventoryBoundary", "buildLiveBackendBoundaryInventoryModel", "summarizeLiveBackendBoundaryInventory", "LIVE_BACKEND_BOUNDARY_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Live backend boundary inventory", "Live backend boundary inventory does not execute boundary probes", "Missing boundaries remain blocked until implemented and approved", "UI review surfaces are not proof of live execution", "Boundary groups", "Provider boundary status") `
  -PlainEnglish @("Live backend boundary inventory identity", "Local model boundary status", "Connector boundary status", "Automation boundary status", "File/test execution boundary status", "Evidence/logging boundary status", "Denied inventory actions", "Unresolved backend boundary gaps", "Provider execution readiness route", "Local model execution readiness route", "next recommended action") `
  -RouteHref "/live-backend-boundary-inventory" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 533 live backend boundary inventory smoke passed."
