param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2419 Provider Denial Enforcement Matrix Preview"
  ScriptFile = "smoke-codexforge-provider-denial-enforcement-matrix-preview.ps1"
  Domain = "provider-denial-enforcement-matrix-preview"
  Route = "provider-denial-enforcement-matrix-preview"
  CommandLabel = "Go to Provider Denial Enforcement Matrix Preview"
  RouteHref = "/provider-denial-enforcement-matrix-preview"
  Phase = 2419
  Title = "Provider Denial Enforcement Matrix Preview"
  Markers = @(
  'Provider denial enforcement matrix preview'
  'Provider denial enforcement matrix preview defines denial rules for provider calls model calls prompt sending streaming credential storage token storage persistence queue dispatch workers and route handlers'
  'Provider denial enforcement matrix preview keeps protected actions blocked by default'
  'Provider denial enforcement matrix preview exposes no execution affordance'
  'Denied provider enforcement matrix paths remain blocked'
  'Provider denial enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
