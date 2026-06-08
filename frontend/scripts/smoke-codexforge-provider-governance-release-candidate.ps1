param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-governance-release-candidate"
$route = "src\app\provider-governance-release-candidate"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 300 Provider Governance Release Candidate" `
  -ScriptFile "smoke-codexforge-provider-governance-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderGovernanceReleaseCandidatePanel" `
  -CommandLabel "Go to Provider Governance Release Candidate" `
  -Modules @("provider-governance-release-candidate-types.ts","provider-governance-release-candidate-summary.ts","index.ts") `
  -Components @("ProviderGovernanceReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildProviderGovernanceReleaseCandidateStableKey","buildProviderGovernanceReleaseCandidate","buildProviderGovernanceReleaseCandidates","buildProviderGovernanceReleaseCandidateBoundary","buildProviderGovernanceReleaseCandidateModel","summarizeProviderGovernanceReleaseCandidate","PROVIDER_GOVERNANCE_RELEASE_CANDIDATE_LANGUAGE") `
  -PlainEnglish @("Provider governance release candidate","Release candidate does not enable providers automatically","Live routing remains approval-gated","Secrets are not inspected or displayed","Release decision","Known gaps","Release candidate identity","Covered provider surfaces","Runbook readiness","Policy bundle readiness","Router dry-run readiness","Live-test readiness","Result persistence readiness","Next recommended route","provider tests require explicit approval","advanced release details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI","no raw polling loops") `
  -ExtraRoutes @("/provider-runbook-finalization","/provider-policy-bundle-export-review","/local-first-router-live-metadata","/provider-test-result-persistence","/comfyui-health-live-bridge")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Provider Governance Release Candidate smoke passed."
