param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2519 Real Provider Timeout Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-timeout-guard-preview.ps1"
  Domain = "real-provider-timeout-guard-preview"
  Route = "real-provider-timeout-guard-preview"
  CommandLabel = "Go to Real Provider Timeout Guard Preview"
  RouteHref = "/real-provider-timeout-guard-preview"
  Phase = 2519
  Title = "Real Provider Timeout Guard Preview"
  Markers = @(
  'Real provider timeout guard preview'
  'Real provider timeout guard preview defines timeout guard requirements without provider calls or scheduling live work'
  'Real provider timeout guard preview keeps timeout enforcement backend-owned and deterministic'
  'Real provider timeout guard preview blocks live timeout execution'
  'Denied real provider timeout paths remain blocked'
  'Real provider timeout checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
