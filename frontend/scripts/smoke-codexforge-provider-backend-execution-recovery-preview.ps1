param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2497 Provider Backend Execution Recovery Preview"
  ScriptFile = "smoke-codexforge-provider-backend-execution-recovery-preview.ps1"
  Domain = "provider-backend-execution-recovery-preview"
  Route = "provider-backend-execution-recovery-preview"
  CommandLabel = "Go to Provider Backend Execution Recovery Preview"
  RouteHref = "/provider-backend-execution-recovery-preview"
  Phase = 2497
  Title = "Provider Backend Execution Recovery Preview"
  Markers = @(
  'Provider backend execution recovery preview'
  'Provider backend execution recovery preview defines recovery paths for readiness gaps approval denial audit mismatch credential absence token redaction failure and SDK isolation failure without retrying providers'
  'Provider backend execution recovery preview keeps recovery backend-owned and auditable'
  'Provider backend execution recovery preview blocks live retry and fallback execution'
  'Denied provider backend execution recovery paths remain blocked'
  'Provider backend execution recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
