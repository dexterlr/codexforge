param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2561 Approved Provider Trial Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-acceptance-criteria-preview.ps1"
  Domain = "approved-provider-trial-acceptance-criteria-preview"
  Route = "approved-provider-trial-acceptance-criteria-preview"
  CommandLabel = "Go to Approved Provider Trial Acceptance Criteria Preview"
  RouteHref = "/approved-provider-trial-acceptance-criteria-preview"
  Phase = 2561
  Title = "Approved Provider Trial Acceptance Criteria Preview"
  Markers = @(
  'Approved provider trial acceptance criteria preview'
  'Approved provider trial acceptance criteria preview defines acceptance criteria for the first approved provider trial without accepting live execution'
  'Approved provider trial acceptance criteria preview requires approval audit credential token redaction SDK isolation runtime egress rate timeout cost safety privacy observability rollback and denial visibility'
  'Approved provider trial acceptance criteria preview blocks automatic promotion'
  'Denied approved provider trial acceptance paths remain blocked'
  'Approved provider trial acceptance checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
