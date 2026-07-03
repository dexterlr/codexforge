param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2593 Provider Result Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-provider-result-prompt-transmission-blocker.ps1"
  Domain = "provider-result-prompt-transmission-blocker"
  Route = "provider-result-prompt-transmission-blocker"
  CommandLabel = "Go to Provider Result Prompt Transmission Blocker"
  RouteHref = "/provider-result-prompt-transmission-blocker"
  Phase = 2593
  Title = "Provider Result Prompt Transmission Blocker"
  Markers = @(
  'Provider result prompt transmission blocker'
  'Provider result prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Provider result prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Provider result prompt transmission blocker blocks hidden send affordances'
  'Denied provider result prompt transmission paths remain blocked'
  'Provider result prompt transmission blocker checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
