param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2518 Real Provider Rate Limit Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-rate-limit-guard-preview.ps1"
  Domain = "real-provider-rate-limit-guard-preview"
  Route = "real-provider-rate-limit-guard-preview"
  CommandLabel = "Go to Real Provider Rate Limit Guard Preview"
  RouteHref = "/real-provider-rate-limit-guard-preview"
  Phase = 2518
  Title = "Real Provider Rate Limit Guard Preview"
  Markers = @(
  'Real provider rate limit guard preview'
  'Real provider rate limit guard preview defines rate limit guard requirements without storing counters or sending provider traffic'
  'Real provider rate limit guard preview keeps rate limits backend-owned and auditable'
  'Real provider rate limit guard preview blocks live traffic'
  'Denied real provider rate limit paths remain blocked'
  'Real provider rate limit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
