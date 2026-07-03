param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2578 Provider Result Recovery Plan Preview"
  ScriptFile = "smoke-codexforge-provider-result-recovery-plan-preview.ps1"
  Domain = "provider-result-recovery-plan-preview"
  Route = "provider-result-recovery-plan-preview"
  CommandLabel = "Go to Provider Result Recovery Plan Preview"
  RouteHref = "/provider-result-recovery-plan-preview"
  Phase = 2578
  Title = "Provider Result Recovery Plan Preview"
  Markers = @(
  'Provider result recovery plan preview'
  'Provider result recovery plan preview defines recovery plans for safety failure privacy failure redaction failure audit mismatch approval mismatch timeout retry fallback and rollback states without retrying providers'
  'Provider result recovery plan preview keeps recovery backend-owned and auditable'
  'Provider result recovery plan preview blocks live retry and fallback execution'
  'Denied provider result recovery plan paths remain blocked'
  'Provider result recovery plan checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
