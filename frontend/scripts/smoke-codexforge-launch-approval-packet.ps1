param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 603 Launch Approval Packet" `
  -ScriptFile "smoke-codexforge-launch-approval-packet.ps1" `
  -Domain "src\lib\codexforge\launch-approval-packet" `
  -Route "src\app\launch-approval-packet" `
  -MainPanel "LaunchApprovalPacketPanel" `
  -CommandLabel "Go to Launch Approval Packet" `
  -Modules @("launch-approval-packet-types.ts", "launch-approval-packet-summary.ts", "index.ts") `
  -Components @("LaunchApprovalPacketPanel.tsx", "index.ts") `
  -Exports @("buildLaunchApprovalPacketStableKey", "buildLaunchApprovalPacket", "buildLaunchApprovalPackets", "buildLaunchApprovalPacketBoundary", "buildLaunchApprovalPacketModel", "summarizeLaunchApprovalPacket", "LAUNCH_APPROVAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Launch approval packet", "Launch approval packet does not send or approve launch", "Launch approval requires explicit operator approval", "Unresolved approval packet blockers stay blocked", "Approval packet groups", "Boundary status summary") `
  -PlainEnglish @("Launch approval packet identity", "Readiness summary", "Rollback summary", "Operator decision summary", "Denied packet actions", "Unresolved approval packet blockers", "Launch go/no-go route", "Rollback plan route", "Next recommended action") `
  -RouteHref "/launch-approval-packet"

Write-Host "[OK] CodexForge Phase 603 launch approval packet smoke passed."
