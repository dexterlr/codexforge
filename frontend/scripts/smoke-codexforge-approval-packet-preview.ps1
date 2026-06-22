param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1440 Approval Packet Preview" `
  -ScriptFile "smoke-codexforge-approval-packet-preview.ps1" `
  -Domain "src\lib\codexforge\approval-packet-preview" `
  -Route "src\app\approval-packet-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Approval Packet Preview" `
  -RouteHref "/approval-packet-preview" `
  -Markers @("Approval packet preview", "Approval packet preview does not persist approvals", "Approval packet preview requires explicit human approval", "Approval packet preview defines operator identity scope expiry files commands model tool needs risk level evidence requirements and denied paths", "Denied approval packet paths remain blocked", "Approval packet checklist")
