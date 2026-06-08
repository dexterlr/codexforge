param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-job-status-polling-live-bridge"
$route = "src\app\render-job-status-polling"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 310 Render Job Status Polling Live Bridge" `
  -ScriptFile "smoke-codexforge-render-job-status-polling-live-bridge.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderJobStatusPollingLiveBridgePanel" `
  -CommandLabel "Go to Render Job Status Polling" `
  -Modules @("render-job-status-polling-live-bridge-types.ts","render-job-status-polling-live-bridge-summary.ts","index.ts") `
  -Components @("RenderJobStatusPollingLiveBridgePanel.tsx","index.ts") `
  -Exports @("buildRenderJobStatusPollingLiveBridgeStableKey","buildRenderJobStatusPollingLiveBridge","buildRenderJobStatusPollingLiveBridges","buildRenderJobStatusPollingLiveBridgeBoundary","buildRenderJobStatusPollingLiveBridgeModel","summarizeRenderJobStatusPollingLiveBridge","RENDER_JOB_STATUS_POLLING_LIVE_BRIDGE_LANGUAGE") `
  -PlainEnglish @("Render job status polling live bridge","Status polling requires approved local boundary","Polling does not start cancel hold or retry jobs","Uncontrolled polling loops are not created from this page","Artifact readiness summary","Cancel hold boundary route","Bridge identity","Source render queue persistence dependency","Approved local boundary dependency","Job identity summary","Polling policy","Timeout policy","Render status summary","Blocked reasons","no automatic provider calls","no provider API calls","no automatic provider send","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no API key export","no secret export","no localStorage API key storage","no process.env printing","no API keys or secrets displayed","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no uncontrolled polling loops","no raw polling loops","no render job start/cancel/hold/retry behavior","no command execution","no shell command execution","no git command execution from UI","no test execution from UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","provider tests require explicit approval","advanced status details collapsed/secondary","server-only path boundary markers remain intact","no real video generation","no image generation","no upscale execution","no frame interpolation execution","no ComfyUI workflow run","no job queue execution","no hardware/system command","no prompt payload sent to providers","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no hardcoded API keys","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now for deterministic layout/ids","no d3-force","no mojibake","no obvious duplicate React key patterns") `
  -ExtraRoutes @("/render-queue-persistence","/render-job-cancel-hold-boundary","/local-bridge-health","/local-output-artifact-capture","/render-queue-recovery")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "").Replace("no Date.now for deterministic layout/ids", "")
$blockedPatterns = @{
  "no uncontrolled polling loops" = "uncontrolledPollingLoopsCreatedFromPage:\s*true|setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no render job start/cancel/hold/retry behavior" = "renderJobSubmissionAllowedFromPage:\s*true|pollingStartsJobs:\s*true|pollingCancelsJobs:\s*true|pollingHoldsJobs:\s*true|pollingRetriesJobs:\s*true|startRenderJob\s*\(|submitRenderJob\s*\(|cancelRenderJob\s*\(|holdRenderJob\s*\(|retryRenderJob\s*\("
  "no ComfyUI request sent from UI" = "comfyUiRequestSentFromPageAllowed:\s*true|submitComfyUiJob\s*\(|queue_prompt|ComfyUIQueueSubmit\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\(|localEndpointFetch\s*\(|fetch\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Render Job Status Polling Live Bridge smoke passed."
