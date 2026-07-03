param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2289 Provider Cost Class Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-cost-class-boundary-preview.ps1"
  Domain = "provider-cost-class-boundary-preview"
  Route = "provider-cost-class-boundary-preview"
  CommandLabel = "Go to Provider Cost Class Boundary Preview"
  RouteHref = "/provider-cost-class-boundary-preview"
  Markers = @("Provider cost class boundary preview", "Provider cost class boundary preview defines future cost classification requirements without calling billing endpoints or providers", "Provider cost class boundary preview keeps spend controls backend-owned and approval-gated", "Provider cost class boundary preview blocks paid execution by default", "Denied provider cost class paths remain blocked", "Provider cost class checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
