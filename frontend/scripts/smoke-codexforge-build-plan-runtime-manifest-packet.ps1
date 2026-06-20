param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1040 Build Plan Runtime Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-runtime-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-runtime-manifest-packet" `
  -Route "src\app\build-plan-runtime-manifest-packet" `
  -MainPanel "BuildPlanRuntimeManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Runtime Manifest Packet" `
  -Modules @("build-plan-runtime-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanRuntimeManifestPacketStableKey", "buildBuildPlanRuntimeManifestPacket", "buildBuildPlanRuntimeManifestPacketItems", "buildBuildPlanRuntimeManifestPacketBoundary", "buildBuildPlanRuntimeManifestPacketModel", "summarizeBuildPlanRuntimeManifestPacket", "BUILD_PLAN_RUNTIME_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan runtime manifest packet", "Build plan runtime manifest packet does not start runtimes", "Runtime manifests require explicit operator approval", "Runtime manifests include planned runtimes without launch", "Denied build runtime manifest paths remain blocked", "Build plan runtime manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan runtime manifest packet does not start runtimes", "Runtime manifests require explicit operator approval", "Denied build runtime manifest paths remain blocked") `
  -RouteHref "/build-plan-runtime-manifest-packet"

Write-Host "[OK] CodexForge Phase 1040 Build Plan Runtime Manifest Packet smoke passed."
