param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 621 Local Runtime Approval Boundary" `
  -ScriptFile "smoke-codexforge-local-runtime-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\local-runtime-approval-boundary" `
  -Route "src\app\local-runtime-approval-boundary" `
  -MainPanel "LocalRuntimeApprovalBoundaryPanel" `
  -CommandLabel "Go to Local Runtime Approval Boundary" `
  -Modules @("local-runtime-approval-boundary-types.ts", "local-runtime-approval-boundary-summary.ts", "index.ts") `
  -Components @("LocalRuntimeApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeApprovalBoundaryStableKey", "buildLocalRuntimeApprovalBoundary", "buildLocalRuntimeApprovalBoundaries", "buildLocalRuntimeApprovalBoundaryBoundary", "buildLocalRuntimeApprovalBoundaryModel", "summarizeLocalRuntimeApprovalBoundary", "LOCAL_RUNTIME_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Local runtime approval boundary", "Local runtime approval boundary does not start local runtimes", "Local runtime execution requires explicit operator approval", "Unsafe local runtime paths stay blocked", "Runtime groups", "Process lifecycle checklist") `
  -PlainEnglish @("Local runtime boundary identity", "Server/runtime preview checklist", "Port/network checklist", "Logging/stop checklist", "Denied runtime actions", "Unresolved runtime blockers", "Command boundary route", "Packaging/export boundary route", "Next recommended action") `
  -RouteHref "/local-runtime-approval-boundary"

Write-Host "[OK] CodexForge Phase 621 local runtime approval boundary smoke passed."
