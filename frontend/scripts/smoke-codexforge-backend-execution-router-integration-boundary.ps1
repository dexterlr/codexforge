param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 938 Backend Execution Router Integration Boundary" `
  -ScriptFile "smoke-codexforge-backend-execution-router-integration-boundary.ps1" `
  -Domain "src\lib\codexforge\backend-execution-router-integration-boundary" `
  -Route "src\app\backend-execution-router-integration-boundary" `
  -MainPanel "BackendExecutionRouterIntegrationBoundaryPanel" `
  -CommandLabel "Go to Backend Execution Router Integration Boundary" `
  -Modules @("backend-execution-router-integration-boundary-model.ts", "index.ts") `
  -Components @("BackendExecutionRouterIntegrationBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildBackendExecutionRouterIntegrationBoundaryStableKey", "buildBackendExecutionRouterIntegrationBoundary", "buildBackendExecutionRouterIntegrationBoundaryItems", "buildBackendExecutionRouterIntegrationBoundaryBoundary", "buildBackendExecutionRouterIntegrationBoundaryModel", "summarizeBackendExecutionRouterIntegrationBoundary", "BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Backend execution router integration boundary", "Backend execution router integration boundary does not execute adapters", "Model-routed backend execution requires explicit operator approval", "Backend adapters remain approval-gated execution arms", "Denied backend router integration paths remain blocked", "Backend router integration checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend execution router integration boundary does not execute adapters", "Model-routed backend execution requires explicit operator approval", "Denied backend router integration paths remain blocked") `
  -RouteHref "/backend-execution-router-integration-boundary"

Write-Host "[OK] CodexForge Phase 938 Backend execution router integration boundary smoke passed."
