"use strict";

const fs = require("node:fs");
const fsp = fs.promises;
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const Module = require("node:module");

const repoRoot = path.resolve(__dirname, "..");
const suffix = "macro-d1-independent-lock-fence";
const lockId = "fefefefefefefefefefefefe";

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    request = path.join(repoRoot, "src", request.slice(2));
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};

const invocationMode = process.argv[2] ?? "driver";
const nativeFilesystemModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-native-filesystem.server.ts"
));
if (["setup", "delayed", "hold", "probe"].includes(invocationMode)) {
  const openNativeRoot = nativeFilesystemModule.openCreatorNativeRoot;
  nativeFilesystemModule.openCreatorNativeRoot = (segments) =>
    openNativeRoot(segments, "persistent");
}
const persistenceModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-persistence.server.ts"
));
const cryptoModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-crypto.ts"
));

function marker(directory, name) {
  return path.join(directory, name);
}

async function waitForFile(filePath, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (fs.existsSync(filePath)) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`Timed out waiting for owned creator-lock marker ${path.basename(filePath)}.`);
}

function writeMarker(directory, name, value = "ready\n") {
  fs.writeFileSync(marker(directory, name), value, { encoding: "utf8", flag: "wx" });
}

async function runWorker(mode, coordinationDirectory) {
  const persistence = persistenceModule.createCreatorPersistenceForTesting(suffix);
  if (mode === "cleanup") {
    if (await persistence.filesystem.rootExists()) {
      await persistence.cleanupTestRoot();
    }
    return;
  }
  await persistence.initialize();
  if (mode === "setup") {
    const staleOwner = {
      nonce: "e".repeat(32),
      processSessionNonce: "e".repeat(32),
      processId: 2_147_000_000,
      createdAt: "2000-01-01T00:00:00.000Z",
    };
    const staleBytes = Buffer.from(
      `${cryptoModule.serializeCreatorCanonicalJson(staleOwner)}\n`,
      "utf8"
    );
    await persistence.filesystem.writeAtomicExclusive(
      ["locks", `${lockId}.lock.json`],
      staleBytes
    );
    return;
  }
  let entered = false;

  if (mode === "delayed") {
    const originalCompareDeleteExact =
      persistence.filesystem.compareDeleteExact.bind(persistence.filesystem);
    let paused = false;
    persistence.filesystem.compareDeleteExact = async (segments, expectedData) => {
      if (!paused && segments.at(-1) === `${lockId}.lock.json`) {
        paused = true;
        writeMarker(coordinationDirectory, "delayed-ready");
        await waitForFile(marker(coordinationDirectory, "delayed-go"));
      }
      return originalCompareDeleteExact(segments, expectedData);
    };
  }

  try {
    await persistence.withProjectLock(lockId, async () => {
      entered = true;
      writeMarker(coordinationDirectory, `${mode}-entered`);
      if (mode === "hold") {
        await waitForFile(marker(coordinationDirectory, "hold-release"));
      }
    });
    writeMarker(coordinationDirectory, `${mode}-result`, "success\n");
    if (mode === "delayed") {
      throw new Error("Delayed stale-lock contender entered after a fresh owner was published.");
    }
  } catch (error) {
    const code = typeof error === "object" && error !== null ? String(error.code ?? "") : "";
    if (mode === "delayed" && code === "mutation_busy" && !entered) {
      writeMarker(coordinationDirectory, "delayed-result", "mutation_busy\n");
      return;
    }
    throw error;
  }
}

function launchWorker(mode, coordinationDirectory) {
  const child = spawn(process.execPath, [__filename, mode, coordinationDirectory], {
    cwd: repoRoot,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString("utf8");
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString("utf8");
  });
  const completion = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`${mode} creator-lock worker timed out.`));
    }, 40_000);
    child.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.once("exit", (code, signal) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(
          `${mode} creator-lock worker failed (${code ?? signal ?? "unknown"}).\n${stdout}${stderr}`
        )
      );
    });
  });
  return { child, completion };
}

async function runDriver() {
  const coordinationDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "codexforge-creator-lock-fence-")
  );
  const children = [];
  const deterministicRoot = path.join(
    repoRoot,
    ".codexforge",
    "creator-tests",
    suffix
  );
  try {
    if (fs.existsSync(deterministicRoot)) {
      throw new Error("Independent creator-lock test root was not empty before the run.");
    }
    const setup = launchWorker("setup", coordinationDirectory);
    children.push(setup);
    await setup.completion;
    const lockSegments = ["locks", `${lockId}.lock.json`];
    const lockPath = path.join(deterministicRoot, ...lockSegments);
    const staleBytes = await fsp.readFile(lockPath);

    const delayed = launchWorker("delayed", coordinationDirectory);
    children.push(delayed);
    await waitForFile(marker(coordinationDirectory, "delayed-ready"));

    const hold = launchWorker("hold", coordinationDirectory);
    children.push(hold);
    await waitForFile(marker(coordinationDirectory, "hold-entered"));
    const freshOwnerBefore = await fsp.readFile(lockPath);
    if (freshOwnerBefore.equals(staleBytes)) {
      throw new Error("Holding worker did not publish a fresh canonical lock owner.");
    }

    writeMarker(coordinationDirectory, "delayed-go");
    await delayed.completion;
    if (fs.existsSync(marker(coordinationDirectory, "delayed-entered"))) {
      throw new Error("Delayed stale-lock contender entered concurrently.");
    }
    if (
      (await fsp.readFile(marker(coordinationDirectory, "delayed-result"), "utf8")).trim() !==
      "mutation_busy"
    ) {
      throw new Error("Delayed stale-lock contender did not fail with mutation_busy.");
    }
    const freshOwnerAfter = await fsp.readFile(lockPath);
    if (!freshOwnerAfter.equals(freshOwnerBefore)) {
      throw new Error("Delayed stale-lock contender changed the fresh live owner bytes.");
    }

    writeMarker(coordinationDirectory, "hold-release");
    await hold.completion;
    if (fs.existsSync(lockPath)) {
      throw new Error("Holding worker left its canonical creator lock behind.");
    }

    const probe = launchWorker("probe", coordinationDirectory);
    children.push(probe);
    await probe.completion;
    if (!fs.existsSync(marker(coordinationDirectory, "probe-entered"))) {
      throw new Error("A fresh worker could not acquire the released creator lock.");
    }
    const lockEntries = await fsp.readdir(path.join(deterministicRoot, "locks"));
    if (lockEntries.length !== 0) {
      throw new Error(`Creator lock test left unexpected residue: ${lockEntries.join(",")}.`);
    }

    process.stdout.write(
      "Creator independent-process lock fence PASS: contenders=2, maxCallbacks=1, delayed=mutation_busy, freshOwner=unchanged, probe=success, residue=0\n"
    );
  } finally {
    for (const name of ["delayed-go", "hold-release"]) {
      const filePath = marker(coordinationDirectory, name);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "release\n", "utf8");
      }
    }
    await Promise.allSettled(children.map((entry) => entry.completion));
    for (const entry of children) {
      if (entry.child.exitCode === null) entry.child.kill();
    }
    if (fs.existsSync(deterministicRoot)) {
      const cleanup = launchWorker("cleanup", coordinationDirectory);
      await cleanup.completion;
    }
    fs.rmSync(coordinationDirectory, { recursive: true, force: true });
  }
}

if (invocationMode === "driver") {
  runDriver().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message ?? String(error)}\n`);
    process.exitCode = 1;
  });
} else if (
  ["setup", "delayed", "hold", "probe", "cleanup"].includes(invocationMode) &&
  process.argv[3]
) {
  runWorker(invocationMode, path.resolve(process.argv[3])).catch((error) => {
    process.stderr.write(`${error.stack ?? error.message ?? String(error)}\n`);
    process.exitCode = 1;
  });
} else {
  process.stderr.write("Invalid creator-lock concurrency worker invocation.\n");
  process.exitCode = 1;
}
