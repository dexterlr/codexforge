param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2368 Provider Dry Run Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-provider-dry-run-prompt-transmission-blocker.ps1"
  Domain = "provider-dry-run-prompt-transmission-blocker"
  Route = "provider-dry-run-prompt-transmission-blocker"
  CommandLabel = "Go to Provider Dry Run Prompt Transmission Blocker"
  RouteHref = "/provider-dry-run-prompt-transmission-blocker"
  Phase = 2368
  Title = "Provider Dry Run Prompt Transmission Blocker"
  Markers = @(
  'Provider dry run prompt transmission blocker',
  'Provider dry run prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls',
  'Provider dry run prompt transmission blocker keeps prompts synthetic review-only and local-state only',
  'Provider dry run prompt transmission blocker blocks hidden send affordances',
  'Denied provider dry run prompt transmission paths remain blocked',
  'Provider dry run prompt transmission checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

