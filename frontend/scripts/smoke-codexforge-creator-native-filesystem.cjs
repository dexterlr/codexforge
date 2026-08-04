"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const addonPath = path.join(projectRoot, "build", "Release", "codexforge_creator_filesystem.node");
const pauseState = new Int32Array(new SharedArrayBuffer(4));
const maximumTreeTransportBytes = 1024 * 1024;

function pause(milliseconds) {
  Atomics.wait(pauseState, 0, 0, milliseconds);
}

function loadBinding() {
  const loaded = { exports: {} };
  process.dlopen(loaded, addonPath);
  if (
    typeof loaded.exports.Root !== "function" ||
    typeof loaded.exports.Root.prototype.publishTreeExclusive !== "function" ||
    typeof loaded.exports.rootExists !== "function" ||
    typeof loaded.exports.getProcessIdentity !== "function"
  ) {
    throw new Error("Native creator filesystem returned an invalid interface.");
  }
  return loaded.exports;
}

function isLink(pathname) {
  try {
    return fs.lstatSync(pathname).isSymbolicLink();
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function writeExclusive(pathname, value) {
  fs.writeFileSync(pathname, value, { flag: "wx" });
}

function waitForPath(pathname, child, label) {
  for (let attempt = 0; attempt < 1_500; attempt += 1) {
    if (fs.existsSync(pathname)) return;
    if (child && child.exitCode !== null) throw new Error(`${label} exited before its barrier.`);
    pause(10);
  }
  throw new Error(`${label} did not reach its barrier.`);
}

function snapshotDirectory(directory) {
  const values = [];
  const visit = (current, relative) => {
    for (const name of fs.readdirSync(current).sort()) {
      const target = path.join(current, name);
      const portable = relative ? `${relative}/${name}` : name;
      const stat = fs.lstatSync(target);
      if (stat.isSymbolicLink()) {
        values.push(`${portable}\0link\0${stat.size}`);
      } else if (stat.isDirectory()) {
        values.push(`${portable}\0directory\0`);
        visit(target, portable);
      } else if (stat.isFile()) {
        const bytes = fs.readFileSync(target);
        values.push(`${portable}\0file\0${bytes.length}\0${crypto.createHash("sha256").update(bytes).digest("hex")}`);
      } else {
        values.push(`${portable}\0unsafe\0${stat.size}`);
      }
    }
  };
  visit(directory, "");
  return crypto.createHash("sha256").update(values.join("\n")).digest("hex");
}

function temporaryName(finalName, suffix) {
  return `${finalName}.tmp-${suffix}-${crypto.randomBytes(4).toString("hex")}`;
}

function atomicWrite(root, segments, value, suffix) {
  root.writeAtomicExclusive(segments, temporaryName(segments.at(-1), suffix), value);
}

function assertNativeCode(operation, expectedCode, label) {
  try {
    operation();
  } catch (error) {
    if (String(error && error.code) === expectedCode) return;
    throw new Error(`${label} returned ${error && error.code} instead of ${expectedCode}: ${error && error.message}`);
  }
  throw new Error(`${label} unexpectedly succeeded.`);
}

function assertNativeBytes(root, segments, expected, label) {
  const actual = root.readFile(segments, 1024 * 1024);
  if (!Buffer.from(actual).equals(expected)) {
    throw new Error(`${label} returned unexpected native bytes.`);
  }
}

function assertUniformFile(pathname, length, byte, label) {
  const bytes = fs.readFileSync(pathname);
  if (bytes.length !== length || bytes.some((value) => value !== byte)) {
    throw new Error(`${label} is missing, partial, mixed, or otherwise unexpected.`);
  }
}

function assertVisibilityTree(rootPath, name, byte) {
  const treePath = path.join(rootPath, name);
  const topNames = fs.readdirSync(treePath).sort();
  if (JSON.stringify(topNames) !== JSON.stringify(["assets", "index.html"])) {
    throw new Error(`Published visibility tree ${name} exposed an incomplete top-level inventory.`);
  }
  const assetNames = fs.readdirSync(path.join(treePath, "assets")).sort();
  if (JSON.stringify(assetNames) !== JSON.stringify(["app.js"])) {
    throw new Error(`Published visibility tree ${name} exposed an incomplete nested inventory.`);
  }
  assertUniformFile(path.join(treePath, "index.html"), 24_576, byte, `${name}/index.html`);
  assertUniformFile(path.join(treePath, "assets", "app.js"), 24_576, byte ^ 0xff, `${name}/assets/app.js`);
}

function assertRaceRejection(operation, label) {
  try {
    operation();
  } catch (error) {
    if (["access_denied", "busy", "not_found", "unsafe_reparse"].includes(String(error && error.code))) {
      return String(error.code);
    }
    throw new Error(`${label} returned an unexpected ${error && error.code}: ${error && error.message}`);
  }
  throw new Error(`${label} crossed a held junction instead of failing closed.`);
}

function restoreOwnedRace(racePath, holdingPath) {
  if (isLink(racePath)) fs.unlinkSync(racePath);
  if (!fs.existsSync(racePath) && fs.existsSync(holdingPath)) fs.renameSync(holdingPath, racePath);
}

async function junctionAttacker(args) {
  const [racePath, holdingPath, outsidePath, readyPath, releasePath, restoredPath, stopPath, metricsPath] = args;
  let placements = 0;
  let removals = 0;
  let spills = 0;
  fs.renameSync(racePath, holdingPath);
  fs.symlinkSync(outsidePath, racePath, "junction");
  placements += 1;
  writeExclusive(readyPath, "held");
  while (!fs.existsSync(releasePath)) await new Promise((resolve) => setTimeout(resolve, 2));
  fs.unlinkSync(racePath);
  removals += 1;
  fs.renameSync(holdingPath, racePath);
  writeExclusive(restoredPath, "restored");
  try {
    while (!fs.existsSync(stopPath)) {
      try {
        if (fs.existsSync(racePath) && !isLink(racePath) && !fs.existsSync(holdingPath)) {
          fs.renameSync(racePath, holdingPath);
        }
        if (fs.existsSync(racePath) && !isLink(racePath) && fs.existsSync(holdingPath)) {
          const spill = path.join(path.dirname(racePath), `race-spill-${String(spills).padStart(6, "0")}`);
          fs.renameSync(racePath, spill);
          spills += 1;
        }
        if (!fs.existsSync(racePath) && fs.existsSync(holdingPath)) {
          fs.symlinkSync(outsidePath, racePath, "junction");
          placements += 1;
        }
        await new Promise((resolve) => setImmediate(resolve));
        if (isLink(racePath)) {
          fs.unlinkSync(racePath);
          removals += 1;
        }
        if (!fs.existsSync(racePath) && fs.existsSync(holdingPath)) {
          fs.renameSync(holdingPath, racePath);
        }
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }
  } finally {
    restoreOwnedRace(racePath, holdingPath);
    fs.writeFileSync(metricsPath, JSON.stringify({ placements, removals, spills }), { flag: "wx" });
  }
}

async function hardlinkAttacker(args) {
  const [stagingPath, outsidePath, readyPath, stopPath, metricsPath] = args;
  let attempts = 0;
  let successes = 0;
  let scans = 0;
  writeExclusive(readyPath, "ready");
  while (!fs.existsSync(stopPath)) {
    scans += 1;
    let names = [];
    try {
      names = fs.readdirSync(stagingPath).filter((name) => name.includes(".tmp-"));
    } catch {}
    for (const name of names) {
      attempts += 1;
      try {
        fs.linkSync(path.join(stagingPath, name), path.join(outsidePath, `hardlink-${attempts}.bin`));
        successes += 1;
      } catch {}
    }
    await new Promise((resolve) => setImmediate(resolve));
  }
  fs.writeFileSync(metricsPath, JSON.stringify({ attempts, successes, scans }), { flag: "wx" });
}

async function concurrentExclusiveWriter(args) {
  const [rootSegmentsJson, targetSegmentsJson, temporary, readyPath, goPath, resultPath] = args;
  const binding = loadBinding();
  const root = new binding.Root(projectRoot, JSON.parse(rootSegmentsJson));
  writeExclusive(readyPath, "ready");
  while (!fs.existsSync(goPath)) pause(1);
  let result = "success";
  try {
    root.writeAtomicExclusive(
      JSON.parse(targetSegmentsJson),
      temporary,
      Buffer.alloc(1024 * 1024, 0x63)
    );
  } catch (error) {
    result = String(error && error.code);
  }
  writeExclusive(resultPath, result);
}

async function concurrentAtomicReplacer(args) {
  const [rootSegmentsJson, targetSegmentsJson, temporary, replacementByte, readyPath, goPath, resultPath] = args;
  const binding = loadBinding();
  const root = new binding.Root(projectRoot, JSON.parse(rootSegmentsJson));
  writeExclusive(readyPath, "ready");
  while (!fs.existsSync(goPath)) pause(1);
  let result = "success";
  try {
    root.writeAtomicReplace(
      JSON.parse(targetSegmentsJson),
      temporary,
      Buffer.alloc(1024 * 1024, Number(replacementByte)),
      Buffer.alloc(1024 * 1024, 0x63),
      null,
      null
    );
  } catch (error) {
    result = String(error && error.code);
  }
  writeExclusive(resultPath, result);
}

async function treeVisibilityPublisher(args) {
  const [rootSegmentsJson, readyPath, goPath, resultPath] = args;
  const binding = loadBinding();
  const root = new binding.Root(projectRoot, JSON.parse(rootSegmentsJson), "persistent");
  writeExclusive(readyPath, "ready");
  while (!fs.existsSync(goPath)) pause(1);
  for (let index = 0; index < 48; index += 1) {
    const byte = 0x20 + index;
    root.publishTreeExclusive(
      [`visibility-${String(index).padStart(3, "0")}`],
      [
        [["index.html"], Buffer.alloc(24_576, byte)],
        [["assets", "app.js"], Buffer.alloc(24_576, byte ^ 0xff)],
      ]
    );
  }
  root.close();
  writeExclusive(resultPath, "48");
}

async function treeRacePublisher(args) {
  const [rootSegmentsJson, targetSegmentsJson, payloadByte, readyPath, goPath, resultPath] = args;
  const binding = loadBinding();
  const root = new binding.Root(projectRoot, JSON.parse(rootSegmentsJson), "persistent");
  writeExclusive(readyPath, "ready");
  while (!fs.existsSync(goPath)) pause(1);
  const byte = Number(payloadByte);
  let result = "success";
  try {
    root.publishTreeExclusive(
      JSON.parse(targetSegmentsJson),
      [
        [["index.html"], Buffer.alloc(24_576, byte)],
        [["assets", "app.js"], Buffer.alloc(24_576, byte ^ 0xff)],
      ]
    );
  } catch (error) {
    result = String(error && error.code);
  }
  root.close();
  writeExclusive(resultPath, result);
}

function startChild(mode, args) {
  const child = spawn(process.execPath, [__filename, mode, ...args], {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk.toString(); });
  child.stderr.on("data", (chunk) => { output += chunk.toString(); });
  return { child, getOutput: () => output };
}

async function joinChild(record, label) {
  const code = record.child.exitCode !== null
    ? record.child.exitCode
    : await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          record.child.kill();
          reject(new Error(`${label} did not stop within its bounded timeout.`));
        }, 20_000);
        record.child.once("exit", (exitCode) => {
          clearTimeout(timeout);
          resolve(exitCode);
        });
      });
  if (code !== 0) throw new Error(`${label} failed (${code}): ${record.getOutput()}`);
}

async function runMain() {
  if (process.platform !== "win32") {
    process.stdout.write("Creator native filesystem smoke SKIP: Windows-only boundary.\n");
    return;
  }
  const binding = loadBinding();
  if (!/^windows-filetime:\d+$/.test(binding.getProcessIdentity(process.pid))) {
    throw new Error("Native process identity is unavailable.");
  }
  const id = `${process.pid}-${crypto.randomBytes(6).toString("hex")}`;
  const rootSegments = [".codexforge", "creator-tests", `native-race-${id}`];
  const rootPath = path.join(projectRoot, ...rootSegments);
  const racePath = path.join(rootPath, "race");
  const holdingPath = path.join(rootPath, "race-owned");
  const controlPath = fs.mkdtempSync(path.join(os.tmpdir(), `codexforge-native-${id}-`));
  const outsidePath = path.join(controlPath, "outside");
  fs.mkdirSync(outsidePath);
  writeExclusive(path.join(outsidePath, "sentinel.txt"), "outside-root sentinel\n");
  const outsideBefore = snapshotDirectory(outsidePath);
  let root = new binding.Root(projectRoot, rootSegments, "removable");
  let activeChild = null;
  try {
    const basicTreeEntries = [
      [["index.html"], Buffer.from("<!doctype html><title>Native tree</title>\n")],
      [["assets", "app.js"], Buffer.from("console.log('bounded');\n")],
      [["assets", "nested", "deep", "data.json"], Buffer.from('{"ok":true}\n')],
    ];
    root.publishTreeExclusive(["tree-basic"], basicTreeEntries);
    const basicTreePath = path.join(rootPath, "tree-basic");
    assert.deepStrictEqual(
      root.listDirectory(["tree-basic"]),
      ["assets", "index.html"],
      "Rebuilt native directory enumeration must round-trip nonempty UTF-16 names as exact UTF-8."
    );
    assert.deepStrictEqual(
      root.listDirectory(["tree-basic", "assets"]),
      ["app.js", "nested"],
      "Nested native directory enumeration must remain exact and sorted."
    );
    if (fs.readFileSync(path.join(basicTreePath, "index.html"), "utf8") !== basicTreeEntries[0][1].toString("utf8") ||
        fs.readFileSync(path.join(basicTreePath, "assets", "app.js"), "utf8") !== basicTreeEntries[1][1].toString("utf8") ||
        fs.readFileSync(path.join(basicTreePath, "assets", "nested", "deep", "data.json"), "utf8") !== basicTreeEntries[2][1].toString("utf8")) {
      throw new Error("Exclusive native tree publication returned incomplete or unexpected bytes.");
    }
    assertNativeCode(
      () => root.publishTreeExclusive(["tree-basic"], basicTreeEntries),
      "already_exists",
      "Existing exclusive tree target"
    );
    const maximumArtifactPath = [
      "files",
      "a".repeat(30),
      "b".repeat(30),
      "c".repeat(30),
      `${"d".repeat(23)}.txt`,
    ];
    if (maximumArtifactPath.join("/").length !== 126) {
      throw new Error("Maximum creator artifact transport path fixture is not exactly 126 characters.");
    }
    const maximumArtifactEntries = [
      [maximumArtifactPath, Buffer.alloc(24_576, 1)],
      [["files", "artifact-01.js"], Buffer.alloc(24_566, 2)],
      ...Array.from({ length: 10 }, (_, index) => [
        ["files", `artifact-${String(index + 2).padStart(2, "0")}.txt`],
        Buffer.from([index + 3]),
      ]),
    ];
    const maximumArtifactBytes = maximumArtifactEntries.reduce(
      (total, entry) => total + entry[1].length,
      0
    );
    if (maximumArtifactEntries.length !== 12 || maximumArtifactBytes !== 49_152) {
      throw new Error("Maximum valid creator artifact fixture does not match its exact file and aggregate limits.");
    }
    const maximumBatchEntries = [
      ...maximumArtifactEntries,
      [["manifest.json"], Buffer.alloc(65_536, 31)],
      [["validation.json"], Buffer.alloc(131_072, 32)],
      [["revision.json"], Buffer.alloc(
        maximumTreeTransportBytes - maximumArtifactBytes - 65_536 - 131_072,
        33
      )],
    ];
    if (maximumBatchEntries.length !== 15 ||
        maximumBatchEntries.reduce((total, entry) => total + entry[1].length, 0) !== maximumTreeTransportBytes) {
      throw new Error("Maximum whole-revision publication fixture does not match its exact transport envelope.");
    }
    root.publishTreeExclusive(["tree-maximum-batch"], maximumBatchEntries);
    for (const [segments, expectedBytes] of maximumBatchEntries) {
      const actualBytes = fs.readFileSync(path.join(rootPath, "tree-maximum-batch", ...segments));
      if (!actualBytes.equals(expectedBytes)) {
        throw new Error(`Maximum whole-revision publication returned unexpected bytes for ${segments.join("/")}.`);
      }
    }
    const malformedTreeCases = [
      ["tree-empty", [], "too_many_nodes"],
      ["tree-non-buffer", [[["index.html"], "not-a-buffer"]], "invalid_path"],
      ["tree-tuple", [[["index.html"]]], "invalid_path"],
      ["tree-duplicate", [
        [["index.html"], Buffer.from("one")],
        [["index.html"], Buffer.from("two")],
      ], "path_collision"],
      ["tree-case", [
        [["Index.html"], Buffer.from("one")],
        [["index.HTML"], Buffer.from("two")],
      ], "path_collision"],
      ["tree-ancestor", [
        [["assets"], Buffer.from("file")],
        [["assets", "app.js"], Buffer.from("child")],
      ], "path_collision"],
      ["tree-depth", [[["a", "b", "c", "d", "e", "file.txt"], Buffer.from("deep")]], "invalid_path"],
      ["tree-path-characters", [[[
        "a".repeat(25),
        "b".repeat(25),
        "c".repeat(25),
        "d".repeat(25),
        "e".repeat(25),
      ], Buffer.from("long")]], "invalid_path"],
      ["tree-device", [[["CON.txt"], Buffer.from("device")]], "invalid_path"],
      ["tree-many", Array.from({ length: 16 }, (_, index) => [
        [`file-${String(index).padStart(2, "0")}.txt`],
        Buffer.from("bounded"),
      ]), "too_many_nodes"],
      ["tree-file-large", [[["large.txt"], Buffer.alloc(maximumTreeTransportBytes + 1)]], "too_large"],
      ["tree-aggregate-large", [
        [["one.txt"], Buffer.alloc(maximumTreeTransportBytes / 2, 1)],
        [["two.txt"], Buffer.alloc((maximumTreeTransportBytes / 2) + 1, 2)],
      ], "too_large"],
    ];
    for (const [target, entries, expectedCode] of malformedTreeCases) {
      assertNativeCode(
        () => root.publishTreeExclusive([target], entries),
        expectedCode,
        `Malformed tree ${target}`
      );
      assertNativeCode(
        () => root.stat([target]),
        "not_found",
        `Malformed tree rollback ${target}`
      );
    }
    root.removeTree(["tree-basic"]);
    root.removeTree(["tree-maximum-batch"]);

    root.ensureDirectory(["cas"]);
    const stateSegments = ["cas", "state.json"];
    const fenceSegments = ["cas", "owner.lock.json"];
    const stateOne = Buffer.from('{"revision":1}\n');
    const stateTwo = Buffer.from('{"revision":2}\n');
    const stateThree = Buffer.from('{"revision":3}\n');
    const stateFour = Buffer.from('{"revision":4}\n');
    const ownerOne = Buffer.from('{"owner":"one"}\n');
    const ownerTwo = Buffer.from('{"owner":"two"}\n');
    atomicWrite(root, stateSegments, stateOne, "cas-state");
    atomicWrite(root, fenceSegments, ownerOne, "cas-fence");
    root.writeAtomicReplace(
      stateSegments,
      temporaryName("state.json", "replace-success"),
      stateTwo,
      stateOne,
      fenceSegments,
      ownerOne
    );
    assertNativeBytes(root, stateSegments, stateTwo, "Successful fenced compare-and-replace");
    assertNativeCode(
      () => root.writeAtomicReplace(
        stateSegments,
        temporaryName("state.json", "target-conflict"),
        stateThree,
        stateOne,
        fenceSegments,
        ownerOne
      ),
      "compare_mismatch",
      "Stale target compare-and-replace"
    );
    assertNativeBytes(root, stateSegments, stateTwo, "Target-conflict rollback");
    assertNativeCode(
      () => root.writeAtomicReplace(
        stateSegments,
        temporaryName("state.json", "fence-conflict"),
        stateThree,
        stateTwo,
        fenceSegments,
        ownerTwo
      ),
      "fence_mismatch",
      "Stale fence compare-and-replace"
    );
    assertNativeBytes(root, stateSegments, stateTwo, "Fence-conflict rollback");
    root.writeAtomicReplace(
      stateSegments,
      temporaryName("state.json", "unchecked-target"),
      stateThree,
      null,
      fenceSegments,
      ownerOne
    );
    assertNativeBytes(root, stateSegments, stateThree, "Fenced replacement without target comparison");
    root.writeAtomicReplace(
      stateSegments,
      temporaryName("state.json", "unfenced-target"),
      stateFour,
      stateThree,
      null,
      null
    );
    assertNativeBytes(root, stateSegments, stateFour, "Exact replacement without a fence");
    const exclusiveFencedSegments = ["cas", "exclusive.json"];
    assertNativeCode(
      () => root.writeAtomicExclusive(
        exclusiveFencedSegments,
        temporaryName("exclusive.json", "stale-fence"),
        Buffer.from('{"published":true}\n'),
        fenceSegments,
        ownerTwo
      ),
      "fence_mismatch",
      "Stale-fence exclusive publication"
    );
    assertNativeCode(
      () => root.stat(exclusiveFencedSegments),
      "not_found",
      "Stale-fence exclusive publication rollback"
    );
    root.writeAtomicExclusive(
      exclusiveFencedSegments,
      temporaryName("exclusive.json", "exact-fence"),
      Buffer.from('{"published":true}\n'),
      fenceSegments,
      ownerOne
    );
    assertNativeBytes(
      root,
      exclusiveFencedSegments,
      Buffer.from('{"published":true}\n'),
      "Exact-fence exclusive publication"
    );
    assertNativeCode(
      () => root.compareDeleteExact(fenceSegments, ownerTwo),
      "compare_mismatch",
      "Stale exact deletion"
    );
    assertNativeBytes(root, fenceSegments, ownerOne, "Delete-conflict rollback");
    root.compareDeleteExact(fenceSegments, ownerOne);
    assertNativeCode(
      () => root.readFile(fenceSegments, 1024),
      "not_found",
      "Exact native deletion"
    );

    const missingExistingSegments = [".codexforge", "creator-tests", `native-existing-missing-${id}`];
    const missingExistingPath = path.join(projectRoot, ...missingExistingSegments);
    assertNativeCode(
      () => new binding.Root(projectRoot, missingExistingSegments, "existing"),
      "not_found",
      "Missing existing-root inspection"
    );
    if (fs.existsSync(missingExistingPath)) {
      throw new Error("Existing-root inspection created a missing root.");
    }

    const persistentCloseSegments = [".codexforge", "creator-tests", `native-persistent-close-${id}`];
    const persistentClosePath = path.join(projectRoot, ...persistentCloseSegments);
    const persistentCloseRoot = new binding.Root(projectRoot, persistentCloseSegments, "persistent");
    const persistentBytes = Buffer.from("persistent data survives handle release\n");
    atomicWrite(persistentCloseRoot, ["retained.txt"], persistentBytes, "persistent-close");
    persistentCloseRoot.close();
    persistentCloseRoot.close();
    assertNativeCode(
      () => persistentCloseRoot.readFile(["retained.txt"], 1024),
      "closed",
      "Closed persistent root reuse"
    );
    assertNativeCode(
      () => persistentCloseRoot.stat([]),
      "closed",
      "Closed persistent root self-stat"
    );
    if (!fs.readFileSync(path.join(persistentClosePath, "retained.txt")).equals(persistentBytes)) {
      throw new Error("Persistent root close changed retained data.");
    }
    const existingInspectionRoot = new binding.Root(
      projectRoot,
      persistentCloseSegments,
      "existing"
    );
    assertNativeBytes(
      existingInspectionRoot,
      ["retained.txt"],
      persistentBytes,
      "Existing-root read-only open"
    );
    assertNativeCode(
      () => existingInspectionRoot.ensureDirectory(["must-not-create"]),
      "access_denied",
      "Existing-root mutation"
    );
    if (fs.existsSync(path.join(persistentClosePath, "must-not-create"))) {
      throw new Error("Existing-root inspection mutated its root.");
    }
    existingInspectionRoot.close();
    const persistentCloseCleanup = new binding.Root(
      projectRoot,
      persistentCloseSegments,
      "removable"
    );
    assertNativeBytes(
      persistentCloseCleanup,
      ["retained.txt"],
      persistentBytes,
      "Persistent root close release"
    );
    persistentCloseCleanup.removeRoot();
    if (binding.rootExists(projectRoot, persistentCloseSegments)) {
      throw new Error("Persistent close verification root cleanup failed.");
    }

    let serializedAlreadyExists = 0;
    const concurrentRootSegments = [".codexforge", "creator-tests", `native-conflict-${id}`];
    for (let round = 0; round < 12; round += 1) {
      const concurrentSegments = [`concurrent-${String(round).padStart(2, "0")}.bin`];
      const goPath = path.join(controlPath, `concurrent-${round}-go`);
      const readyPaths = [0, 1].map((index) => path.join(controlPath, `concurrent-${round}-${index}-ready`));
      const resultPaths = [0, 1].map((index) => path.join(controlPath, `concurrent-${round}-${index}-result`));
      const writers = [0, 1].map((index) => startChild("concurrent-exclusive-writer", [
        JSON.stringify(concurrentRootSegments),
        JSON.stringify(concurrentSegments),
        temporaryName(concurrentSegments.at(-1), `process-${index}`),
        readyPaths[index],
        goPath,
        resultPaths[index],
      ]));
      for (let index = 0; index < writers.length; index += 1) {
        waitForPath(readyPaths[index], writers[index].child, `Concurrent writer ${round}/${index}`);
      }
      writeExclusive(goPath, "go");
      for (let index = 0; index < writers.length; index += 1) {
        waitForPath(resultPaths[index], writers[index].child, `Concurrent writer result ${round}/${index}`);
        await joinChild(writers[index], `Concurrent writer ${round}/${index}`);
      }
      const results = resultPaths.map((resultPath) => fs.readFileSync(resultPath, "utf8"));
      if (results.filter((result) => result === "success").length !== 1 ||
          results.filter((result) => result === "already_exists").length !== 1) {
        throw new Error(`Concurrent native publication returned an unsafe result: ${JSON.stringify(results)}.`);
      }
      serializedAlreadyExists += results.filter((result) => result === "already_exists").length;
    }
    const concurrentCasSegments = ["concurrent-00.bin"];
    const casGoPath = path.join(controlPath, "concurrent-cas-go");
    const casReadyPaths = [0, 1].map((index) => path.join(controlPath, `concurrent-cas-${index}-ready`));
    const casResultPaths = [0, 1].map((index) => path.join(controlPath, `concurrent-cas-${index}-result`));
    const casWriters = [0, 1].map((index) => startChild("concurrent-atomic-replacer", [
      JSON.stringify(concurrentRootSegments),
      JSON.stringify(concurrentCasSegments),
      temporaryName(concurrentCasSegments.at(-1), `cas-process-${index}`),
      String(0x64 + index),
      casReadyPaths[index],
      casGoPath,
      casResultPaths[index],
    ]));
    for (let index = 0; index < casWriters.length; index += 1) {
      waitForPath(casReadyPaths[index], casWriters[index].child, `Concurrent CAS writer ${index}`);
    }
    writeExclusive(casGoPath, "go");
    for (let index = 0; index < casWriters.length; index += 1) {
      waitForPath(casResultPaths[index], casWriters[index].child, `Concurrent CAS result ${index}`);
      await joinChild(casWriters[index], `Concurrent CAS writer ${index}`);
    }
    const casResults = casResultPaths.map((resultPath) => fs.readFileSync(resultPath, "utf8"));
    if (casResults.filter((result) => result === "success").length !== 1 ||
        casResults.some((result) => !["success", "compare_mismatch", "conflict", "busy"].includes(result))) {
      throw new Error(`Concurrent native compare-and-replace returned an unsafe result: ${JSON.stringify(casResults)}.`);
    }
    const concurrentCleanupRoot = new binding.Root(projectRoot, concurrentRootSegments, "removable");
    const concurrentCasBytes = Buffer.from(concurrentCleanupRoot.readFile(concurrentCasSegments, 1024 * 1024));
    const expectedCasByte = casResults[0] === "success" ? 0x64 : 0x65;
    if (concurrentCasBytes.length !== 1024 * 1024 ||
        concurrentCasBytes.some((value) => value !== expectedCasByte)) {
      throw new Error("Concurrent native compare-and-replace published non-atomic bytes.");
    }
    concurrentCleanupRoot.removeRoot();

    const visibilityRootSegments = [".codexforge", "creator-tests", `native-tree-visibility-${id}`];
    const visibilityRootPath = path.join(projectRoot, ...visibilityRootSegments);
    const visibilityReady = path.join(controlPath, "tree-visibility-ready");
    const visibilityGo = path.join(controlPath, "tree-visibility-go");
    const visibilityResult = path.join(controlPath, "tree-visibility-result");
    activeChild = startChild("tree-visibility-publisher", [
      JSON.stringify(visibilityRootSegments),
      visibilityReady,
      visibilityGo,
      visibilityResult,
    ]);
    waitForPath(visibilityReady, activeChild.child, "Tree visibility publisher");
    writeExclusive(visibilityGo, "go");
    let visibilityScans = 0;
    const visibilityObserved = new Set();
    while (!fs.existsSync(visibilityResult)) {
      if (activeChild.child.exitCode !== null) {
        throw new Error("Tree visibility publisher exited before recording completion.");
      }
      if (fs.existsSync(visibilityRootPath)) {
        for (const name of fs.readdirSync(visibilityRootPath).filter((value) => value.startsWith("visibility-")).sort()) {
          const index = Number(name.slice("visibility-".length));
          assertVisibilityTree(visibilityRootPath, name, 0x20 + index);
          visibilityObserved.add(name);
        }
      }
      visibilityScans += 1;
      await new Promise((resolve) => setImmediate(resolve));
    }
    await joinChild(activeChild, "Tree visibility publisher");
    activeChild = null;
    if (fs.readFileSync(visibilityResult, "utf8") !== "48") {
      throw new Error("Tree visibility publisher returned an unexpected completion count.");
    }
    for (let index = 0; index < 48; index += 1) {
      const name = `visibility-${String(index).padStart(3, "0")}`;
      assertVisibilityTree(visibilityRootPath, name, 0x20 + index);
    }
    if (visibilityScans < 10 || visibilityObserved.size < 1) {
      throw new Error("Independent scanner did not observe transaction-isolated tree publication in progress.");
    }
    new binding.Root(projectRoot, visibilityRootSegments, "removable").removeRoot();

    const treeRaceRootSegments = [".codexforge", "creator-tests", `native-tree-race-${id}`];
    const treeRaceRootPath = path.join(projectRoot, ...treeRaceRootSegments);
    const treeRaceTarget = ["winner"];
    const treeRaceGo = path.join(controlPath, "tree-race-go");
    const treeRaceReady = [0, 1].map((index) => path.join(controlPath, `tree-race-${index}-ready`));
    const treeRaceResult = [0, 1].map((index) => path.join(controlPath, `tree-race-${index}-result`));
    const treeRaceWriters = [0, 1].map((index) => startChild("tree-race-publisher", [
      JSON.stringify(treeRaceRootSegments),
      JSON.stringify(treeRaceTarget),
      String(0x71 + index),
      treeRaceReady[index],
      treeRaceGo,
      treeRaceResult[index],
    ]));
    try {
      for (let index = 0; index < treeRaceWriters.length; index += 1) {
        waitForPath(treeRaceReady[index], treeRaceWriters[index].child, `Tree race publisher ${index}`);
      }
      writeExclusive(treeRaceGo, "go");
      for (let index = 0; index < treeRaceWriters.length; index += 1) {
        waitForPath(treeRaceResult[index], treeRaceWriters[index].child, `Tree race result ${index}`);
        await joinChild(treeRaceWriters[index], `Tree race publisher ${index}`);
      }
    } finally {
      for (const writer of treeRaceWriters) {
        if (writer.child.exitCode === null) writer.child.kill();
      }
    }
    const treeRaceResults = treeRaceResult.map((resultPath) => fs.readFileSync(resultPath, "utf8"));
    if (treeRaceResults.filter((result) => result === "success").length !== 1 ||
        treeRaceResults.some((result) => !["success", "already_exists", "conflict"].includes(result))) {
      throw new Error(`Concurrent whole-tree publication returned an unsafe result: ${JSON.stringify(treeRaceResults)}.`);
    }
    if (!treeRaceResults.includes("conflict")) {
      throw new Error(`Concurrent whole-tree publication did not exercise transaction rollback: ${JSON.stringify(treeRaceResults)}.`);
    }
    const treeWinnerByte = treeRaceResults[0] === "success" ? 0x71 : 0x72;
    assertVisibilityTree(treeRaceRootPath, "winner", treeWinnerByte);
    const winnerNames = fs.readdirSync(path.join(treeRaceRootPath, "winner")).sort();
    if (JSON.stringify(winnerNames) !== JSON.stringify(["assets", "index.html"])) {
      throw new Error("Concurrent whole-tree publication merged or partially retained a losing transaction.");
    }
    new binding.Root(projectRoot, treeRaceRootSegments, "removable").removeRoot();

    root.ensureDirectory(["race"]);
    root.ensureDirectory(["rename-barrier"]);
    root.ensureDirectory(["race", "cleanup-barrier"]);
    const junctionReady = path.join(controlPath, "junction-ready");
    const junctionRelease = path.join(controlPath, "junction-release");
    const junctionRestored = path.join(controlPath, "junction-restored");
    const junctionStop = path.join(controlPath, "junction-stop");
    const junctionMetrics = path.join(controlPath, "junction-metrics.json");
    activeChild = startChild("junction-attacker", [
      racePath, holdingPath, outsidePath, junctionReady, junctionRelease,
      junctionRestored, junctionStop, junctionMetrics,
    ]);
    waitForPath(junctionReady, activeChild.child, "Held-junction actor");
    const deterministicBlocks = [
      assertRaceRejection(() => root.ensureDirectory(["race", "blocked-dir"]), "mkdir"),
      assertRaceRejection(() => atomicWrite(root, ["race", "blocked.txt"], Buffer.from("blocked"), "barrier"), "exclusive write/link publication"),
      assertRaceRejection(
        () => root.publishTreeExclusive(
          ["race", "blocked-tree"],
          [
            [["index.html"], Buffer.from("blocked")],
            [["assets", "app.js"], Buffer.from("blocked")],
          ]
        ),
        "whole-tree publication"
      ),
      assertRaceRejection(() => root.renameExclusive(["rename-barrier"], ["race", "blocked-rename"]), "rename publication"),
      assertRaceRejection(() => root.removeTree(["race", "cleanup-barrier"]), "cleanup"),
    ];
    if (snapshotDirectory(outsidePath) !== outsideBefore) {
      throw new Error("A held-junction operation changed outside-root inventory.");
    }
    writeExclusive(junctionRelease, "release");
    waitForPath(junctionRestored, activeChild.child, "Held-junction actor restore");
    const stress = { mkdir: [0, 0], write: [0, 0], tree: [0, 0], rename: [0, 0], cleanup: [0, 0] };
    const successfulStressTrees = [];
    const runStress = (name, operation) => {
      try {
        operation();
        stress[name][0] += 1;
        return true;
      } catch (error) {
        if (!["access_denied", "busy", "conflict", "not_found", "unsafe_reparse"].includes(String(error && error.code))) throw error;
        stress[name][1] += 1;
        return false;
      }
    };
    for (let index = 0; index < 400; index += 1) {
      const suffix = String(index).padStart(4, "0");
      runStress("mkdir", () => root.ensureDirectory(["race", `dir-${suffix}`]));
      runStress("write", () => atomicWrite(root, ["race", `file-${suffix}.txt`], Buffer.from(suffix), suffix));
      if (runStress("tree", () => root.publishTreeExclusive(
        ["race", `tree-${suffix}`],
        [
          [["index.html"], Buffer.from(`tree-${suffix}`)],
          [["assets", "app.js"], Buffer.from(`app-${suffix}`)],
        ]
      ))) {
        successfulStressTrees.push(suffix);
      }
      root.createDirectoryExclusive([`rename-${suffix}`]);
      runStress("rename", () => root.renameExclusive([`rename-${suffix}`], ["race", `renamed-${suffix}`]));
      runStress("cleanup", () => root.removeTree(["race", `dir-${suffix}`]));
    }
    writeExclusive(junctionStop, "stop");
    await joinChild(activeChild, "Junction-swap actor");
    activeChild = null;
    const swapMetrics = JSON.parse(fs.readFileSync(junctionMetrics, "utf8"));
    if (swapMetrics.placements < 2 || swapMetrics.removals < 2) {
      throw new Error("Independent junction actor did not complete verified swap cycles.");
    }
    for (const [name, [successes, rejections]] of Object.entries(stress)) {
      if (successes < 1 || rejections < 1) {
        throw new Error(`Junction stress lacked both a safe success and fail-closed ${name} result.`);
      }
    }
    restoreOwnedRace(racePath, holdingPath);
    const successfulTreeParents = fs.readdirSync(rootPath)
      .filter((name) => name === "race" || name === "race-owned" || name.startsWith("race-spill-"))
      .map((name) => path.join(rootPath, name));
    for (const parentPath of successfulTreeParents) {
      const parentStat = fs.lstatSync(parentPath);
      if (!parentStat.isDirectory() || parentStat.isSymbolicLink()) {
        throw new Error("Junction stress left a successful tree parent as an unsafe node.");
      }
    }
    for (const suffix of successfulStressTrees) {
      const matches = successfulTreeParents
        .map((parentPath) => path.join(parentPath, `tree-${suffix}`))
        .filter((candidate) => fs.existsSync(candidate));
      if (matches.length !== 1) {
        throw new Error(`Junction stress lost or duplicated a successful whole-tree result for ${suffix}.`);
      }
      const treePath = matches[0];
      if (
        JSON.stringify(fs.readdirSync(treePath).sort()) !== JSON.stringify(["assets", "index.html"]) ||
        fs.readFileSync(path.join(treePath, "index.html"), "utf8") !== `tree-${suffix}` ||
        fs.readFileSync(path.join(treePath, "assets", "app.js"), "utf8") !== `app-${suffix}`
      ) {
        throw new Error(`Junction stress observed an incomplete whole-tree success for ${suffix}.`);
      }
    }
    if (snapshotDirectory(outsidePath) !== outsideBefore) {
      throw new Error("Junction stress changed outside-root inventory.");
    }

    root.ensureDirectory(["hardlink-race"]);
    const hardlinkReady = path.join(controlPath, "hardlink-ready");
    const hardlinkStop = path.join(controlPath, "hardlink-stop");
    const hardlinkMetrics = path.join(controlPath, "hardlink-metrics.json");
    activeChild = startChild("hardlink-attacker", [
      path.join(rootPath, "hardlink-race"), outsidePath, hardlinkReady, hardlinkStop, hardlinkMetrics,
    ]);
    waitForPath(hardlinkReady, activeChild.child, "Hardlink actor");
    const payload = Buffer.alloc(1024 * 1024, 0x5a);
    for (let index = 0; index < 128; index += 1) {
      atomicWrite(root, ["hardlink-race", `final-${index}.bin`], payload, `hardlink-${index}`);
    }
    writeExclusive(hardlinkStop, "stop");
    await joinChild(activeChild, "Hardlink actor");
    activeChild = null;
    const hardlinkResult = JSON.parse(fs.readFileSync(hardlinkMetrics, "utf8"));
    if (hardlinkResult.scans < 10 || hardlinkResult.successes !== 0 || hardlinkResult.attempts !== 0) {
      throw new Error(`Transaction-isolated staging hardlink boundary failed: ${JSON.stringify(hardlinkResult)}.`);
    }
    if (snapshotDirectory(outsidePath) !== outsideBefore) {
      throw new Error("Exclusive staging allowed an outside-root hardlink mutation.");
    }

    const closeSegments = [".codexforge", "creator-tests", `native-close-${id}`];
    const closePath = path.join(projectRoot, ...closeSegments);
    const closeRoot = new binding.Root(projectRoot, closeSegments, "removable");
    fs.symlinkSync(outsidePath, path.join(closePath, "blocked-junction"), "junction");
    assertRaceRejection(() => closeRoot.removeRoot(), "removeRoot reparse cleanup");
    let closedCode = "";
    try { closeRoot.ensureDirectory(["must-not-use-parent"]); } catch (error) { closedCode = String(error.code); }
    if (closedCode !== "closed") throw new Error("Failed root cleanup did not irreversibly close its handle boundary.");
    assertNativeCode(() => closeRoot.stat([]), "closed", "Failed-cleanup closed root self-stat");
    const closeHoldingPath = `${closePath}-owned`;
    fs.renameSync(closePath, closeHoldingPath);
    fs.mkdirSync(closePath);
    writeExclusive(path.join(closePath, "substituted-victim.txt"), "must survive closed-root retry\n");
    assertNativeCode(() => closeRoot.removeRoot(), "closed", "Closed root substitution retry");
    if (fs.readFileSync(path.join(closePath, "substituted-victim.txt"), "utf8") !== "must survive closed-root retry\n") {
      throw new Error("Closed root retry changed a substituted directory.");
    }
    fs.rmSync(closePath, { recursive: true });
    fs.renameSync(closeHoldingPath, closePath);
    fs.unlinkSync(path.join(closePath, "blocked-junction"));
    new binding.Root(projectRoot, closeSegments, "removable").removeRoot();

    root.removeRoot();
    root = null;
    if (binding.rootExists(projectRoot, rootSegments)) throw new Error("Native deterministic root cleanup failed.");
    process.stdout.write(
      `Creator native filesystem smoke PASS: blocks=${deterministicBlocks.join(",")}; ` +
      `swaps=${swapMetrics.placements}/${swapMetrics.removals}; serializedAlreadyExists=${serializedAlreadyExists}; ` +
      `treeScans=${visibilityScans}; treeObserved=${visibilityObserved.size}; ` +
      `treeRace=${treeRaceResults.join("/")}; ` +
      `isolatedScans=${hardlinkResult.scans}; ` +
      `outside=${outsideBefore}\n`
    );
  } finally {
    if (activeChild) {
      if (!activeChild.child.killed) activeChild.child.kill();
      await new Promise((resolve) => activeChild.child.once("exit", resolve)).catch(() => undefined);
    }
    restoreOwnedRace(racePath, holdingPath);
    if (root) {
      try { root.removeRoot(); } catch {}
    }
    fs.rmSync(controlPath, { recursive: true, force: true });
  }
}

const mode = process.argv[2];
const operation = mode === "junction-attacker"
  ? junctionAttacker(process.argv.slice(3))
  : mode === "hardlink-attacker"
    ? hardlinkAttacker(process.argv.slice(3))
    : mode === "concurrent-exclusive-writer"
      ? concurrentExclusiveWriter(process.argv.slice(3))
      : mode === "concurrent-atomic-replacer"
        ? concurrentAtomicReplacer(process.argv.slice(3))
        : mode === "tree-visibility-publisher"
          ? treeVisibilityPublisher(process.argv.slice(3))
          : mode === "tree-race-publisher"
            ? treeRacePublisher(process.argv.slice(3))
            : runMain();
operation.catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
