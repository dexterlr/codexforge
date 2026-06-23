param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1584 Data Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-data-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\data-worker-profile-preview" `
  -Route "src\app\data-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Data Worker Profile Preview" `
  -RouteHref "/data-worker-profile-preview" `
  -Markers @("Data worker profile preview", "Data worker profile preview does not access databases connectors files or networks from the UI", "Data worker profile preview requires explicit operator approval", "Data worker profile preview covers dataset shape schema validation transform evidence result audit privacy and denied data actions", "Denied data worker paths remain blocked", "Data worker profile checklist")
