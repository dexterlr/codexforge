param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2446 Controlled Provider Preflight Summary Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-preflight-summary-preview.ps1"
  Domain = "controlled-provider-preflight-summary-preview"
  Route = "controlled-provider-preflight-summary-preview"
  CommandLabel = "Go to Controlled Provider Preflight Summary Preview"
  RouteHref = "/controlled-provider-preflight-summary-preview"
  Phase = 2446
  Title = "Controlled Provider Preflight Summary Preview"
  Markers = @(
  'Controlled provider preflight summary preview'
  'Controlled provider preflight summary preview summarizes approval audit privacy cost rate timeout fallback redaction and denial checks without executing providers'
  'Controlled provider preflight summary preview requires all gates to be visible before any future provider trial'
  'Controlled provider preflight summary preview keeps execution blocked'
  'Denied controlled provider preflight paths remain blocked'
  'Controlled provider preflight checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
