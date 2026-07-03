param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2447 Controlled Provider Dry Run Fixture Selection Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-fixture-selection-preview.ps1"
  Domain = "controlled-provider-dry-run-fixture-selection-preview"
  Route = "controlled-provider-dry-run-fixture-selection-preview"
  CommandLabel = "Go to Controlled Provider Dry Run Fixture Selection Preview"
  RouteHref = "/controlled-provider-dry-run-fixture-selection-preview"
  Phase = 2447
  Title = "Controlled Provider Dry Run Fixture Selection Preview"
  Markers = @(
  'Controlled provider dry run fixture selection preview'
  'Controlled provider dry run fixture selection preview selects deterministic synthetic fixtures without storing real prompts credentials tokens outputs or provider data'
  'Controlled provider dry run fixture selection preview keeps fixture selection review-only and local-state only'
  'Controlled provider dry run fixture selection preview blocks real data capture'
  'Denied controlled provider fixture selection paths remain blocked'
  'Controlled provider fixture selection checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
