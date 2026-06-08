param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-citation-draft-review"
$route = "src\app\research-citation-draft-review"

$sharedResearchSafetyMarkers = @(
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no automatic provider send",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no provider retries automatically",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no evidence auto-ingestion",
  "no auto-cite",
  "no auto-citation finalization",
  "no automatic report export",
  "no file export/write behavior",
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
  "Research citation draft review",
  "Citations are drafts until approved",
  "Missing metadata remains flagged",
  "No citation is exported automatically",
  "Attribution readiness",
  "Citation format note"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 327 Research Citation Draft Review" `
  -ScriptFile "smoke-codexforge-research-citation-draft-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchCitationDraftReviewPanel" `
  -CommandLabel "Go to Research Citation Draft Review" `
  -Modules @("research-citation-draft-review-types.ts","research-citation-draft-review-summary.ts","index.ts") `
  -Components @("ResearchCitationDraftReviewPanel.tsx","index.ts") `
  -Exports @("buildResearchCitationDraftReviewStableKey","buildResearchCitationDraft","buildResearchCitationDrafts","buildResearchCitationDraftReviewBoundary","buildResearchCitationDraftReviewModel","summarizeResearchCitationDraftReview","RESEARCH_CITATION_DRAFT_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Citation review identity","Source claim builder","Source evidence inbox","Draft citation summary","Missing metadata flags","Source quality flags","Summary draft route","Blocked reasons","advanced citation details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-claim-builder","/research-evidence-inbox","/research-summary-draft-builder","/research-report-export-review")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Citation Draft Review smoke passed."
