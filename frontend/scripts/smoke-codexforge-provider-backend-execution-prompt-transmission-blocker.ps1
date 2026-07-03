param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2500 Provider Backend Execution Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-provider-backend-execution-prompt-transmission-blocker.ps1"
  Domain = "provider-backend-execution-prompt-transmission-blocker"
  Route = "provider-backend-execution-prompt-transmission-blocker"
  CommandLabel = "Go to Provider Backend Execution Prompt Transmission Blocker"
  RouteHref = "/provider-backend-execution-prompt-transmission-blocker"
  Phase = 2500
  Title = "Provider Backend Execution Prompt Transmission Blocker"
  Markers = @(
  'Provider backend execution prompt transmission blocker'
  'Provider backend execution prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Provider backend execution prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Provider backend execution prompt transmission blocker blocks hidden send affordances'
  'Denied provider backend execution prompt transmission paths remain blocked'
  'Provider backend execution prompt transmission checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
