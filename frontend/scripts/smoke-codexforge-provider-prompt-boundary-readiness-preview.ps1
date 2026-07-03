param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2482 Provider Prompt Boundary Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-prompt-boundary-readiness-preview.ps1"
  Domain = "provider-prompt-boundary-readiness-preview"
  Route = "provider-prompt-boundary-readiness-preview"
  CommandLabel = "Go to Provider Prompt Boundary Readiness Preview"
  RouteHref = "/provider-prompt-boundary-readiness-preview"
  Phase = 2482
  Title = "Provider Prompt Boundary Readiness Preview"
  Markers = @(
  'Provider prompt boundary readiness preview'
  'Provider prompt boundary readiness preview defines prompt boundary requirements without sending prompts to providers models connectors workers or network calls'
  'Provider prompt boundary readiness preview keeps prompt transmission blocked'
  'Provider prompt boundary readiness preview blocks hidden send affordances'
  'Denied provider prompt boundary paths remain blocked'
  'Provider prompt boundary checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
