param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1556 Provider Denial Route Preview" `
  -ScriptFile "smoke-codexforge-provider-denial-route-preview.ps1" `
  -Domain "src\lib\codexforge\provider-denial-route-preview" `
  -Route "src\app\provider-denial-route-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Denial Route Preview" `
  -RouteHref "/provider-denial-route-preview" `
  -Markers @("Provider denial route preview", "Provider denial route preview does not mutate workflow state", "Provider denial route preview requires explicit operator approval", "Provider denial route preview blocks secret payloads private context disallowed providers high-cost unapproved specialist connector leakage stale approval and unsupported capability routes", "Denied provider route paths remain blocked", "Provider denial route checklist")
