param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1174 File Write Operator Review Packet" `
  -ScriptFile "smoke-codexforge-file-write-operator-review-packet.ps1" `
  -Domain "src\lib\codexforge\file-write-operator-review-packet" `
  -Route "src\app\file-write-operator-review-packet" `
  -MainPanel "FileWriteOperatorReviewPacketPanel" `
  -CommandLabel "Go to File Write Operator Review Packet" `
  -Modules @("file-write-operator-review-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteOperatorReviewPacketStableKey", "buildFileWriteOperatorReviewPacket", "buildFileWriteOperatorReviewPacketItems", "buildFileWriteOperatorReviewPacketBoundary", "buildFileWriteOperatorReviewPacketModel", "summarizeFileWriteOperatorReviewPacket", "FILE_WRITE_OPERATOR_REVIEW_PACKET_LANGUAGE") `
  -PhaseMarkers @("File-write operator review packet", "File-write operator review packet does not approve writes", "File-write operator review requires explicit human approval", "Operator review packet combines path guard diff approval evidence result and rollback gates", "Denied file-write operator review paths remain blocked", "File-write operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write operator review packet does not approve writes", "File-write operator review requires explicit human approval", "Denied file-write operator review paths remain blocked") `
  -RouteHref "/file-write-operator-review-packet"

Write-Host "[OK] CodexForge Phase 1174 File Write Operator Review Packet smoke passed."
