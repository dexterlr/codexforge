param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1369 Controlled Tiny Real Operator Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-tiny-real-operator-trial-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-tiny-real-operator-trial-release-candidate" `
  -Route "src\app\controlled-tiny-real-operator-trial-release-candidate" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Controlled Tiny Real Operator Trial Release Candidate" `
  -RouteHref "/controlled-tiny-real-operator-trial-release-candidate" `
  -Markers @("Controlled tiny real operator trial release candidate", "Controlled tiny real operator trial release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend", "Controlled tiny real operator trial release requires explicit operator approval", "Release candidate prepares CodexForge for the first tiny backend-owned guarded apply and run without broad execution", "Denied controlled tiny real operator trial paths remain blocked", "Controlled tiny real operator trial release checklist")
