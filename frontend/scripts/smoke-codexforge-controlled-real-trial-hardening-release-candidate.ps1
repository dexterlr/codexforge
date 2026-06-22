param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1385 Controlled Real Trial Hardening Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-real-trial-hardening-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-real-trial-hardening-release-candidate" `
  -Route "src\app\controlled-real-trial-hardening-release-candidate" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Controlled Real Trial Hardening Release Candidate" `
  -RouteHref "/controlled-real-trial-hardening-release-candidate" `
  -Markers @("Controlled real trial hardening release candidate", "Controlled real trial hardening release candidate does not broaden execution call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend", "Controlled real trial hardening release requires explicit operator approval", "Release candidate prepares CodexForge tiny real trial for safer backend-owned failure handling without broad execution", "Denied controlled real trial hardening paths remain blocked", "Controlled real trial hardening release checklist")
