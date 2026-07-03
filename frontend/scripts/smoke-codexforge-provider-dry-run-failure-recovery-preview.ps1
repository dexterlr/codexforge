param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2366 Provider Dry Run Failure Recovery Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-failure-recovery-preview.ps1"
  Domain = "provider-dry-run-failure-recovery-preview"
  Route = "provider-dry-run-failure-recovery-preview"
  CommandLabel = "Go to Provider Dry Run Failure Recovery Preview"
  RouteHref = "/provider-dry-run-failure-recovery-preview"
  Phase = 2366
  Title = "Provider Dry Run Failure Recovery Preview"
  Markers = @(
  'Provider dry run failure recovery preview',
  'Provider dry run failure recovery preview defines synthetic recovery paths without retrying providers or dispatching workers',
  'Provider dry run failure recovery preview keeps recovery backend-owned and auditable',
  'Provider dry run failure recovery preview blocks live retry and fallback execution',
  'Denied provider dry run recovery paths remain blocked',
  'Provider dry run recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

