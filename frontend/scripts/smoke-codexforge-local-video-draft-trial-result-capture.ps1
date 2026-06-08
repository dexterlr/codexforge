param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-video-draft-trial-result-capture"
$route = "src\app\local-video-draft-result"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 307 Local Video Draft Trial Result Capture" `
  -ScriptFile "smoke-codexforge-local-video-draft-trial-result-capture.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalVideoDraftTrialResultCapturePanel" `
  -CommandLabel "Go to Local Video Draft Result" `
  -Modules @("local-video-draft-trial-result-capture-types.ts","local-video-draft-trial-result-capture-summary.ts","index.ts") `
  -Components @("LocalVideoDraftTrialResultCapturePanel.tsx","index.ts") `
  -Exports @("buildLocalVideoDraftTrialResultCaptureStableKey","buildLocalVideoDraftTrialResultCapture","buildLocalVideoDraftTrialResultCaptures","buildLocalVideoDraftTrialResultCaptureBoundary","buildLocalVideoDraftTrialResultCaptureModel","summarizeLocalVideoDraftTrialResultCapture","LOCAL_VIDEO_DRAFT_TRIAL_RESULT_CAPTURE_LANGUAGE") `
  -PlainEnglish @("Local video draft trial result capture","Video draft results are reviewed before promotion","Raw prompt and workflow details stay secondary","Playback review does not auto-open arbitrary files","Draft video artifact summary","Playback review route","Result identity","Source keyframe/image result dependency","generation status: passed, failed, blocked, timed out, needs review","Prompt/workflow summary","Safety/redaction status","Review inbox handoff","Recovery route","Blocked reasons","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no raw polling loops","no render job start/cancel/hold/retry behavior","provider tests require explicit approval","advanced result details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/local-keyframe-generation-result","/local-output-artifact-capture","/draft-playback-review","/video-review","/video-recovery")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Local Video Draft Trial Result Capture smoke passed."
