param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1039 Build Plan Command Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-command-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-command-manifest-packet" `
  -Route "src\app\build-plan-command-manifest-packet" `
  -MainPanel "BuildPlanCommandManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Command Manifest Packet" `
  -Modules @("build-plan-command-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanCommandManifestPacketStableKey", "buildBuildPlanCommandManifestPacket", "buildBuildPlanCommandManifestPacketItems", "buildBuildPlanCommandManifestPacketBoundary", "buildBuildPlanCommandManifestPacketModel", "summarizeBuildPlanCommandManifestPacket", "BUILD_PLAN_COMMAND_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan command manifest packet", "Build plan command manifest packet does not run commands", "Command manifests require explicit operator approval", "Command manifests include planned commands without execution", "Denied build command manifest paths remain blocked", "Build plan command manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan command manifest packet does not run commands", "Command manifests require explicit operator approval", "Denied build command manifest paths remain blocked") `
  -RouteHref "/build-plan-command-manifest-packet"

Write-Host "[OK] CodexForge Phase 1039 Build Plan Command Manifest Packet smoke passed."
