param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-output-artifact-capture-live-bridge"
$route = "src\app\local-output-artifact-capture"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 308 Local Output Artifact Capture Live Bridge" `
  -ScriptFile "smoke-codexforge-local-output-artifact-capture-live-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalOutputArtifactCaptureLiveBridgePanel" `
  -CommandLabel "Go to Local Output Artifact Capture" `
  -Modules @("local-output-artifact-capture-live-bridge-types.ts","local-output-artifact-capture-live-bridge-summary.ts","index.ts") `
  -Components @("LocalOutputArtifactCaptureLiveBridgePanel.tsx","index.ts") `
  -Exports @("buildLocalOutputArtifactCaptureLiveBridgeStableKey","buildLocalOutputArtifactCaptureLiveBridge","buildLocalOutputArtifactCaptureLiveBridges","buildLocalOutputArtifactCaptureLiveBridgeBoundary","buildLocalOutputArtifactCaptureLiveBridgeModel","summarizeLocalOutputArtifactCaptureLiveBridge","LOCAL_OUTPUT_ARTIFACT_CAPTURE_LIVE_BRIDGE_LANGUAGE") `
  -PlainEnglish @("Local output artifact capture live bridge","Artifact capture uses approved output roots only","Arbitrary local browsing is not allowed","Capture does not mutate or delete artifacts","Captured artifact summary","Export package route","Bridge identity","Source generation result","Approved output root dependency","Artifact type summary","Excluded paths summary","Redaction/safety status","Thumbnail route","Blocked reasons","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no API keys or secrets displayed","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no raw polling loops","no render job start/cancel/hold/retry behavior","provider tests require explicit approval","advanced artifact details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no secret value display","no automatic provider send","no provider APIs are called","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no auto-apply router recommendations","no silent provider registry mutation","no provider retry from UI","no API key export","no secret export","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no ComfyUI workflow run","no ComfyUI queue submit","no arbitrary queue submit from UI") `
  -ExtraRoutes @("/local-image-generation-result","/local-keyframe-generation-result","/local-video-draft-result","/artifact-thumbnails","/export-package-builder")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

Write-Host "[OK] CodexForge Local Output Artifact Capture Live Bridge smoke passed."
