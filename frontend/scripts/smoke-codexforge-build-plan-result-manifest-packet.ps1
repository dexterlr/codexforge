param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1046 Build Plan Result Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-result-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-result-manifest-packet" `
  -Route "src\app\build-plan-result-manifest-packet" `
  -MainPanel "BuildPlanResultManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Result Manifest Packet" `
  -Modules @("build-plan-result-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanResultManifestPacketStableKey", "buildBuildPlanResultManifestPacket", "buildBuildPlanResultManifestPacketItems", "buildBuildPlanResultManifestPacketBoundary", "buildBuildPlanResultManifestPacketModel", "summarizeBuildPlanResultManifestPacket", "BUILD_PLAN_RESULT_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan result manifest packet", "Build plan result manifest packet does not persist results", "Result manifests require explicit operator approval", "Result manifests route outputs through shared result review", "Denied build result manifest paths remain blocked", "Build plan result manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan result manifest packet does not persist results", "Result manifests require explicit operator approval", "Denied build result manifest paths remain blocked") `
  -RouteHref "/build-plan-result-manifest-packet"

Write-Host "[OK] CodexForge Phase 1046 Build Plan Result Manifest Packet smoke passed."
