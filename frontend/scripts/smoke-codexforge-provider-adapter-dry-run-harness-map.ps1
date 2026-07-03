param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2346 Provider Adapter Dry Run Harness Map"
  ScriptFile = "smoke-codexforge-provider-adapter-dry-run-harness-map.ps1"
  Domain = "provider-adapter-dry-run-harness-map"
  Route = "provider-adapter-dry-run-harness-map"
  CommandLabel = "Go to Provider Adapter Dry Run Harness Map"
  RouteHref = "/provider-adapter-dry-run-harness-map"
  Phase = 2346
  Title = "Provider Adapter Dry Run Harness Map"
  Markers = @(
  'Provider adapter dry run harness map',
  'Provider adapter dry run harness map defines synthetic dry run boundaries without implementing live provider execution',
  'Provider adapter dry run harness map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs',
  'Provider adapter dry run harness map keeps provider execution blocked pending future approved provider trial',
  'Denied provider adapter dry run harness paths remain blocked',
  'Provider adapter dry run harness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

