param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2042 Provider Gateway Contract Boundary"
  ScriptFile = "smoke-codexforge-provider-gateway-contract-boundary.ps1"
  Domain = "src\lib\codexforge\provider-gateway-contract-boundary"
  Route = "src\app\provider-gateway-contract-boundary"
  CommandLabel = "Go to Provider Gateway Contract Boundary"
  RouteHref = "/provider-gateway-contract-boundary"
  Markers = @("Provider gateway contract boundary", "Provider gateway contract boundary does not call providers call models call connectors send prompts store API keys store credentials generate scripts generate images generate videos generate voice generate captions create APIs create services deploy runtimes run commands persist prompts persist requests persist responses persist jobs persist approvals or write files from the UI", "Provider gateway contract boundary requires explicit operator approval", "Provider gateway contract boundary prepares deterministic synthetic provider gateway contract review without frontend provider calls model calls prompt sending credential storage generation API creation service deployment or persistence", "Denied provider gateway contract paths remain blocked", "Provider gateway contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

