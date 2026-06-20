param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1045 Build Plan Evidence Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-evidence-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-evidence-manifest-packet" `
  -Route "src\app\build-plan-evidence-manifest-packet" `
  -MainPanel "BuildPlanEvidenceManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Evidence Manifest Packet" `
  -Modules @("build-plan-evidence-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanEvidenceManifestPacketStableKey", "buildBuildPlanEvidenceManifestPacket", "buildBuildPlanEvidenceManifestPacketItems", "buildBuildPlanEvidenceManifestPacketBoundary", "buildBuildPlanEvidenceManifestPacketModel", "summarizeBuildPlanEvidenceManifestPacket", "BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan evidence manifest packet", "Build plan evidence manifest packet does not persist evidence", "Evidence manifests require explicit operator approval", "Evidence manifests route outputs through shared evidence review", "Denied build evidence manifest paths remain blocked", "Build plan evidence manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan evidence manifest packet does not persist evidence", "Evidence manifests require explicit operator approval", "Denied build evidence manifest paths remain blocked") `
  -RouteHref "/build-plan-evidence-manifest-packet"

Write-Host "[OK] CodexForge Phase 1045 Build Plan Evidence Manifest Packet smoke passed."
