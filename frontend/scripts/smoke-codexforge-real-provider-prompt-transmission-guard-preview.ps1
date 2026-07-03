param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2514 Real Provider Prompt Transmission Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-prompt-transmission-guard-preview.ps1"
  Domain = "real-provider-prompt-transmission-guard-preview"
  Route = "real-provider-prompt-transmission-guard-preview"
  CommandLabel = "Go to Real Provider Prompt Transmission Guard Preview"
  RouteHref = "/real-provider-prompt-transmission-guard-preview"
  Phase = 2514
  Title = "Real Provider Prompt Transmission Guard Preview"
  Markers = @(
  'Real provider prompt transmission guard preview'
  'Real provider prompt transmission guard preview defines prompt transmission constraints without sending prompts to providers models connectors workers or network calls'
  'Real provider prompt transmission guard preview keeps prompt transmission blocked'
  'Real provider prompt transmission guard preview blocks hidden send affordances'
  'Denied real provider prompt transmission paths remain blocked'
  'Real provider prompt transmission checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
