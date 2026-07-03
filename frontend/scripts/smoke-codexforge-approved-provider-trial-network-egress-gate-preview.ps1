param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2546 Approved Provider Trial Network Egress Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-network-egress-gate-preview.ps1"
  Domain = "approved-provider-trial-network-egress-gate-preview"
  Route = "approved-provider-trial-network-egress-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Network Egress Gate Preview"
  RouteHref = "/approved-provider-trial-network-egress-gate-preview"
  Phase = 2546
  Title = "Approved Provider Trial Network Egress Gate Preview"
  Markers = @(
  'Approved provider trial network egress gate preview'
  'Approved provider trial network egress gate preview defines network egress constraints without making fetch calls network calls connector calls or provider requests'
  'Approved provider trial network egress gate preview keeps egress backend-owned and approval-gated'
  'Approved provider trial network egress gate preview blocks live traffic'
  'Denied approved provider network egress paths remain blocked'
  'Approved provider network egress checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
