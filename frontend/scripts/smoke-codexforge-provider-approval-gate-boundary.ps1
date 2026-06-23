param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1546 Provider Approval Gate Boundary" `
  -ScriptFile "smoke-codexforge-provider-approval-gate-boundary.ps1" `
  -Domain "src\lib\codexforge\provider-approval-gate-boundary" `
  -Route "src\app\provider-approval-gate-boundary" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Approval Gate Boundary" `
  -RouteHref "/provider-approval-gate-boundary" `
  -Markers @("Provider approval gate boundary", "Provider approval gate boundary does not call providers from the UI", "Provider approval gate requires explicit operator approval before provider use", "Provider approval gate prepares backend-owned provider approval without hidden routing", "Denied provider approval gate paths remain blocked", "Provider approval gate checklist")
