param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2164 Frontend Approval Persistence Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-approval-persistence-blocked-preview.ps1"
  Domain = "src\lib\codexforge\frontend-approval-persistence-blocked-preview"
  Route = "src\app\frontend-approval-persistence-blocked-preview"
  CommandLabel = "Go to Frontend Approval Persistence Blocked Preview"
  RouteHref = "/frontend-approval-persistence-blocked-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Frontend approval persistence blocked preview", "Frontend approval persistence blocked preview blocks frontend approval persistence frontend approval mutation frontend signature capture frontend identity verification frontend evidence storage frontend audit persistence frontend export approval frontend publish approval and frontend render approval", "Frontend approval persistence blocked preview requires backend-owned approval capture identity binding evidence storage approval ledger and audit trail", "Frontend approval persistence blocked preview shows denied approval persistence denied signature capture denied identity verification denied evidence storage denied protected action approval and backend prerequisite", "Denied frontend approval persistence paths remain blocked", "Frontend approval persistence blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
