param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2597 Provider Result Export Publish Blocker"
  ScriptFile = "smoke-codexforge-provider-result-export-publish-blocker.ps1"
  Domain = "provider-result-export-publish-blocker"
  Route = "provider-result-export-publish-blocker"
  CommandLabel = "Go to Provider Result Export Publish Blocker"
  RouteHref = "/provider-result-export-publish-blocker"
  Phase = 2597
  Title = "Provider Result Export Publish Blocker"
  Markers = @(
  'Provider result export publish blocker'
  'Provider result export publish blocker verifies no provider result can be exported rendered published uploaded downloaded scheduled or sent downstream'
  'Provider result export publish blocker keeps downstream actions blocked pending explicit future release'
  'Provider result export publish blocker blocks export and publish'
  'Denied provider result export publish paths remain blocked'
  'Provider result export publish checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
