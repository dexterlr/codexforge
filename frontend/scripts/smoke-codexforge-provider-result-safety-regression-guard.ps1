param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2598 Provider Result Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-result-safety-regression-guard.ps1"
  Domain = "provider-result-safety-regression-guard"
  Route = "provider-result-safety-regression-guard"
  CommandLabel = "Go to Provider Result Safety Regression Guard"
  RouteHref = "/provider-result-safety-regression-guard"
  Phase = 2598
  Title = "Provider Result Safety Regression Guard"
  Markers = @(
  'Provider result safety regression guard'
  'Provider result safety regression guard verifies result review recovery remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no persistence no export no publish no hidden execution and no SDK clients'
  'Provider result safety regression guard preserves approved trial first real provider call guard backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Provider result safety regression guard blocks hidden result promotion affordances'
  'Denied provider result safety regression paths remain blocked'
  'Provider result safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
