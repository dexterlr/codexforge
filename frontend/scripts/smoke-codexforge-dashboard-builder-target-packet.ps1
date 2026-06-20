param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 989 Dashboard Builder Target Packet" `
  -ScriptFile "smoke-codexforge-dashboard-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\dashboard-builder-target-packet" `
  -Route "src\app\dashboard-builder-target-packet" `
  -MainPanel "DashboardBuilderTargetPacketPanel" `
  -CommandLabel "Go to Dashboard Builder Target Packet" `
  -Modules @("dashboard-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDashboardBuilderTargetPacketStableKey", "buildDashboardBuilderTargetPacket", "buildDashboardBuilderTargetPacketItems", "buildDashboardBuilderTargetPacketBoundary", "buildDashboardBuilderTargetPacketModel", "summarizeDashboardBuilderTargetPacket", "DASHBOARD_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Dashboard builder target packet", "Dashboard builder target packet does not connect live data", "Dashboard building requires explicit operator approval", "Dashboard packets include data privacy and adapter review", "Denied dashboard builder paths remain blocked", "Dashboard builder target checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dashboard builder target packet does not connect live data", "Dashboard building requires explicit operator approval", "Denied dashboard builder paths remain blocked") `
  -RouteHref "/dashboard-builder-target-packet"

Write-Host "[OK] CodexForge Phase 989 Dashboard Builder Target Packet smoke passed."
