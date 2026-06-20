param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 987 App Builder Target Packet" `
  -ScriptFile "smoke-codexforge-app-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\app-builder-target-packet" `
  -Route "src\app\app-builder-target-packet" `
  -MainPanel "AppBuilderTargetPacketPanel" `
  -CommandLabel "Go to App Builder Target Packet" `
  -Modules @("app-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildAppBuilderTargetPacketStableKey", "buildAppBuilderTargetPacket", "buildAppBuilderTargetPacketItems", "buildAppBuilderTargetPacketBoundary", "buildAppBuilderTargetPacketModel", "summarizeAppBuilderTargetPacket", "APP_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("App builder target packet", "App builder target packet does not scaffold apps", "App building requires explicit operator approval", "App packets include model routing and backend adapter review", "Denied app builder paths remain blocked", "App builder target checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "App builder target packet does not scaffold apps", "App building requires explicit operator approval", "Denied app builder paths remain blocked") `
  -RouteHref "/app-builder-target-packet"

Write-Host "[OK] CodexForge Phase 987 App Builder Target Packet smoke passed."
