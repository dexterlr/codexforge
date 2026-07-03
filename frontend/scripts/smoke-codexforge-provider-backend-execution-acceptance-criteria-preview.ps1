param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2498 Provider Backend Execution Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-provider-backend-execution-acceptance-criteria-preview.ps1"
  Domain = "provider-backend-execution-acceptance-criteria-preview"
  Route = "provider-backend-execution-acceptance-criteria-preview"
  CommandLabel = "Go to Provider Backend Execution Acceptance Criteria Preview"
  RouteHref = "/provider-backend-execution-acceptance-criteria-preview"
  Phase = 2498
  Title = "Provider Backend Execution Acceptance Criteria Preview"
  Markers = @(
  'Provider backend execution acceptance criteria preview'
  'Provider backend execution acceptance criteria preview defines readiness acceptance criteria without accepting live execution'
  'Provider backend execution acceptance criteria preview requires approval audit credential token redaction SDK isolation runtime egress rate timeout retry fallback cost safety privacy and observability visibility'
  'Provider backend execution acceptance criteria preview blocks automatic promotion'
  'Denied provider backend execution acceptance paths remain blocked'
  'Provider backend execution acceptance checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
