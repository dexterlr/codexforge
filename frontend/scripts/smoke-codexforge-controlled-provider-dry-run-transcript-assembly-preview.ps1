param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2448 Controlled Provider Dry Run Transcript Assembly Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-transcript-assembly-preview.ps1"
  Domain = "controlled-provider-dry-run-transcript-assembly-preview"
  Route = "controlled-provider-dry-run-transcript-assembly-preview"
  CommandLabel = "Go to Controlled Provider Dry Run Transcript Assembly Preview"
  RouteHref = "/controlled-provider-dry-run-transcript-assembly-preview"
  Phase = 2448
  Title = "Controlled Provider Dry Run Transcript Assembly Preview"
  Markers = @(
  'Controlled provider dry run transcript assembly preview'
  'Controlled provider dry run transcript assembly preview assembles deterministic synthetic transcript steps without transmitting prompts or receiving model output'
  'Controlled provider dry run transcript assembly preview does not stream responses write logs persist state or call providers'
  'Controlled provider dry run transcript assembly preview keeps transcripts review-only'
  'Denied controlled provider transcript assembly paths remain blocked'
  'Controlled provider transcript assembly checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
