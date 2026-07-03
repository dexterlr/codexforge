param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2591 Provider Result Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-provider-result-acceptance-criteria-preview.ps1"
  Domain = "provider-result-acceptance-criteria-preview"
  Route = "provider-result-acceptance-criteria-preview"
  CommandLabel = "Go to Provider Result Acceptance Criteria Preview"
  RouteHref = "/provider-result-acceptance-criteria-preview"
  Phase = 2591
  Title = "Provider Result Acceptance Criteria Preview"
  Markers = @(
  'Provider result acceptance criteria preview'
  'Provider result acceptance criteria preview defines acceptance criteria for future provider result review without accepting live outputs'
  'Provider result acceptance criteria preview requires approval audit safety privacy redaction retry fallback timeout cost rate observability rollback and denial visibility'
  'Provider result acceptance criteria preview blocks automatic acceptance'
  'Denied provider result acceptance paths remain blocked'
  'Provider result acceptance checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
