param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2288 Provider Privacy Class Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-privacy-class-boundary-preview.ps1"
  Domain = "provider-privacy-class-boundary-preview"
  Route = "provider-privacy-class-boundary-preview"
  CommandLabel = "Go to Provider Privacy Class Boundary Preview"
  RouteHref = "/provider-privacy-class-boundary-preview"
  Markers = @("Provider privacy class boundary preview", "Provider privacy class boundary preview defines future privacy classification requirements for provider calls without inspecting real prompts or transmitting data", "Provider privacy class boundary preview keeps sensitive prompt handling backend-owned and approval-gated", "Provider privacy class boundary preview blocks unsafe privacy classes by default", "Denied provider privacy class paths remain blocked", "Provider privacy class checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
