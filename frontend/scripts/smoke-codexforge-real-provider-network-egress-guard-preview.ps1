param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2517 Real Provider Network Egress Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-network-egress-guard-preview.ps1"
  Domain = "real-provider-network-egress-guard-preview"
  Route = "real-provider-network-egress-guard-preview"
  CommandLabel = "Go to Real Provider Network Egress Guard Preview"
  RouteHref = "/real-provider-network-egress-guard-preview"
  Phase = 2517
  Title = "Real Provider Network Egress Guard Preview"
  Markers = @(
  'Real provider network egress guard preview'
  'Real provider network egress guard preview defines network egress constraints without making fetch calls network calls connector calls or provider requests'
  'Real provider network egress guard preview keeps egress backend-owned and approval-gated'
  'Real provider network egress guard preview blocks live traffic'
  'Denied real provider network egress paths remain blocked'
  'Real provider network egress checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
