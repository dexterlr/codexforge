param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1588 QA Validation Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-qa-validation-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\qa-validation-worker-profile-preview" `
  -Route "src\app\qa-validation-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to QA Validation Worker Profile Preview" `
  -RouteHref "/qa-validation-worker-profile-preview" `
  -Markers @("QA validation worker profile preview", "QA validation worker profile preview does not run tests or commands from the UI", "QA validation worker profile preview requires explicit operator approval", "QA validation worker profile preview covers build smoke lint test hygiene domain validation evidence result audit and denied validation actions", "Denied QA validation worker paths remain blocked", "QA validation worker profile checklist")
