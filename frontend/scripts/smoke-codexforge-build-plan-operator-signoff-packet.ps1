param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1063 Build Plan Operator Signoff Packet" `
  -ScriptFile "smoke-codexforge-build-plan-operator-signoff-packet.ps1" `
  -Domain "src\lib\codexforge\build-plan-operator-signoff-packet" `
  -Route "src\app\build-plan-operator-signoff-packet" `
  -MainPanel "BuildPlanOperatorSignoffPacketPanel" `
  -CommandLabel "Go to Build Plan Operator Signoff Packet" `
  -Modules @("build-plan-operator-signoff-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanOperatorSignoffPacketStableKey", "buildBuildPlanOperatorSignoffPacket", "buildBuildPlanOperatorSignoffPacketItems", "buildBuildPlanOperatorSignoffPacketBoundary", "buildBuildPlanOperatorSignoffPacketModel", "summarizeBuildPlanOperatorSignoffPacket", "BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_LANGUAGE") `
  -PhaseMarkers @("Build plan operator signoff packet", "Build plan operator signoff packet does not sign off automatically", "Operator signoff requires explicit human approval", "Signoff packets preserve shared brain memory evidence result and audit gates", "Denied build plan operator signoff paths remain blocked", "Build plan operator signoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan operator signoff packet does not sign off automatically", "Operator signoff requires explicit human approval", "Denied build plan operator signoff paths remain blocked") `
  -RouteHref "/build-plan-operator-signoff-packet"

Write-Host "[OK] CodexForge Phase 1063 Build Plan Operator Signoff Packet smoke passed."
