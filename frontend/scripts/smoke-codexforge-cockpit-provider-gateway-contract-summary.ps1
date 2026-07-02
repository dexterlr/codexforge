param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2055 Cockpit Provider Gateway Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-provider-gateway-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-provider-gateway-contract-summary"
  Route = "src\app\cockpit-provider-gateway-contract-summary"
  CommandLabel = "Go to Cockpit Provider Gateway Contract Summary"
  RouteHref = "/cockpit-provider-gateway-contract-summary"
  Markers = @("Cockpit provider gateway contract summary", "Cockpit provider gateway contract summary keeps the cockpit as the normal user surface", "Cockpit provider gateway contract summary does not call providers call models call connectors send prompts store API keys store credentials generate scripts generate images generate videos generate voice generate captions create APIs create services deploy runtimes run commands persist prompts persist requests persist responses persist jobs persist approvals or write files from the cockpit", "Cockpit provider gateway contract summary shows provider selection model routing prompt review credential vault generation request schema generation response schema provider safety review rate limit policy quota policy audit event failure retry frontend provider call blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit provider gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

