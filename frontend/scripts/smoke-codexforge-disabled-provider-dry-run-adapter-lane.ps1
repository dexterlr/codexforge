param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2362 Disabled Provider Dry Run Adapter Lane"
  ScriptFile = "smoke-codexforge-disabled-provider-dry-run-adapter-lane.ps1"
  Domain = "disabled-provider-dry-run-adapter-lane"
  Route = "disabled-provider-dry-run-adapter-lane"
  CommandLabel = "Go to Disabled Provider Dry Run Adapter Lane"
  RouteHref = "/disabled-provider-dry-run-adapter-lane"
  Phase = 2362
  Title = "Disabled Provider Dry Run Adapter Lane"
  Markers = @(
  'Disabled provider dry run adapter lane',
  'Disabled provider dry run adapter lane shows dry run adapter states without importing SDKs creating clients or calling providers',
  'Disabled provider dry run adapter lane keeps all dry run actions disabled pending future backend-owned harness implementation',
  'Disabled provider dry run adapter lane blocks live execution',
  'Denied disabled provider dry run adapter paths remain blocked',
  'Disabled provider dry run adapter checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

