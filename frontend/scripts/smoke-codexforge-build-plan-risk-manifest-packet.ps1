param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1043 Build Plan Risk Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-risk-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-risk-manifest-packet" `
  -Route "src\app\build-plan-risk-manifest-packet" `
  -MainPanel "BuildPlanRiskManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Risk Manifest Packet" `
  -Modules @("build-plan-risk-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanRiskManifestPacketStableKey", "buildBuildPlanRiskManifestPacket", "buildBuildPlanRiskManifestPacketItems", "buildBuildPlanRiskManifestPacketBoundary", "buildBuildPlanRiskManifestPacketModel", "summarizeBuildPlanRiskManifestPacket", "BUILD_PLAN_RISK_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan risk manifest packet", "Build plan risk manifest packet does not approve risk", "Risk manifests require explicit operator approval", "Risk manifests gate model spend remote calls privacy and tool use", "Denied build risk manifest paths remain blocked", "Build plan risk manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan risk manifest packet does not approve risk", "Risk manifests require explicit operator approval", "Denied build risk manifest paths remain blocked") `
  -RouteHref "/build-plan-risk-manifest-packet"

Write-Host "[OK] CodexForge Phase 1043 Build Plan Risk Manifest Packet smoke passed."
