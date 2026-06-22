param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1318 Backend Handoff Security Review" `
  -ScriptFile "smoke-codexforge-backend-handoff-security-review.ps1" `
  -Domain "src\lib\codexforge\backend-handoff-security-review" `
  -Route "src\app\backend-handoff-security-review" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Handoff Security Review" `
  -RouteHref "/backend-handoff-security-review" `
  -Markers @("Backend handoff security review", "Backend handoff security review does not execute backend actions", "Backend handoff security review requires explicit operator approval", "Security review checks secret redaction path guard command allowlist environment-name-only display provider block connector block and memory-promotion block", "Denied backend handoff security paths remain blocked", "Backend handoff security review checklist")
