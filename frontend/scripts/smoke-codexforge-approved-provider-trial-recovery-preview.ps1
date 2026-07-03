param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2560 Approved Provider Trial Recovery Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-recovery-preview.ps1"
  Domain = "approved-provider-trial-recovery-preview"
  Route = "approved-provider-trial-recovery-preview"
  CommandLabel = "Go to Approved Provider Trial Recovery Preview"
  RouteHref = "/approved-provider-trial-recovery-preview"
  Phase = 2560
  Title = "Approved Provider Trial Recovery Preview"
  Markers = @(
  'Approved provider trial recovery preview'
  'Approved provider trial recovery preview defines recovery paths for approval denial audit mismatch credential absence token redaction failure SDK isolation failure egress denial and result placeholder failure without retrying providers'
  'Approved provider trial recovery preview keeps recovery backend-owned and auditable'
  'Approved provider trial recovery preview blocks live retry and fallback execution'
  'Denied approved provider trial recovery paths remain blocked'
  'Approved provider trial recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
