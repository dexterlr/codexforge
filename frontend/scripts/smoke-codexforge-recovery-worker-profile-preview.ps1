param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1590 Recovery Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-recovery-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-worker-profile-preview" `
  -Route "src\app\recovery-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Recovery Worker Profile Preview" `
  -RouteHref "/recovery-worker-profile-preview" `
  -Markers @("Recovery worker profile preview", "Recovery worker profile preview does not execute rollback retry restore or recovery from the UI", "Recovery worker profile preview requires explicit operator approval", "Recovery worker profile preview covers rollback retry restore stop explain-failure manual-review safety-stop partial recovery evidence result audit and denied recovery actions", "Denied recovery worker paths remain blocked", "Recovery worker profile checklist")
