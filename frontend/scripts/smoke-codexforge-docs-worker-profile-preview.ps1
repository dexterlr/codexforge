param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1583 Docs Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-docs-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\docs-worker-profile-preview" `
  -Route "src\app\docs-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Docs Worker Profile Preview" `
  -RouteHref "/docs-worker-profile-preview" `
  -Markers @("Docs worker profile preview", "Docs worker profile preview does not publish docs or mutate files from the UI", "Docs worker profile preview requires explicit operator approval", "Docs worker profile preview covers README docs specs handoff changelog evidence result audit and denied docs actions", "Denied docs worker paths remain blocked", "Docs worker profile checklist")
