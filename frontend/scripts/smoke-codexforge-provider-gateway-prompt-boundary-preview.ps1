param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2296 Provider Gateway Prompt Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-prompt-boundary-preview.ps1"
  Domain = "provider-gateway-prompt-boundary-preview"
  Route = "provider-gateway-prompt-boundary-preview"
  CommandLabel = "Go to Provider Gateway Prompt Boundary Preview"
  RouteHref = "/provider-gateway-prompt-boundary-preview"
  Markers = @("Provider gateway prompt boundary preview", "Provider gateway prompt boundary preview defines future prompt handling safeguards without sending prompt text to any provider", "Provider gateway prompt boundary preview keeps prompt preview synthetic and redaction backend-owned", "Provider gateway prompt boundary preview blocks prompt transmission", "Denied provider prompt boundary paths remain blocked", "Provider gateway prompt boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
