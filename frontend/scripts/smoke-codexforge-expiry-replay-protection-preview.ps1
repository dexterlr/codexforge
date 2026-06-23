param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1554 Expiry Replay Protection Preview" `
  -ScriptFile "smoke-codexforge-expiry-replay-protection-preview.ps1" `
  -Domain "src\lib\codexforge\expiry-replay-protection-preview" `
  -Route "src\app\expiry-replay-protection-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Expiry Replay Protection Preview" `
  -RouteHref "/expiry-replay-protection-preview" `
  -Markers @("Expiry replay protection preview", "Expiry replay protection preview does not persist approvals from the UI", "Expiry replay protection preview requires explicit human approval", "Expiry replay protection preview shows approval scope expiry stale approval replay prevention prompt hash provider hash and operator confirmation", "Denied expiry replay protection paths remain blocked", "Expiry replay protection checklist")
