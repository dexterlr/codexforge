param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-privacy-redaction-review"
$route = "src\app\connector-privacy-redaction-review"

$sharedConnectorSafetyMarkers = @(
  "no OAuth request flow",
  "no connector authorization behavior",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data reads",
  "no automatic email reads",
  "no automatic calendar reads",
  "no automatic contact reads",
  "no email draft/send behavior",
  "no calendar event create/update/delete behavior",
  "no contact create/update/delete behavior",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source/connector data sending without approval",
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no source auto-fetching",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring"
)

$phaseMarkers = @(
  "Connector privacy redaction review",
  "Redaction happens before connector evidence leaves review",
  "Private connector values are not displayed",
  "Secrets and tokens are excluded",
  "Allowed evidence fields",
  "Excluded evidence fields"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 339 Connector Privacy Redaction Review" `
  -ScriptFile "smoke-codexforge-connector-privacy-redaction-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorPrivacyRedactionReviewPanel" `
  -CommandLabel "Go to Connector Privacy Redaction Review" `
  -Modules @("connector-privacy-redaction-review-types.ts","connector-privacy-redaction-review-summary.ts","index.ts") `
  -Components @("ConnectorPrivacyRedactionReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorPrivacyRedactionReviewStableKey","buildConnectorPrivacyRedactionReview","buildConnectorPrivacyRedactionReviews","buildConnectorPrivacyRedactionReviewBoundary","buildConnectorPrivacyRedactionReviewModel","summarizeConnectorPrivacyRedactionReview","CONNECTOR_PRIVACY_REDACTION_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Redaction review identity","Source connector evidence capture","Detected private fields","Redaction policy","Minimization policy","Review handoff route","Blocked reasons","advanced redaction details collapsed/secondary") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-evidence-capture-review","/connector-workspace","/prompt-privacy-classifier","/connector-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

& (Join-Path $PSScriptRoot "codexforge-connector-loop-notification-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Connector Privacy Redaction Review smoke passed."
