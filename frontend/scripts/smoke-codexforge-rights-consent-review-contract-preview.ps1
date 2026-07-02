param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2035 Rights Consent Review Contract Preview"
  ScriptFile = "smoke-codexforge-rights-consent-review-contract-preview.ps1"
  Domain = "src\lib\codexforge\rights-consent-review-contract-preview"
  Route = "src\app\rights-consent-review-contract-preview"
  CommandLabel = "Go to Rights Consent Review Contract Preview"
  RouteHref = "/rights-consent-review-contract-preview"
  Markers = @("Rights consent review contract preview", "Rights consent review contract preview does not clear copyright approve consent persist rights or publish content from the UI", "Rights consent review contract preview requires backend-owned rights workflow consent workflow approval capture evidence capture and audit trail", "Rights consent review contract preview shows simulated rights review contract simulated consent review contract simulated evidence prerequisite simulated approval prerequisite simulated denied frontend rights persistence", "Denied rights consent review contract paths remain blocked", "Rights consent review contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

