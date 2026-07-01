param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1857 Promotion Blocker Queue Preview"
  ScriptFile = "smoke-codexforge-promotion-blocker-queue-preview.ps1"
  Domain = "src\lib\codexforge\promotion-blocker-queue-preview"
  Route = "src\app\promotion-blocker-queue-preview"
  CommandLabel = "Go to Promotion Blocker Queue Preview"
  RouteHref = "/promotion-blocker-queue-preview"
  Markers = @("Promotion blocker queue preview", "Promotion blocker queue preview does not retry execution mutate strategy state persist queue state or write audit state from the UI", "Promotion blocker queue preview requires deterministic synthetic blocker rows only", "Promotion blocker queue preview shows simulated evidence blocker simulated risk blocker simulated mandate blocker simulated version blocker simulated approval blocker and operator review note", "Denied promotion blocker queue paths remain blocked", "Promotion blocker queue checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
