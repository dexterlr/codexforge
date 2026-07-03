param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2563 Approved Provider Trial Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-approved-provider-trial-prompt-transmission-blocker.ps1"
  Domain = "approved-provider-trial-prompt-transmission-blocker"
  Route = "approved-provider-trial-prompt-transmission-blocker"
  CommandLabel = "Go to Approved Provider Trial Prompt Transmission Blocker"
  RouteHref = "/approved-provider-trial-prompt-transmission-blocker"
  Phase = 2563
  Title = "Approved Provider Trial Prompt Transmission Blocker"
  Markers = @(
  'Approved provider trial prompt transmission blocker'
  'Approved provider trial prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Approved provider trial prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Approved provider trial prompt transmission blocker blocks hidden send affordances'
  'Denied approved provider prompt transmission paths remain blocked'
  'Approved provider prompt transmission blocker checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
