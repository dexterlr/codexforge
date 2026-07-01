param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1839 Version Mandate Status Preview"
  ScriptFile = "smoke-codexforge-version-mandate-status-preview.ps1"
  Domain = "src\lib\codexforge\version-mandate-status-preview"
  Route = "src\app\version-mandate-status-preview"
  CommandLabel = "Go to Version Mandate Status Preview"
  RouteHref = "/version-mandate-status-preview"
  Markers = @("Version mandate status preview", "Version mandate status preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI", "Version mandate status preview requires backend-owned mandate review workflow", "Version mandate status preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation", "Denied version mandate status paths remain blocked", "Version mandate status checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
