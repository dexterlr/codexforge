param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1836 Version Diff Summary Preview"
  ScriptFile = "smoke-codexforge-version-diff-summary-preview.ps1"
  Domain = "src\lib\codexforge\version-diff-summary-preview"
  Route = "src\app\version-diff-summary-preview"
  CommandLabel = "Go to Version Diff Summary Preview"
  RouteHref = "/version-diff-summary-preview"
  Markers = @("Version diff summary preview", "Version diff summary preview does not apply diffs mutate strategy files write files or change trading rules from the UI", "Version diff summary preview requires deterministic synthetic diff summaries only", "Version diff summary preview shows simulated added rule simulated changed parameter simulated removed condition simulated risk impact simulated evidence basis and no frontend mutation", "Denied version diff summary paths remain blocked", "Version diff summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
