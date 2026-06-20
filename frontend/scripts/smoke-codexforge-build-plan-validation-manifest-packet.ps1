param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1042 Build Plan Validation Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-validation-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-validation-manifest-packet" `
  -Route "src\app\build-plan-validation-manifest-packet" `
  -MainPanel "BuildPlanValidationManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Validation Manifest Packet" `
  -Modules @("build-plan-validation-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanValidationManifestPacketStableKey", "buildBuildPlanValidationManifestPacket", "buildBuildPlanValidationManifestPacketItems", "buildBuildPlanValidationManifestPacketBoundary", "buildBuildPlanValidationManifestPacketModel", "summarizeBuildPlanValidationManifestPacket", "BUILD_PLAN_VALIDATION_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan validation manifest packet", "Build plan validation manifest packet does not run validation", "Validation manifests require explicit operator approval", "Validation manifests include planned tests and smoke checks", "Denied build validation manifest paths remain blocked", "Build plan validation manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan validation manifest packet does not run validation", "Validation manifests require explicit operator approval", "Denied build validation manifest paths remain blocked") `
  -RouteHref "/build-plan-validation-manifest-packet"

Write-Host "[OK] CodexForge Phase 1042 Build Plan Validation Manifest Packet smoke passed."
