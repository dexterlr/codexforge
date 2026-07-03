param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2285 Provider Capability Catalog Preview"
  ScriptFile = "smoke-codexforge-provider-capability-catalog-preview.ps1"
  Domain = "provider-capability-catalog-preview"
  Route = "provider-capability-catalog-preview"
  CommandLabel = "Go to Provider Capability Catalog Preview"
  RouteHref = "/provider-capability-catalog-preview"
  Markers = @("Provider capability catalog preview", "Provider capability catalog preview lists synthetic capability classes for text image audio video code research and planning without probing providers", "Provider capability catalog preview does not call provider health endpoints or inspect credentials", "Provider capability catalog preview keeps capability discovery backend-owned", "Denied provider capability catalog paths remain blocked", "Provider capability catalog checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
