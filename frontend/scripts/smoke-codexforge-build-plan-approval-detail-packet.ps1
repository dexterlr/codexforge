param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1052 Build Plan Approval Detail Packet" `
  -ScriptFile "smoke-codexforge-build-plan-approval-detail-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-detail-packet" `
  -Route "src\app\build-plan-approval-detail-packet" `
  -MainPanel "BuildPlanApprovalDetailPacketPanel" `
  -CommandLabel "Go to Build Plan Approval Detail Packet" `
  -Modules @("build-plan-approval-detail-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalDetailPacketStableKey", "buildBuildPlanApprovalDetailPacket", "buildBuildPlanApprovalDetailPacketItems", "buildBuildPlanApprovalDetailPacketBoundary", "buildBuildPlanApprovalDetailPacketModel", "summarizeBuildPlanApprovalDetailPacket", "BUILD_PLAN_APPROVAL_DETAIL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan approval detail packet", "Build plan approval detail packet does not execute builds", "Approval details require explicit operator approval", "Detail packets include build plan bundle references", "Denied build plan approval detail paths remain blocked", "Build plan approval detail checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval detail packet does not execute builds", "Approval details require explicit operator approval", "Denied build plan approval detail paths remain blocked") `
  -RouteHref "/build-plan-approval-detail-packet"

Write-Host "[OK] CodexForge Phase 1052 Build Plan Approval Detail Packet smoke passed."
