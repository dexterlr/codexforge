param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1061 Build Plan Ready-To-Execute Packet" `
  -ScriptFile "smoke-codexforge-build-plan-ready-to-execute-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-ready-to-execute-packet" `
  -Route "src\app\build-plan-ready-to-execute-packet" `
  -MainPanel "BuildPlanReadyToExecutePacketPanel" `
  -CommandLabel "Go to Build Plan Ready-To-Execute Packet" `
  -Modules @("build-plan-ready-to-execute-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanReadyToExecutePacketStableKey", "buildBuildPlanReadyToExecutePacket", "buildBuildPlanReadyToExecutePacketItems", "buildBuildPlanReadyToExecutePacketBoundary", "buildBuildPlanReadyToExecutePacketModel", "summarizeBuildPlanReadyToExecutePacket", "BUILD_PLAN_READY_TO_EXECUTE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan ready-to-execute packet", "Build plan ready-to-execute packet does not execute builds", "Ready-to-execute state requires explicit operator approval", "Ready-to-execute packets remain held until signoff", "Denied build plan ready-to-execute paths remain blocked", "Build plan ready-to-execute checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan ready-to-execute packet does not execute builds", "Ready-to-execute state requires explicit operator approval", "Denied build plan ready-to-execute paths remain blocked") `
  -RouteHref "/build-plan-ready-to-execute-packet"

Write-Host "[OK] CodexForge Phase 1061 Build Plan Ready-To-Execute Packet smoke passed."
