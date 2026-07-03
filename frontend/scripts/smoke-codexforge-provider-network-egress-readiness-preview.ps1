param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2485 Provider Network Egress Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-network-egress-readiness-preview.ps1"
  Domain = "provider-network-egress-readiness-preview"
  Route = "provider-network-egress-readiness-preview"
  CommandLabel = "Go to Provider Network Egress Readiness Preview"
  RouteHref = "/provider-network-egress-readiness-preview"
  Phase = 2485
  Title = "Provider Network Egress Readiness Preview"
  Markers = @(
  'Provider network egress readiness preview'
  'Provider network egress readiness preview defines future network egress requirements without making fetch calls network calls connector calls or provider requests'
  'Provider network egress readiness preview keeps egress backend-owned and approval-gated'
  'Provider network egress readiness preview blocks live traffic'
  'Denied provider network egress paths remain blocked'
  'Provider network egress checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
