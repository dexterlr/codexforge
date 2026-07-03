param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2287 Provider Selection Policy Preview"
  ScriptFile = "smoke-codexforge-provider-selection-policy-preview.ps1"
  Domain = "provider-selection-policy-preview"
  Route = "provider-selection-policy-preview"
  CommandLabel = "Go to Provider Selection Policy Preview"
  RouteHref = "/provider-selection-policy-preview"
  Markers = @("Provider selection policy preview", "Provider selection policy preview defines safe provider selection criteria without routing real prompts or executing providers", "Provider selection policy preview uses synthetic criteria for privacy cost latency quality capability and approval state", "Provider selection policy preview keeps routing backend-owned", "Denied provider selection policy paths remain blocked", "Provider selection policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
