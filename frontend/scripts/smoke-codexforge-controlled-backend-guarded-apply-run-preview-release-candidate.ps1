param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1337 Controlled Backend Guarded Apply Run Preview Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-backend-guarded-apply-run-preview-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-backend-guarded-apply-run-preview-release-candidate" `
  -Route "src\app\controlled-backend-guarded-apply-run-preview-release-candidate" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Controlled Backend Guarded Apply Run Preview Release Candidate" `
  -RouteHref "/controlled-backend-guarded-apply-run-preview-release-candidate" `
  -Markers @("Controlled backend guarded apply run preview release candidate", "Controlled backend guarded apply run preview release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery", "Controlled backend guarded apply run preview release requires explicit operator approval", "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it", "Denied controlled backend guarded apply run paths remain blocked", "Controlled backend guarded apply run preview release checklist")
