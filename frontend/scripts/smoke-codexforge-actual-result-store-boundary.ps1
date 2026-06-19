param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 766 Actual Result Store Boundary" `
  -ScriptFile "smoke-codexforge-actual-result-store-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-result-store-boundary" `
  -Route "src\app\actual-result-store-boundary" `
  -MainPanel "ActualResultStoreBoundaryPanel" `
  -CommandLabel "Go to Actual Result Store Boundary" `
  -Modules @("actual-result-store-boundary-model.ts", "index.ts") `
  -Components @("ActualResultStoreBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualResultStoreBoundaryStableKey", "buildActualResultStoreBoundary", "buildActualResultStoreBoundaryItems", "buildActualResultStoreBoundaryBoundary", "buildActualResultStoreBoundaryModel", "summarizeActualResultStoreBoundary", "ACTUAL_RESULT_STORE_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Result Store Boundary", "Actual result store boundary does not store or reuse results from UI", "Result storage and reuse require explicit operator approval", "Boundary packet fields", "result source", "acceptance state", "reuse scope", "privacy state", "safety state", "retention class", "audit link", "evidence link", "blocked actions") `
  -PlainEnglish @("Actual Result Store Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not store or reuse results from UI") `
  -RouteHref "/actual-result-store-boundary"

Write-Host "[OK] CodexForge Phase 766 actual result store boundary smoke passed."
