param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2596 Provider Result Persistence Blocker"
  ScriptFile = "smoke-codexforge-provider-result-persistence-blocker.ps1"
  Domain = "provider-result-persistence-blocker"
  Route = "provider-result-persistence-blocker"
  CommandLabel = "Go to Provider Result Persistence Blocker"
  RouteHref = "/provider-result-persistence-blocker"
  Phase = 2596
  Title = "Provider Result Persistence Blocker"
  Markers = @(
  'Provider result persistence blocker'
  'Provider result persistence blocker verifies no provider result is written to database files browser storage localStorage sessionStorage cookies queues or backend records'
  'Provider result persistence blocker keeps persistence backend-owned and future-gated'
  'Provider result persistence blocker blocks output persistence'
  'Denied provider result persistence paths remain blocked'
  'Provider result persistence checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
