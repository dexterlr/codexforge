param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 908 OpenAI-Compatible Provider Test Packet" `
  -ScriptFile "smoke-codexforge-openai-compatible-provider-test-packet.ps1" `
  -Domain "src\lib\codexforge\openai-compatible-provider-test-packet" `
  -Route "src\app\openai-compatible-provider-test-packet" `
  -MainPanel "OpenAICompatibleProviderTestPacketPanel" `
  -CommandLabel "Go to OpenAI-Compatible Provider Test Packet" `
  -Modules @("openai-compatible-provider-test-packet-model.ts", "index.ts") `
  -Components @("OpenAICompatibleProviderTestPacketPanel.tsx", "index.ts") `
  -Exports @("buildOpenAICompatibleProviderTestPacketStableKey", "buildOpenAICompatibleProviderTestPacket", "buildOpenAICompatibleProviderTestPacketItems", "buildOpenAICompatibleProviderTestPacketBoundary", "buildOpenAICompatibleProviderTestPacketModel", "summarizeOpenAICompatibleProviderTestPacket", "OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("OpenAI-compatible provider test packet", "OpenAI-compatible provider test packet does not call APIs", "OpenAI-compatible provider tests require explicit operator approval", "OpenAI-compatible providers use shared CodexForge memory and knowledge", "Denied OpenAI-compatible provider test paths remain blocked", "OpenAI-compatible provider test checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "OpenAI-compatible provider test packet does not call APIs", "OpenAI-compatible provider tests require explicit operator approval", "Denied OpenAI-compatible provider test paths remain blocked") `
  -RouteHref "/openai-compatible-provider-test-packet"

Write-Host "[OK] CodexForge Phase 908 OpenAI-compatible provider test packet smoke passed."
