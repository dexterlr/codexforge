param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2196 Rights Consent Checklist Mock"
  ScriptFile = "smoke-codexforge-rights-consent-checklist-mock.ps1"
  Domain = "src\lib\codexforge\rights-consent-checklist-mock"
  Route = "src\app\rights-consent-checklist-mock"
  CommandLabel = "Go to Rights Consent Checklist Mock"
  RouteHref = "/rights-consent-checklist-mock"
  Markers = @("Rights consent checklist mock", "Rights consent checklist mock uses local React state only and does not clear rights approve consent persist evidence grant licenses or audit events", "Rights consent checklist mock includes likeness consent music rights asset rights attribution consent expiry and revocation checks", "Rights consent checklist mock keeps rights clearance blocked until backend rights consent audit workflow exists", "Denied rights consent persistence paths remain blocked", "Rights consent checklist mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
