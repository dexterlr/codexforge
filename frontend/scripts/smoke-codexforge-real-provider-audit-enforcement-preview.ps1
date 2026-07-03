param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2511 Real Provider Audit Enforcement Preview"
  ScriptFile = "smoke-codexforge-real-provider-audit-enforcement-preview.ps1"
  Domain = "real-provider-audit-enforcement-preview"
  Route = "real-provider-audit-enforcement-preview"
  CommandLabel = "Go to Real Provider Audit Enforcement Preview"
  RouteHref = "/real-provider-audit-enforcement-preview"
  Phase = 2511
  Title = "Real Provider Audit Enforcement Preview"
  Markers = @(
  'Real provider audit enforcement preview'
  'Real provider audit enforcement preview defines audit enforcement requirements without writing audit logs databases files or telemetry'
  'Real provider audit enforcement preview keeps audit enforcement backend-owned and redacted'
  'Real provider audit enforcement preview blocks unverifiable execution claims'
  'Denied real provider audit enforcement paths remain blocked'
  'Real provider audit enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
