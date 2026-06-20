param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1035 Build Plan Summary Packet" `
  -ScriptFile "smoke-codexforge-build-plan-summary-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-summary-packet" `
  -Route "src\app\build-plan-summary-packet" `
  -MainPanel "BuildPlanSummaryPacketPanel" `
  -CommandLabel "Go to Build Plan Summary Packet" `
  -Modules @("build-plan-summary-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanSummaryPacketStableKey", "buildBuildPlanSummaryPacket", "buildBuildPlanSummaryPacketItems", "buildBuildPlanSummaryPacketBoundary", "buildBuildPlanSummaryPacketModel", "summarizeBuildPlanSummaryPacket", "BUILD_PLAN_SUMMARY_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan summary packet", "Build plan summary packet does not send prompts", "Build plan summaries require explicit operator approval", "Summary packets preserve shared CodexForge brain context", "Denied build plan summary paths remain blocked", "Build plan summary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan summary packet does not send prompts", "Build plan summaries require explicit operator approval", "Denied build plan summary paths remain blocked") `
  -RouteHref "/build-plan-summary-packet"

Write-Host "[OK] CodexForge Phase 1035 Build Plan Summary Packet smoke passed."
