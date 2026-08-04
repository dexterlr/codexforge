"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

if (process.platform !== "win32") {
  process.stdout.write("CodexForge creator native filesystem: non-Windows build not required.\n");
  process.exit(0);
}

const projectRoot = path.resolve(__dirname, "..");
const vswhere = "C:\\Program Files (x86)\\Microsoft Visual Studio\\Installer\\vswhere.exe";
if (!fs.existsSync(vswhere)) {
  process.stderr.write(
    "CodexForge creator filesystem mutation is disabled: Visual Studio Build Tools discovery is unavailable.\n"
  );
  process.exit(1);
}

const discovery = spawnSync(
  vswhere,
  ["-latest", "-products", "*", "-requires", "Microsoft.VisualStudio.Component.VC.Tools.x86.x64", "-property", "installationPath"],
  { encoding: "utf8", windowsHide: true }
);
const installationPath = discovery.status === 0 ? discovery.stdout.trim() : "";
const developerShell = path.join(installationPath, "Common7", "Tools", "VsDevCmd.bat");
if (!installationPath || !fs.existsSync(developerShell)) {
  process.stderr.write(
    "CodexForge creator filesystem mutation is disabled: the audited MSVC x64 toolchain is unavailable.\n"
  );
  process.exit(1);
}

const outputDirectory = path.join(projectRoot, "build", "Release");
const objectDirectory = path.join(projectRoot, "build", "obj");
fs.mkdirSync(outputDirectory, { recursive: true });
fs.mkdirSync(objectDirectory, { recursive: true });
const source = path.join(projectRoot, "native", "codexforge_creator_filesystem.cc");
const output = path.join(outputDirectory, "codexforge_creator_filesystem.node");
const compilerCommand = [
  "cl.exe /nologo /LD /EHsc /std:c++20 /O2 /W4 /MD",
  "/DUNICODE /D_UNICODE /DWIN32_LEAN_AND_MEAN /DNOMINMAX",
  `/I"${path.join(projectRoot, "native")}"`,
  `/Fo:"${path.join(objectDirectory, "codexforge_creator_filesystem.obj")}"`,
  `/Fe:"${output}"`,
  `"${source}"`,
  "/link /INCREMENTAL:NO",
].join(" ");

const commandFile = path.join(objectDirectory, "build-codexforge-creator-native.cmd");
fs.writeFileSync(
  commandFile,
  [
    "@echo off",
    `call "${developerShell}" -no_logo -arch=x64 -host_arch=x64`,
    "if errorlevel 1 exit /b %errorlevel%",
    compilerCommand,
    "exit /b %errorlevel%",
    "",
  ].join("\r\n"),
  { encoding: "utf8" }
);

const result = spawnSync(
  process.env.ComSpec ?? "C:\\Windows\\System32\\cmd.exe",
  ["/d", "/c", commandFile],
  {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
    windowsHide: true,
  }
);

try {
  fs.rmSync(commandFile, { force: true });
} catch (error) {
  process.stderr.write(`CodexForge creator native filesystem build cleanup failed: ${error.message}\n`);
  process.exit(1);
}

if (result.error) {
  process.stderr.write(`CodexForge creator native filesystem build failed: ${result.error.message}\n`);
  process.exit(1);
}

process.exit(result.status ?? 1);
