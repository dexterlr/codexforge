param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1585 Creative Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-creative-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\creative-worker-profile-preview" `
  -Route "src\app\creative-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Creative Worker Profile Preview" `
  -RouteHref "/creative-worker-profile-preview" `
  -Markers @("Creative worker profile preview", "Creative worker profile preview does not generate media call providers or write files from the UI", "Creative worker profile preview requires explicit operator approval", "Creative worker profile preview covers concept art copy narrative branding image video handoff evidence result audit and denied creative actions", "Denied creative worker paths remain blocked", "Creative worker profile checklist")
