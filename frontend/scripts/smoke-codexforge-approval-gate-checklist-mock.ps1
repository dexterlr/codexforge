param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2197 Approval Gate Checklist Mock"
  ScriptFile = "smoke-codexforge-approval-gate-checklist-mock.ps1"
  Domain = "src\lib\codexforge\approval-gate-checklist-mock"
  Route = "src\app\approval-gate-checklist-mock"
  CommandLabel = "Go to Approval Gate Checklist Mock"
  RouteHref = "/approval-gate-checklist-mock"
  Markers = @("Approval gate checklist mock", "Approval gate checklist mock uses local React state only and does not persist approvals capture signatures verify identity or approve protected actions", "Approval gate checklist mock includes creative review legal review rights review operator review export review and publish review checks", "Approval gate checklist mock keeps approval capture blocked until backend approval ledger exists", "Denied approval persistence paths remain blocked", "Approval gate checklist mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
