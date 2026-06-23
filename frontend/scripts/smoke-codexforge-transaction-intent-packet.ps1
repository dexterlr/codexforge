param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1483 Transaction Intent Packet" `
  -ScriptFile "smoke-codexforge-transaction-intent-packet.ps1" `
  -Domain "src\lib\codexforge\transaction-intent-packet" `
  -Route "src\app\transaction-intent-packet" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Intent Packet" `
  -RouteHref "/transaction-intent-packet" `
  -Markers @("Transaction intent packet", "Transaction intent packet does not execute intent", "Transaction intent packet requires explicit operator approval", "Transaction intent packet previews goal context work proposal approval queue item scope and done criteria", "Denied transaction intent paths remain blocked", "Transaction intent checklist")
