param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1586 Video Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-video-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\video-worker-profile-preview" `
  -Route "src\app\video-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Video Worker Profile Preview" `
  -RouteHref "/video-worker-profile-preview" `
  -Markers @("Video worker profile preview", "Video worker profile preview does not render video call providers start tools or write media from the UI", "Video worker profile preview requires explicit operator approval", "Video worker profile preview covers storyboard script shot list asset needs render plan evidence result audit and denied video actions", "Denied video worker paths remain blocked", "Video worker profile checklist")
