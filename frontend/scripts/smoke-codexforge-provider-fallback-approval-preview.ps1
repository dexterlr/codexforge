param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1555 Provider Fallback Approval Preview" `
  -ScriptFile "smoke-codexforge-provider-fallback-approval-preview.ps1" `
  -Domain "src\lib\codexforge\provider-fallback-approval-preview" `
  -Route "src\app\provider-fallback-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Fallback Approval Preview" `
  -RouteHref "/provider-fallback-approval-preview" `
  -Markers @("Provider fallback approval preview", "Provider fallback approval preview does not call fallback providers", "Provider fallback approval preview requires explicit operator approval", "Provider fallback approval preview shows local fallback cheaper fallback safer fallback manual review fallback provider denied fallback and blocked fallback states", "Denied provider fallback paths remain blocked", "Provider fallback approval checklist")
