param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2464 Controlled Provider Dry Run Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-acceptance-criteria-preview.ps1"
  Domain = "controlled-provider-dry-run-acceptance-criteria-preview"
  Route = "controlled-provider-dry-run-acceptance-criteria-preview"
  CommandLabel = "Go to Controlled Provider Dry Run Acceptance Criteria Preview"
  RouteHref = "/controlled-provider-dry-run-acceptance-criteria-preview"
  Phase = 2464
  Title = "Controlled Provider Dry Run Acceptance Criteria Preview"
  Markers = @(
  'Controlled provider dry run acceptance criteria preview'
  'Controlled provider dry run acceptance criteria preview defines acceptance criteria for the controlled dry run candidate without accepting real outputs'
  'Controlled provider dry run acceptance criteria preview requires approval audit safety privacy redaction cost rate timeout fallback and denial visibility'
  'Controlled provider dry run acceptance criteria preview blocks automatic acceptance'
  'Denied controlled provider acceptance criteria paths remain blocked'
  'Controlled provider acceptance criteria checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
