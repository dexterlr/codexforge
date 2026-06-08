param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\workflow-package-validator-live-bridge"
$route = "src\app\workflow-validator-live-bridge"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 303 Workflow Package Validator Live Bridge" `
  -ScriptFile "smoke-codexforge-workflow-package-validator-live-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "WorkflowPackageValidatorLiveBridgePanel" `
  -CommandLabel "Go to Workflow Validator Live Bridge" `
  -Modules @("workflow-package-validator-live-bridge-types.ts","workflow-package-validator-live-bridge-summary.ts","index.ts") `
  -Components @("WorkflowPackageValidatorLiveBridgePanel.tsx","index.ts") `
  -Exports @("buildWorkflowPackageValidatorLiveBridgeStableKey","buildWorkflowPackageValidatorLiveBridge","buildWorkflowPackageValidatorLiveBridges","buildWorkflowPackageValidatorLiveBridgeBoundary","buildWorkflowPackageValidatorLiveBridgeModel","summarizeWorkflowPackageValidatorLiveBridge","WORKFLOW_PACKAGE_VALIDATOR_LIVE_BRIDGE_LANGUAGE") `
  -PlainEnglish @("Workflow package validator live bridge","Workflow validation does not mutate files","Validation does not submit ComfyUI jobs","Suspected secrets are redacted","Missing dependency summary","Submit trial route","Validator identity","Source metadata bridge","Workflow package summary","Required node/model summary","Compatibility status","Risk/secrets redaction status","Recovery route","Blocked reasons","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no raw polling loops","provider tests require explicit approval","advanced validation details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/comfyui-metadata-live-bridge","/workflow-package-validator","/approved-comfyui-submit-trial-bridge","/workflow-compatibility-checker","/missing-model-node-resolver")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Workflow Package Validator Live Bridge smoke passed."
