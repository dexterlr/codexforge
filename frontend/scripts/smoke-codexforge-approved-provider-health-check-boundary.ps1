param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 922 Approved Provider Health Check Boundary" `
  -ScriptFile "smoke-codexforge-approved-provider-health-check-boundary.ps1" `
  -Domain "src\lib\codexforge\approved-provider-health-check-boundary" `
  -Route "src\app\approved-provider-health-check-boundary" `
  -MainPanel "ApprovedProviderHealthCheckBoundaryPanel" `
  -CommandLabel "Go to Approved Provider Health Check Boundary" `
  -Modules @("approved-provider-health-check-boundary-model.ts", "index.ts") `
  -Components @("ApprovedProviderHealthCheckBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildApprovedProviderHealthCheckBoundaryStableKey", "buildApprovedProviderHealthCheckBoundary", "buildApprovedProviderHealthCheckBoundaryItems", "buildApprovedProviderHealthCheckBoundaryBoundary", "buildApprovedProviderHealthCheckBoundaryModel", "summarizeApprovedProviderHealthCheckBoundary", "APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Approved provider health check boundary", "Approved provider health check boundary does not call providers", "Provider health checks require explicit operator approval", "All provider health checks preserve shared CodexForge brain state", "Denied provider health check paths remain blocked", "Provider health check boundary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Approved provider health check boundary does not call providers", "Provider health checks require explicit operator approval", "Denied provider health check paths remain blocked") `
  -RouteHref "/approved-provider-health-check-boundary"

Write-Host "[OK] CodexForge Phase 922 Approved provider health check boundary smoke passed."
