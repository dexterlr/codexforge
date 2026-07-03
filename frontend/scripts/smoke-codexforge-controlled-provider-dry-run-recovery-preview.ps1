param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2463 Controlled Provider Dry Run Recovery Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-recovery-preview.ps1"
  Domain = "controlled-provider-dry-run-recovery-preview"
  Route = "controlled-provider-dry-run-recovery-preview"
  CommandLabel = "Go to Controlled Provider Dry Run Recovery Preview"
  RouteHref = "/controlled-provider-dry-run-recovery-preview"
  Phase = 2463
  Title = "Controlled Provider Dry Run Recovery Preview"
  Markers = @(
  'Controlled provider dry run recovery preview'
  'Controlled provider dry run recovery preview defines recovery paths for approval denial audit mismatch fixture mismatch redaction failure and mock result rejection without retrying providers'
  'Controlled provider dry run recovery preview keeps recovery backend-owned and auditable'
  'Controlled provider dry run recovery preview blocks live retry and fallback execution'
  'Denied controlled provider dry run recovery paths remain blocked'
  'Controlled provider dry run recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
