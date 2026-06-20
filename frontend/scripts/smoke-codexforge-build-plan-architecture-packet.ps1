param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1037 Build Plan Architecture Packet" `
  -ScriptFile "smoke-codexforge-build-plan-architecture-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-architecture-packet" `
  -Route "src\app\build-plan-architecture-packet" `
  -MainPanel "BuildPlanArchitecturePacketPanel" `
  -CommandLabel "Go to Build Plan Architecture Packet" `
  -Modules @("build-plan-architecture-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanArchitecturePacketStableKey", "buildBuildPlanArchitecturePacket", "buildBuildPlanArchitecturePacketItems", "buildBuildPlanArchitecturePacketBoundary", "buildBuildPlanArchitecturePacketModel", "summarizeBuildPlanArchitecturePacket", "BUILD_PLAN_ARCHITECTURE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan architecture packet", "Build plan architecture packet does not scaffold architecture", "Build architecture requires explicit operator approval", "Architecture packets include model routing and adapter boundaries", "Denied build architecture paths remain blocked", "Build plan architecture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan architecture packet does not scaffold architecture", "Build architecture requires explicit operator approval", "Denied build architecture paths remain blocked") `
  -RouteHref "/build-plan-architecture-packet"

Write-Host "[OK] CodexForge Phase 1037 Build Plan Architecture Packet smoke passed."
