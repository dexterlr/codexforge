param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2333 Provider Adapter Redaction Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-redaction-contract-preview.ps1"
  Domain = "provider-adapter-redaction-contract-preview"
  Route = "provider-adapter-redaction-contract-preview"
  CommandLabel = "Go to Provider Adapter Redaction Contract Preview"
  RouteHref = "/provider-adapter-redaction-contract-preview"
  Markers = @("Provider adapter redaction contract preview", "Provider adapter redaction contract preview defines future redaction requirements without inspecting real prompts or transmitting data", "Provider adapter redaction contract preview keeps redaction backend-owned and approval-gated", "Provider adapter redaction contract preview blocks prompt transmission", "Denied provider adapter redaction paths remain blocked", "Provider adapter redaction checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
