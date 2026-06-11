param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\automation-permission-readiness-audit"
$route = "src\app\automation-permission-readiness-audit"
$newRoutes = @(
  "/local-bridge-readiness-audit",
  "/provider-routing-readiness-audit",
  "/connector-permission-readiness-audit",
  "/automation-permission-readiness-audit"
)

$phaseMarkers = @(
  "Automation permission readiness audit",
  "Automation permission audit does not create schedules or tasks",
  "Automations require explicit approval",
  "Blocked automations stay blocked",
  "Automation groups",
  "Schedule watch task permission preview"
)

$readinessSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no approval automation",
  "no approval is granted",
  "no permission grant persistence",
  "no local bridge endpoint calls",
  "no local service calls",
  "no local tool launching",
  "no local probes",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no connector API calls",
  "no connector account connection",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no watch creation",
  "no background job creation",
  "no notification sending",
  "no provider key storage",
  "no connector token storage",
  "no token storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/automation data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "advanced automation details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 405 Automation Permission Readiness Audit" `
  -ScriptFile "smoke-codexforge-automation-permission-readiness-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "AutomationPermissionReadinessAuditPanel" `
  -CommandLabel "Go to Automation Permission Readiness Audit" `
  -Modules @("automation-permission-readiness-audit-types.ts","automation-permission-readiness-audit-summary.ts","index.ts") `
  -Components @("AutomationPermissionReadinessAuditPanel.tsx","index.ts") `
  -Exports @("buildAutomationPermissionReadinessAuditStableKey","buildAutomationPermissionReadinessAudit","buildAutomationPermissionReadinessAudits","buildAutomationPermissionReadinessAuditBoundary","buildAutomationPermissionReadinessAuditModel","summarizeAutomationPermissionReadinessAudit","AUTOMATION_PERMISSION_READINESS_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("automation permission identity","denied automation actions","notification/redaction rules","manual validation checklist","blocked automation risks","local bridge route","provider routing route","next recommended action") + $readinessSafetyMarkers) `
  -ExtraRoutes @("/local-bridge-readiness-audit","/provider-routing-readiness-audit","/automation-release-candidate","/task-reminder-boundary")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "automationCreationAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|watchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|createAutomation\s*\(|createSchedule\s*\(|createReminder\s*\(|scheduleTask\s*\(|createWatch\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(" "no automation schedule reminder task watch background job or notification creation"
Assert-NotMatches $source "connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorTokenStorageAllowedFromUi:\s*true|connectAccount\s*\(|connectGmail\s*\(|callConnectorApi\s*\(|storeConnectorToken\s*\(" "no connector API calls account connection or connector token storage"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|providerTrafficAllowedFromUi:\s*true|testProviderConnection\s*\(|callProviderApi\s*\(|sendProviderTraffic\s*\(" "no provider API calls provider live connection tests or provider traffic"
Assert-NotMatches $source "localBridgeEndpointCallsAllowedFromUi:\s*true|localServiceCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|callLocalBridge\s*\(|callLocalService\s*\(|launchLocalTool\s*\(|runHealthProbe\s*\(" "no local bridge endpoint calls local service calls local tool launching or probes"
Assert-NotMatches $source "permissionGrantPersistenceAllowedFromUi:\s*true|persistPermissionGrant\s*\(|localStorage\.setItem|sessionStorage\.setItem|storeToken\s*\(|storeApiKey\s*\(" "no permission grant persistence or browser credential storage"
Assert-NotMatches $source "sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendAutomationData\s*\(" "no prompt file project connector provider or automation data sending"
Assert-NotMatches $source "runWorkflow\s*\(|executeWorkflow\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|writeFile\s*\(|exportFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\(" "no workflow test build smoke file mutation export deletion or patch apply behavior"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Automation Permission Readiness Audit smoke passed."
