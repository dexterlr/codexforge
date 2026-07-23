param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$SkipBuild,
  [switch]$SkipFullSmoke,
  [switch]$SkipCheckpointDocs,
  [switch]$SkipGitDiffCheck,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
$script:CodexForgeNativeProcessSequence = 0L

function Get-RepoRootFromScriptRoot {
  param([string]$ScriptRoot)

  $currentPath = [string](Resolve-Path (Join-Path $ScriptRoot ".."))
  while ($true) {
    if ((Test-Path (Join-Path $currentPath "package.json")) -and (Test-Path (Join-Path $currentPath "scripts"))) {
      return $currentPath
    }

    $parentPath = Split-Path -Parent $currentPath
    if ([string]::IsNullOrEmpty($parentPath) -or $parentPath -eq $currentPath) {
      break
    }

    $currentPath = [string](Resolve-Path $parentPath)
  }

  throw "[WRAPPER_EXCEPTION] Unable to discover repository root from $ScriptRoot"
}

function ConvertTo-QuotedCommandToken {
  param([AllowEmptyString()][string]$Value)

  if ($null -eq $Value) {
    return '""'
  }

  if (($Value.Length -eq 0) -or ($Value -match '[\s"]')) {
    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('"')

    $backslashCount = 0
    foreach ($character in $Value.ToCharArray()) {
      if ($character -eq '\') {
        $backslashCount += 1
        continue
      }

      if ($character -eq '"') {
        if ($backslashCount -gt 0) {
          [void]$builder.Append(('\' * ($backslashCount * 2)))
          $backslashCount = 0
        }

        [void]$builder.Append('\"')
        continue
      }

      if ($backslashCount -gt 0) {
        [void]$builder.Append(('\' * $backslashCount))
        $backslashCount = 0
      }

      [void]$builder.Append($character)
    }

    if ($backslashCount -gt 0) {
      [void]$builder.Append(('\' * ($backslashCount * 2)))
    }

    [void]$builder.Append('"')
    return $builder.ToString()
  }

  return $Value
}

function Get-CommandArgumentString {
  param([string[]]$Arguments)

  if (-not $Arguments -or $Arguments.Count -eq 0) {
    return ""
  }

  return (($Arguments | ForEach-Object { ConvertTo-QuotedCommandToken $_ }) -join " ")
}

function Format-CommandLine {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  $argumentText = Get-CommandArgumentString -Arguments $Arguments
  if ([string]::IsNullOrEmpty($argumentText)) {
    return (ConvertTo-QuotedCommandToken $Command)
  }

  return ((ConvertTo-QuotedCommandToken $Command) + " " + $argumentText)
}

function Resolve-ApplicationCommandPath {
  param([string]$CommandName)

  try {
    $commandInfo = Get-Command $CommandName -CommandType Application -ErrorAction Stop
  } catch {
    throw ("[WRAPPER_EXCEPTION] Unable to resolve application command '" + $CommandName + "' via Get-Command: " + $_.Exception.Message)
  }

  $commandPath = ""
  if ($commandInfo.PSObject.Properties.Match("Source").Count -gt 0) {
    $commandPath = [string]$commandInfo.Source
  }
  if ([string]::IsNullOrWhiteSpace($commandPath) -and $commandInfo.PSObject.Properties.Match("Path").Count -gt 0) {
    $commandPath = [string]$commandInfo.Path
  }
  if ([string]::IsNullOrWhiteSpace($commandPath)) {
    throw ("[WRAPPER_EXCEPTION] Unable to determine an application path for '" + $CommandName + "'.")
  }

  try {
    $resolvedCommandPath = [string](Resolve-Path -LiteralPath $commandPath -ErrorAction Stop)
  } catch {
    throw ("[WRAPPER_EXCEPTION] Resolved application command path is invalid for '" + $CommandName + "': " + $commandPath)
  }

  if (-not [System.IO.Path]::IsPathRooted($resolvedCommandPath)) {
    throw ("[WRAPPER_EXCEPTION] Resolved application command path is not absolute for '" + $CommandName + "': " + $resolvedCommandPath)
  }

  return $resolvedCommandPath
}

function Get-CommandProcessorPath {
  if (-not [string]::IsNullOrWhiteSpace($env:ComSpec)) {
    return $env:ComSpec
  }

  return "cmd.exe"
}

function Get-BatchCommandText {
  param(
    [string]$CommandPath,
    [string[]]$Arguments
  )

  $tokens = @((ConvertTo-QuotedCommandToken $CommandPath))
  foreach ($argument in @($Arguments)) {
    $tokens += (ConvertTo-QuotedCommandToken $argument)
  }

  return ($tokens -join " ")
}

function Get-CmdBatchLauncherArguments {
  param(
    [string]$CommandPath,
    [string[]]$Arguments
  )

  $launcherArguments = @("/d", "/s", "/c", "call", $CommandPath)
  foreach ($argument in @($Arguments)) {
    $launcherArguments += $argument
  }

  return $launcherArguments
}

function Format-CmdBatchLauncherArguments {
  param(
    [string]$CommandPath,
    [string[]]$Arguments
  )

  $launcherArguments = Get-CmdBatchLauncherArguments -CommandPath $CommandPath -Arguments $Arguments
  return (Get-CommandArgumentString -Arguments $launcherArguments)
}

function Format-DurationText {
  param([TimeSpan]$Duration)

  return ("{0:N2}s" -f $Duration.TotalSeconds)
}

function Write-TextFile {
  param(
    [string]$Path,
    [string[]]$Lines
  )

  if ($null -eq $Lines) {
    $Lines = @()
  }

  Set-Content -Path $Path -Value $Lines -Encoding UTF8
}

function Append-LogLine {
  param(
    [string]$Path,
    [AllowEmptyString()][string]$Line
  )

  Add-Content -Path $Path -Value $Line -Encoding UTF8
}

function Get-NormalizedLogLine {
  param([AllowEmptyString()][string]$Line)

  if ($null -eq $Line) {
    return ""
  }

  $normalizedLine = [string]$Line
  $ansiPattern = ([regex]::Escape([string][char]27) + '\[[0-?]*[ -/]*[@-~]')

  $normalizedLine = $normalizedLine.TrimEnd([char]13)
  $normalizedLine = [regex]::Replace($normalizedLine, $ansiPattern, "")

  while (($normalizedLine.Length -gt 0) -and ($normalizedLine[0] -eq [char]0xFEFF)) {
    $normalizedLine = $normalizedLine.Substring(1)
  }

  if ($normalizedLine -match '^\[(STDOUT|STDERR)\]\s?(.*)$') {
    $normalizedLine = [string]$Matches[2]
  }

  $normalizedLine = $normalizedLine.TrimEnd([char]13)
  $normalizedLine = [regex]::Replace($normalizedLine, $ansiPattern, "")

  while (($normalizedLine.Length -gt 0) -and ($normalizedLine[0] -eq [char]0xFEFF)) {
    $normalizedLine = $normalizedLine.Substring(1)
  }

  return $normalizedLine
}

function Get-NormalizedLogEntries {
  param([string[]]$Lines)

  $entries = New-Object System.Collections.ArrayList
  for ($lineIndex = 0; $lineIndex -lt @($Lines).Count; $lineIndex++) {
    [void]$entries.Add([pscustomobject]@{
      LineNumber = ($lineIndex + 1)
      Text = (Get-NormalizedLogLine -Line $Lines[$lineIndex])
    })
  }

  return @($entries)
}

function Test-IsFullSmokeAggregateHeaderLine {
  param([string]$Line)

  if ([string]::IsNullOrWhiteSpace($Line)) {
    return $false
  }

  return (
    ($Line -match '^=== CodexForge full smoke complete ===$') -or
    ($Line -match '^=== CodexForge current required release gate summary ===$') -or
    ($Line -match '^=== CodexForge .+ smoke group complete ===$')
  )
}

function Format-ProcessLogLine {
  param([pscustomobject]$Entry)

  return ("[{0}] {1}" -f $Entry.Stream, $Entry.Text)
}

function Receive-NativeProcessLogEntries {
  param(
    [object]$Queue,
    [string]$LogPath,
    [bool]$WriteToHost,
    [object]$Entries
  )

  $queuedEntry = $null
  $drainedEntries = New-Object System.Collections.ArrayList

  while ($Queue.TryDequeue([ref]$queuedEntry)) {
    [void]$drainedEntries.Add($queuedEntry)
    $queuedEntry = $null
  }

  if ($drainedEntries.Count -eq 0) {
    return $false
  }

  foreach ($entry in @($drainedEntries | Sort-Object -Property Sequence)) {
    [void]$Entries.Add($entry)

    if (-not [string]::IsNullOrEmpty($LogPath)) {
      Append-LogLine -Path $LogPath -Line (Format-ProcessLogLine -Entry $entry)
    }

    if ($WriteToHost) {
      Write-Host $entry.Text
    }
  }

  return $true
}

function Ensure-NativeProcessCollectorType {
  if ("CodexForgeNativeProcessCollector" -as [type]) {
    return
  }

  Add-Type -TypeDefinition @"
using System;
using System.Collections.Concurrent;
using System.Threading;

public sealed class CodexForgeNativeProcessLine
{
    public long Sequence { get; set; }
    public string Stream { get; set; }
    public string Text { get; set; }
}

public sealed class CodexForgeNativeProcessCollector
{
    private long _sequence = 0;

    public CodexForgeNativeProcessCollector()
    {
        Queue = new ConcurrentQueue<CodexForgeNativeProcessLine>();
    }

    public ConcurrentQueue<CodexForgeNativeProcessLine> Queue { get; private set; }

    public bool StdOutDone { get; private set; }

    public bool StdErrDone { get; private set; }

    public void OnOutputDataReceived(object sender, System.Diagnostics.DataReceivedEventArgs eventArgs)
    {
        if (eventArgs.Data == null)
        {
            StdOutDone = true;
            return;
        }

        Queue.Enqueue(new CodexForgeNativeProcessLine
        {
            Sequence = Interlocked.Increment(ref _sequence),
            Stream = "STDOUT",
            Text = eventArgs.Data
        });
    }

    public void OnErrorDataReceived(object sender, System.Diagnostics.DataReceivedEventArgs eventArgs)
    {
        if (eventArgs.Data == null)
        {
            StdErrDone = true;
            return;
        }

        Queue.Enqueue(new CodexForgeNativeProcessLine
        {
            Sequence = Interlocked.Increment(ref _sequence),
            Stream = "STDERR",
            Text = eventArgs.Data
        });
    }
}
"@
}

function Invoke-NativeProcess {
  param(
    [string]$WorkingDirectory,
    [string]$Command,
    [string[]]$Arguments,
    [string]$LogPath,
    [bool]$WriteToHost
  )

  Ensure-NativeProcessCollectorType

  $entryList = New-Object System.Collections.ArrayList
  $collector = New-Object CodexForgeNativeProcessCollector
  $process = $null
  $outputHandler = $null
  $errorHandler = $null
  $exitCode = 0

  try {
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $Command
    $startInfo.Arguments = Get-CommandArgumentString -Arguments $Arguments
    $startInfo.WorkingDirectory = $WorkingDirectory
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    $process.EnableRaisingEvents = $true

    $outputHandler = [System.Delegate]::CreateDelegate([System.Diagnostics.DataReceivedEventHandler], $collector, "OnOutputDataReceived")
    $errorHandler = [System.Delegate]::CreateDelegate([System.Diagnostics.DataReceivedEventHandler], $collector, "OnErrorDataReceived")

    $process.add_OutputDataReceived($outputHandler)
    $process.add_ErrorDataReceived($errorHandler)

    if (-not $process.Start()) {
      throw ("Failed to start process: " + $Command)
    }

    $process.BeginOutputReadLine()
    $process.BeginErrorReadLine()

    while (-not $process.WaitForExit(50)) {
      [void](Receive-NativeProcessLogEntries -Queue $collector.Queue -LogPath $LogPath -WriteToHost $WriteToHost -Entries $entryList)
    }

    $process.WaitForExit()

    while ($true) {
      $receivedEntries = Receive-NativeProcessLogEntries -Queue $collector.Queue -LogPath $LogPath -WriteToHost $WriteToHost -Entries $entryList
      if ($collector.StdOutDone -and $collector.StdErrDone -and (-not $receivedEntries)) {
        break
      }

      Start-Sleep -Milliseconds 25
    }

    $exitCode = $process.ExitCode
  } finally {
    if ($process) {
      if ($outputHandler) {
        $process.remove_OutputDataReceived($outputHandler)
      }

      if ($errorHandler) {
        $process.remove_ErrorDataReceived($errorHandler)
      }

      $process.Dispose()
    }
  }

  $entries = @($entryList)

  return [pscustomobject]@{
    ExitCode = $exitCode
    Entries = $entries
    Lines = @($entries | ForEach-Object { $_.Text })
    StdOutLines = @($entries | Where-Object { $_.Stream -eq "STDOUT" } | ForEach-Object { $_.Text })
    StdErrLines = @($entries | Where-Object { $_.Stream -eq "STDERR" } | ForEach-Object { $_.Text })
    Text = (@($entries | ForEach-Object { $_.Text }) -join [Environment]::NewLine)
  }
}

function New-StageDefinition {
  param(
    [string]$Name,
    [string]$Command,
    [string[]]$Arguments,
    [string]$DisplayCommand,
    [string]$LogFileName,
    [bool]$Required,
    [bool]$Skipped,
    [string]$SkipReason,
    [string]$ResolvedCommandPath = "",
    [string]$ActualLauncher = "",
    [string]$ActualArgumentsDisplay = ""
  )

  return [pscustomobject]@{
    Name = $Name
    Command = $Command
    Arguments = @($Arguments)
    DisplayCommand = $DisplayCommand
    LogFileName = $LogFileName
    Required = $Required
    Skipped = $Skipped
    SkipReason = $SkipReason
    ResolvedCommandPath = $ResolvedCommandPath
    ActualLauncher = $ActualLauncher
    ActualArgumentsDisplay = $ActualArgumentsDisplay
  }
}

function New-BuildStageDefinition {
  param(
    [bool]$Skipped,
    [string]$SkipReason
  )

  $resolvedNpmCommandPath = Resolve-ApplicationCommandPath -CommandName "npm.cmd"
  $commandProcessorPath = Get-CommandProcessorPath
  $buildArguments = @("run", "build")
  $actualArguments = Get-CmdBatchLauncherArguments -CommandPath $resolvedNpmCommandPath -Arguments $buildArguments
  $actualArgumentsDisplay = Format-CmdBatchLauncherArguments -CommandPath $resolvedNpmCommandPath -Arguments $buildArguments

  return (New-StageDefinition -Name "Build" -Command $commandProcessorPath -Arguments $actualArguments -DisplayCommand "npm.cmd run build" -LogFileName "01-build.log" -Required $true -Skipped $Skipped -SkipReason $SkipReason -ResolvedCommandPath $resolvedNpmCommandPath -ActualLauncher $commandProcessorPath -ActualArgumentsDisplay $actualArgumentsDisplay)
}

function New-IssueRecord {
  param(
    [string]$StageName,
    [string]$Kind,
    [string]$Text,
    [string]$LogPath,
    [Nullable[int]]$LineNumber,
    [string]$Category = "",
    [string]$SourceFile = "",
    [Nullable[int]]$SourceLine = $null,
    [Nullable[int]]$SourceColumn = $null,
    [string]$PrimaryMessage = "",
    [string]$Detail = "",
    [Nullable[int]]$DeclaredWarningCount = $null,
    [Nullable[int]]$ParsedWarningCount = $null,
    [Nullable[int]]$SectionLineNumber = $null
  )

  return [pscustomobject]@{
    StageName = $StageName
    Kind = $Kind
    Text = $Text
    LogPath = $LogPath
    LineNumber = $LineNumber
    Category = $Category
    SourceFile = $SourceFile
    SourceLine = $SourceLine
    SourceColumn = $SourceColumn
    PrimaryMessage = $PrimaryMessage
    Detail = $Detail
    DeclaredWarningCount = $DeclaredWarningCount
    ParsedWarningCount = $ParsedWarningCount
    SectionLineNumber = $SectionLineNumber
  }
}

function Invoke-CapturedCommand {
  param(
    [string]$WorkingDirectory,
    [string]$Command,
    [string[]]$Arguments
  )

  $lines = @()
  $stdoutLines = @()
  $stderrLines = @()
  $exitCode = 0

  try {
    $capture = Invoke-NativeProcess -WorkingDirectory $WorkingDirectory -Command $Command -Arguments $Arguments -LogPath "" -WriteToHost $false
    $lines = @($capture.Lines)
    $stdoutLines = @($capture.StdOutLines)
    $stderrLines = @($capture.StdErrLines)
    $exitCode = $capture.ExitCode
  } catch {
    $exitCode = 1
    $lines = @("[WRAPPER_EXCEPTION] " + $_.Exception.Message)
  }

  return [pscustomobject]@{
    ExitCode = $exitCode
    Lines = @($lines)
    StdOutLines = @($stdoutLines)
    StdErrLines = @($stderrLines)
    Text = (@($lines) -join [Environment]::NewLine)
  }
}

function Invoke-ValidationStage {
  param(
    [pscustomobject]$Stage,
    [string]$WorkingDirectory,
    [string]$LogsDirectory
  )

  if ($Stage.Skipped) {
    return [pscustomobject]@{
      Name = $Stage.Name
      Command = $Stage.Command
      Arguments = @($Stage.Arguments)
      DisplayCommand = $Stage.DisplayCommand
      ResolvedCommandPath = $Stage.ResolvedCommandPath
      ActualLauncher = $Stage.ActualLauncher
      ActualArgumentsDisplay = $Stage.ActualArgumentsDisplay
      Required = $Stage.Required
      Skipped = $true
      SkipReason = $Stage.SkipReason
      StartedAt = $null
      FinishedAt = $null
      StartedAtText = ""
      FinishedAtText = ""
      Duration = [TimeSpan]::Zero
      DurationText = "0.00s"
      DurationSeconds = 0
      ExitCode = $null
      Result = "SKIPPED"
      LogPath = ""
      SmokePassed = $null
      SmokeFailed = $null
      SmokeMissingRequired = $null
      SmokeMissingOptional = $null
      SmokeElapsedText = ""
      WarningCount = 0
      TurbopackWarningCount = 0
      TurbopackDeclaredWarningCount = 0
      TurbopackParsedWarningCount = 0
      GenericWarningCount = 0
      WarningParserMismatchCount = 0
      ErrorAndFailureCount = 0
    }
  }

  $startedAt = Get-Date
  $logPath = Join-Path $LogsDirectory $Stage.LogFileName
  $commandLine = Format-CommandLine -Command $Stage.Command -Arguments $Stage.Arguments

  Write-TextFile -Path $logPath -Lines @(
    ("Stage: " + $Stage.Name),
    ("Command: " + $commandLine),
    ("Started: " + $startedAt.ToString("o")),
    ""
  )

  Write-Host ""
  Write-Host ("=== Stage: {0} ===" -f $Stage.Name)
  Write-Host ("Command: {0}" -f $commandLine)
  Write-Host ("Started: {0}" -f $startedAt.ToString("o"))
  Write-Host ""

  try {
    $processResult = Invoke-NativeProcess -WorkingDirectory $WorkingDirectory -Command $Stage.Command -Arguments $Stage.Arguments -LogPath $logPath -WriteToHost $true
    $exitCode = $processResult.ExitCode
  } catch {
    $exitCode = 1
    $wrapperLine = "[WRAPPER_EXCEPTION] " + $_.Exception.Message
    Append-LogLine -Path $logPath -Line $wrapperLine
    Write-Host $wrapperLine
  }

  $finishedAt = Get-Date
  $duration = $finishedAt - $startedAt
  $result = "PASS"
  if ($exitCode -ne 0) {
    $result = "FAIL"
  }

  $footerLines = @(
    "",
    ("Finished: " + $finishedAt.ToString("o")),
    ("Duration: " + (Format-DurationText -Duration $duration)),
    ("Exit code: " + $exitCode),
    ("Result: " + $result)
  )
  foreach ($footerLine in $footerLines) {
    Append-LogLine -Path $logPath -Line $footerLine
  }

  Write-Host ""
  Write-Host ("Finished: {0}" -f $finishedAt.ToString("o"))
  Write-Host ("Duration: {0}" -f (Format-DurationText -Duration $duration))
  Write-Host ("Exit code: {0}" -f $exitCode)
  Write-Host ("Result: {0}" -f $result)

  return [pscustomobject]@{
    Name = $Stage.Name
    Command = $Stage.Command
    Arguments = @($Stage.Arguments)
    DisplayCommand = $Stage.DisplayCommand
    ResolvedCommandPath = $Stage.ResolvedCommandPath
    ActualLauncher = $Stage.ActualLauncher
    ActualArgumentsDisplay = $Stage.ActualArgumentsDisplay
    Required = $Stage.Required
    Skipped = $false
    SkipReason = ""
    StartedAt = $startedAt
    FinishedAt = $finishedAt
    StartedAtText = $startedAt.ToString("o")
    FinishedAtText = $finishedAt.ToString("o")
    Duration = $duration
    DurationText = Format-DurationText -Duration $duration
    DurationSeconds = [math]::Round($duration.TotalSeconds, 3)
    ExitCode = $exitCode
    Result = $result
    LogPath = $logPath
    SmokePassed = $null
    SmokeFailed = $null
    SmokeMissingRequired = $null
    SmokeMissingOptional = $null
    SmokeElapsedText = ""
    WarningCount = 0
    TurbopackWarningCount = 0
    TurbopackDeclaredWarningCount = 0
    TurbopackParsedWarningCount = 0
    GenericWarningCount = 0
    WarningParserMismatchCount = 0
    ErrorAndFailureCount = 0
  }
}

function Try-ParseFullSmokeAggregateBlock {
  param(
    [object[]]$NormalizedEntries,
    [int]$HeaderIndex
  )

  if ((-not $NormalizedEntries) -or ($HeaderIndex -lt 0) -or ($HeaderIndex -ge $NormalizedEntries.Count)) {
    return $null
  }

  $headerEntry = $NormalizedEntries[$HeaderIndex]
  $summary = [ordered]@{
    Header = $headerEntry.Text.Trim()
    HeaderLineNumber = $headerEntry.LineNumber
    SourceLineNumber = $headerEntry.LineNumber
    Passed = $null
    Failed = $null
    MissingRequired = $null
    MissingOptional = $null
    ElapsedText = ""
    ElapsedSeconds = $null
  }

  for ($lineIndex = $HeaderIndex + 1; $lineIndex -lt $NormalizedEntries.Count; $lineIndex++) {
    $lineEntry = $NormalizedEntries[$lineIndex]
    $line = $lineEntry.Text.Trim()

    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    if (Test-IsFullSmokeAggregateHeaderLine -Line $line) {
      break
    }

    if ($line -match '^\s*(?:Passed|Pass count):\s*(\d+)\s*$') {
      $summary.Passed = [int]$Matches[1]
      $summary.SourceLineNumber = $lineEntry.LineNumber
      continue
    }

    if ($line -match '^\s*(?:Failed|Fail count):\s*(\d+)\s*$') {
      $summary.Failed = [int]$Matches[1]
      $summary.SourceLineNumber = $lineEntry.LineNumber
      continue
    }

    if ($line -match '^\s*Missing required:\s*(\d+)\s*$') {
      $summary.MissingRequired = [int]$Matches[1]
      $summary.SourceLineNumber = $lineEntry.LineNumber
      continue
    }

    if ($line -match '^\s*Missing optional:\s*(\d+)\s*$') {
      $summary.MissingOptional = [int]$Matches[1]
      $summary.SourceLineNumber = $lineEntry.LineNumber
      continue
    }

    if ($line -match '^\s*Elapsed:\s*(.+?)\s*$') {
      $summary.ElapsedText = $Matches[1].Trim()
      $summary.SourceLineNumber = $lineEntry.LineNumber
      if ($summary.ElapsedText -match '^([0-9]+(?:\.[0-9]+)?)s$') {
        $summary.ElapsedSeconds = [double]$Matches[1]
      }

      if (
        ($summary.Passed -is [int]) -and
        ($summary.Failed -is [int]) -and
        ($summary.MissingRequired -is [int]) -and
        ($summary.MissingOptional -is [int]) -and
        (-not [string]::IsNullOrWhiteSpace($summary.ElapsedText))
      ) {
        return [pscustomobject]$summary
      }

      continue
    }

    if ($line -match '^(?:Finished|Duration|Exit code|Result):') {
      if (
        ($summary.Passed -is [int]) -and
        ($summary.Failed -is [int]) -and
        ($summary.MissingRequired -is [int]) -and
        ($summary.MissingOptional -is [int]) -and
        (-not [string]::IsNullOrWhiteSpace($summary.ElapsedText))
      ) {
        return [pscustomobject]$summary
      }

      break
    }
  }

  if (
    ($null -eq $summary.Passed) -or
    ($null -eq $summary.Failed) -or
    ($null -eq $summary.MissingRequired) -or
    ($null -eq $summary.MissingOptional) -or
    [string]::IsNullOrWhiteSpace($summary.ElapsedText)
  ) {
    return $null
  }

  return [pscustomobject]$summary
}

function Get-FullSmokeAggregateFromLog {
  param([string]$LogPath)

  if (-not (Test-Path $LogPath)) {
    return $null
  }

  $lines = @(Get-Content -Path $LogPath)
  $normalizedEntries = @(Get-NormalizedLogEntries -Lines $lines)
  $bestSummary = $null

  for ($index = $normalizedEntries.Count - 1; $index -ge 0; $index--) {
    $line = $normalizedEntries[$index].Text.Trim()
    if (-not (Test-IsFullSmokeAggregateHeaderLine -Line $line)) {
      continue
    }

    $parsedSummary = Try-ParseFullSmokeAggregateBlock -NormalizedEntries $normalizedEntries -HeaderIndex $index
    if ($parsedSummary -and (($null -eq $bestSummary) -or ($parsedSummary.SourceLineNumber -gt $bestSummary.SourceLineNumber))) {
      $bestSummary = $parsedSummary
    }
  }

  return $bestSummary
}

function Update-FullSmokeStageResult {
  param(
    [pscustomobject]$StageResult,
    [pscustomobject]$FullSmokeAggregate
  )

  if ($null -eq $StageResult -or $null -eq $FullSmokeAggregate) {
    return
  }

  $StageResult.SmokePassed = $FullSmokeAggregate.Passed
  $StageResult.SmokeFailed = $FullSmokeAggregate.Failed
  $StageResult.SmokeMissingRequired = $FullSmokeAggregate.MissingRequired
  $StageResult.SmokeMissingOptional = $FullSmokeAggregate.MissingOptional
  $StageResult.SmokeElapsedText = $FullSmokeAggregate.ElapsedText

  if (($StageResult.ExitCode -eq 0) -and ($FullSmokeAggregate.Failed -eq 0) -and ($FullSmokeAggregate.MissingRequired -eq 0)) {
    $StageResult.Result = "PASS"
    return
  }

  $StageResult.Result = "FAIL"
}

function Set-StageWarningSummaryProperties {
  param(
    [pscustomobject]$StageResult,
    [int]$WarningCount,
    [int]$TurbopackWarningCount,
    [int]$TurbopackDeclaredWarningCount,
    [int]$TurbopackParsedWarningCount,
    [int]$GenericWarningCount,
    [int]$WarningParserMismatchCount
  )

  if ($null -eq $StageResult) {
    return
  }

  $propertyMap = [ordered]@{
    WarningCount = $WarningCount
    TurbopackWarningCount = $TurbopackWarningCount
    TurbopackDeclaredWarningCount = $TurbopackDeclaredWarningCount
    TurbopackParsedWarningCount = $TurbopackParsedWarningCount
    GenericWarningCount = $GenericWarningCount
    WarningParserMismatchCount = $WarningParserMismatchCount
  }

  foreach ($propertyName in $propertyMap.Keys) {
    if ($StageResult.PSObject.Properties.Match($propertyName).Count -gt 0) {
      $StageResult.$propertyName = $propertyMap[$propertyName]
      continue
    }

    $StageResult | Add-Member -NotePropertyName $propertyName -NotePropertyValue $propertyMap[$propertyName]
  }
}

function Get-LogLineStream {
  param([AllowEmptyString()][string]$Line)

  if ($null -eq $Line) {
    return ""
  }

  if ([string]$Line -match '^\[(STDOUT|STDERR)\]\s?') {
    return [string]$Matches[1]
  }

  return ""
}

function Test-IsWrapperSelfTestStartLine {
  param([string]$Line)

  return ($Line -eq "[CODEXFORGE_WRAPPER_SELF_TEST_BEGIN]")
}

function Test-IsWrapperSelfTestEndLine {
  param([string]$Line)

  return ($Line -eq "[CODEXFORGE_WRAPPER_SELF_TEST_END]")
}

function Test-IsKnownWrapperSelfTestNoiseLine {
  param([string]$Line)

  if ([string]::IsNullOrWhiteSpace($Line)) {
    return $false
  }

  $trimmedLine = $Line.Trim()
  return (
    ($trimmedLine -match 'WRAPPER_SPACE_STDERR_WARNING_MARKER') -or
    ($trimmedLine -eq "native warning from stderr") -or
    ($trimmedLine -eq "native stderr only") -or
    (Test-IsWrapperSelfTestStartLine -Line $trimmedLine) -or
    (Test-IsWrapperSelfTestEndLine -Line $trimmedLine)
  )
}

function Test-ShouldParseTurbopackWarningsForStage {
  param([pscustomobject]$StageResult)

  if ($null -eq $StageResult) {
    return $false
  }

  return ($StageResult.Name -eq "Build")
}

function Test-IsTurbopackWarningLocationLine {
  param([string]$Line)

  return ($Line -match '^(?<SourceFile>\./.+?):(?<SourceLine>\d+):(?<SourceColumn>\d+)$')
}

function Test-IsTurbopackWarningSectionTerminator {
  param([string]$Line)

  if ([string]::IsNullOrWhiteSpace($Line)) {
    return $false
  }

  if ($Line -match '^Turbopack build encountered \d+ warnings?:$') {
    return $true
  }

  if ($Line -match '^(?:Finished|Duration|Exit code|Result):') {
    return $true
  }

  if ($Line -match '^=== .+ ===$') {
    return $true
  }

  return $false
}

function Get-TurbopackWarningSection {
  param(
    [pscustomobject]$StageResult,
    [string[]]$Lines,
    [int]$HeaderIndex
  )

  $headerLine = (Get-NormalizedLogLine -Line $Lines[$HeaderIndex]).Trim()
  $declaredWarningCount = 0
  if ($headerLine -match '^Turbopack build encountered (\d+) warnings?:$') {
    $declaredWarningCount = [int]$Matches[1]
  }

  $records = @()
  $index = $HeaderIndex + 1
  $locationPattern = '^(?<SourceFile>\./.+?):(?<SourceLine>\d+):(?<SourceColumn>\d+)$'

  while ($index -lt $Lines.Count) {
    $rawLine = [string]$Lines[$index]
    $normalizedLine = Get-NormalizedLogLine -Line $rawLine
    $trimmedLine = $normalizedLine.Trim()
    $lineStream = Get-LogLineStream -Line $rawLine

    if ([string]::IsNullOrWhiteSpace($trimmedLine)) {
      $index += 1
      continue
    }

    if ($lineStream -eq "STDOUT") {
      $index += 1
      continue
    }

    if (Test-IsTurbopackWarningSectionTerminator -Line $trimmedLine) {
      break
    }

    $locationMatch = [regex]::Match($trimmedLine, $locationPattern)
    if (-not $locationMatch.Success) {
      break
    }

    $sourceFile = ($locationMatch.Groups["SourceFile"].Value -replace '^\./', '')
    $sourceLine = [int]$locationMatch.Groups["SourceLine"].Value
    $sourceColumn = [int]$locationMatch.Groups["SourceColumn"].Value
    $locationLineNumber = $index + 1
    $index += 1

    $blockLines = @()
    while ($index -lt $Lines.Count) {
      $blockRawLine = [string]$Lines[$index]
      $blockNormalizedLine = Get-NormalizedLogLine -Line $blockRawLine
      $blockTrimmedLine = $blockNormalizedLine.Trim()
      $blockStream = Get-LogLineStream -Line $blockRawLine

      if ([string]::IsNullOrWhiteSpace($blockTrimmedLine)) {
        $peekIndex = $index + 1
        while ($peekIndex -lt $Lines.Count) {
          $peekRawLine = [string]$Lines[$peekIndex]
          $peekTrimmedLine = (Get-NormalizedLogLine -Line $peekRawLine).Trim()
          $peekStream = Get-LogLineStream -Line $peekRawLine

          if ($peekStream -eq "STDOUT") {
            $peekIndex += 1
            continue
          }

          if (-not [string]::IsNullOrWhiteSpace($peekTrimmedLine)) {
            break
          }

          $peekIndex += 1
        }

        if ($peekIndex -ge $Lines.Count) {
          $index = $peekIndex
          break
        }

        if (
          (Test-IsTurbopackWarningSectionTerminator -Line $peekTrimmedLine) -or
          ([regex]::IsMatch($peekTrimmedLine, $locationPattern)) -or
          ($peekTrimmedLine -match '^Turbopack build encountered \d+ warnings?:$')
        ) {
          $index = $peekIndex
          break
        }

        $index = $peekIndex
        continue
      }

      if ($blockStream -eq "STDOUT") {
        $index += 1
        continue
      }

      if (
        (Test-IsTurbopackWarningSectionTerminator -Line $blockTrimmedLine) -or
        ([regex]::IsMatch($blockTrimmedLine, $locationPattern)) -or
        ($blockTrimmedLine -match '^Turbopack build encountered \d+ warnings?:$')
      ) {
        break
      }

      $blockLines += $blockTrimmedLine
      $index += 1
    }

    $primaryMessage = ""
    $detailLines = @()
    $importTraceActive = $false

    if ($blockLines.Count -gt 0) {
      $primaryMessage = $blockLines[0]
    }

    foreach ($blockLine in @($blockLines | Select-Object -Skip 1)) {
      if ([string]::IsNullOrWhiteSpace($blockLine)) {
        $importTraceActive = $false
        continue
      }

      if ($blockLine -match '^Import trace\b') {
        $importTraceActive = $true
        continue
      }

      if ($importTraceActive) {
        continue
      }

      if ($blockLine -match '^Overly broad patterns\b') {
        continue
      }

      if (($blockLine -eq $primaryMessage) -or ($detailLines -contains $blockLine)) {
        continue
      }

      $detailLines += $blockLine
    }

    if ([string]::IsNullOrWhiteSpace($primaryMessage)) {
      continue
    }

    $detailText = ""
    if ($detailLines.Count -gt 0) {
      $detailText = ($detailLines -join " ")
    }

    $records += (New-IssueRecord -StageName $StageResult.Name -Kind "WARNING" -Text $primaryMessage -LogPath $StageResult.LogPath -LineNumber $locationLineNumber -Category "Turbopack" -SourceFile $sourceFile -SourceLine $sourceLine -SourceColumn $sourceColumn -PrimaryMessage $primaryMessage -Detail $detailText)
  }

  return [pscustomobject]@{
    DeclaredWarningCount = $declaredWarningCount
    ParsedWarningCount = @($records).Count
    HeaderLineNumber = ($HeaderIndex + 1)
    NextIndex = $index
    Records = @($records)
  }
}

function Get-StageIssueRecords {
  param([pscustomobject]$StageResult)

  $records = @()

  if ($StageResult.Skipped -or [string]::IsNullOrEmpty($StageResult.LogPath) -or (-not (Test-Path $StageResult.LogPath))) {
    Set-StageWarningSummaryProperties -StageResult $StageResult -WarningCount 0 -TurbopackWarningCount 0 -TurbopackDeclaredWarningCount 0 -TurbopackParsedWarningCount 0 -GenericWarningCount 0 -WarningParserMismatchCount 0
    return $records
  }

  $lines = @(Get-Content -Path $StageResult.LogPath)
  $turbopackDeclaredWarningCount = 0
  $turbopackParsedWarningCount = 0
  $genericWarningCount = 0
  $warningParserMismatchCount = 0
  $insideWrapperSelfTest = $false
  $shouldParseTurbopackWarnings = Test-ShouldParseTurbopackWarningsForStage -StageResult $StageResult

  for ($index = 0; $index -lt $lines.Count;) {
    $line = [string]$lines[$index]
    $normalizedLine = Get-NormalizedLogLine -Line $line
    $trimmed = $normalizedLine.Trim()
    $kind = $null

    if (Test-IsWrapperSelfTestStartLine -Line $trimmed) {
      $insideWrapperSelfTest = $true
      $index += 1
      continue
    }

    if (Test-IsWrapperSelfTestEndLine -Line $trimmed) {
      $insideWrapperSelfTest = $false
      $index += 1
      continue
    }

    if ($insideWrapperSelfTest) {
      if (Test-IsKnownWrapperSelfTestNoiseLine -Line $trimmed) {
        $index += 1
        continue
      }

      $index += 1
      continue
    }

    if (($StageResult.Name -eq "Full smoke") -and (Test-IsKnownWrapperSelfTestNoiseLine -Line $trimmed)) {
      $index += 1
      continue
    }

    if ($shouldParseTurbopackWarnings -and ($trimmed -match '^Turbopack build encountered \d+ warnings?:$')) {
      $turbopackSection = Get-TurbopackWarningSection -StageResult $StageResult -Lines $lines -HeaderIndex $index
      $records += @($turbopackSection.Records)
      $turbopackDeclaredWarningCount += $turbopackSection.DeclaredWarningCount
      $turbopackParsedWarningCount += $turbopackSection.ParsedWarningCount

      if ($turbopackSection.DeclaredWarningCount -ne $turbopackSection.ParsedWarningCount) {
        $warningParserMismatchCount += 1
        $records += (New-IssueRecord -StageName $StageResult.Name -Kind "WARNING_PARSER_MISMATCH" -Text ("Turbopack declared " + $turbopackSection.DeclaredWarningCount + " warnings but parsed " + $turbopackSection.ParsedWarningCount + " warning blocks.") -LogPath $StageResult.LogPath -LineNumber $turbopackSection.HeaderLineNumber -Category "Turbopack" -PrimaryMessage ("Turbopack declared " + $turbopackSection.DeclaredWarningCount + " warnings but parsed " + $turbopackSection.ParsedWarningCount + " warning blocks.") -DeclaredWarningCount $turbopackSection.DeclaredWarningCount -ParsedWarningCount $turbopackSection.ParsedWarningCount -SectionLineNumber $turbopackSection.HeaderLineNumber)
      }

      if ($turbopackSection.NextIndex -le $index) {
        $index += 1
      } else {
        $index = $turbopackSection.NextIndex
      }

      continue
    }

    if ($trimmed -match '^\[FAIL\]') {
      $kind = "FAIL"
    } elseif ($trimmed -match '^\[FAILED\]') {
      $kind = "FAILED"
    } elseif ($trimmed -match '^\[MISSING_REQUIRED\]') {
      $kind = "MISSING_REQUIRED"
    } elseif ($trimmed -match '^\[MISSING_OPTIONAL\]') {
      $kind = "MISSING_OPTIONAL"
    } elseif ($trimmed -match '^\[WRAPPER_EXCEPTION\]') {
      $kind = "WRAPPER_EXCEPTION"
    } elseif ($normalizedLine -match 'npm ERR!') {
      $kind = "NPM_ERR"
    } elseif ($trimmed -match '^fatal:') {
      $kind = "FATAL"
    } elseif ($trimmed -match '^Type error:') {
      $kind = "TYPE_ERROR"
    } elseif ($trimmed -match '^error:') {
      $kind = "ERROR"
    } elseif ($trimmed -match '^Build failed\b') {
      $kind = "BUILD_FAILED"
    } elseif ($trimmed -match '^unhandled exception\b') {
      $kind = "UNHANDLED_EXCEPTION"
    } elseif ($trimmed -match '^\[WARN\]') {
      $kind = "WARNING"
    } elseif ($trimmed -match '^warning:') {
      $kind = "WARNING"
    } elseif ($trimmed -match '^npm WARN\b') {
      $kind = "WARNING"
    } elseif ($trimmed -match '(?i)\b(?:LF will be replaced by CRLF|CRLF will be replaced by LF)\b') {
      $kind = "WARNING"
    } elseif (($line -match '^\[STDERR\]\s+') -and ($trimmed -match '(?i)\bwarning(?:s)?\b')) {
      $kind = "WARNING"
    }

    if ($null -eq $kind) {
      $index += 1
      continue
    }

    if ($kind -eq "WARNING") {
      $genericWarningCount += 1
      $records += (New-IssueRecord -StageName $StageResult.Name -Kind $kind -Text $trimmed -LogPath $StageResult.LogPath -LineNumber ($index + 1) -Category "Generic" -PrimaryMessage $trimmed)
      $index += 1
      continue
    }

    $records += (New-IssueRecord -StageName $StageResult.Name -Kind $kind -Text $line -LogPath $StageResult.LogPath -LineNumber ($index + 1))
    $index += 1
  }

  $turbopackWarningCount = [math]::Max($turbopackDeclaredWarningCount, $turbopackParsedWarningCount)
  Set-StageWarningSummaryProperties -StageResult $StageResult -WarningCount ($genericWarningCount + $turbopackWarningCount) -TurbopackWarningCount $turbopackWarningCount -TurbopackDeclaredWarningCount $turbopackDeclaredWarningCount -TurbopackParsedWarningCount $turbopackParsedWarningCount -GenericWarningCount $genericWarningCount -WarningParserMismatchCount $warningParserMismatchCount

  return $records
}

function Get-WarningLocationText {
  param([pscustomobject]$Record)

  if (-not [string]::IsNullOrWhiteSpace($Record.SourceFile) -and ($Record.SourceLine -is [int]) -and ($Record.SourceColumn -is [int])) {
    return ($Record.SourceFile + ":" + $Record.SourceLine + ":" + $Record.SourceColumn)
  }

  if ($Record.LineNumber) {
    return ("log line " + $Record.LineNumber)
  }

  return ""
}

function Format-RecordLine {
  param([pscustomobject]$Record)

  if ($Record.Kind -eq "WARNING") {
    $category = "Generic"
    if (-not [string]::IsNullOrWhiteSpace($Record.Category)) {
      $category = $Record.Category
    }

    $warningLocation = Get-WarningLocationText -Record $Record
    $warningMessage = $Record.Text
    if (-not [string]::IsNullOrWhiteSpace($Record.PrimaryMessage)) {
      $warningMessage = $Record.PrimaryMessage
    }

    if (-not [string]::IsNullOrWhiteSpace($warningLocation)) {
      return ("[WARNING] {0} | {1} | {2} | {3}" -f $Record.StageName, $category, $warningLocation, $warningMessage)
    }

    return ("[WARNING] {0} | {1} | {2}" -f $Record.StageName, $category, $warningMessage)
  }

  if ($Record.Kind -eq "WARNING_PARSER_MISMATCH") {
    $location = ""
    if ($Record.SectionLineNumber) {
      $location = ("warning section starts at log line " + $Record.SectionLineNumber)
    } elseif ($Record.LineNumber) {
      $location = ("log line " + $Record.LineNumber)
    }

    if ([string]::IsNullOrWhiteSpace($location)) {
      return ("[WARNING_PARSER_MISMATCH] {0} | {1}" -f $Record.StageName, $Record.Text)
    }

    return ("[WARNING_PARSER_MISMATCH] {0} | {1} | {2}" -f $Record.StageName, $Record.Text, $location)
  }

  $location = ""
  if ($Record.LineNumber) {
    $location = " (line " + $Record.LineNumber + ")"
  }

  return ("[{0}] {1}{2} - {3}" -f $Record.Kind, $Record.StageName, $location, $Record.Text)
}

function Get-RecordTextLines {
  param([array]$Records)

  if (-not $Records -or $Records.Count -eq 0) {
    return @()
  }

  $lines = @()
  foreach ($record in $Records) {
    $lines += (Format-RecordLine -Record $record)
  }

  return $lines
}

function Get-StageWarningSummary {
  param(
    [array]$StageResults,
    [array]$WarningRecords,
    [array]$WarningParserMismatchRecords
  )

  $stageCounts = @()
  $turbopackWarningCount = 0
  $turbopackDeclaredWarningCount = 0
  $turbopackParsedWarningCount = 0
  $genericWarningCount = 0

  foreach ($stageResult in @($StageResults)) {
    $stageWarningCount = 0
    $stageTurbopackWarningCount = 0
    $stageTurbopackDeclaredWarningCount = 0
    $stageTurbopackParsedWarningCount = 0
    $stageGenericWarningCount = 0

    if ($stageResult.PSObject.Properties.Match("WarningCount").Count -gt 0) {
      $stageWarningCount = [int]$stageResult.WarningCount
    }
    if ($stageResult.PSObject.Properties.Match("TurbopackWarningCount").Count -gt 0) {
      $stageTurbopackWarningCount = [int]$stageResult.TurbopackWarningCount
    }
    if ($stageResult.PSObject.Properties.Match("TurbopackDeclaredWarningCount").Count -gt 0) {
      $stageTurbopackDeclaredWarningCount = [int]$stageResult.TurbopackDeclaredWarningCount
    }
    if ($stageResult.PSObject.Properties.Match("TurbopackParsedWarningCount").Count -gt 0) {
      $stageTurbopackParsedWarningCount = [int]$stageResult.TurbopackParsedWarningCount
    }
    if ($stageResult.PSObject.Properties.Match("GenericWarningCount").Count -gt 0) {
      $stageGenericWarningCount = [int]$stageResult.GenericWarningCount
    }

    $turbopackWarningCount += $stageTurbopackWarningCount
    $turbopackDeclaredWarningCount += $stageTurbopackDeclaredWarningCount
    $turbopackParsedWarningCount += $stageTurbopackParsedWarningCount
    $genericWarningCount += $stageGenericWarningCount

    if ($stageWarningCount -gt 0) {
      $stageCounts += [pscustomobject]@{
        StageName = $stageResult.Name
        Count = $stageWarningCount
      }
    }
  }

  if (($stageCounts.Count -eq 0) -and $WarningRecords -and ($WarningRecords.Count -gt 0)) {
    $groupedStageWarnings = @($WarningRecords | Group-Object -Property StageName | Sort-Object -Property Name)
    foreach ($groupedStageWarning in $groupedStageWarnings) {
      $stageCounts += [pscustomobject]@{
        StageName = $groupedStageWarning.Name
        Count = $groupedStageWarning.Count
      }
    }

    $turbopackWarningCount = @($WarningRecords | Where-Object { $_.Category -eq "Turbopack" }).Count
    $turbopackDeclaredWarningCount = $turbopackWarningCount
    $turbopackParsedWarningCount = $turbopackWarningCount
    $genericWarningCount = @($WarningRecords | Where-Object { $_.Category -ne "Turbopack" }).Count
  }

  $categoryCounts = @()
  if ($turbopackWarningCount -gt 0) {
    $categoryCounts += [pscustomobject]@{
      Category = "Turbopack"
      Count = $turbopackWarningCount
    }
  }
  if ($genericWarningCount -gt 0) {
    $categoryCounts += [pscustomobject]@{
      Category = "Generic"
      Count = $genericWarningCount
    }
  }

  return [pscustomobject]@{
    TotalWarningCount = ($turbopackWarningCount + $genericWarningCount)
    TurbopackWarningCount = $turbopackWarningCount
    TurbopackDeclaredWarningCount = $turbopackDeclaredWarningCount
    TurbopackParsedWarningCount = $turbopackParsedWarningCount
    GenericWarningCount = $genericWarningCount
    WarningParserMismatchCount = @($WarningParserMismatchRecords).Count
    StageCounts = @($stageCounts)
    CategoryCounts = @($categoryCounts)
  }
}

function Get-WarningRecordObjects {
  param([array]$Records)

  if (-not $Records -or $Records.Count -eq 0) {
    return @()
  }

  $objects = @()
  foreach ($record in $Records) {
    $objects += [pscustomobject][ordered]@{
      stage = $record.StageName
      kind = $record.Kind
      category = $record.Category
      sourceFile = $record.SourceFile
      sourceLine = $record.SourceLine
      sourceColumn = $record.SourceColumn
      primaryMessage = $record.PrimaryMessage
      detail = $record.Detail
      logPath = $record.LogPath
      logLineNumber = $record.LineNumber
      declaredWarningCount = $record.DeclaredWarningCount
      parsedWarningCount = $record.ParsedWarningCount
      warningSectionLineNumber = $record.SectionLineNumber
      text = (Format-RecordLine -Record $record)
    }
  }

  return $objects
}

function Get-WarningsArtifactLines {
  param(
    [array]$WarningRecords,
    [array]$WarningParserMismatchRecords,
    [array]$StageResults
  )

  $warningSummary = Get-StageWarningSummary -StageResults $StageResults -WarningRecords $WarningRecords -WarningParserMismatchRecords $WarningParserMismatchRecords
  $lines = @()
  $lines += ("Total warning count: " + $warningSummary.TotalWarningCount)
  $lines += ("Turbopack warning count: " + $warningSummary.TurbopackWarningCount)
  $lines += ("Generic warning count: " + $warningSummary.GenericWarningCount)
  $lines += ("Turbopack declared warning count: " + $warningSummary.TurbopackDeclaredWarningCount)
  $lines += ("Turbopack parsed warning record count: " + $warningSummary.TurbopackParsedWarningCount)
  $lines += ("Warning parser mismatch count: " + $warningSummary.WarningParserMismatchCount)
  $lines += ""
  $lines += "Warning count by stage:"
  if ($warningSummary.StageCounts.Count -gt 0) {
    foreach ($stageCount in $warningSummary.StageCounts) {
      $lines += ("- " + $stageCount.StageName + ": " + $stageCount.Count)
    }
  } else {
    $lines += "none"
  }
  $lines += ""
  $lines += "Warning count by category:"
  if ($warningSummary.CategoryCounts.Count -gt 0) {
    foreach ($categoryCount in $warningSummary.CategoryCounts) {
      $lines += ("- " + $categoryCount.Category + ": " + $categoryCount.Count)
    }
  } else {
    $lines += "none"
  }
  $lines += ""
  $lines += "All individual warnings:"
  if ($WarningRecords.Count -gt 0) {
    $lines += @(Get-RecordTextLines -Records $WarningRecords)
  } else {
    $lines += "none"
  }
  $lines += ""
  $lines += "Warning parser mismatches:"
  if ($WarningParserMismatchRecords.Count -gt 0) {
    $lines += @(Get-RecordTextLines -Records $WarningParserMismatchRecords)
  } else {
    $lines += "none"
  }
  $lines += ""
  $lines += "Useful context:"
  if ($WarningRecords.Count -gt 0) {
    foreach ($warningRecord in $WarningRecords) {
      $lines += (Format-RecordLine -Record $warningRecord)
      if (-not [string]::IsNullOrWhiteSpace($warningRecord.Detail)) {
        $lines += ("Detail: " + $warningRecord.Detail)
      }
      if ($warningRecord.LineNumber) {
        $lines += ("Log line: " + $warningRecord.LineNumber)
      }
      $lines += ("Log: " + $warningRecord.LogPath)
      $lines += ""
    }
  } else {
    $lines += "none"
  }
  $lines += "Complete source logs:"
  $warningLogPaths = @(
    @($WarningRecords + $WarningParserMismatchRecords) |
      Where-Object { -not [string]::IsNullOrWhiteSpace($_.LogPath) } |
      Select-Object -ExpandProperty LogPath -Unique
  )
  if ($warningLogPaths.Count -gt 0) {
    foreach ($warningLogPath in $warningLogPaths) {
      $lines += ("- " + $warningLogPath)
    }
  } else {
    $lines += "none"
  }

  return $lines
}

function Get-ContextLinesForRecord {
  param([pscustomobject]$Record)

  $lines = @()
  if ([string]::IsNullOrEmpty($Record.LogPath) -or (-not (Test-Path $Record.LogPath))) {
    return $lines
  }

  $logLines = @(Get-Content -Path $Record.LogPath)
  $lineNumber = 0
  if ($Record.LineNumber) {
    $lineNumber = [int]$Record.LineNumber
  }

  if ($lineNumber -lt 1) {
    return $lines
  }

  $startIndex = [math]::Max(0, $lineNumber - 3)
  $endIndex = [math]::Min($logLines.Count - 1, $lineNumber + 1)
  for ($index = $startIndex; $index -le $endIndex; $index++) {
    $lines += ("{0}: {1}" -f ($index + 1), $logLines[$index])
  }

  return $lines
}

function Get-StageResultCsvRows {
  param([array]$StageResults)

  $rows = @()
  foreach ($stageResult in $StageResults) {
    $rows += [pscustomobject]@{
      Name = $stageResult.Name
      Required = $stageResult.Required
      Result = $stageResult.Result
      Skipped = $stageResult.Skipped
      SkipReason = $stageResult.SkipReason
      Command = $stageResult.Command
      Arguments = (Get-CommandArgumentString -Arguments $stageResult.Arguments)
      StartedAt = $stageResult.StartedAtText
      FinishedAt = $stageResult.FinishedAtText
      DurationSeconds = $stageResult.DurationSeconds
      Duration = $stageResult.DurationText
      ExitCode = $stageResult.ExitCode
      LogPath = $stageResult.LogPath
      SmokePassed = $stageResult.SmokePassed
      SmokeFailed = $stageResult.SmokeFailed
      SmokeMissingRequired = $stageResult.SmokeMissingRequired
      SmokeMissingOptional = $stageResult.SmokeMissingOptional
      SmokeElapsed = $stageResult.SmokeElapsedText
      WarningCount = $stageResult.WarningCount
      TurbopackWarningCount = $stageResult.TurbopackWarningCount
      TurbopackDeclaredWarningCount = $stageResult.TurbopackDeclaredWarningCount
      TurbopackParsedWarningCount = $stageResult.TurbopackParsedWarningCount
      GenericWarningCount = $stageResult.GenericWarningCount
      WarningParserMismatchCount = $stageResult.WarningParserMismatchCount
      ErrorAndFailureCount = $stageResult.ErrorAndFailureCount
    }
  }

  return $rows
}

function Get-TagsSummaryText {
  param([string[]]$Tags)

  if ($null -eq $Tags -or $Tags.Count -eq 0) {
    return "(none)"
  }

  return ($Tags -join ", ")
}

$repoRoot = Get-RepoRootFromScriptRoot -ScriptRoot $PSScriptRoot
$fullSmokeScriptPath = Join-Path $repoRoot "scripts\smoke-codexforge-all.ps1"
$checkpointDocsScriptPath = Join-Path $repoRoot "scripts\smoke-codexforge-checkpoint-docs.ps1"
$requiredScriptPaths = @($fullSmokeScriptPath, $checkpointDocsScriptPath)

$stages = @(
  (New-BuildStageDefinition -Skipped ([bool]$SkipBuild) -SkipReason "Skipped by -SkipBuild."),
  (New-StageDefinition -Name "Full smoke" -Command "powershell.exe" -Arguments @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $fullSmokeScriptPath, "-BaseUrl", $BaseUrl) -DisplayCommand "powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/smoke-codexforge-all.ps1 -BaseUrl <BaseUrl>" -LogFileName "02-full-smoke.log" -Required $true -Skipped ([bool]$SkipFullSmoke) -SkipReason "Skipped by -SkipFullSmoke."),
  (New-StageDefinition -Name "Checkpoint docs" -Command "powershell.exe" -Arguments @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $checkpointDocsScriptPath, "-BaseUrl", $BaseUrl) -DisplayCommand "powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/smoke-codexforge-checkpoint-docs.ps1 -BaseUrl <BaseUrl>" -LogFileName "03-checkpoint-docs.log" -Required $true -Skipped ([bool]$SkipCheckpointDocs) -SkipReason "Skipped by -SkipCheckpointDocs."),
  (New-StageDefinition -Name "Git diff check" -Command "git" -Arguments @("diff", "--check") -DisplayCommand "git diff --check" -LogFileName "04-git-diff-check.log" -Required $true -Skipped ([bool]$SkipGitDiffCheck) -SkipReason "Skipped by -SkipGitDiffCheck.")
)

if ($PlanOnly) {
  $planFailures = @()

  Write-Host "=== CodexForge full validation wrapper plan ==="
  Write-Host ("Repository root: {0}" -f $repoRoot)

  foreach ($requiredScriptPath in $requiredScriptPaths) {
    if (-not (Test-Path $requiredScriptPath)) {
      $planFailures += $requiredScriptPath
      Write-Host ("[FAIL] Missing required path: {0}" -f $requiredScriptPath)
    } else {
      Write-Host ("[PASS] Required path exists: {0}" -f $requiredScriptPath)
    }
  }

  foreach ($stage in $stages) {
    $plannedCommand = Format-CommandLine -Command $stage.Command -Arguments $stage.Arguments
    if ($stage.Skipped) {
      Write-Host ("[SKIP] {0}" -f $stage.Name)
      Write-Host ("Logical command: {0}" -f $stage.DisplayCommand)
      if (-not [string]::IsNullOrEmpty($stage.ResolvedCommandPath)) {
        Write-Host ("Resolved npm.cmd path: {0}" -f $stage.ResolvedCommandPath)
      }
      if (-not [string]::IsNullOrEmpty($stage.ActualLauncher)) {
        Write-Host ("Actual launcher: {0}" -f $stage.ActualLauncher)
      }
      if (-not [string]::IsNullOrEmpty($stage.ActualArgumentsDisplay)) {
        Write-Host ("Actual arguments: {0}" -f $stage.ActualArgumentsDisplay)
      }
      Write-Host ("Command: {0}" -f $plannedCommand)
      Write-Host ("Reason: {0}" -f $stage.SkipReason)
    } else {
      Write-Host ("[RUN] {0}" -f $stage.Name)
      Write-Host ("Logical command: {0}" -f $stage.DisplayCommand)
      if (-not [string]::IsNullOrEmpty($stage.ResolvedCommandPath)) {
        Write-Host ("Resolved npm.cmd path: {0}" -f $stage.ResolvedCommandPath)
      }
      if (-not [string]::IsNullOrEmpty($stage.ActualLauncher)) {
        Write-Host ("Actual launcher: {0}" -f $stage.ActualLauncher)
      }
      if (-not [string]::IsNullOrEmpty($stage.ActualArgumentsDisplay)) {
        Write-Host ("Actual arguments: {0}" -f $stage.ActualArgumentsDisplay)
      }
      Write-Host ("Command: {0}" -f $plannedCommand)
    }
  }

  if ($planFailures.Count -gt 0) {
    exit 1
  }

  exit 0
}

$requiredOutputFileNames = @(
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
)

$runStartedAt = Get-Date
$runTimestamp = $runStartedAt.ToString("yyyyMMdd-HHmmss")
$runDirectory = Join-Path $repoRoot ("artifacts\smoke-runs\" + $runTimestamp)
$logsDirectory = Join-Path $runDirectory "logs"

New-Item -ItemType Directory -Path $logsDirectory -Force | Out-Null

$artifactPaths = @{}
foreach ($requiredOutputFileName in $requiredOutputFileNames) {
  $artifactPath = Join-Path $runDirectory $requiredOutputFileName
  $artifactPaths[$requiredOutputFileName] = $artifactPath
  Write-TextFile -Path $artifactPath -Lines @("[WRAPPER_EXCEPTION] Output not finalized.")
}

$stageResults = @()
$syntheticRecords = @()
$wrapperFailure = $null
$runFinishedAt = $null

try {
  foreach ($requiredScriptPath in $requiredScriptPaths) {
    if (-not (Test-Path $requiredScriptPath)) {
      throw ("Missing required path: " + $requiredScriptPath)
    }
  }

  foreach ($stage in $stages) {
    $stageResults += (Invoke-ValidationStage -Stage $stage -WorkingDirectory $repoRoot -LogsDirectory $logsDirectory)
  }

  $fullSmokeStageResult = $stageResults | Where-Object { $_.Name -eq "Full smoke" } | Select-Object -First 1
  if ($fullSmokeStageResult -and (-not $fullSmokeStageResult.Skipped)) {
    $fullSmokeAggregate = Get-FullSmokeAggregateFromLog -LogPath $fullSmokeStageResult.LogPath
    if ($null -eq $fullSmokeAggregate) {
      $fullSmokeStageResult.Result = "FAIL"
      $syntheticRecords += (New-IssueRecord -StageName "Full smoke" -Kind "WRAPPER_EXCEPTION" -Text "[WRAPPER_EXCEPTION] Unable to parse the final aggregate emitted by smoke-codexforge-all.ps1." -LogPath $fullSmokeStageResult.LogPath -LineNumber $null)
    } else {
      Update-FullSmokeStageResult -StageResult $fullSmokeStageResult -FullSmokeAggregate $fullSmokeAggregate
    }
  }
} catch {
  $wrapperFailure = $_
  $syntheticRecords += (New-IssueRecord -StageName "Wrapper" -Kind "WRAPPER_EXCEPTION" -Text ("[WRAPPER_EXCEPTION] " + $_.Exception.Message) -LogPath "" -LineNumber $null)
} finally {
  $runFinishedAt = Get-Date

  $branchCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command "git" -Arguments @("rev-parse", "--abbrev-ref", "HEAD")
  $headCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command "git" -Arguments @("rev-parse", "HEAD")
  $tagsCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command "git" -Arguments @("tag", "--points-at", "HEAD")
  $statusCapture = Invoke-CapturedCommand -WorkingDirectory $repoRoot -Command "git" -Arguments @("status", "--short", "--branch")

  if ($branchCapture.ExitCode -ne 0) {
    $syntheticRecords += (New-IssueRecord -StageName "Wrapper" -Kind "WRAPPER_EXCEPTION" -Text "[WRAPPER_EXCEPTION] Unable to capture git branch." -LogPath $artifactPaths["git-status.txt"] -LineNumber $null)
  }
  if ($headCapture.ExitCode -ne 0) {
    $syntheticRecords += (New-IssueRecord -StageName "Wrapper" -Kind "WRAPPER_EXCEPTION" -Text "[WRAPPER_EXCEPTION] Unable to capture HEAD commit." -LogPath $artifactPaths["git-head.txt"] -LineNumber $null)
  }
  if ($tagsCapture.ExitCode -ne 0) {
    $syntheticRecords += (New-IssueRecord -StageName "Wrapper" -Kind "WRAPPER_EXCEPTION" -Text "[WRAPPER_EXCEPTION] Unable to capture tags at HEAD." -LogPath $artifactPaths["tags-at-head.txt"] -LineNumber $null)
  }
  if ($statusCapture.ExitCode -ne 0) {
    $syntheticRecords += (New-IssueRecord -StageName "Wrapper" -Kind "WRAPPER_EXCEPTION" -Text "[WRAPPER_EXCEPTION] Unable to capture git status." -LogPath $artifactPaths["git-status.txt"] -LineNumber $null)
  }

  $branch = "(unavailable)"
  if ($branchCapture.ExitCode -eq 0 -and $branchCapture.StdOutLines.Count -gt 0) {
    $branch = $branchCapture.StdOutLines[0].Trim()
  }

  $headCommit = "(unavailable)"
  if ($headCapture.ExitCode -eq 0 -and $headCapture.StdOutLines.Count -gt 0) {
    $headCommit = $headCapture.StdOutLines[0].Trim()
  }

  $tagsAtHead = @()
  if ($tagsCapture.ExitCode -eq 0) {
    $tagsAtHead = @($tagsCapture.StdOutLines | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
  }

  $workingTreeStatusLines = @()
  if ($statusCapture.ExitCode -eq 0) {
    $workingTreeStatusLines = @($statusCapture.StdOutLines)
  }

  if ($workingTreeStatusLines.Count -eq 0) {
    $workingTreeStatusLines = @("(clean)")
  }

  Write-TextFile -Path $artifactPaths["git-status.txt"] -Lines $workingTreeStatusLines
  Write-TextFile -Path $artifactPaths["git-head.txt"] -Lines @($headCommit)
  if ($tagsAtHead.Count -gt 0) {
    Write-TextFile -Path $artifactPaths["tags-at-head.txt"] -Lines $tagsAtHead
  } else {
    Write-TextFile -Path $artifactPaths["tags-at-head.txt"] -Lines @("(none)")
  }

  $detectedRecords = @()
  foreach ($stageResult in $stageResults) {
    $detectedRecords += @(Get-StageIssueRecords -StageResult $stageResult)
  }

  $fullSmokeStageResult = $stageResults | Where-Object { $_.Name -eq "Full smoke" } | Select-Object -First 1
  if ($fullSmokeStageResult -and (-not $fullSmokeStageResult.Skipped)) {
    if (($fullSmokeStageResult.SmokeFailed -is [int]) -and ($fullSmokeStageResult.SmokeFailed -gt 0)) {
      $fullSmokeFailureRecords = @($detectedRecords | Where-Object { $_.StageName -eq "Full smoke" -and ($_.Kind -eq "FAIL" -or $_.Kind -eq "FAILED") })
      if ($fullSmokeFailureRecords.Count -eq 0) {
        $syntheticRecords += (New-IssueRecord -StageName "Full smoke" -Kind "FAILED" -Text ("[FAILED] Full smoke aggregate reported Failed = " + $fullSmokeStageResult.SmokeFailed + ".") -LogPath $fullSmokeStageResult.LogPath -LineNumber $null)
      }
    }

    if (($fullSmokeStageResult.SmokeMissingRequired -is [int]) -and ($fullSmokeStageResult.SmokeMissingRequired -gt 0)) {
      $fullSmokeMissingRequiredRecords = @($detectedRecords | Where-Object { $_.StageName -eq "Full smoke" -and $_.Kind -eq "MISSING_REQUIRED" })
      if ($fullSmokeMissingRequiredRecords.Count -eq 0) {
        $syntheticRecords += (New-IssueRecord -StageName "Full smoke" -Kind "MISSING_REQUIRED" -Text ("[MISSING_REQUIRED] Full smoke aggregate reported Missing required = " + $fullSmokeStageResult.SmokeMissingRequired + ".") -LogPath $fullSmokeStageResult.LogPath -LineNumber $null)
      }
    }

    if (($fullSmokeStageResult.SmokeMissingOptional -is [int]) -and ($fullSmokeStageResult.SmokeMissingOptional -gt 0)) {
      $fullSmokeMissingOptionalRecords = @($detectedRecords | Where-Object { $_.StageName -eq "Full smoke" -and $_.Kind -eq "MISSING_OPTIONAL" })
      if ($fullSmokeMissingOptionalRecords.Count -eq 0) {
        $syntheticRecords += (New-IssueRecord -StageName "Full smoke" -Kind "MISSING_OPTIONAL" -Text ("[MISSING_OPTIONAL] Full smoke aggregate reported Missing optional = " + $fullSmokeStageResult.SmokeMissingOptional + ".") -LogPath $fullSmokeStageResult.LogPath -LineNumber $null)
      }
    }
  }

  $allRecords = @($detectedRecords + $syntheticRecords)

  foreach ($stageResult in $stageResults | Where-Object { (-not $_.Skipped) -and $_.Result -eq "FAIL" }) {
    $existingStageRecords = @(
      $allRecords |
        Where-Object {
          $_.StageName -eq $stageResult.Name -and
          $_.Kind -ne "WARNING" -and
          $_.Kind -ne "WARNING_PARSER_MISMATCH" -and
          $_.Kind -ne "MISSING_OPTIONAL"
        }
    )
    if ($existingStageRecords.Count -eq 0) {
      $allRecords += (New-IssueRecord -StageName $stageResult.Name -Kind "FAILED" -Text ("[FAILED] Stage exited with code " + $stageResult.ExitCode + ".") -LogPath $stageResult.LogPath -LineNumber $null)
    }
  }

  $stageErrorKinds = @(
    "WRAPPER_EXCEPTION",
    "NPM_ERR",
    "FATAL",
    "ERROR",
    "TYPE_ERROR",
    "BUILD_FAILED",
    "UNHANDLED_EXCEPTION",
    "FAIL",
    "FAILED",
    "MISSING_REQUIRED"
  )

  foreach ($stageResult in $stageResults) {
    $stageRecordSet = @($allRecords | Where-Object { $_.StageName -eq $stageResult.Name })
    $stageResult.ErrorAndFailureCount = @($stageRecordSet | Where-Object { $stageErrorKinds -contains $_.Kind }).Count
  }

  $warningRecords = @($allRecords | Where-Object { $_.Kind -eq "WARNING" })
  $warningParserMismatchRecords = @($allRecords | Where-Object { $_.Kind -eq "WARNING_PARSER_MISMATCH" })
  $errorRecords = @(
    $allRecords |
      Where-Object {
        $_.Kind -eq "WRAPPER_EXCEPTION" -or
        $_.Kind -eq "NPM_ERR" -or
        $_.Kind -eq "FATAL" -or
        $_.Kind -eq "ERROR" -or
        $_.Kind -eq "TYPE_ERROR" -or
        $_.Kind -eq "BUILD_FAILED" -or
        $_.Kind -eq "UNHANDLED_EXCEPTION"
      }
  )
  $failureRecords = @($allRecords | Where-Object { $_.Kind -eq "FAIL" -or $_.Kind -eq "FAILED" })
  $missingRequiredRecords = @($allRecords | Where-Object { $_.Kind -eq "MISSING_REQUIRED" })
  $missingOptionalRecords = @($allRecords | Where-Object { $_.Kind -eq "MISSING_OPTIONAL" })

  $passCount = @($stageResults | Where-Object { $_.Result -eq "PASS" }).Count
  $failCount = @($stageResults | Where-Object { $_.Result -eq "FAIL" }).Count
  $skippedCount = @($stageResults | Where-Object { $_.Result -eq "SKIPPED" }).Count

  $overallFailed = $false
  if ($wrapperFailure) {
    $overallFailed = $true
  }
  if (@($stageResults | Where-Object { (-not $_.Skipped) -and $_.Required -and $_.Result -eq "FAIL" }).Count -gt 0) {
    $overallFailed = $true
  }
  if (@($errorRecords).Count -gt 0) {
    $overallFailed = $true
  }
  if (@($missingRequiredRecords).Count -gt 0) {
    $overallFailed = $true
  }

  $overallResult = "PASS"
  if ($overallFailed) {
    $overallResult = "FAIL"
  }

  $totalElapsed = $runFinishedAt - $runStartedAt
  $tagsSummaryText = Get-TagsSummaryText -Tags $tagsAtHead
  $nonZeroExitStages = @($stageResults | Where-Object { ($_.ExitCode -is [int]) -and ($_.ExitCode -ne 0) })
  $errorAndFailureCount = $errorRecords.Count + $failureRecords.Count + $missingRequiredRecords.Count
  $warningSummary = Get-StageWarningSummary -StageResults $stageResults -WarningRecords $warningRecords -WarningParserMismatchRecords $warningParserMismatchRecords

  $stageRows = Get-StageResultCsvRows -StageResults $stageResults
  $stageRows | Export-Csv -Path $artifactPaths["stage-results.csv"] -NoTypeInformation -Encoding UTF8

  $errorAndFailureLines = @()
  if (($errorRecords.Count + $failureRecords.Count + $missingRequiredRecords.Count) -gt 0) {
    if ($errorRecords.Count -gt 0) {
      $errorAndFailureLines += "Errors:"
      $errorAndFailureLines += @(Get-RecordTextLines -Records $errorRecords)
      $errorAndFailureLines += ""
    }
    if ($failureRecords.Count -gt 0) {
      $errorAndFailureLines += "Failures:"
      $errorAndFailureLines += @(Get-RecordTextLines -Records $failureRecords)
      $errorAndFailureLines += ""
    }
    if ($missingRequiredRecords.Count -gt 0) {
      $errorAndFailureLines += "Missing required checks:"
      $errorAndFailureLines += @(Get-RecordTextLines -Records $missingRequiredRecords)
    }
  } else {
    $errorAndFailureLines = @("No errors or failures detected.")
  }
  Write-TextFile -Path $artifactPaths["errors-and-failures.txt"] -Lines $errorAndFailureLines

  if (($warningSummary.TotalWarningCount -gt 0) -or ($warningParserMismatchRecords.Count -gt 0)) {
    Write-TextFile -Path $artifactPaths["warnings.txt"] -Lines (Get-WarningsArtifactLines -WarningRecords $warningRecords -WarningParserMismatchRecords $warningParserMismatchRecords -StageResults $stageResults)
  } else {
    Write-TextFile -Path $artifactPaths["warnings.txt"] -Lines @("No warnings detected.")
  }

  $failedStageTailLines = @()
  $failedStageResults = @($stageResults | Where-Object { $_.Result -eq "FAIL" -and (-not $_.Skipped) })
  if ($failedStageResults.Count -gt 0) {
    foreach ($failedStageResult in $failedStageResults) {
      $failedStageTailLines += ("=== " + $failedStageResult.Name + " ===")
      $failedStageTailLines += ("Log: " + $failedStageResult.LogPath)
      $failedStageTailLines += "Tail:"
      if (Test-Path $failedStageResult.LogPath) {
        $failedStageTailLines += @(Get-Content -Path $failedStageResult.LogPath -Tail 100)
      }
      $failedStageTailLines += ""
    }
  } else {
    $failedStageTailLines = @("No failed stage tails available.")
  }
  Write-TextFile -Path $artifactPaths["failed-stage-tails.txt"] -Lines $failedStageTailLines

  $contextLines = @()
  $contextRecords = @($allRecords | Where-Object { $_.Kind -ne "WARNING" })
  if ($contextRecords.Count -gt 0) {
    foreach ($record in $contextRecords) {
      $contextLines += ("=== " + $record.Kind + " / " + $record.StageName + " ===")
      $contextLines += ("Entry: " + (Format-RecordLine -Record $record))
      if (-not [string]::IsNullOrEmpty($record.LogPath)) {
        $contextLines += ("Log: " + $record.LogPath)
      }
      $recordContextLines = Get-ContextLinesForRecord -Record $record
      if ($recordContextLines.Count -gt 0) {
        $contextLines += "Context:"
        $contextLines += $recordContextLines
      } else {
        $contextLines += "Context: unavailable"
      }
      $contextLines += ""
    }
  } else {
    $contextLines = @("No issues detected.")
  }
  Write-TextFile -Path $artifactPaths["issues-with-context.txt"] -Lines $contextLines

  $summaryLines = @()
  $summaryLines += ("Overall result: " + $overallResult)
  $summaryLines += ("Run started: " + $runStartedAt.ToString("o"))
  $summaryLines += ("Run finished: " + $runFinishedAt.ToString("o"))
  $summaryLines += ("Total elapsed: " + (Format-DurationText -Duration $totalElapsed))
  $summaryLines += ("Branch: " + $branch)
  $summaryLines += ("HEAD commit: " + $headCommit)
  $summaryLines += ("Tags at HEAD: " + $tagsSummaryText)
  $summaryLines += ("Warning count: " + $warningSummary.TotalWarningCount)
  $summaryLines += ("Turbopack warning count: " + $warningSummary.TurbopackWarningCount)
  $summaryLines += ("Generic warning count: " + $warningSummary.GenericWarningCount)
  $summaryLines += ("Warning parser mismatch count: " + $warningSummary.WarningParserMismatchCount)
  $summaryLines += ""
  $summaryLines += "Stage results:"
  foreach ($stageResult in $stageResults) {
    $summaryLines += ("- " + $stageResult.Name + ": " + $stageResult.Result)
    $summaryLines += ("  Required: " + $stageResult.Required)
    if ($stageResult.Skipped) {
      $summaryLines += ("  Reason: " + $stageResult.SkipReason)
    } else {
      $summaryLines += ("  Command: " + $stageResult.Command)
      $summaryLines += ("  Arguments: " + (Get-CommandArgumentString -Arguments $stageResult.Arguments))
      $summaryLines += ("  Started: " + $stageResult.StartedAtText)
      $summaryLines += ("  Finished: " + $stageResult.FinishedAtText)
      $summaryLines += ("  Duration: " + $stageResult.DurationText)
      $summaryLines += ("  Exit code: " + $stageResult.ExitCode)
      $summaryLines += ("  Warning count: " + $stageResult.WarningCount)
      $summaryLines += ("  Turbopack warning count: " + $stageResult.TurbopackWarningCount)
      $summaryLines += ("  Generic warning count: " + $stageResult.GenericWarningCount)
      $summaryLines += ("  Warning parser mismatch count: " + $stageResult.WarningParserMismatchCount)
      $summaryLines += ("  Error/failure count: " + $stageResult.ErrorAndFailureCount)
      $summaryLines += ("  Log: " + $stageResult.LogPath)
      if ($stageResult.Name -eq "Full smoke") {
        if ($stageResult.SmokePassed -is [int]) {
          $summaryLines += ("  Smoke passed: " + $stageResult.SmokePassed)
          $summaryLines += ("  Smoke failed: " + $stageResult.SmokeFailed)
          $summaryLines += ("  Missing required: " + $stageResult.SmokeMissingRequired)
          $summaryLines += ("  Missing optional: " + $stageResult.SmokeMissingOptional)
          $summaryLines += ("  Smoke elapsed: " + $stageResult.SmokeElapsedText)
        } else {
          $summaryLines += "  Smoke aggregate: unavailable"
        }
      }
    }
  }
  $summaryLines += ""
  $summaryLines += "Non-zero exit codes:"
  if ($nonZeroExitStages.Count -gt 0) {
    foreach ($nonZeroExitStage in $nonZeroExitStages) {
      $summaryLines += ("- " + $nonZeroExitStage.Name + ": " + $nonZeroExitStage.ExitCode)
    }
  } else {
    $summaryLines += "- none"
  }
  $summaryLines += ""
  $summaryLines += "Full smoke aggregate:"
  if ($fullSmokeStageResult -and (-not $fullSmokeStageResult.Skipped) -and ($fullSmokeStageResult.SmokePassed -is [int])) {
    $summaryLines += ("- Passed: " + $fullSmokeStageResult.SmokePassed)
    $summaryLines += ("- Failed: " + $fullSmokeStageResult.SmokeFailed)
    $summaryLines += ("- Missing required: " + $fullSmokeStageResult.SmokeMissingRequired)
    $summaryLines += ("- Missing optional: " + $fullSmokeStageResult.SmokeMissingOptional)
    $summaryLines += ("- Elapsed: " + $fullSmokeStageResult.SmokeElapsedText)
  } elseif ($fullSmokeStageResult -and $fullSmokeStageResult.Skipped) {
    $summaryLines += "- not run"
  } else {
    $summaryLines += "- unavailable"
  }
  $summaryLines += ""
  $summaryLines += "All detected errors:"
  if ($errorRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $errorRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "All detected failures:"
  if ($failureRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $failureRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "All missing required checks:"
  if ($missingRequiredRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $missingRequiredRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "All missing optional checks:"
  if ($missingOptionalRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $missingOptionalRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "Warning parser mismatches:"
  if ($warningParserMismatchRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $warningParserMismatchRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "All warnings:"
  if ($warningRecords.Count -gt 0) {
    $summaryLines += @(Get-RecordTextLines -Records $warningRecords)
  } else {
    $summaryLines += "none"
  }
  $summaryLines += ""
  $summaryLines += "Working-tree status:"
  $summaryLines += $workingTreeStatusLines
  $summaryLines += ""
  $summaryLines += "Complete logs:"
  foreach ($stageResult in $stageResults | Where-Object { -not $_.Skipped }) {
    $summaryLines += ("- " + $stageResult.Name + ": " + $stageResult.LogPath)
  }
  Write-TextFile -Path $artifactPaths["summary.txt"] -Lines $summaryLines

  $summaryObject = [ordered]@{
    overallResult = $overallResult
    runStartedAt = $runStartedAt.ToString("o")
    runFinishedAt = $runFinishedAt.ToString("o")
    totalElapsedSeconds = [math]::Round($totalElapsed.TotalSeconds, 3)
    totalElapsedText = Format-DurationText -Duration $totalElapsed
    branch = $branch
    headCommit = $headCommit
    tagsAtHead = @($tagsAtHead)
    stagePassCount = $passCount
    stageFailCount = $failCount
    stageSkippedCount = $skippedCount
    warningCount = $warningSummary.TotalWarningCount
    turbopackWarningCount = $warningSummary.TurbopackWarningCount
    genericWarningCount = $warningSummary.GenericWarningCount
    warningParserMismatchCount = $warningSummary.WarningParserMismatchCount
    errorAndFailureCount = $errorAndFailureCount
    fullSmoke = $null
    stageResults = @($stageRows)
    warningTotals = [ordered]@{
      total = $warningSummary.TotalWarningCount
      turbopack = $warningSummary.TurbopackWarningCount
      generic = $warningSummary.GenericWarningCount
      turbopackDeclared = $warningSummary.TurbopackDeclaredWarningCount
      turbopackParsed = $warningSummary.TurbopackParsedWarningCount
      parserMismatchCount = $warningSummary.WarningParserMismatchCount
      byStage = @($warningSummary.StageCounts)
      byCategory = @($warningSummary.CategoryCounts)
    }
    errors = @(Get-RecordTextLines -Records $errorRecords)
    failures = @(Get-RecordTextLines -Records $failureRecords)
    missingRequired = @(Get-RecordTextLines -Records $missingRequiredRecords)
    missingOptional = @(Get-RecordTextLines -Records $missingOptionalRecords)
    warnings = @(Get-RecordTextLines -Records $warningRecords)
    warningRecords = @(Get-WarningRecordObjects -Records $warningRecords)
    warningParserMismatches = @(Get-WarningRecordObjects -Records $warningParserMismatchRecords)
    workingTreeStatus = @($workingTreeStatusLines)
    artifacts = [ordered]@{
      runDirectory = $runDirectory
      logsDirectory = $logsDirectory
      summaryTxt = $artifactPaths["summary.txt"]
      summaryJson = $artifactPaths["summary.json"]
      stageResultsCsv = $artifactPaths["stage-results.csv"]
      errorsAndFailures = $artifactPaths["errors-and-failures.txt"]
      issuesWithContext = $artifactPaths["issues-with-context.txt"]
      warnings = $artifactPaths["warnings.txt"]
      failedStageTails = $artifactPaths["failed-stage-tails.txt"]
      gitStatus = $artifactPaths["git-status.txt"]
      gitHead = $artifactPaths["git-head.txt"]
      tagsAtHead = $artifactPaths["tags-at-head.txt"]
    }
  }

  if ($fullSmokeStageResult -and (-not $fullSmokeStageResult.Skipped) -and ($fullSmokeStageResult.SmokePassed -is [int])) {
    $summaryObject.fullSmoke = [ordered]@{
      passed = $fullSmokeStageResult.SmokePassed
      failed = $fullSmokeStageResult.SmokeFailed
      missingRequired = $fullSmokeStageResult.SmokeMissingRequired
      missingOptional = $fullSmokeStageResult.SmokeMissingOptional
      elapsed = $fullSmokeStageResult.SmokeElapsedText
    }
  }

  $summaryObject | ConvertTo-Json -Depth 6 | Set-Content -Path $artifactPaths["summary.json"] -Encoding UTF8

  Write-Host ""
  Write-Host "=== CodexForge full validation wrapper summary ==="
  Write-Host ("Overall result: {0}" -f $overallResult)
  Write-Host ("Total elapsed: {0}" -f (Format-DurationText -Duration $totalElapsed))
  Write-Host ("Stage totals: PASS={0} FAIL={1} SKIPPED={2}" -f $passCount, $failCount, $skippedCount)
  if ($fullSmokeStageResult -and (-not $fullSmokeStageResult.Skipped) -and ($fullSmokeStageResult.SmokePassed -is [int])) {
    Write-Host ("Smoke passed: {0}" -f $fullSmokeStageResult.SmokePassed)
    Write-Host ("Smoke failed: {0}" -f $fullSmokeStageResult.SmokeFailed)
    Write-Host ("Missing required: {0}" -f $fullSmokeStageResult.SmokeMissingRequired)
    Write-Host ("Missing optional: {0}" -f $fullSmokeStageResult.SmokeMissingOptional)
  } else {
    Write-Host "Smoke passed: n/a"
    Write-Host "Smoke failed: n/a"
    Write-Host "Missing required: n/a"
    Write-Host "Missing optional: n/a"
  }
  Write-Host ("Warning count: {0}" -f $warningSummary.TotalWarningCount)
  Write-Host ("Turbopack warning count: {0}" -f $warningSummary.TurbopackWarningCount)
  Write-Host ("Generic warning count: {0}" -f $warningSummary.GenericWarningCount)
  if ($warningSummary.WarningParserMismatchCount -gt 0) {
    Write-Host ("Warning parser mismatches: {0}" -f $warningSummary.WarningParserMismatchCount)
  }
  Write-Host ("Error/failure count: {0}" -f $errorAndFailureCount)
  Write-Host ("Summary: {0}" -f $artifactPaths["summary.txt"])
  Write-Host ("Complete logs: {0}" -f $logsDirectory)

  if ($overallResult -eq "FAIL") {
    exit 1
  }

  exit 0
}
