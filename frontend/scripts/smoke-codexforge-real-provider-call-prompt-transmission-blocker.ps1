param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2532 Real Provider Call Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-real-provider-call-prompt-transmission-blocker.ps1"
  Domain = "real-provider-call-prompt-transmission-blocker"
  Route = "real-provider-call-prompt-transmission-blocker"
  CommandLabel = "Go to Real Provider Call Prompt Transmission Blocker"
  RouteHref = "/real-provider-call-prompt-transmission-blocker"
  Phase = 2532
  Title = "Real Provider Call Prompt Transmission Blocker"
  Markers = @(
  'Real provider call prompt transmission blocker'
  'Real provider call prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Real provider call prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Real provider call prompt transmission blocker blocks hidden send affordances'
  'Denied real provider prompt transmission paths remain blocked'
  'Real provider prompt transmission blocker checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
