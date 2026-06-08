param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\extension-registry-release-candidate"
$route = "src\app\extension-registry-release-candidate"

$sharedExtensionSafetyMarkers = @(
  "no automatic provider calls",
  "no provider API calls",
  "no automatic provider send",
  "no prompt/file sending without approval",
  "no auto-spend tokens",
  "no auto-route live provider traffic",
  "no API key export",
  "no secret export",
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension install behavior",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no memory/RAG ingestion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no Ruflo/Odysseus vendoring",
  "no Ruflo/Odysseus runtime integration",
  "no Ruflo/Odysseus dependency references",
  "future adoption requires license/security review",
  "no ComfyUI job submission",
  "no ComfyUI request sent from UI",
  "no arbitrary local endpoint calls from UI",
  "no uncontrolled polling loops",
  "no render job start/cancel/hold/retry behavior",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no session token localStorage storage",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no artifact deletion",
  "no memory auto-promotion",
  "no process kill/restart/shutdown from UI",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "plain English",
  "no duplicate route chip cloud",
  "hero title does not vertically wrap",
  "no giant raw JSON above fold",
  "advanced details collapsed/secondary",
  "no unsafe execution buttons",
  "no real video generation",
  "no image generation",
  "no upscale execution",
  "no frame interpolation execution",
  "no ComfyUI workflow run",
  "no job queue execution",
  "no hardware/system command",
  "no prompt payload sent to providers",
  "no cloud provider API calls",
  "no password storage",
  "no API key localStorage",
  "no raw secret display",
  "no process.env value printed in UI",
  "no hardcoded API keys",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text",
  "no Math.random",
  "no Date.now for deterministic layout/ids",
  "no d3-force",
  "no mojibake",
  "no obvious duplicate React key patterns"
)

$phaseMarkers = @(
  "Extension registry release candidate",
  "Registry release candidate remains review-only",
  "Extensions are not installed or enabled automatically",
  "Runtime execution remains behind approved boundaries",
  "Release decision",
  "Known gaps"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 321 Extension Registry Release Candidate" `
  -ScriptFile "smoke-codexforge-extension-registry-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ExtensionRegistryReleaseCandidatePanel" `
  -CommandLabel "Go to Extension Registry Release Candidate" `
  -Modules @("extension-registry-release-candidate-types.ts","extension-registry-release-candidate-summary.ts","index.ts") `
  -Components @("ExtensionRegistryReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildExtensionRegistryReleaseCandidateStableKey","buildExtensionRegistryReleaseCandidate","buildExtensionRegistryReleaseCandidates","buildExtensionRegistryReleaseCandidateBoundary","buildExtensionRegistryReleaseCandidateModel","summarizeExtensionRegistryReleaseCandidate","EXTENSION_REGISTRY_RELEASE_CANDIDATE_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Release candidate identity","Covered extension surfaces","Manifest schema readiness","Permission policy readiness","Sandbox boundary readiness","Audit/recovery readiness","License/security review readiness","Next recommended route","Ready","Ready with fixes","Blocked","advanced release details collapsed/secondary") + $sharedExtensionSafetyMarkers) `
  -ExtraRoutes @("/extension-manifest-schema-review","/extension-permission-policy-builder","/extension-sandbox-boundary-review","/extension-architecture-decision","/provider-governance-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-extension-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Extension Registry Release Candidate smoke passed."
