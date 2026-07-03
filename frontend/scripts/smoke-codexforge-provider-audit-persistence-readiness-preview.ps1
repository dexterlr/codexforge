param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2481 Provider Audit Persistence Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-audit-persistence-readiness-preview.ps1"
  Domain = "provider-audit-persistence-readiness-preview"
  Route = "provider-audit-persistence-readiness-preview"
  CommandLabel = "Go to Provider Audit Persistence Readiness Preview"
  RouteHref = "/provider-audit-persistence-readiness-preview"
  Phase = 2481
  Title = "Provider Audit Persistence Readiness Preview"
  Markers = @(
  'Provider audit persistence readiness preview'
  'Provider audit persistence readiness preview defines future audit persistence requirements without writing audit logs databases files or telemetry'
  'Provider audit persistence readiness preview keeps audit persistence backend-owned and redacted'
  'Provider audit persistence readiness preview blocks unverifiable execution claims'
  'Denied provider audit persistence paths remain blocked'
  'Provider audit persistence checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
