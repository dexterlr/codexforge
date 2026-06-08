param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\approved-comfyui-submit-trial-bridge"
$route = "src\app\approved-comfyui-submit-trial-bridge"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 304 Approved ComfyUI Submit Trial Bridge" `
  -ScriptFile "smoke-codexforge-approved-comfyui-submit-trial-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ApprovedComfyUiSubmitTrialBridgePanel" `
  -CommandLabel "Go to Approved ComfyUI Submit Trial Bridge" `
  -Modules @("approved-comfyui-submit-trial-bridge-types.ts","approved-comfyui-submit-trial-bridge-summary.ts","index.ts") `
  -Components @("ApprovedComfyUiSubmitTrialBridgePanel.tsx","index.ts") `
  -Exports @("buildApprovedComfyUiSubmitTrialBridgeStableKey","buildApprovedComfyUiSubmitTrialBridge","buildApprovedComfyUiSubmitTrialBridges","buildApprovedComfyUiSubmitTrialBridgeBoundary","buildApprovedComfyUiSubmitTrialBridgeModel","summarizeApprovedComfyUiSubmitTrialBridge","APPROVED_COMFY_UI_SUBMIT_TRIAL_BRIDGE_LANGUAGE") `
  -PlainEnglish @("Approved ComfyUI submit trial bridge","ComfyUI submit trials require explicit approval","No ComfyUI request is sent from this page","Local endpoint secrets are never displayed","Allowed submit scope","Required confirmation copy","Submit trial identity","Health probe dependency","Metadata dependency","Workflow validator dependency","Approved local boundary dependency","Prompt/workflow summary","Denied submit scope","Timeout/cancel policy","Blocked reasons","no arbitrary local endpoint calls from UI","no raw polling loops","provider tests require explicit approval","advanced submit details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/comfyui-health-live-bridge","/comfyui-metadata-live-bridge","/workflow-validator-live-bridge","/comfyui-submit-trial","/local-image-generation-result")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Approved ComfyUI Submit Trial Bridge smoke passed."
