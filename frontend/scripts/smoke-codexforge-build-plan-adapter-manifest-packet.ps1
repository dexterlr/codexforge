param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1041 Build Plan Adapter Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-adapter-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-adapter-manifest-packet" `
  -Route "src\app\build-plan-adapter-manifest-packet" `
  -MainPanel "BuildPlanAdapterManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Adapter Manifest Packet" `
  -Modules @("build-plan-adapter-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanAdapterManifestPacketStableKey", "buildBuildPlanAdapterManifestPacket", "buildBuildPlanAdapterManifestPacketItems", "buildBuildPlanAdapterManifestPacketBoundary", "buildBuildPlanAdapterManifestPacketModel", "summarizeBuildPlanAdapterManifestPacket", "BUILD_PLAN_ADAPTER_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan adapter manifest packet", "Build plan adapter manifest packet does not execute adapters", "Adapter manifests require explicit operator approval", "Adapter manifests include backend and domain adapter gates", "Denied build adapter manifest paths remain blocked", "Build plan adapter manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan adapter manifest packet does not execute adapters", "Adapter manifests require explicit operator approval", "Denied build adapter manifest paths remain blocked") `
  -RouteHref "/build-plan-adapter-manifest-packet"

Write-Host "[OK] CodexForge Phase 1041 Build Plan Adapter Manifest Packet smoke passed."
