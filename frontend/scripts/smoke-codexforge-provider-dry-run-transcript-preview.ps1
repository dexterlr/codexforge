param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2350 Provider Dry Run Transcript Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-transcript-preview.ps1"
  Domain = "provider-dry-run-transcript-preview"
  Route = "provider-dry-run-transcript-preview"
  CommandLabel = "Go to Provider Dry Run Transcript Preview"
  RouteHref = "/provider-dry-run-transcript-preview"
  Phase = 2350
  Title = "Provider Dry Run Transcript Preview"
  Markers = @(
  'Provider dry run transcript preview',
  'Provider dry run transcript preview shows synthetic transcript steps without transmitting prompts or receiving model output',
  'Provider dry run transcript preview does not stream responses write logs persist state or call providers',
  'Provider dry run transcript preview keeps transcripts deterministic and review-only',
  'Denied provider dry run transcript paths remain blocked',
  'Provider dry run transcript checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

