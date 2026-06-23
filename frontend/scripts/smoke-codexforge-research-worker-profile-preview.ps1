param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1580 Research Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-research-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\research-worker-profile-preview" `
  -Route "src\app\research-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Research Worker Profile Preview" `
  -RouteHref "/research-worker-profile-preview" `
  -Markers @("Research worker profile preview", "Research worker profile preview does not browse or call connectors from the UI", "Research worker profile preview requires explicit operator approval", "Research worker profile preview covers research questions source needs citation needs privacy boundaries evidence result audit and denied research actions", "Denied research worker paths remain blocked", "Research worker profile checklist")
