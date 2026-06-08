param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\extension-manifest-schema-review"
$route = "src\app\extension-manifest-schema-review"

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
  "Extension manifest schema review",
  "Schema review does not install or run extensions",
  "Third-party code is not vendored or copied",
  "Future extension adoption requires license security review",
  "Future extension adoption requires license/security review",
  "Capability declarations",
  "Permission policy route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 318 Extension Manifest Schema Review" `
  -ScriptFile "smoke-codexforge-extension-manifest-schema-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ExtensionManifestSchemaReviewPanel" `
  -CommandLabel "Go to Extension Manifest Schema Review" `
  -Modules @("extension-manifest-schema-review-types.ts","extension-manifest-schema-review-summary.ts","index.ts") `
  -Components @("ExtensionManifestSchemaReviewPanel.tsx","index.ts") `
  -Exports @("buildExtensionManifestSchemaReviewStableKey","buildExtensionManifestSchemaReview","buildExtensionManifestSchemaReviews","buildExtensionManifestSchemaReviewBoundary","buildExtensionManifestSchemaReviewModel","summarizeExtensionManifestSchemaReview","EXTENSION_MANIFEST_SCHEMA_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Schema review identity","Source extension architecture decision","Manifest identity fields","Permission declarations","Data access declarations","Version/compatibility policy","Denied manifest fields","Blocked reasons","advanced manifest details collapsed/secondary") + $sharedExtensionSafetyMarkers) `
  -ExtraRoutes @("/extension-architecture-decision","/extension-permission-policy-builder","/agent-plugin-registry-comparison","/mcp-tool-boundary-comparison","/agent-memory-rag-pattern-review")

& (Join-Path $PSScriptRoot "codexforge-extension-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Extension Manifest Schema Review smoke passed."
