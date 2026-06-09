param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\operator-notification-center-shell"
$route = "src\app\operator-notification-center"

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
  "Operator notification center shell",
  "Notification center does not send notifications yet",
  "Notification delivery requires explicit approval",
  "Private connector research details stay redacted",
  "Notification categories",
  "Reminder boundary route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 341 Operator Notification Center Shell" `
  -ScriptFile "smoke-codexforge-operator-notification-center-shell.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OperatorNotificationCenterShellPanel" `
  -CommandLabel "Go to Operator Notification Center Shell" `
  -Modules @("operator-notification-center-shell-types.ts","operator-notification-center-shell-summary.ts","index.ts") `
  -Components @("OperatorNotificationCenterShellPanel.tsx","index.ts") `
  -Exports @("buildOperatorNotificationCenterShellStableKey","buildOperatorNotificationCenterShell","buildOperatorNotificationCenterShells","buildOperatorNotificationCenterShellBoundary","buildOperatorNotificationCenterShellModel","summarizeOperatorNotificationCenterShell","OPERATOR_NOTIFICATION_CENTER_SHELL_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Notification center identity","Source connector research operator loops","Priority policy","Privacy/redaction policy","Delivery channel non-goals","Scheduled research boundary route","Blocked reasons","advanced notification details collapsed/secondary") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-release-candidate","/research-workspace-release-candidate","/review-inbox","/runbook")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

& (Join-Path $PSScriptRoot "codexforge-connector-loop-notification-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Operator Notification Center Shell smoke passed."
