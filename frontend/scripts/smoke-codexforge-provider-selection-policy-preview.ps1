param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2043 Provider Selection Policy Preview"
  ScriptFile = "smoke-codexforge-provider-selection-policy-preview.ps1"
  Domain = "src\lib\codexforge\provider-selection-policy-preview"
  Route = "src\app\provider-selection-policy-preview"
  CommandLabel = "Go to Provider Selection Policy Preview"
  RouteHref = "/provider-selection-policy-preview"
  Markers = @("Provider selection policy preview", "Provider selection policy preview does not call providers choose live vendors store credentials or route real requests from the UI", "Provider selection policy preview requires backend-owned provider gateway provider allowlist approval capture and audit trail", "Provider selection policy preview shows simulated provider allowlist simulated capability map simulated policy owner simulated approval gate simulated denied frontend provider routing", "Denied provider selection policy paths remain blocked", "Provider selection policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

