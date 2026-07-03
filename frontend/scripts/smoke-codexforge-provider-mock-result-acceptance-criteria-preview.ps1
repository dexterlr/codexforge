param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2398 Provider Mock Result Acceptance Criteria Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-acceptance-criteria-preview.ps1"
  Domain = "provider-mock-result-acceptance-criteria-preview"
  Route = "provider-mock-result-acceptance-criteria-preview"
  CommandLabel = "Go to Provider Mock Result Acceptance Criteria Preview"
  RouteHref = "/provider-mock-result-acceptance-criteria-preview"
  Phase = 2398
  Title = "Provider Mock Result Acceptance Criteria Preview"
  Markers = @(
  'Provider mock result acceptance criteria preview',
  'Provider mock result acceptance criteria preview defines acceptance criteria for future provider outputs without accepting real outputs',
  'Provider mock result acceptance criteria preview requires approval audit safety redaction and review gates',
  'Provider mock result acceptance criteria preview blocks automatic acceptance',
  'Denied provider mock result acceptance paths remain blocked',
  'Provider mock result acceptance checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
