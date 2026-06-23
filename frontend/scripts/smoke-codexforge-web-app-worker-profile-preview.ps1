param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1582 Web App Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-web-app-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\web-app-worker-profile-preview" `
  -Route "src\app\web-app-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Web App Worker Profile Preview" `
  -RouteHref "/web-app-worker-profile-preview" `
  -Markers @("Web app worker profile preview", "Web app worker profile preview does not start web servers install packages deploy or run commands from the UI", "Web app worker profile preview requires explicit operator approval", "Web app worker profile preview covers routes components styles build validation evidence result audit recovery and denied web app actions", "Denied web app worker paths remain blocked", "Web app worker profile checklist")
