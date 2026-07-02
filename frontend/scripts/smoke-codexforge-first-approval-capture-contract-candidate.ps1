param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2166 First Approval Capture Contract Candidate"
  ScriptFile = "smoke-codexforge-first-approval-capture-contract-candidate.ps1"
  Domain = "src\lib\codexforge\first-approval-capture-contract-candidate"
  Route = "src\app\first-approval-capture-contract-candidate"
  CommandLabel = "Go to First Approval Capture Contract Candidate"
  RouteHref = "/first-approval-capture-contract-candidate"
  ContractFamily = "ApprovalCapture"
  Markers = @("First approval capture contract candidate", "First approval capture contract candidate does not enable approval persistence approval mutation signature capture identity verification account authorization export approval publish approval render approval audit persistence API creation service deployment command execution or frontend persistence from the UI", "First approval capture contract candidate requires explicit operator approval", "Candidate combines approval request schema operator attestation multi step chain expiration revocation evidence packet denial ledger escalation audit event frontend blocked cockpit summary and denied paths", "Denied first approval capture contract paths remain blocked", "First approval capture contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
