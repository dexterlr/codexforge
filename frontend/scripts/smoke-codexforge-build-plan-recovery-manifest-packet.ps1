param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1047 Build Plan Recovery Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-recovery-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-recovery-manifest-packet" `
  -Route "src\app\build-plan-recovery-manifest-packet" `
  -MainPanel "BuildPlanRecoveryManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Recovery Manifest Packet" `
  -Modules @("build-plan-recovery-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanRecoveryManifestPacketStableKey", "buildBuildPlanRecoveryManifestPacket", "buildBuildPlanRecoveryManifestPacketItems", "buildBuildPlanRecoveryManifestPacketBoundary", "buildBuildPlanRecoveryManifestPacketModel", "summarizeBuildPlanRecoveryManifestPacket", "BUILD_PLAN_RECOVERY_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan recovery manifest packet", "Build plan recovery manifest packet does not trigger recovery", "Recovery manifests require explicit operator approval", "Recovery manifests include rollback backup and restore checkpoints", "Denied build recovery manifest paths remain blocked", "Build plan recovery manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan recovery manifest packet does not trigger recovery", "Recovery manifests require explicit operator approval", "Denied build recovery manifest paths remain blocked") `
  -RouteHref "/build-plan-recovery-manifest-packet"

Write-Host "[OK] CodexForge Phase 1047 Build Plan Recovery Manifest Packet smoke passed."
