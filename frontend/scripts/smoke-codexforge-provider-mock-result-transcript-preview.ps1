param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2381 Provider Mock Result Transcript Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-transcript-preview.ps1"
  Domain = "provider-mock-result-transcript-preview"
  Route = "provider-mock-result-transcript-preview"
  CommandLabel = "Go to Provider Mock Result Transcript Preview"
  RouteHref = "/provider-mock-result-transcript-preview"
  Phase = 2381
  Title = "Provider Mock Result Transcript Preview"
  Markers = @(
  'Provider mock result transcript preview',
  'Provider mock result transcript preview shows synthetic mock result steps without transmitting prompts or receiving model output',
  'Provider mock result transcript preview does not stream responses write logs persist state or call providers',
  'Provider mock result transcript preview keeps transcripts deterministic and review-only',
  'Denied provider mock result transcript paths remain blocked',
  'Provider mock result transcript checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
