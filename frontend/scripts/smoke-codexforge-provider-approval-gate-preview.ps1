param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2293 Provider Approval Gate Preview"
  ScriptFile = "smoke-codexforge-provider-approval-gate-preview.ps1"
  Domain = "provider-approval-gate-preview"
  Route = "provider-approval-gate-preview"
  CommandLabel = "Go to Provider Approval Gate Preview"
  RouteHref = "/provider-approval-gate-preview"
  Markers = @("Provider approval gate preview", "Provider approval gate preview defines future explicit operator approval requirements without approving provider execution", "Provider approval gate preview does not persist approvals verify identity or authorize accounts", "Provider approval gate preview keeps provider execution blocked until approval and backend audit exist", "Denied provider approval gate paths remain blocked", "Provider approval gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
