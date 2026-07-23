param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$repoRoot = [string](Resolve-Path (Join-Path $PSScriptRoot ".."))
Set-Location $repoRoot

function Assert-FileExists {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )

  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )

  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
    throw "[FAIL] Unexpected $Name`: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-Equal {
  param(
    $Actual,
    $Expected,
    [string]$Name
  )

  if ($Actual -ne $Expected) {
    throw "[FAIL] $Name. Expected '$Expected' but found '$Actual'."
  }

  Write-Host "[PASS] $Name"
}

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Name
  )

  if (-not $Condition) {
    throw "[FAIL] $Name"
  }

  Write-Host "[PASS] $Name"
}

function Import-WrapperFunctions {
  param(
    [string]$WrapperPath,
    [string[]]$FunctionNames
  )

  $astTokens = $null
  $astParseErrors = $null
  $ast = [System.Management.Automation.Language.Parser]::ParseFile($WrapperPath, [ref]$astTokens, [ref]$astParseErrors)
  if ($astParseErrors.Count -gt 0) {
    throw "[FAIL] Wrapper parser reported $($astParseErrors.Count) error(s) during function import."
  }

  $functionBodies = New-Object System.Collections.ArrayList
  foreach ($functionName in $FunctionNames) {
    $functionAst = @(
      $ast.FindAll(
        {
          param($node)
          ($node -is [System.Management.Automation.Language.FunctionDefinitionAst]) -and ($node.Name -eq $functionName)
        },
        $true
      )
    ) | Select-Object -First 1

    if (-not $functionAst) {
      throw "[FAIL] Missing wrapper function: $functionName"
    }

    $functionText = $functionAst.Extent.Text -replace ("function\s+" + [regex]::Escape($functionName) + "\b"), ("function script:" + $functionName)
    [void]$functionBodies.Add($functionText)
  }

  $bootstrap = @(
    '$script:CodexForgeNativeProcessSequence = 0L'
    ($functionBodies -join ([Environment]::NewLine + [Environment]::NewLine))
  ) -join ([Environment]::NewLine + [Environment]::NewLine)

  Invoke-Expression $bootstrap
}

function New-TestDirectory {
  param([string]$RootPath)

  $path = Join-Path $RootPath ("artifacts\wrapper-smoke-tests-" + [Guid]::NewGuid().ToString("N"))
  New-Item -ItemType Directory -Path $path -Force | Out-Null
  return $path
}

function Invoke-WrappedSelfTestStage {
  param(
    [pscustomobject]$Stage,
    [string]$WorkingDirectory,
    [string]$LogsDirectory
  )

  Write-Host "[CODEXFORGE_WRAPPER_SELF_TEST_BEGIN]"
  try {
    return (Invoke-ValidationStage -Stage $Stage -WorkingDirectory $WorkingDirectory -LogsDirectory $LogsDirectory)
  } finally {
    Write-Host "[CODEXFORGE_WRAPPER_SELF_TEST_END]"
  }
}

Write-Host "=== CodexForge full validation wrapper quick smoke ==="

$wrapperPath = Join-Path $PSScriptRoot "run-codexforge-full-validation-with-summary.ps1"
$allSmokePath = Join-Path $PSScriptRoot "smoke-codexforge-all.ps1"
$gitignorePath = Join-Path $repoRoot ".gitignore"

Assert-FileExists $wrapperPath
Assert-FileExists $allSmokePath
Assert-FileExists $gitignorePath

$tokens = $null
$parseErrors = $null
[System.Management.Automation.Language.Parser]::ParseFile($wrapperPath, [ref]$tokens, [ref]$parseErrors) | Out-Null
if ($parseErrors.Count -gt 0) {
  throw "[FAIL] Wrapper parser reported $($parseErrors.Count) error(s)."
}
Write-Host "[PASS] wrapper parses successfully"

$wrapperSource = Get-Content -Raw $wrapperPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$gitignoreSource = Get-Content -Raw $gitignorePath

$paramTokens = @($tokens | Where-Object { $_.Kind -eq "Variable" } | ForEach-Object { $_.Text.TrimStart('$') })
foreach ($requiredParam in @(
  "BaseUrl",
  "SkipBuild",
  "SkipFullSmoke",
  "SkipCheckpointDocs",
  "SkipGitDiffCheck",
  "PlanOnly"
)) {
  if ($paramTokens -notcontains $requiredParam) {
    throw "[FAIL] Missing parameter: $requiredParam"
  }
  Write-Host "[PASS] parameter exists: $requiredParam"
}

foreach ($requiredStageName in @(
  '-Name "Build"',
  '-Name "Full smoke"',
  '-Name "Checkpoint docs"',
  '-Name "Git diff check"'
)) {
  Assert-Contains $wrapperSource $requiredStageName "wrapper stage marker $requiredStageName"
}

foreach ($requiredOutputFileName in @(
  "summary.txt",
  "summary.json",
  "stage-results.csv",
  "errors-and-failures.txt",
  "issues-with-context.txt",
  "warnings.txt",
  "failed-stage-tails.txt",
  "git-status.txt",
  "git-head.txt",
  "tags-at-head.txt"
)) {
  Assert-Contains $wrapperSource $requiredOutputFileName "output filename $requiredOutputFileName"
}

Assert-Contains $gitignoreSource "artifacts/smoke-runs/" ".gitignore rule for artifacts/smoke-runs/"
Assert-Contains $wrapperSource "PlanOnly" "PlanOnly support exists"
Assert-Contains $wrapperSource "summary.txt" "summary.txt marker exists"
Assert-Contains $wrapperSource "summary.json" "summary.json marker exists"
Assert-Contains $wrapperSource "smoke-codexforge-all.ps1" "wrapper references smoke-codexforge-all.ps1"
Assert-Contains $wrapperSource "smoke-codexforge-checkpoint-docs.ps1" "wrapper references smoke-codexforge-checkpoint-docs.ps1"
Assert-Contains $wrapperSource "npm.cmd run build" "wrapper references npm.cmd run build"
Assert-Contains $wrapperSource "git diff --check" "wrapper references git diff --check"
Assert-Contains $wrapperSource '$env:ComSpec' "wrapper consults `$env:ComSpec for build launching"
Assert-Contains $wrapperSource "System.Diagnostics.ProcessStartInfo" "wrapper uses System.Diagnostics.ProcessStartInfo"
Assert-Contains $wrapperSource "UseShellExecute = `$false" "wrapper disables shell execute"
Assert-Contains $wrapperSource "RedirectStandardOutput = `$true" "wrapper redirects stdout"
Assert-Contains $wrapperSource "RedirectStandardError = `$true" "wrapper redirects stderr"
Assert-Contains $wrapperSource "CreateNoWindow = `$true" "wrapper disables process windows"
Assert-Contains $wrapperSource "BeginOutputReadLine" "wrapper begins async stdout reading"
Assert-Contains $wrapperSource "BeginErrorReadLine" "wrapper begins async stderr reading"
Assert-Contains $wrapperSource "Ensure-NativeProcessCollectorType" "wrapper ensures the native process collector type exists"
Assert-Contains $wrapperSource "Update-FullSmokeStageResult" "wrapper centralizes full smoke stage result handling"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-full-validation-wrapper\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] smoke-codexforge-all.ps1 must include smoke-codexforge-full-validation-wrapper.ps1 exactly once; found $($suiteMatches.Count)."
}
Write-Host "[PASS] smoke-codexforge-all.ps1 references wrapper smoke exactly once"

Assert-Contains $allSmokeSource 'File = "smoke-codexforge-full-validation-wrapper.ps1"; Required = $true' "wrapper smoke is required in smoke-codexforge-all.ps1"

$wrapperFunctionNames = @(
  "ConvertTo-QuotedCommandToken",
  "Get-CommandArgumentString",
  "Format-CommandLine",
  "Resolve-ApplicationCommandPath",
  "Get-CommandProcessorPath",
  "Get-BatchCommandText",
  "Get-CmdBatchLauncherArguments",
  "Format-CmdBatchLauncherArguments",
  "Format-DurationText",
  "Write-TextFile",
  "Append-LogLine",
  "Get-NormalizedLogLine",
  "Get-NormalizedLogEntries",
  "Test-IsFullSmokeAggregateHeaderLine",
  "Format-ProcessLogLine",
  "Receive-NativeProcessLogEntries",
  "Ensure-NativeProcessCollectorType",
  "New-StageDefinition",
  "New-BuildStageDefinition",
  "New-IssueRecord",
  "Invoke-NativeProcess",
  "Invoke-CapturedCommand",
  "Invoke-ValidationStage",
  "Try-ParseFullSmokeAggregateBlock",
  "Get-FullSmokeAggregateFromLog",
  "Update-FullSmokeStageResult",
  "Set-StageWarningSummaryProperties",
  "Get-LogLineStream",
  "Test-IsWrapperSelfTestStartLine",
  "Test-IsWrapperSelfTestEndLine",
  "Test-IsKnownWrapperSelfTestNoiseLine",
  "Test-ShouldParseTurbopackWarningsForStage",
  "Test-IsTurbopackWarningLocationLine",
  "Test-IsTurbopackWarningSectionTerminator",
  "Get-TurbopackWarningSection",
  "Get-StageIssueRecords",
  "Get-WarningLocationText",
  "Format-RecordLine",
  "Get-RecordTextLines",
  "Get-StageWarningSummary",
  "Get-WarningRecordObjects",
  "Get-WarningsArtifactLines"
)
Import-WrapperFunctions -WrapperPath $wrapperPath -FunctionNames $wrapperFunctionNames

$normalizedAggregateLine = Get-NormalizedLogLine -Line (([string][char]0xFEFF) + "[STDOUT] " + ([string][char]27) + "[32mPassed:           59" + ([string][char]27) + "[0m" + [char]13)
Assert-Equal $normalizedAggregateLine "Passed:           59" "aggregate line normalization strips BOM ANSI prefixes and carriage returns"

$testRoot = New-TestDirectory -RootPath $repoRoot
$logsDirectory = Join-Path $testRoot "logs"
New-Item -ItemType Directory -Path $logsDirectory -Force | Out-Null

try {
  Write-Host "=== CodexForge full validation wrapper regression smoke ==="

  $resolvedNpmCommandPath = Resolve-ApplicationCommandPath -CommandName "npm.cmd"
  $expectedNpmCommand = Get-Command npm.cmd -CommandType Application -ErrorAction Stop
  $expectedNpmCommandPath = [string]$expectedNpmCommand.Source
  if ([string]::IsNullOrWhiteSpace($expectedNpmCommandPath)) {
    $expectedNpmCommandPath = [string]$expectedNpmCommand.Path
  }
  $expectedNpmCommandPath = [string](Resolve-Path -LiteralPath $expectedNpmCommandPath)
  Assert-True ([System.IO.Path]::IsPathRooted($resolvedNpmCommandPath)) "resolved npm.cmd path is absolute"
  Assert-Equal $resolvedNpmCommandPath $expectedNpmCommandPath "wrapper resolves npm.cmd via Get-Command"

  $commandProcessorPath = Get-CommandProcessorPath
  $expectedCommandProcessorPath = "cmd.exe"
  if (-not [string]::IsNullOrWhiteSpace($env:ComSpec)) {
    $expectedCommandProcessorPath = $env:ComSpec
  }
  Assert-Equal $commandProcessorPath $expectedCommandProcessorPath "wrapper uses `$env:ComSpec or cmd.exe for batch launching"

  $spacePath = 'C:\Program Files\Node Space Test\npm.cmd'
  $spaceCommandText = Get-BatchCommandText -CommandPath $spacePath -Arguments @("run", "build")
  Assert-Equal $spaceCommandText '"C:\Program Files\Node Space Test\npm.cmd" run build' "batch command text quotes paths containing spaces"
  $spaceLauncherArguments = Get-CmdBatchLauncherArguments -CommandPath $spacePath -Arguments @("run", "build")
  Assert-Equal $spaceLauncherArguments[0] "/d" "cmd batch launcher includes /d"
  Assert-Equal $spaceLauncherArguments[1] "/s" "cmd batch launcher includes /s"
  Assert-Equal $spaceLauncherArguments[2] "/c" "cmd batch launcher includes /c"
  Assert-Equal $spaceLauncherArguments[3] "call" "cmd batch launcher includes CALL"
  Assert-Equal $spaceLauncherArguments[4] $spacePath "cmd batch launcher preserves the original batch path token"
  Assert-Equal $spaceLauncherArguments[5] "run" "cmd batch launcher preserves the first batch argument"
  Assert-Equal $spaceLauncherArguments[6] "build" "cmd batch launcher preserves the second batch argument"
  $spaceLauncherArgumentsDisplay = Format-CmdBatchLauncherArguments -CommandPath $spacePath -Arguments @("run", "build")
  Assert-Equal $spaceLauncherArgumentsDisplay '/d /s /c call "C:\Program Files\Node Space Test\npm.cmd" run build' "displayed cmd batch launcher arguments support paths containing spaces"
  Assert-NotContains $spaceLauncherArgumentsDisplay '\"' "displayed cmd batch launcher arguments do not use backslash-escaped quotes"

  $buildStage = New-BuildStageDefinition -Skipped $false -SkipReason ""
  Assert-Equal $buildStage.DisplayCommand "npm.cmd run build" "build stage logical command remains npm.cmd run build"
  Assert-Equal $buildStage.ResolvedCommandPath $resolvedNpmCommandPath "build stage records the resolved npm.cmd path"
  Assert-Equal $buildStage.Command $commandProcessorPath "build stage launches through the command processor"
  Assert-Equal $buildStage.ActualLauncher $commandProcessorPath "build stage reports the command processor as the actual launcher"
  Assert-True ($buildStage.Command -ne "npm.cmd") "build stage does not directly launch bare npm.cmd through ProcessStartInfo"
  Assert-Equal $buildStage.Arguments[0] "/d" "build stage uses /d for cmd.exe"
  Assert-Equal $buildStage.Arguments[1] "/s" "build stage uses /s for cmd.exe"
  Assert-Equal $buildStage.Arguments[2] "/c" "build stage uses /c for cmd.exe"
  Assert-Equal $buildStage.Arguments[3] "call" "build stage uses CALL for npm.cmd"
  Assert-Equal $buildStage.Arguments[4] $resolvedNpmCommandPath "build stage preserves the resolved npm.cmd path token"
  Assert-Equal $buildStage.ActualArgumentsDisplay ('/d /s /c call "' + $resolvedNpmCommandPath + '" run build') "build stage reports the corrected command-processor arguments"
  Assert-Contains $buildStage.ActualArgumentsDisplay ('"' + $resolvedNpmCommandPath + '"') "build stage quotes the absolute npm.cmd path"
  Assert-NotContains $buildStage.ActualArgumentsDisplay '\"' "build stage launcher display does not contain backslash-escaped quotes"

  $pathWithSpacesDirectory = Join-Path $testRoot "cmd fixture with spaces"
  New-Item -ItemType Directory -Path $pathWithSpacesDirectory -Force | Out-Null
  $pathWithSpacesScriptPath = Join-Path $pathWithSpacesDirectory "stdout stderr fixture.cmd"
  Set-Content -LiteralPath $pathWithSpacesScriptPath -Encoding ASCII -Value @(
    "@echo off"
    "echo WRAPPER_SPACE_STDOUT_MARKER"
    "echo warning: WRAPPER_SPACE_STDERR_WARNING_MARKER 1>&2"
    "exit /b 0"
  )

  Assert-True ($pathWithSpacesScriptPath.IndexOf(" ", [StringComparison]::Ordinal) -ge 0) "temporary cmd fixture path contains spaces"
  $pathWithSpacesLauncherArguments = Get-CmdBatchLauncherArguments -CommandPath $pathWithSpacesScriptPath -Arguments @()
  $pathWithSpacesLauncherDisplay = Format-CmdBatchLauncherArguments -CommandPath $pathWithSpacesScriptPath -Arguments @()
  Assert-Equal $pathWithSpacesLauncherArguments[3] "call" "CALL is used for the temporary cmd fixture"
  Assert-Contains $pathWithSpacesLauncherDisplay ('"' + $pathWithSpacesScriptPath + '"') "temporary cmd fixture launcher quotes the spaced path"
  Assert-NotContains $pathWithSpacesLauncherDisplay '\"' "temporary cmd fixture launcher does not contain backslash-escaped quotes"

  $pathWithSpacesCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command $commandProcessorPath -Arguments $pathWithSpacesLauncherArguments
  Assert-Equal $pathWithSpacesCapture.ExitCode 0 "temporary path-with-spaces cmd fixture exits 0"
  Assert-Contains ($pathWithSpacesCapture.StdOutLines -join [Environment]::NewLine) "WRAPPER_SPACE_STDOUT_MARKER" "temporary path-with-spaces cmd fixture stdout is captured"
  Assert-Contains ($pathWithSpacesCapture.StdErrLines -join [Environment]::NewLine) "WRAPPER_SPACE_STDERR_WARNING_MARKER" "temporary path-with-spaces cmd fixture stderr is captured"

  $pathWithSpacesStage = New-StageDefinition -Name "Synthetic cmd CALL pass" -Command $commandProcessorPath -Arguments $pathWithSpacesLauncherArguments -DisplayCommand $pathWithSpacesLauncherDisplay -LogFileName "cmd-call-pass.log" -Required $true -Skipped $false -SkipReason ""
  $pathWithSpacesStageResult = Invoke-WrappedSelfTestStage -Stage $pathWithSpacesStage -WorkingDirectory $repoRoot -LogsDirectory $logsDirectory
  Assert-Equal $pathWithSpacesStageResult.ExitCode 0 "temporary path-with-spaces cmd fixture stage retains exit code 0"
  Assert-Equal $pathWithSpacesStageResult.Result "PASS" "temporary path-with-spaces cmd fixture warning does not fail the stage"
  $pathWithSpacesStageRecords = @(Get-StageIssueRecords -StageResult $pathWithSpacesStageResult)
  Assert-Equal @($pathWithSpacesStageRecords | Where-Object { $_.Kind -eq "WARNING" }).Count 1 "temporary path-with-spaces cmd fixture stderr is classified as warning-only"
  Assert-Equal @($pathWithSpacesStageRecords | Where-Object { $_.Kind -eq "WRAPPER_EXCEPTION" }).Count 0 "temporary path-with-spaces cmd fixture stderr is not classified as a wrapper exception"

  $npmVersionLauncherArguments = Get-CmdBatchLauncherArguments -CommandPath $resolvedNpmCommandPath -Arguments @("--version")
  $npmVersionLauncherDisplay = Format-CmdBatchLauncherArguments -CommandPath $resolvedNpmCommandPath -Arguments @("--version")
  Assert-Equal $npmVersionLauncherArguments[3] "call" "CALL is used for the npm.cmd launcher"
  Assert-Contains $npmVersionLauncherDisplay ('"' + $resolvedNpmCommandPath + '"') "npm.cmd launcher quotes the absolute npm path"
  Assert-NotContains $npmVersionLauncherDisplay '\"' "npm.cmd launcher does not contain backslash-escaped quotes"

  $npmVersionCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command $commandProcessorPath -Arguments $npmVersionLauncherArguments
  Assert-Equal $npmVersionCapture.ExitCode 0 "npm.cmd --version launcher exits 0"
  Assert-True ($npmVersionCapture.StdOutLines.Count -gt 0) "npm.cmd --version launcher captures stdout"

  $planOnlyCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command "powershell.exe" -Arguments @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $wrapperPath, "-PlanOnly")
  Assert-Equal $planOnlyCapture.ExitCode 0 "wrapper -PlanOnly exits successfully"
  Assert-Contains $planOnlyCapture.Text "Logical command: npm.cmd run build" "PlanOnly displays the logical build command"
  Assert-Contains $planOnlyCapture.Text ("Resolved npm.cmd path: " + $resolvedNpmCommandPath) "PlanOnly displays the resolved npm.cmd path"
  Assert-Contains $planOnlyCapture.Text ("Actual launcher: " + $commandProcessorPath) "PlanOnly displays the actual launcher"
  Assert-Contains $planOnlyCapture.Text ("Actual arguments: " + $buildStage.ActualArgumentsDisplay) "PlanOnly displays the actual quoted build arguments"
  Assert-Contains $planOnlyCapture.Text ("Command: " + $commandProcessorPath + " " + $buildStage.ActualArgumentsDisplay) "PlanOnly displays the corrected cmd.exe build invocation"
  Assert-NotContains $planOnlyCapture.Text '\"' "PlanOnly display does not contain backslash-escaped quotes"

  $stderrPassStage = New-StageDefinition -Name "Synthetic native stderr pass" -Command "powershell.exe" -Arguments @("-NoProfile", "-Command", "[Console]::Error.WriteLine('native warning from stderr'); [Console]::Out.WriteLine('native stdout line'); exit 0") -DisplayCommand "synthetic native stderr pass" -LogFileName "stderr-pass.log" -Required $true -Skipped $false -SkipReason ""
  $stderrPassResult = Invoke-WrappedSelfTestStage -Stage $stderrPassStage -WorkingDirectory $repoRoot -LogsDirectory $logsDirectory
  Assert-Equal $stderrPassResult.ExitCode 0 "native stderr stage retains exit code 0"
  Assert-Equal $stderrPassResult.Result "PASS" "native stderr stage does not fail automatically"
  $stderrPassLog = Get-Content -Raw $stderrPassResult.LogPath
  Assert-Contains $stderrPassLog "[STDERR] native warning from stderr" "native stderr line is preserved in the stage log"
  Assert-Contains $stderrPassLog "[STDOUT] native stdout line" "native stdout line is preserved in the stage log"

  $stderrPassRecords = @(Get-StageIssueRecords -StageResult $stderrPassResult)
  Assert-Equal @($stderrPassRecords | Where-Object { $_.Kind -eq "WARNING" }).Count 1 "native stderr warning is classified as warning-only"
  Assert-Equal @($stderrPassRecords | Where-Object { $_.Kind -eq "WRAPPER_EXCEPTION" }).Count 0 "native stderr warning is not classified as a wrapper exception"

  $exitControlledStage = New-StageDefinition -Name "Synthetic native exit failure" -Command "powershell.exe" -Arguments @("-NoProfile", "-Command", "[Console]::Error.WriteLine('native stderr only'); exit 7") -DisplayCommand "synthetic native exit failure" -LogFileName "stderr-exit-7.log" -Required $true -Skipped $false -SkipReason ""
  $exitControlledResult = Invoke-WrappedSelfTestStage -Stage $exitControlledStage -WorkingDirectory $repoRoot -LogsDirectory $logsDirectory
  Assert-Equal $exitControlledResult.ExitCode 7 "actual native exit code is preserved"
  Assert-Equal $exitControlledResult.Result "FAIL" "actual native exit code controls the stage result"

  $crlfWarningLogPath = Join-Path $logsDirectory "git-diff-crlf-warning.log"
  Write-TextFile -Path $crlfWarningLogPath -Lines @(
    "[STDERR] warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it"
  )
  $crlfWarningStage = [pscustomobject]@{
    Name = "Git diff check"
    Skipped = $false
    LogPath = $crlfWarningLogPath
  }
  $crlfWarningRecords = @(Get-StageIssueRecords -StageResult $crlfWarningStage)
  Assert-Equal $crlfWarningRecords.Count 1 "CRLF warning yields one issue record"
  Assert-Equal $crlfWarningRecords[0].Kind "WARNING" "CRLF warning is classified as warning-only"
  Assert-Equal @($crlfWarningRecords | Where-Object { $_.Kind -eq "WRAPPER_EXCEPTION" }).Count 0 "CRLF warning is not classified as a wrapper exception"

  $turbopackFixtureWarnings = @(
    [pscustomobject]@{ SourceFile = "src/lib/codexforge/files/server/dependency-trace.ts"; SourceLine = 63; SourceColumn = 37 },
    [pscustomobject]@{ SourceFile = "src/app/api/codexforge/project/read/route.ts"; SourceLine = 93; SourceColumn = 22 },
    [pscustomobject]@{ SourceFile = "src/app/api/codexforge/project/read/route.ts"; SourceLine = 113; SourceColumn = 24 },
    [pscustomobject]@{ SourceFile = "src/app/api/codexforge/project/snapshot/route.ts"; SourceLine = 226; SourceColumn = 22 },
    [pscustomobject]@{ SourceFile = "src/lib/codexforge/files/server/file-preview.ts"; SourceLine = 54; SourceColumn = 22 },
    [pscustomobject]@{ SourceFile = "src/lib/codexforge/files/server/file-preview.ts"; SourceLine = 57; SourceColumn = 22 }
  )
  $turbopackPrimaryMessage = "The file pattern (...) matches 27022 files in [project]/"
  $turbopackFixturePath = Join-Path $testRoot "turbopack-six-warning-fixture.ps1"
  $turbopackFixtureScriptLines = @(
    '$warnings = @('
  )
  foreach ($fixtureWarning in $turbopackFixtureWarnings) {
    $turbopackFixtureScriptLines += ("  @{ SourceFile = '" + $fixtureWarning.SourceFile + "'; SourceLine = " + $fixtureWarning.SourceLine + "; SourceColumn = " + $fixtureWarning.SourceColumn + " }")
  }
  $turbopackFixtureScriptLines += @(
    ')'
    "[Console]::Error.WriteLine('Turbopack build encountered 6 warnings:')"
    "[Console]::Error.WriteLine('')"
    'foreach ($warning in $warnings) {'
    "  [Console]::Error.WriteLine('./' + `$warning.SourceFile + ':' + `$warning.SourceLine + ':' + `$warning.SourceColumn)"
    "  [Console]::Error.WriteLine('" + $turbopackPrimaryMessage + "')"
    "  [Console]::Error.WriteLine('Overly broad patterns can slow module resolution and may reduce tree shaking.')"
    "  [Console]::Error.WriteLine('Import trace for requested module:')"
    "  [Console]::Error.WriteLine('./src/app/api/codexforge/project/read/route.ts')"
    "  [Console]::Error.WriteLine('')"
    '}'
    "[Console]::Out.WriteLine('Build completed with nonfatal warnings.')"
    "exit 0"
  )
  Set-Content -LiteralPath $turbopackFixturePath -Encoding ASCII -Value $turbopackFixtureScriptLines

  $turbopackStage = New-StageDefinition -Name "Build" -Command "powershell.exe" -Arguments @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $turbopackFixturePath) -DisplayCommand "synthetic six-warning turbopack build" -LogFileName "turbopack-six-warning.log" -Required $true -Skipped $false -SkipReason ""
  $turbopackStageResult = Invoke-WrappedSelfTestStage -Stage $turbopackStage -WorkingDirectory $repoRoot -LogsDirectory $logsDirectory
  Assert-Equal $turbopackStageResult.ExitCode 0 "Turbopack warning fixture exits 0"
  Assert-Equal $turbopackStageResult.Result "PASS" "Turbopack warning blocks remain nonfatal"

  $turbopackStageRecords = @(Get-StageIssueRecords -StageResult $turbopackStageResult)
  $turbopackWarningRecords = @($turbopackStageRecords | Where-Object { $_.Kind -eq "WARNING" })
  $turbopackParserMismatchRecords = @($turbopackStageRecords | Where-Object { $_.Kind -eq "WARNING_PARSER_MISMATCH" })
  Assert-Equal $turbopackStageResult.TurbopackDeclaredWarningCount 6 "Turbopack aggregate declares 6 warnings"
  Assert-Equal $turbopackStageResult.TurbopackParsedWarningCount 6 "six Turbopack warning blocks are parsed"
  Assert-Equal $turbopackStageResult.TurbopackWarningCount 6 "Turbopack warning count preserves all individual warnings"
  Assert-Equal $turbopackStageResult.GenericWarningCount 0 "Turbopack fixture does not add generic warnings"
  Assert-Equal $turbopackStageResult.WarningCount 6 "final Turbopack fixture warning count is 6"
  Assert-Equal $turbopackWarningRecords.Count 6 "aggregate header is not counted as a seventh warning"
  Assert-Equal $turbopackParserMismatchRecords.Count 0 "fully parsed Turbopack warning fixture does not report parser mismatch"
  Assert-Equal @($turbopackStageRecords | Where-Object { $_.Kind -eq "WARNING" -and $_.Category -eq "Turbopack" }).Count 6 "all parsed Turbopack warnings are categorized correctly"

  $turbopackSummaryWarningLines = @(Get-RecordTextLines -Records $turbopackWarningRecords)
  Assert-Equal $turbopackSummaryWarningLines.Count 6 "summary text contains one compact line per Turbopack warning"
  Assert-NotContains ($turbopackSummaryWarningLines -join [Environment]::NewLine) "Turbopack build encountered 6 warnings:" "aggregate header is excluded from compact warning summary text"
  Assert-NotContains ($turbopackSummaryWarningLines -join [Environment]::NewLine) "Import trace for requested module:" "import traces are excluded from compact warning summary text"
  Assert-NotContains ($turbopackSummaryWarningLines -join [Environment]::NewLine) "Overly broad patterns can slow module resolution" "repeated Turbopack explanation is excluded from compact warning summary text"

  $turbopackWarningObjects = @(Get-WarningRecordObjects -Records $turbopackWarningRecords)
  Assert-Equal $turbopackWarningObjects.Count 6 "summary JSON contains six structured Turbopack warning records"

  for ($warningIndex = 0; $warningIndex -lt $turbopackFixtureWarnings.Count; $warningIndex++) {
    $expectedWarning = $turbopackFixtureWarnings[$warningIndex]
    $actualWarningRecord = $turbopackWarningRecords[$warningIndex]
    $actualWarningObject = $turbopackWarningObjects[$warningIndex]
    $expectedCompactWarningLine = ("[WARNING] Build | Turbopack | " + $expectedWarning.SourceFile + ":" + $expectedWarning.SourceLine + ":" + $expectedWarning.SourceColumn + " | " + $turbopackPrimaryMessage)

    Assert-Equal $actualWarningRecord.SourceFile $expectedWarning.SourceFile "Turbopack warning $($warningIndex + 1) preserves source file"
    Assert-Equal $actualWarningRecord.SourceLine $expectedWarning.SourceLine "Turbopack warning $($warningIndex + 1) preserves source line"
    Assert-Equal $actualWarningRecord.SourceColumn $expectedWarning.SourceColumn "Turbopack warning $($warningIndex + 1) preserves source column"
    Assert-Equal $actualWarningRecord.PrimaryMessage $turbopackPrimaryMessage "Turbopack warning $($warningIndex + 1) preserves primary message"
    Assert-NotContains $actualWarningRecord.Detail "Import trace" "Turbopack warning $($warningIndex + 1) excludes import trace detail"
    Assert-NotContains $actualWarningRecord.Detail "Overly broad patterns" "Turbopack warning $($warningIndex + 1) excludes repeated explanatory detail"
    Assert-Contains ($turbopackSummaryWarningLines -join [Environment]::NewLine) $expectedCompactWarningLine "summary text contains compact Turbopack warning $($warningIndex + 1)"
    Assert-Equal $actualWarningObject.category "Turbopack" "summary JSON warning $($warningIndex + 1) preserves category"
    Assert-Equal $actualWarningObject.sourceFile $expectedWarning.SourceFile "summary JSON warning $($warningIndex + 1) preserves source file"
    Assert-Equal $actualWarningObject.sourceLine $expectedWarning.SourceLine "summary JSON warning $($warningIndex + 1) preserves source line"
    Assert-Equal $actualWarningObject.sourceColumn $expectedWarning.SourceColumn "summary JSON warning $($warningIndex + 1) preserves source column"
    Assert-Equal $actualWarningObject.primaryMessage $turbopackPrimaryMessage "summary JSON warning $($warningIndex + 1) preserves primary message"
    Assert-Equal $actualWarningObject.logPath $turbopackStageResult.LogPath "summary JSON warning $($warningIndex + 1) preserves complete log path"
  }

  $turbopackWarningsArtifactLines = @(Get-WarningsArtifactLines -WarningRecords $turbopackWarningRecords -WarningParserMismatchRecords $turbopackParserMismatchRecords -StageResults @($turbopackStageResult))
  $turbopackWarningsArtifactText = $turbopackWarningsArtifactLines -join [Environment]::NewLine
  Assert-Contains $turbopackWarningsArtifactText "Total warning count: 6" "warnings.txt reports the six-warning total"
  Assert-Contains $turbopackWarningsArtifactText "Turbopack warning count: 6" "warnings.txt reports the Turbopack warning total"
  Assert-Contains $turbopackWarningsArtifactText "Generic warning count: 0" "warnings.txt reports zero generic warnings for the Turbopack fixture"
  Assert-Contains $turbopackWarningsArtifactText "- Build: 6" "warnings.txt groups the six warnings by stage"
  Assert-Contains $turbopackWarningsArtifactText "- Turbopack: 6" "warnings.txt groups the six warnings by category"
  Assert-Contains $turbopackWarningsArtifactText $turbopackStageResult.LogPath "warnings.txt includes the complete Turbopack source log path"

  $combinedWarningSummary = Get-StageWarningSummary -StageResults @($turbopackStageResult, $crlfWarningStage) -WarningRecords @($turbopackWarningRecords + $crlfWarningRecords) -WarningParserMismatchRecords @()
  Assert-Equal $combinedWarningSummary.TotalWarningCount 7 "generic CRLF warnings still parse separately from Turbopack warnings"
  Assert-Equal $combinedWarningSummary.TurbopackWarningCount 6 "combined warning summary preserves the Turbopack warning count"
  Assert-Equal $combinedWarningSummary.GenericWarningCount 1 "combined warning summary preserves the generic warning count"

  $turbopackMismatchLogPath = Join-Path $logsDirectory "turbopack-six-declared-five-parsed.log"
  $turbopackMismatchLogLines = @(
    "[STDERR] Turbopack build encountered 6 warnings:",
    ""
  )
  foreach ($fixtureWarning in @($turbopackFixtureWarnings | Select-Object -First 5)) {
    $turbopackMismatchLogLines += ("[STDERR] ./" + $fixtureWarning.SourceFile + ":" + $fixtureWarning.SourceLine + ":" + $fixtureWarning.SourceColumn)
    $turbopackMismatchLogLines += ("[STDERR] " + $turbopackPrimaryMessage)
    $turbopackMismatchLogLines += ""
  }
  Write-TextFile -Path $turbopackMismatchLogPath -Lines $turbopackMismatchLogLines

  $turbopackMismatchStage = [pscustomobject]@{
    Name = "Build"
    Skipped = $false
    LogPath = $turbopackMismatchLogPath
  }
  $turbopackMismatchStageRecords = @(Get-StageIssueRecords -StageResult $turbopackMismatchStage)
  $turbopackMismatchWarningRecords = @($turbopackMismatchStageRecords | Where-Object { $_.Kind -eq "WARNING" })
  $turbopackMismatchParserRecords = @($turbopackMismatchStageRecords | Where-Object { $_.Kind -eq "WARNING_PARSER_MISMATCH" })
  Assert-Equal $turbopackMismatchStage.TurbopackDeclaredWarningCount 6 "parser mismatch fixture preserves the declared Turbopack warning count"
  Assert-Equal $turbopackMismatchStage.TurbopackParsedWarningCount 5 "parser mismatch fixture reports the parsed Turbopack warning record count"
  Assert-Equal $turbopackMismatchStage.WarningCount 6 "parser mismatch fixture does not silently undercount declared Turbopack warnings"
  Assert-Equal $turbopackMismatchWarningRecords.Count 5 "parser mismatch fixture still emits the parsed warning records"
  Assert-Equal $turbopackMismatchParserRecords.Count 1 "parser mismatch fixture reports the warning parser mismatch prominently"
  $turbopackMismatchArtifactText = (Get-WarningsArtifactLines -WarningRecords $turbopackMismatchWarningRecords -WarningParserMismatchRecords $turbopackMismatchParserRecords -StageResults @($turbopackMismatchStage)) -join [Environment]::NewLine
  Assert-Contains $turbopackMismatchArtifactText "Total warning count: 6" "warnings.txt preserves the declared Turbopack warning total during parser mismatch"
  Assert-Contains $turbopackMismatchArtifactText "Turbopack declared 6 warnings but parsed 5 warning blocks." "warnings.txt reports the Turbopack parser mismatch prominently"
  Assert-Contains $turbopackMismatchArtifactText "warning section starts at log line 1" "warnings.txt includes the raw Turbopack warning section location during parser mismatch"

  $realTailAggregateLogPath = Join-Path $logsDirectory "aggregate-real-tail.log"
  Write-TextFile -Path $realTailAggregateLogPath -Lines @(
    "[STDOUT] === CodexForge CodexForge Current Required Release Gate smoke group complete ===",
    "[STDOUT] Passed:           59",
    "[STDOUT] Failed:           0",
    "[STDOUT] Missing required: 0",
    "[STDOUT] Missing optional: 0",
    "[STDOUT] Elapsed: 138.88s",
    "[STDOUT] ",
    "[STDOUT] [PASS] CodexForge CodexForge Current Required Release Gate smoke group passed.",
    "[STDOUT] ",
    "[STDOUT] === CodexForge current required release gate summary ===",
    "[STDOUT] Current release gate: 6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview",
    "[STDOUT] Current required smoke lane:",
    "[STDOUT] [PASS] Phase 4361 Jarvis Video First Provider Trial Result Review and Recovery",
    "[STDOUT] [PASS] Full validation wrapper smoke",
    "[STDOUT] ",
    "[STDOUT]   Pass count: 59",
    "[STDOUT] Fail count:   0",
    "[STDOUT] Missing required: 0",
    "[STDOUT] Missing optional: 0",
    "[STDOUT] Elapsed: 138.88s",
    "[STDOUT] Failed required steps: none",
    "[STDOUT] Historical archived smokes are preserved and are not run by default.",
    "[STDOUT] ",
    "[STDOUT] [PASS] CodexForge current required release gate passed."
  )
  $realTailAggregate = Get-FullSmokeAggregateFromLog -LogPath $realTailAggregateLogPath
  Assert-Equal $realTailAggregate.Header "=== CodexForge current required release gate summary ===" "aggregate parser prefers the latest complete release-gate summary block"
  Assert-Equal $realTailAggregate.Passed 59 "real-tail aggregate parses pass count"
  Assert-Equal $realTailAggregate.Failed 0 "real-tail aggregate parses fail count"
  Assert-Equal $realTailAggregate.MissingRequired 0 "real-tail aggregate parses missing required count"
  Assert-Equal $realTailAggregate.MissingOptional 0 "real-tail aggregate parses missing optional count"
  Assert-Equal $realTailAggregate.ElapsedText "138.88s" "real-tail aggregate parses elapsed text"

  $passedAggregateLogPath = Join-Path $logsDirectory "aggregate-passed.log"
  Write-TextFile -Path $passedAggregateLogPath -Lines @(
    "=== CodexForge full smoke complete ===",
    "Passed: 59",
    "Failed: 0",
    "Missing required: 0",
    "Missing optional: 0",
    "Elapsed: 129.02s"
  )
  $passedAggregate = Get-FullSmokeAggregateFromLog -LogPath $passedAggregateLogPath
  Assert-Equal $passedAggregate.Passed 59 "passed/failed aggregate format parses pass count"
  Assert-Equal $passedAggregate.Failed 0 "passed/failed aggregate format parses fail count"
  Assert-Equal $passedAggregate.MissingRequired 0 "passed/failed aggregate format parses missing required count"
  Assert-Equal $passedAggregate.MissingOptional 0 "passed/failed aggregate format parses missing optional count"

  $passingSmokeStage = [pscustomobject]@{
    ExitCode = 0
    Result = "FAIL"
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
  }
  Update-FullSmokeStageResult -StageResult $passingSmokeStage -FullSmokeAggregate $realTailAggregate
  Assert-Equal $passingSmokeStage.Result "PASS" "a 59/0/0/0 full-smoke aggregate parses as PASS"

  $markedSelfTestLogPath = Join-Path $logsDirectory "full-smoke-marked-self-test.log"
  $markedSelfTestLogLines = @(
    "[STDOUT] === CodexForge full validation wrapper regression smoke ===",
    "[STDOUT] [CODEXFORGE_WRAPPER_SELF_TEST_BEGIN]",
    "[STDOUT] Turbopack build encountered 6 warnings:",
    "[STDOUT] "
  )
  foreach ($fixtureWarning in $turbopackFixtureWarnings) {
    $markedSelfTestLogLines += ("[STDOUT] ./" + $fixtureWarning.SourceFile + ":" + $fixtureWarning.SourceLine + ":" + $fixtureWarning.SourceColumn)
    $markedSelfTestLogLines += ("[STDOUT] " + $turbopackPrimaryMessage)
    $markedSelfTestLogLines += "[STDOUT] Overly broad patterns can slow module resolution and may reduce tree shaking."
    $markedSelfTestLogLines += "[STDOUT] Import trace for requested module:"
    $markedSelfTestLogLines += "[STDOUT] ./src/app/api/codexforge/project/read/route.ts"
    $markedSelfTestLogLines += "[STDOUT] "
  }
  $markedSelfTestLogLines += @(
    "[STDOUT] warning: WRAPPER_SPACE_STDERR_WARNING_MARKER",
    "[STDOUT] native warning from stderr",
    "[STDOUT] native stderr only",
    "[STDOUT] [FAIL] synthetic exit-code-7 fixture",
    "[STDOUT] error: synthetic self-test failure marker",
    "[STDOUT] [CODEXFORGE_WRAPPER_SELF_TEST_END]",
    "[STDOUT] [PASS] wrapper smoke continues after synthetic fixture"
  )
  Write-TextFile -Path $markedSelfTestLogPath -Lines $markedSelfTestLogLines

  $markedSelfTestStage = [pscustomobject]@{
    Name = "Full smoke"
    Skipped = $false
    LogPath = $markedSelfTestLogPath
  }
  $markedSelfTestRecords = @(Get-StageIssueRecords -StageResult $markedSelfTestStage)
  $markedSelfTestWarningRecords = @($markedSelfTestRecords | Where-Object { $_.Kind -eq "WARNING" })
  $markedSelfTestParserMismatchRecords = @($markedSelfTestRecords | Where-Object { $_.Kind -eq "WARNING_PARSER_MISMATCH" })
  $markedSelfTestErrorAndFailureRecords = @(
    $markedSelfTestRecords |
      Where-Object {
        @("WRAPPER_EXCEPTION", "NPM_ERR", "FATAL", "ERROR", "TYPE_ERROR", "BUILD_FAILED", "UNHANDLED_EXCEPTION", "FAIL", "FAILED", "MISSING_REQUIRED", "MISSING_OPTIONAL") -contains $_.Kind
      }
  )
  Assert-Equal $markedSelfTestWarningRecords.Count 0 "marked nested self-test fixture does not emit top-level warnings"
  Assert-Equal $markedSelfTestErrorAndFailureRecords.Count 0 "marked nested self-test fixture does not emit top-level errors or failures"
  Assert-Equal $markedSelfTestParserMismatchRecords.Count 0 "marked nested self-test fixture does not emit warning parser mismatches"
  Assert-Equal $markedSelfTestStage.WarningCount 0 "marked nested self-test fixture preserves zero top-level warnings"
  Assert-Equal $markedSelfTestStage.WarningParserMismatchCount 0 "marked nested self-test fixture preserves zero top-level parser mismatches"

  $gitDoubleCrlfWarningLogPath = Join-Path $logsDirectory "git-diff-two-crlf-warnings.log"
  Write-TextFile -Path $gitDoubleCrlfWarningLogPath -Lines @(
    "[STDERR] warning: in the working copy of 'frontend/.gitignore', LF will be replaced by CRLF the next time Git touches it",
    "[STDERR] warning: in the working copy of 'frontend/scripts/smoke-codexforge-all.ps1', LF will be replaced by CRLF the next time Git touches it"
  )
  $gitDoubleCrlfWarningStage = [pscustomobject]@{
    Name = "Git diff check"
    Skipped = $false
    LogPath = $gitDoubleCrlfWarningLogPath
  }
  $gitDoubleCrlfWarningRecords = @(Get-StageIssueRecords -StageResult $gitDoubleCrlfWarningStage)
  Assert-Equal @($gitDoubleCrlfWarningRecords | Where-Object { $_.Kind -eq "WARNING" }).Count 2 "double CRLF fixture preserves two real Git warnings"

  $combinedFullSmokeLogPath = Join-Path $logsDirectory "full-smoke-combined.log"
  $combinedFullSmokeLogLines = @($markedSelfTestLogLines + @(
    "[STDOUT] ",
    "[STDOUT] === CodexForge CodexForge Current Required Release Gate smoke group complete ===",
    "[STDOUT] Passed:           59",
    "[STDOUT] Failed:           0",
    "[STDOUT] Missing required: 0",
    "[STDOUT] Missing optional: 0",
    "[STDOUT] Elapsed: 138.88s",
    "[STDOUT] ",
    "[STDOUT] === CodexForge current required release gate summary ===",
    "[STDOUT] Pass count: 59",
    "[STDOUT] Fail count: 0",
    "[STDOUT] Missing required: 0",
    "[STDOUT] Missing optional: 0",
    "[STDOUT] Elapsed: 138.88s",
    "[STDOUT] Failed required steps: none",
    "[STDOUT] [PASS] CodexForge current required release gate passed."
  ))
  Write-TextFile -Path $combinedFullSmokeLogPath -Lines $combinedFullSmokeLogLines

  $combinedFullSmokeStage = [pscustomobject]@{
    Name = "Full smoke"
    Skipped = $false
    LogPath = $combinedFullSmokeLogPath
    ExitCode = 0
    Result = "FAIL"
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
  }
  $combinedFullSmokeRecords = @(Get-StageIssueRecords -StageResult $combinedFullSmokeStage)
  $combinedFullSmokeWarningRecords = @($combinedFullSmokeRecords | Where-Object { $_.Kind -eq "WARNING" })
  $combinedFullSmokeParserMismatchRecords = @($combinedFullSmokeRecords | Where-Object { $_.Kind -eq "WARNING_PARSER_MISMATCH" })
  $combinedFullSmokeAggregate = Get-FullSmokeAggregateFromLog -LogPath $combinedFullSmokeLogPath
  Update-FullSmokeStageResult -StageResult $combinedFullSmokeStage -FullSmokeAggregate $combinedFullSmokeAggregate
  Assert-Equal $combinedFullSmokeAggregate.Passed 59 "combined full-smoke fixture parses pass count"
  Assert-Equal $combinedFullSmokeAggregate.Failed 0 "combined full-smoke fixture parses fail count"
  Assert-Equal $combinedFullSmokeAggregate.MissingRequired 0 "combined full-smoke fixture parses missing required count"
  Assert-Equal $combinedFullSmokeAggregate.MissingOptional 0 "combined full-smoke fixture parses missing optional count"
  Assert-Equal $combinedFullSmokeStage.Result "PASS" "combined full-smoke fixture remains PASS after aggregate parsing"
  Assert-Equal $combinedFullSmokeWarningRecords.Count 0 "combined full-smoke fixture excludes nested self-test warnings"
  Assert-Equal $combinedFullSmokeParserMismatchRecords.Count 0 "combined full-smoke fixture excludes nested self-test parser mismatches"

  $combinedRunWarningSummary = Get-StageWarningSummary -StageResults @($turbopackStageResult, $combinedFullSmokeStage, $gitDoubleCrlfWarningStage) -WarningRecords @($turbopackWarningRecords + $combinedFullSmokeWarningRecords + $gitDoubleCrlfWarningRecords) -WarningParserMismatchRecords @($turbopackParserMismatchRecords + $combinedFullSmokeParserMismatchRecords)
  Assert-Equal $combinedRunWarningSummary.TotalWarningCount 8 "combined run preserves exactly eight real warnings"
  Assert-Equal $combinedRunWarningSummary.TurbopackWarningCount 6 "combined run preserves exactly six Turbopack warnings"
  Assert-Equal $combinedRunWarningSummary.GenericWarningCount 2 "combined run preserves exactly two generic warnings"
  Assert-Equal $combinedRunWarningSummary.WarningParserMismatchCount 0 "combined run preserves zero warning parser mismatches"

  $combinedWarningsArtifactText = (Get-WarningsArtifactLines -WarningRecords @($turbopackWarningRecords + $combinedFullSmokeWarningRecords + $gitDoubleCrlfWarningRecords) -WarningParserMismatchRecords @($turbopackParserMismatchRecords + $combinedFullSmokeParserMismatchRecords) -StageResults @($turbopackStageResult, $combinedFullSmokeStage, $gitDoubleCrlfWarningStage)) -join [Environment]::NewLine
  Assert-Contains $combinedWarningsArtifactText "Total warning count: 8" "warnings.txt reports the corrected eight-warning total"
  Assert-Contains $combinedWarningsArtifactText "Turbopack warning count: 6" "warnings.txt reports the corrected Turbopack total"
  Assert-Contains $combinedWarningsArtifactText "Generic warning count: 2" "warnings.txt reports the corrected generic warning total"
  Assert-NotContains $combinedWarningsArtifactText "WRAPPER_SPACE_STDERR_WARNING_MARKER" "warnings.txt excludes nested self-test warning markers"

  $failingSmokeStage = [pscustomobject]@{
    ExitCode = 0
    Result = "PASS"
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
  }
  Update-FullSmokeStageResult -StageResult $failingSmokeStage -FullSmokeAggregate ([pscustomobject]@{
    Passed = 58
    Failed = 1
    MissingRequired = 0
    MissingOptional = 0
    ElapsedText = "129.02s"
  })
  Assert-Equal $failingSmokeStage.Result "FAIL" "nonzero smoke failed count parses as FAIL"

  $missingRequiredSmokeStage = [pscustomobject]@{
    ExitCode = 0
    Result = "PASS"
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
  }
  Update-FullSmokeStageResult -StageResult $missingRequiredSmokeStage -FullSmokeAggregate ([pscustomobject]@{
    Passed = 58
    Failed = 0
    MissingRequired = 1
    MissingOptional = 0
    ElapsedText = "129.02s"
  })
  Assert-Equal $missingRequiredSmokeStage.Result "FAIL" "nonzero smoke missing-required count parses as FAIL"

  $missingOptionalOnlySmokeStage = [pscustomobject]@{
    ExitCode = 0
    Result = "FAIL"
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
  }
  Update-FullSmokeStageResult -StageResult $missingOptionalOnlySmokeStage -FullSmokeAggregate ([pscustomobject]@{
    Passed = 59
    Failed = 0
    MissingRequired = 0
    MissingOptional = 2
    ElapsedText = "129.02s"
  })
  Assert-Equal $missingOptionalOnlySmokeStage.Result "PASS" "missing optional checks alone do not fail validation"
} finally {
  if ((Test-Path $testRoot) -and ($testRoot -like (Join-Path $repoRoot "artifacts\wrapper-smoke-tests-*"))) {
    Remove-Item -LiteralPath $testRoot -Recurse -Force
  }
}

Write-Host "[PASS] CodexForge full validation wrapper quick smoke completed."
