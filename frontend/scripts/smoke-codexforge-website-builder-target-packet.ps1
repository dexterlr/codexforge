param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 988 Website Builder Target Packet" `
  -ScriptFile "smoke-codexforge-website-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\website-builder-target-packet" `
  -Route "src\app\website-builder-target-packet" `
  -MainPanel "WebsiteBuilderTargetPacketPanel" `
  -CommandLabel "Go to Website Builder Target Packet" `
  -Modules @("website-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildWebsiteBuilderTargetPacketStableKey", "buildWebsiteBuilderTargetPacket", "buildWebsiteBuilderTargetPacketItems", "buildWebsiteBuilderTargetPacketBoundary", "buildWebsiteBuilderTargetPacketModel", "summarizeWebsiteBuilderTargetPacket", "WEBSITE_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Website builder target packet", "Website builder target packet does not publish websites", "Website building requires explicit operator approval", "Website packets include model routing and backend adapter review", "Denied website builder paths remain blocked", "Website builder target checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Website builder target packet does not publish websites", "Website building requires explicit operator approval", "Denied website builder paths remain blocked") `
  -RouteHref "/website-builder-target-packet"

Write-Host "[OK] CodexForge Phase 988 Website Builder Target Packet smoke passed."
