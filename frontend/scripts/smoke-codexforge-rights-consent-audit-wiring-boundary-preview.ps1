param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2262 Rights Consent Audit Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-rights-consent-audit-wiring-boundary-preview.ps1"
  Domain = "rights-consent-audit-wiring-boundary-preview"
  Route = "rights-consent-audit-wiring-boundary-preview"
  CommandLabel = "Go to Rights Consent Audit Wiring Boundary Preview"
  RouteHref = "/rights-consent-audit-wiring-boundary-preview"
  Markers = @("Rights Consent Audit Wiring Boundary", "rights consent audit boundary", "Audit trail required", "No database writes", "Backend-owned services remain required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
