param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-runbook-finalization"
$route = "src\app\provider-runbook-finalization"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 298 Provider Runbook Finalization" `
  -ScriptFile "smoke-codexforge-provider-runbook-finalization.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderRunbookFinalizationPanel" `
  -CommandLabel "Go to Provider Runbook Finalization" `
  -Modules @("provider-runbook-finalization-types.ts","provider-runbook-finalization-summary.ts","index.ts") `
  -Components @("ProviderRunbookFinalizationPanel.tsx","index.ts") `
  -Exports @("buildProviderRunbookFinalizationStableKey","buildProviderRunbookFinalization","buildProviderRunbookFinalizations","buildProviderRunbookFinalizationBoundary","buildProviderRunbookFinalizationModel","summarizeProviderRunbookFinalization","PROVIDER_RUNBOOK_FINALIZATION_LANGUAGE") `
  -PlainEnglish @("Provider runbook finalization","Runbooks are reviewed before use","Runbooks never include API keys or secrets","Runbook finalization does not enable provider routing","Operator checklist","Rollback guidance","Runbook identity","Source governance audit","Source policy bundle export review","Approved provider/model summary","Privacy classifications","Budget guardrails","Retry guidance","Blocked reasons","provider tests require explicit approval","advanced runbook details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI","no raw polling loops") `
  -ExtraRoutes @("/provider-governance-mvp-audit","/provider-policy-bundle-export-review","/provider-failure-retry-trial","/provider-budget-guardrails","/router-recommendation-apply-review")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Provider Runbook Finalization smoke passed."
