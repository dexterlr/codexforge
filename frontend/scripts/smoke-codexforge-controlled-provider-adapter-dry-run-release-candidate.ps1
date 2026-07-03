param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2376 Controlled Provider Adapter Dry Run Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-adapter-dry-run-release-candidate.ps1"
  Domain = "controlled-provider-adapter-dry-run-release-candidate"
  Route = "controlled-provider-adapter-dry-run-release-candidate"
  CommandLabel = "Go to Controlled Provider Adapter Dry Run Release Candidate"
  RouteHref = "/controlled-provider-adapter-dry-run-release-candidate"
  Phase = 2376
  Title = "Controlled Provider Adapter Dry Run Release Candidate"
  Markers = @(
  'Controlled provider adapter dry run release candidate',
  'Controlled provider adapter dry run release candidate does not call providers call models send prompts stream responses store credentials store tokens persist outputs write browser storage upload download render export publish schedule dispatch queues spawn workers run commands create APIs create services import SDKs or call connectors',
  'Controlled provider adapter dry run release candidate adds review-only dry run harness contracts and synthetic fixture diagnostics',
  'Controlled provider adapter dry run release candidate requires backend-owned implementation explicit operator approval and audit trail before live execution',
  'Denied controlled provider adapter dry run paths remain blocked',
  'Controlled provider adapter dry run checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

