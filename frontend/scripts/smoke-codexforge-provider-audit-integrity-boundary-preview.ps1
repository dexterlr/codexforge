param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2423 Provider Audit Integrity Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-audit-integrity-boundary-preview.ps1"
  Domain = "provider-audit-integrity-boundary-preview"
  Route = "provider-audit-integrity-boundary-preview"
  CommandLabel = "Go to Provider Audit Integrity Boundary Preview"
  RouteHref = "/provider-audit-integrity-boundary-preview"
  Phase = 2423
  Title = "Provider Audit Integrity Boundary Preview"
  Markers = @(
  'Provider audit integrity boundary preview'
  'Provider audit integrity boundary preview defines audit integrity expectations without writing immutable logs or external telemetry'
  'Provider audit integrity boundary preview keeps event chain id fixture id approval id and result id synthetic and review-only'
  'Provider audit integrity boundary preview blocks unverifiable execution claims'
  'Denied provider audit integrity paths remain blocked'
  'Provider audit integrity checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
