param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 971 Game Target Intake Packet" `
  -ScriptFile "smoke-codexforge-game-target-intake-packet.ps1" `
  -Domain "src\lib\codexforge\game-target-intake-packet" `
  -Route "src\app\game-target-intake-packet" `
  -MainPanel "GameTargetIntakePacketPanel" `
  -CommandLabel "Go to Game Target Intake Packet" `
  -Modules @("game-target-intake-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameTargetIntakePacketStableKey", "buildGameTargetIntakePacket", "buildGameTargetIntakePacketItems", "buildGameTargetIntakePacketBoundary", "buildGameTargetIntakePacketModel", "summarizeGameTargetIntakePacket", "GAME_TARGET_INTAKE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Game target intake packet", "Game target intake packet does not send prompts", "Game target intake requires explicit operator approval", "Game target packets support any supported game target", "Denied game target intake paths remain blocked", "Game target intake checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game target intake packet does not send prompts", "Game target intake requires explicit operator approval", "Denied game target intake paths remain blocked") `
  -RouteHref "/game-target-intake-packet"

Write-Host "[OK] CodexForge Phase 971 Game Target Intake Packet smoke passed."