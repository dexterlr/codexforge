param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2352 Provider Dry Run Denial Matrix Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-denial-matrix-preview.ps1"
  Domain = "provider-dry-run-denial-matrix-preview"
  Route = "provider-dry-run-denial-matrix-preview"
  CommandLabel = "Go to Provider Dry Run Denial Matrix Preview"
  RouteHref = "/provider-dry-run-denial-matrix-preview"
  Phase = 2352
  Title = "Provider Dry Run Denial Matrix Preview"
  Markers = @(
  'Provider dry run denial matrix preview',
  'Provider dry run denial matrix preview defines blocked provider actions for prompt sending provider calls model calls streaming credential storage token storage persistence and queue dispatch',
  'Provider dry run denial matrix preview keeps protected actions blocked by default',
  'Provider dry run denial matrix preview exposes no execution affordance',
  'Denied provider dry run denial matrix paths remain blocked',
  'Provider dry run denial matrix checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

