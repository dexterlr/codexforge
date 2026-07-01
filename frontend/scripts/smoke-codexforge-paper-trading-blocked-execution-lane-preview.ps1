param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1907 Paper Trading Blocked Execution Lane Preview"
  ScriptFile = "smoke-codexforge-paper-trading-blocked-execution-lane-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-blocked-execution-lane-preview"
  Route = "src\app\paper-trading-blocked-execution-lane-preview"
  CommandLabel = "Go to Paper Trading Blocked Execution Lane Preview"
  RouteHref = "/paper-trading-blocked-execution-lane-preview"
  Markers = @("Paper trading blocked execution lane preview", "Paper trading blocked execution lane preview does not bypass approvals unlock execution mutate policies route orders or enable broker calls from the UI", "Paper trading blocked execution lane preview requires deterministic synthetic blocked-execution explanations only", "Paper trading blocked execution lane preview shows simulated blocked broker connection simulated blocked order placement simulated blocked paper execution simulated blocked live execution simulated blocked approval persistence and backend owner note", "Denied paper trading blocked execution lane paths remain blocked", "Paper trading blocked execution lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

