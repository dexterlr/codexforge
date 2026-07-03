param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2530 Real Provider Call Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-real-provider-call-acceptance-criteria-preview.ps1"
  Domain = "real-provider-call-acceptance-criteria-preview"
  Route = "real-provider-call-acceptance-criteria-preview"
  CommandLabel = "Go to Real Provider Call Acceptance Criteria Preview"
  RouteHref = "/real-provider-call-acceptance-criteria-preview"
  Phase = 2530
  Title = "Real Provider Call Acceptance Criteria Preview"
  Markers = @(
  'Real provider call acceptance criteria preview'
  'Real provider call acceptance criteria preview defines acceptance criteria for the first real provider call guard without accepting live execution'
  'Real provider call acceptance criteria preview requires approval audit credential token redaction SDK isolation runtime egress rate timeout retry fallback cost safety privacy observability rollback and denial visibility'
  'Real provider call acceptance criteria preview blocks automatic promotion'
  'Denied real provider call acceptance paths remain blocked'
  'Real provider call acceptance checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
