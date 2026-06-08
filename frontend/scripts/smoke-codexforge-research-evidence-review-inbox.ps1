param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-evidence-review-inbox"
$route = "src\app\research-evidence-inbox"

$sharedResearchSafetyMarkers = @(
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no automatic provider send",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no evidence auto-ingestion",
  "no auto-cite",
  "no auto-promote",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no provider API calls",
  "no web or provider request sent",
  "no API keys or secrets displayed",
  "no localStorage API key storage",
  "no process.env printing",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension install behavior",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no browser-stored signing secrets",
  "no session token localStorage storage",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no artifact deletion",
  "no process kill/restart/shutdown from UI",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring",
  "no Ruflo/Odysseus runtime integration",
  "no Ruflo/Odysseus dependency references",
  "future adoption requires license/security review"
)

$phaseMarkers = @(
  "Research evidence review inbox",
  "Evidence is reviewed before use",
  "Memory promotion requires explicit review",
  "Stale or conflicting sources stay flagged",
  "Citation readiness",
  "Promotion policy"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 325 Research Evidence Review Inbox" `
  -ScriptFile "smoke-codexforge-research-evidence-review-inbox.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchEvidenceReviewInboxPanel" `
  -CommandLabel "Go to Research Evidence Review Inbox" `
  -Modules @("research-evidence-review-inbox-types.ts","research-evidence-review-inbox-summary.ts","index.ts") `
  -Components @("ResearchEvidenceReviewInboxPanel.tsx","index.ts") `
  -Exports @("buildResearchEvidenceReviewInboxStableKey","buildResearchEvidenceReviewPacket","buildResearchEvidenceReviewPackets","buildResearchEvidenceReviewBoundary","buildResearchEvidenceReviewInboxModel","summarizeResearchEvidenceReviewInbox","RESEARCH_EVIDENCE_REVIEW_INBOX_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Evidence inbox identity","Source collector trial","Evidence packet summary","Source quality status","Conflict/staleness signal","Redaction/privacy status","Next recommended route","Blocked reasons","advanced evidence details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-workspace","/research-source-collector-trial","/memory","/review-inbox")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Evidence Review Inbox smoke passed."
