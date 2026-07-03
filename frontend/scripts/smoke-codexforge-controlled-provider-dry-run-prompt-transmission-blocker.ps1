param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2466 Controlled Provider Dry Run Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-prompt-transmission-blocker.ps1"
  Domain = "controlled-provider-dry-run-prompt-transmission-blocker"
  Route = "controlled-provider-dry-run-prompt-transmission-blocker"
  CommandLabel = "Go to Controlled Provider Dry Run Prompt Transmission Blocker"
  RouteHref = "/controlled-provider-dry-run-prompt-transmission-blocker"
  Phase = 2466
  Title = "Controlled Provider Dry Run Prompt Transmission Blocker"
  Markers = @(
  'Controlled provider dry run prompt transmission blocker'
  'Controlled provider dry run prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Controlled provider dry run prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Controlled provider dry run prompt transmission blocker blocks hidden send affordances'
  'Denied controlled provider prompt transmission paths remain blocked'
  'Controlled provider prompt transmission checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
