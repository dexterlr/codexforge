param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\comfyui-health-probe-live-bridge"
$route = "src\app\comfyui-health-live-bridge"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 301 ComfyUI Health Probe Live Bridge" `
  -ScriptFile "smoke-codexforge-comfyui-health-probe-live-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ComfyUiHealthProbeLiveBridgePanel" `
  -CommandLabel "Go to ComfyUI Health Live Bridge" `
  -Modules @("comfyui-health-probe-live-bridge-types.ts","comfyui-health-probe-live-bridge-summary.ts","index.ts") `
  -Components @("ComfyUiHealthProbeLiveBridgePanel.tsx","index.ts") `
  -Exports @("buildComfyUiHealthProbeLiveBridgeStableKey","buildComfyUiHealthProbeLiveBridge","buildComfyUiHealthProbeLiveBridges","buildComfyUiHealthProbeLiveBridgeBoundary","buildComfyUiHealthProbeLiveBridgeModel","summarizeComfyUiHealthProbeLiveBridge","COMFY_UI_HEALTH_PROBE_LIVE_BRIDGE_LANGUAGE") `
  -PlainEnglish @("ComfyUI health probe live bridge","ComfyUI health checks require approved local boundary","No ComfyUI job is submitted from this page","Local endpoints and secrets are not exposed","Health probe status","Metadata bridge route","Bridge identity","Local endpoint summary","Approved local boundary dependency","Version/capability summary","Timeout policy","Redaction status","Recovery route","Blocked reasons","no arbitrary local endpoint calls from UI","no raw polling loops","provider tests require explicit approval","advanced health details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/comfyui-real-health","/comfyui-health/gate","/comfyui-metadata-reader","/workflow-package-validator","/provider-governance-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge ComfyUI Health Probe Live Bridge smoke passed."
