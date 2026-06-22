param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1317 Backend Approval Go No-Go Review" `
  -ScriptFile "smoke-codexforge-backend-approval-go-no-go-review.ps1" `
  -Domain "src\lib\codexforge\backend-approval-go-no-go-review" `
  -Route "src\app\backend-approval-go-no-go-review" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Approval Go No Go Review" `
  -RouteHref "/backend-approval-go-no-go-review" `
  -Markers @("Backend approval go no-go review", "Backend approval go no-go review does not release execution", "Backend approval go no-go review requires explicit operator approval", "Go no-go review reports preview-only status blocked backend execution and required future backend guards", "Denied backend approval go no-go paths remain blocked", "Backend approval go no-go checklist")
