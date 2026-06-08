param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-queue-persistence-live-bridge"
$route = "src\app\render-queue-persistence"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 309 Render Queue Persistence Live Bridge" `
  -ScriptFile "smoke-codexforge-render-queue-persistence-live-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderQueuePersistenceLiveBridgePanel" `
  -CommandLabel "Go to Render Queue Persistence" `
  -Modules @("render-queue-persistence-live-bridge-types.ts","render-queue-persistence-live-bridge-summary.ts","index.ts") `
  -Components @("RenderQueuePersistenceLiveBridgePanel.tsx","index.ts") `
  -Exports @("buildRenderQueuePersistenceLiveBridgeStableKey","buildRenderQueuePersistenceLiveBridge","buildRenderQueuePersistenceLiveBridges","buildRenderQueuePersistenceLiveBridgeBoundary","buildRenderQueuePersistenceLiveBridgeModel","summarizeRenderQueuePersistenceLiveBridge","RENDER_QUEUE_PERSISTENCE_LIVE_BRIDGE_LANGUAGE") `
  -PlainEnglish @("Render queue persistence live bridge","Render queue persistence does not start jobs","Retry cancel hold actions require separate approval","Queue records are reviewed before promotion","Render status","Job status polling route","Bridge identity","Source submit trial / generation result dependency","Queue record summary","render status: queued, running, passed, failed, blocked, cancelled, needs review","Persistence status","Retention policy","Recovery route","Blocked reasons","no render job start/cancel/hold/retry behavior","no raw polling loops","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no local file/process mutation","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no API keys or secrets displayed","provider tests require explicit approval","advanced queue details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/approved-comfyui-submit-trial-bridge","/local-video-draft-result","/render-job-status","/render-queue-recovery","/video-review")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Render Queue Persistence Live Bridge smoke passed."
