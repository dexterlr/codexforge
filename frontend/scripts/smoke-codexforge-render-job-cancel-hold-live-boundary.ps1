param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-job-cancel-hold-live-boundary"
$route = "src\app\render-job-cancel-hold-boundary"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 311 Render Job Cancel Hold Live Boundary" `
  -ScriptFile "smoke-codexforge-render-job-cancel-hold-live-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderJobCancelHoldLiveBoundaryPanel" `
  -CommandLabel "Go to Render Job Cancel Hold Boundary" `
  -Modules @("render-job-cancel-hold-live-boundary-types.ts","render-job-cancel-hold-live-boundary-summary.ts","index.ts") `
  -Components @("RenderJobCancelHoldLiveBoundaryPanel.tsx","index.ts") `
  -Exports @("buildRenderJobCancelHoldLiveBoundaryStableKey","buildRenderJobCancelHoldLiveBoundary","buildRenderJobCancelHoldLiveBoundaries","buildRenderJobCancelHoldLiveBoundaryPolicy","buildRenderJobCancelHoldLiveBoundaryModel","summarizeRenderJobCancelHoldLiveBoundary","RENDER_JOB_CANCEL_HOLD_LIVE_BOUNDARY_LANGUAGE") `
  -PlainEnglish @("Render job cancel hold live boundary","Cancel and hold actions require explicit approval","No render job is cancelled or held from this page","Retry resume actions require separate review","Required confirmation copy","Audit handoff","Boundary identity","Source render status polling dependency","Active job summary","Cancel eligibility","Hold eligibility","Denied action scope","Recovery route","Blocked reasons","no automatic provider calls","no provider API calls","no automatic provider send","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no API key export","no secret export","no localStorage API key storage","no process.env printing","no API keys or secrets displayed","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no uncontrolled polling loops","no raw polling loops","no render job start/cancel/hold/retry behavior","no command execution","no shell command execution","no git command execution from UI","no test execution from UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","provider tests require explicit approval","advanced boundary details collapsed/secondary","server-only path boundary markers remain intact","no real video generation","no image generation","no upscale execution","no frame interpolation execution","no ComfyUI workflow run","no job queue execution","no hardware/system command","no prompt payload sent to providers","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no hardcoded API keys","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now for deterministic layout/ids","no d3-force","no mojibake","no obvious duplicate React key patterns") `
  -ExtraRoutes @("/render-job-status-polling","/render-queue-persistence","/render-queue-recovery","/local-output-artifact-capture","/video-review")

& (Join-Path $PSScriptRoot "codexforge-provider-governance-bridge-safety-smoke-helper.ps1") -Domain $domain -Route $route

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "").Replace("no Date.now for deterministic layout/ids", "")
$blockedPatterns = @{
  "no render job start/cancel/hold/retry behavior" = "renderJobSubmissionAllowedFromPage:\s*true|renderJobMutationAllowedFromUi:\s*true|cancelAllowedFromPage:\s*true|holdAllowedFromPage:\s*true|retryAllowedFromPage:\s*true|resumeAllowedFromPage:\s*true|startRenderJob\s*\(|submitRenderJob\s*\(|cancelRenderJob\s*\(|holdRenderJob\s*\(|retryRenderJob\s*\(|resumeRenderJob\s*\("
  "no uncontrolled polling loops" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no local process mutation" = "localProcessMutationAllowedFromUi:\s*true|processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Render Job Cancel Hold Live Boundary smoke passed."
