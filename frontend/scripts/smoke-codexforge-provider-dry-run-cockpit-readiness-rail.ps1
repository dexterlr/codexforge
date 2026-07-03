param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2363 Provider Dry Run Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-dry-run-cockpit-readiness-rail.ps1"
  Domain = "provider-dry-run-cockpit-readiness-rail"
  Route = "provider-dry-run-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Dry Run Cockpit Readiness Rail"
  RouteHref = "/provider-dry-run-cockpit-readiness-rail"
  Phase = 2363
  Title = "Provider Dry Run Cockpit Readiness Rail"
  Markers = @(
  'Provider dry run cockpit readiness rail',
  'Provider dry run cockpit readiness rail shows cockpit readiness for dry run harness without executing providers',
  'Provider dry run cockpit readiness rail uses deterministic synthetic data only and disabled actions',
  'Provider dry run cockpit readiness rail keeps provider execution blocked',
  'Denied provider dry run cockpit readiness paths remain blocked',
  'Provider dry run cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

