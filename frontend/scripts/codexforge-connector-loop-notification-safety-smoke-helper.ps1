param(
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers
)

$ErrorActionPreference = "Stop"

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($needle in $PhaseMarkers) {
  Assert-Contains $source $needle "phase marker $needle"
}

$requiredSafetyMarkers = @(
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source/connector data sending without approval",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no MCP runtime",
  "no command execution",
  "no shell command execution",
  "no arbitrary local file browsing",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no package install behavior"
)

foreach ($needle in $requiredSafetyMarkers) {
  Assert-Contains $source $needle "connector loop safety marker $needle"
}

$blockedPatterns = @{
  "no private connector values displayed" = "privateConnectorValuesDisplayedAllowed:\s*true|secretsAndTokensIncludedAllowed:\s*true|tokensDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no notifications sent" = "notificationSendAllowedFromUi:\s*true|notificationDeliveryAllowedFromUi:\s*true|sendNotification\s*\(|deliverNotification\s*\(|new\s+Notification\s*\("
  "no reminder creation" = "reminderCreationAllowedFromUi:\s*true|createReminder\s*\(|setReminder\s*\("
  "no task scheduling" = "taskSchedulingAllowedFromUi:\s*true|scheduleTask\s*\(|scheduleResearch\s*\(|createScheduledTask\s*\("
  "no automation creation" = "automationCreationAllowedFromUi:\s*true|createAutomation\s*\(|runAutomation\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|automaticProviderCallsAllowed:\s*true|automaticProviderSendAllowed:\s*true|callProviderApi\s*\(|sendFindingsToProvider\s*\("
  "no memory/RAG ingestion" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|connectorEvidenceAutoIngestionAllowed:\s*true|ingestMemory\s*\(|ingestRag\s*\(|ingestConnectorEvidence\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|connectorEvidenceAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true"
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
}

foreach ($name in $blockedPatterns.Keys) {
  Assert-NotMatches $source $blockedPatterns[$name] $name
}
