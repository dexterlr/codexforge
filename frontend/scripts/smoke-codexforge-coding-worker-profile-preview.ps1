param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1579 Coding Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-coding-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\coding-worker-profile-preview" `
  -Route "src\app\coding-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Coding Worker Profile Preview" `
  -RouteHref "/coding-worker-profile-preview" `
  -Markers @("Coding worker profile preview", "Coding worker profile preview does not write code or run commands from the UI", "Coding worker profile preview requires explicit operator approval", "Coding worker profile preview covers implementation refactor bugfix tests diffs command expectations evidence result audit and denied code actions", "Denied coding worker paths remain blocked", "Coding worker profile checklist")
