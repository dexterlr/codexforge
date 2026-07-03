param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2544 Approved Provider Trial Prompt Boundary Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-prompt-boundary-gate-preview.ps1"
  Domain = "approved-provider-trial-prompt-boundary-gate-preview"
  Route = "approved-provider-trial-prompt-boundary-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Prompt Boundary Gate Preview"
  RouteHref = "/approved-provider-trial-prompt-boundary-gate-preview"
  Phase = 2544
  Title = "Approved Provider Trial Prompt Boundary Gate Preview"
  Markers = @(
  'Approved provider trial prompt boundary gate preview'
  'Approved provider trial prompt boundary gate preview defines prompt transmission constraints without sending prompts to providers models connectors workers or network calls'
  'Approved provider trial prompt boundary gate preview keeps prompt transmission blocked'
  'Approved provider trial prompt boundary gate preview blocks hidden send affordances'
  'Denied approved provider prompt boundary paths remain blocked'
  'Approved provider prompt boundary checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
