param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2507 Real Provider Call Eligibility Checklist Preview"
  ScriptFile = "smoke-codexforge-real-provider-call-eligibility-checklist-preview.ps1"
  Domain = "real-provider-call-eligibility-checklist-preview"
  Route = "real-provider-call-eligibility-checklist-preview"
  CommandLabel = "Go to Real Provider Call Eligibility Checklist Preview"
  RouteHref = "/real-provider-call-eligibility-checklist-preview"
  Phase = 2507
  Title = "Real Provider Call Eligibility Checklist Preview"
  Markers = @(
  'Real provider call eligibility checklist preview'
  'Real provider call eligibility checklist preview lists backend ownership approval audit credentials token redaction prompt boundary SDK isolation egress rate timeout cost safety privacy observability rollback and denial prerequisites'
  'Real provider call eligibility checklist preview keeps eligibility synthetic and review-only'
  'Real provider call eligibility checklist preview blocks automatic execution'
  'Denied real provider eligibility paths remain blocked'
  'Real provider eligibility checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
