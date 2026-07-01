param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1885 Safe Next Step Card Preview"
  ScriptFile = "smoke-codexforge-safe-next-step-card-preview.ps1"
  Domain = "src\lib\codexforge\safe-next-step-card-preview"
  Route = "src\app\safe-next-step-card-preview"
  CommandLabel = "Go to Safe Next Step Card Preview"
  RouteHref = "/safe-next-step-card-preview"
  Markers = @("Safe next step card preview", "Safe next step card preview does not recommend buys sell decisions or strategy promotion from the UI", "Safe next step card preview requires deterministic synthetic safe next steps only", "Safe next step card preview shows simulated review evidence simulated inspect blockers simulated request approval simulated read backend prerequisite simulated continue review and no recommendation note", "Denied safe next step card paths remain blocked", "Safe next step card checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
