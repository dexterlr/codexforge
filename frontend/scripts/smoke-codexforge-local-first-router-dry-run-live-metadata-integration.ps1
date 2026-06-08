param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-first-router-dry-run-live-metadata-integration"
$route = "src\app\local-first-router-live-metadata"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 299 Local-First Router Dry Run Live Metadata Integration" `
  -ScriptFile "smoke-codexforge-local-first-router-dry-run-live-metadata-integration.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalFirstRouterDryRunLiveMetadataIntegrationPanel" `
  -CommandLabel "Go to Local-First Router Live Metadata" `
  -Modules @("local-first-router-dry-run-live-metadata-integration-types.ts","local-first-router-dry-run-live-metadata-integration-summary.ts","index.ts") `
  -Components @("LocalFirstRouterDryRunLiveMetadataIntegrationPanel.tsx","index.ts") `
  -Exports @("buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey","buildLocalFirstRouterDryRunLiveMetadataIntegration","buildLocalFirstRouterDryRunLiveMetadataIntegrations","buildLocalFirstRouterDryRunLiveMetadataIntegrationBoundary","buildLocalFirstRouterDryRunLiveMetadataIntegrationModel","summarizeLocalFirstRouterDryRunLiveMetadataIntegration","LOCAL_FIRST_ROUTER_DRY_RUN_LIVE_METADATA_INTEGRATION_LANGUAGE") `
  -PlainEnglish @("Local-first router dry run live metadata integration","Router metadata does not auto-route live traffic","Router changes require explicit review","No tokens are spent from this page","Local-first routing preference","Dry-run decision summary","Integration identity","Source cost/latency calibration","Source router recommendation review","Source policy bundle export review","Provider/model fallback summary","Privacy/policy constraints","Approval requirement","Blocked reasons","provider tests require explicit approval","advanced routing metadata details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI","no raw polling loops") `
  -ExtraRoutes @("/local-first-router-dry-run","/provider-cost-latency-calibration","/router-recommendation-apply-review","/provider-policy-bundle-export-review","/provider-runbook-finalization")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Local-First Router Dry Run Live Metadata Integration smoke passed."
