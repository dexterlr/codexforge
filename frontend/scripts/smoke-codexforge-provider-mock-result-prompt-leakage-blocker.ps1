param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2400 Provider Mock Result Prompt Leakage Blocker"
  ScriptFile = "smoke-codexforge-provider-mock-result-prompt-leakage-blocker.ps1"
  Domain = "provider-mock-result-prompt-leakage-blocker"
  Route = "provider-mock-result-prompt-leakage-blocker"
  CommandLabel = "Go to Provider Mock Result Prompt Leakage Blocker"
  RouteHref = "/provider-mock-result-prompt-leakage-blocker"
  Phase = 2400
  Title = "Provider Mock Result Prompt Leakage Blocker"
  Markers = @(
  'Provider mock result prompt leakage blocker',
  'Provider mock result prompt leakage blocker verifies no prompt text appears in mock result fixtures in a way that represents transmitted provider payloads',
  'Provider mock result prompt leakage blocker keeps prompts synthetic review-only and local-state only',
  'Provider mock result prompt leakage blocker blocks hidden send affordances',
  'Denied provider mock result prompt leakage paths remain blocked',
  'Provider mock result prompt leakage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
