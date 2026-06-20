param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1038 Build Plan File Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-file-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-file-manifest-packet" `
  -Route "src\app\build-plan-file-manifest-packet" `
  -MainPanel "BuildPlanFileManifestPacketPanel" `
  -CommandLabel "Go to Build Plan File Manifest Packet" `
  -Modules @("build-plan-file-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanFileManifestPacketStableKey", "buildBuildPlanFileManifestPacket", "buildBuildPlanFileManifestPacketItems", "buildBuildPlanFileManifestPacketBoundary", "buildBuildPlanFileManifestPacketModel", "summarizeBuildPlanFileManifestPacket", "BUILD_PLAN_FILE_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan file manifest packet", "Build plan file manifest packet does not write files", "File manifests require explicit operator approval", "File manifests include planned files without mutation", "Denied build file manifest paths remain blocked", "Build plan file manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan file manifest packet does not write files", "File manifests require explicit operator approval", "Denied build file manifest paths remain blocked") `
  -RouteHref "/build-plan-file-manifest-packet"

Write-Host "[OK] CodexForge Phase 1038 Build Plan File Manifest Packet smoke passed."
