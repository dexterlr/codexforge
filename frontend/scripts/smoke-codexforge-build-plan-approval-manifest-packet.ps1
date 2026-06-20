param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1044 Build Plan Approval Manifest Packet" `
  -ScriptFile "smoke-codexforge-build-plan-approval-manifest-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-manifest-packet" `
  -Route "src\app\build-plan-approval-manifest-packet" `
  -MainPanel "BuildPlanApprovalManifestPacketPanel" `
  -CommandLabel "Go to Build Plan Approval Manifest Packet" `
  -Modules @("build-plan-approval-manifest-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalManifestPacketStableKey", "buildBuildPlanApprovalManifestPacket", "buildBuildPlanApprovalManifestPacketItems", "buildBuildPlanApprovalManifestPacketBoundary", "buildBuildPlanApprovalManifestPacketModel", "summarizeBuildPlanApprovalManifestPacket", "BUILD_PLAN_APPROVAL_MANIFEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan approval manifest packet", "Build plan approval manifest packet does not approve actions", "Approval manifests require explicit operator approval", "Approval manifests list every gated model backend and domain action", "Denied build approval manifest paths remain blocked", "Build plan approval manifest checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval manifest packet does not approve actions", "Approval manifests require explicit operator approval", "Denied build approval manifest paths remain blocked") `
  -RouteHref "/build-plan-approval-manifest-packet"

Write-Host "[OK] CodexForge Phase 1044 Build Plan Approval Manifest Packet smoke passed."
