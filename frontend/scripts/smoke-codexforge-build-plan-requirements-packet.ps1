param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1036 Build Plan Requirements Packet" `
  -ScriptFile "smoke-codexforge-build-plan-requirements-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-requirements-packet" `
  -Route "src\app\build-plan-requirements-packet" `
  -MainPanel "BuildPlanRequirementsPacketPanel" `
  -CommandLabel "Go to Build Plan Requirements Packet" `
  -Modules @("build-plan-requirements-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanRequirementsPacketStableKey", "buildBuildPlanRequirementsPacket", "buildBuildPlanRequirementsPacketItems", "buildBuildPlanRequirementsPacketBoundary", "buildBuildPlanRequirementsPacketModel", "summarizeBuildPlanRequirementsPacket", "BUILD_PLAN_REQUIREMENTS_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan requirements packet", "Build plan requirements packet does not create tasks", "Build requirements require explicit operator approval", "Requirements packets preserve latest-message authority", "Denied build requirements paths remain blocked", "Build plan requirements checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan requirements packet does not create tasks", "Build requirements require explicit operator approval", "Denied build requirements paths remain blocked") `
  -RouteHref "/build-plan-requirements-packet"

Write-Host "[OK] CodexForge Phase 1036 Build Plan Requirements Packet smoke passed."
