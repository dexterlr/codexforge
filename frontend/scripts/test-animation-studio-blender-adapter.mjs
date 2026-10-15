// Pure selection/pin tests; --qualify ROOT additionally runs the real two-frame
// application-owned fixture through Blender -> PNG -> FFmpeg -> admission probe.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";
import { inspectStudioColourSignals } from "./test-animation-studio-render-colour.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const attempts = blockStudioTestNetwork();
const api = createStudioTestLoader(root).load("@/lib/codexforge/animation-studio/blender-adapter.server");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const scripts = api.getBlenderAdapterScripts();
assert.match(scripts.digest, /^[a-f0-9]{64}$/);
assert.equal(scripts.inspect.sha256, sha(fs.readFileSync(scripts.inspect.path)));
assert.equal(scripts.render.sha256, sha(fs.readFileSync(scripts.render.path)));
const inspection = { schemaVersion: 1, blenderVersion: "5.0.1", supported: true, dependencies: [], drivers: [], embeddedScripts: [], scenes: [{ name: "Scene", cameras: ["Camera"], frameStart: 1, frameEnd: 1500, fps: 25, fpsBase: 1 }] };
const request = { scene: "Scene", camera: "Camera", startFrame: 76, endFrame: 150, width: 1280, height: 720, fps: 25 };
api.validateBlenderRenderSelection(request, inspection);
let negative = 0;
for (const patch of [{ startFrame: 0 }, { startFrame: 76.5 }, { endFrame: 151 }, { endFrame: 75 }, { width: 960 }, { height: 540 }, { fps: 30 }, { scene: "Unknown" }, { camera: "Unknown" }]) { assert.throws(() => api.validateBlenderRenderSelection({ ...request, ...patch }, inspection), /BLENDER_JOB_INVALID/); negative++; }
for (const patch of [{ supported: false }, { dependencies: [{ packed: false }] }, { drivers: [{ expression: "1" }] }, { embeddedScripts: [{ autoRun: true }] }]) { assert.throws(() => api.validateBlenderRenderSelection(request, { ...inspection, ...patch }), /BLENDER_SOURCE_UNSUPPORTED/); negative++; }
assert.match(api.BLENDER_ENCODING_FILTER, /lutrgb=/);
assert.match(api.BLENDER_ENCODING_FILTER, /12\.92/);
assert.match(api.BLENDER_ENCODING_FILTER, /transfer=709/);
assert.match(api.BLENDER_ENCODING_FILTER, /range=limited/);
console.log(`BLENDER_ADAPTER_PURE_PASS positive=1 negative=${negative}`);

if (process.argv[2] === "--qualify") {
  const qualification = path.resolve(process.argv[3] ?? "");
  assert.match(qualification, /^C:\\ai-lab\\validation\\studio-blender-01-[^\\]+\\[a-z0-9-]+$/i, "Exact new qualification directory required.");
  assert.equal(fs.existsSync(qualification), false, "Evidence directory must be new; no overwrites or silent retries.");
  fs.mkdirSync(qualification);
  const blender = { path: "C:\\Program Files\\Blender Foundation\\Blender 5.0\\blender.exe", sha256: "f81d3bca0af0d917e03fdf09255981b2ed0750d3a2815da991ea5425a87f8f7c" };
  const ffmpeg = { path: "C:\\Users\\User\\Documents\\Codex\\tools\\ffmpeg\\9.0.2-full\\bin\\ffmpeg.exe", sha256: "589e50b766d251afdf181dd664d40bd94407e200b019989fd7468c7d118a28d0" };
  const ffprobe = { path: "C:\\Users\\User\\Documents\\Codex\\tools\\ffmpeg\\9.0.2-full\\bin\\ffprobe.exe", sha256: "02264dfa4f56baaa31e443ece8aa16d397f6b008200e7fd184d22b9009e75fd3" };
  const identities = [], progress = [];
  const callbacks = { onProcess: identity => { identities.push(identity); console.log("OWNED_PROCESS", JSON.stringify(identity)); }, onProgress: event => { progress.push(event); console.log("PROGRESS", JSON.stringify(event)); } };
  const fixtureDirectory = path.join(qualification, "fixture"); fs.mkdirSync(fixtureDirectory);
  const fixture = await api.qualifyBlenderFixture({ blender, workDirectory: fixtureDirectory, ...callbacks });
  const workDirectory = path.join(qualification, "render"); fs.mkdirSync(workDirectory);
  const sourcePath = path.join(workDirectory, "source.blend"); fs.copyFileSync(fixture.outputPath, sourcePath, fs.constants.COPYFILE_EXCL);
  const output = await api.renderBlenderPreview({ blender, ffmpeg, ffprobe, sourcePath, expectedSourceSha256: fixture.sha256, workDirectory, adapterScriptDigest: scripts.digest, scene: "STUDIO_BLENDER_QUALIFICATION", camera: "QUALIFICATION_CAMERA", startFrame: 1, endFrame: 2, fps: 25, width: 1280, height: 720, ...callbacks });
  assert.equal(output.frames, 2); assert.equal(output.fps, 25); assert.equal(output.width, 1280); assert.equal(output.height, 720);
  assert.equal(output.inspection.supported, true); assert.equal(output.inspection.blenderVersion, "5.0.1");
  assert.equal(output.inspection.sourceSha256, fixture.sha256);
  assert.equal(sha(fs.readFileSync(sourcePath)), fixture.sha256);
  assert.equal(sha(fs.readFileSync(fixture.outputPath)), fixture.sha256);
  assert.equal(progress.filter(p => p.phase === "RENDERING").length, 2);
  assert.ok(identities.every(identity => !api.isExactBlenderProcessAlive(identity)));
  const evidence = path.join(qualification, "colour"); fs.mkdirSync(evidence);
  const systemRoot = process.env.SystemRoot;
  const environment = { SystemRoot: systemRoot, WINDIR: systemRoot, PATH: path.dirname(ffmpeg.path), TEMP: evidence, TMP: evidence };
  const signals = inspectStudioColourSignals({ filename: output.outputPath, ffmpegPath: ffmpeg.path, ffprobePath: ffprobe.path, evidenceDirectory: evidence, environment, tag: "blender" });
  assert.equal(signals.status, "PASS");
  // Independent numeric oracle: fixture is linear0.18; BT709's transfer is
  // 1.099*L^0.45-0.099. Decode only the actual emitted limited-range luma.
  const decoded = spawnSync(ffmpeg.path, ["-nostdin", "-hide_banner", "-v", "error", "-protocol_whitelist", "file,pipe", "-i", output.outputPath, "-frames:v", "1", "-vf", "extractplanes=y", "-f", "rawvideo", "pipe:1"], { shell: false, windowsHide: true, cwd: evidence, env: environment, timeout: 30000, maxBuffer: 2 * 1024 ** 2 });
  assert.equal(decoded.status, 0, decoded.stderr?.toString());
  assert.equal(decoded.stdout.length, 1280 * 720);
  const expectedY = Math.round(16 + 219 * (1.099 * Math.pow(0.18, 0.45) - 0.099));
  const actualY = decoded.stdout[360 * 1280 + 640];
  assert.ok(Math.abs(actualY - expectedY) <= 2, `Actual luma${actualY} vs independent BT709 expectation${expectedY}; relabelled sRGB would be~117.`);
  // Isolate each RGB channel from the existing neutral PNG, without another
  // Blender render. Independent BT709 coefficients check primary order and
  // limited-range chroma, as well as the neutral transfer check above.
  const primaryOracles = [];
  for (let channel = 0; channel < 3; channel++) {
    const channels = [0, 0, 0]; channels[channel] = 1;
    const filter = `crop=2:2:640:360,colorchannelmixer=rr=${channels[0]}:gg=${channels[1]}:bb=${channels[2]},${api.BLENDER_ENCODING_FILTER}`;
    const primary = spawnSync(ffmpeg.path, ["-nostdin", "-hide_banner", "-v", "error", "-protocol_whitelist", "file,pipe", "-i", path.join(workDirectory, "frames", "frame_0001.png"), "-vf", filter, "-frames:v", "1", "-f", "rawvideo", "pipe:1"], { shell: false, windowsHide: true, cwd: evidence, env: environment, timeout: 30000, maxBuffer: 4096 });
    assert.equal(primary.status, 0, primary.stderr?.toString()); assert.equal(primary.stdout.length, 6);
    const encoded = channels.map(enabled => enabled * (1.099 * Math.pow(0.18, 0.45) - 0.099));
    const luma = 0.2126 * encoded[0] + 0.7152 * encoded[1] + 0.0722 * encoded[2];
    const expected = [16 + 219 * luma, 128 + 224 * (encoded[2] - luma) / (2 * (1 - 0.0722)), 128 + 224 * (encoded[0] - luma) / (2 * (1 - 0.2126))].map(Math.round);
    const actual = [primary.stdout[0], primary.stdout[4], primary.stdout[5]];
    assert.ok(actual.every((value, index) => Math.abs(value - expected[index]) <= 2), `Primary${channel} actual${actual} expected${expected}`);
    primaryOracles.push({ channel: ["R", "G", "B"][channel], expected, actual });
  }
  const cancellation = new AbortController(); cancellation.abort();
  const cancelDirectory = path.join(qualification, "cancelled-before-start"); fs.mkdirSync(cancelDirectory);
  const before = identities.length;
  await assert.rejects(api.qualifyBlenderFixture({ blender, workDirectory: cancelDirectory, signal: cancellation.signal, ...callbacks }), /BLENDER_CANCELLED/);
  assert.equal(identities.length, before, "Pre-aborted operation must not start a child.");
  const liveCancellation = new AbortController(), liveDirectory = path.join(qualification, "cancelled-active-render");
  fs.mkdirSync(liveDirectory);
  const liveSource = path.join(liveDirectory, "source.blend"); fs.copyFileSync(fixture.outputPath, liveSource, fs.constants.COPYFILE_EXCL);
  const liveIdentities = [];
  await assert.rejects(api.renderBlenderPreview({ blender, ffmpeg, ffprobe, sourcePath: liveSource, expectedSourceSha256: fixture.sha256, workDirectory: liveDirectory, adapterScriptDigest: scripts.digest, scene: "STUDIO_BLENDER_QUALIFICATION", camera: "QUALIFICATION_CAMERA", startFrame: 1, endFrame: 2, fps: 25, width: 1280, height: 720, signal: liveCancellation.signal,
    onProcess: identity => { callbacks.onProcess(identity); liveIdentities.push(identity); if (identity.phase === "RENDERING") liveCancellation.abort(); },
    onProgress: callbacks.onProgress,
  }), /BLENDER_CANCELLED/);
  assert.equal(liveIdentities.filter(identity => identity.phase === "RENDERING").length, 1, "The cancelled render must have one exact tracked child, never an automatic retry.");
  assert.ok(liveIdentities.every(identity => !api.isExactBlenderProcessAlive(identity)));
  assert.equal(fs.existsSync(path.join(liveDirectory, "source.mp4")), false, "Cancelled work cannot publish a video.");
  assert.equal(sha(fs.readFileSync(liveSource)), fixture.sha256);
  const rejectedDirectory = path.join(qualification, "unsupported-driver-fixture"); fs.mkdirSync(rejectedDirectory);
  const rejectedFixture = await api.qualifyBlenderFixture({ blender, workDirectory: rejectedDirectory, testCase: "DRIVER", ...callbacks });
  const rejectedRender = path.join(qualification, "unsupported-driver-render"); fs.mkdirSync(rejectedRender);
  const rejectedSource = path.join(rejectedRender, "source.blend"); fs.copyFileSync(rejectedFixture.outputPath, rejectedSource, fs.constants.COPYFILE_EXCL);
  const rejectedProcesses = [];
  await assert.rejects(api.renderBlenderPreview({ blender, ffmpeg, ffprobe, sourcePath: rejectedSource, expectedSourceSha256: rejectedFixture.sha256, workDirectory: rejectedRender, adapterScriptDigest: scripts.digest, scene: "STUDIO_BLENDER_QUALIFICATION", camera: "QUALIFICATION_CAMERA", startFrame: 1, endFrame: 2, fps: 25, width: 1280, height: 720,
    onProcess: identity => { callbacks.onProcess(identity); rejectedProcesses.push(identity); }, onProgress: callbacks.onProgress,
  }), /BLENDER_SOURCE_UNSUPPORTED/);
  assert.equal(rejectedProcesses.filter(identity => identity.phase === "RENDERING").length, 0);
  const rejectedInspection = JSON.parse(fs.readFileSync(path.join(rejectedRender, "inspection.json"), "utf8"));
  assert.ok(rejectedInspection.unsupported.includes("DRIVERS_UNSUPPORTED"));
  assert.equal(fs.existsSync(path.join(rejectedRender, "source.mp4")), false);
  assert.equal(sha(fs.readFileSync(rejectedSource)), rejectedFixture.sha256);
  assert.ok(identities.every(identity => !api.isExactBlenderProcessAlive(identity)));
  const result = { status: "PASS", adapterVersion: api.BLENDER_ADAPTER_VERSION, scripts, output, progress, identities, allOwnedProcessesClosed: true, sourceUnchanged: true, colourSignals: signals.status, numericColourOracle: { linearValue: 0.18, expectedY, actualY, primaryOracles }, negativeSelectionChecks: negative, actualMidprocessCancellation: { exactRenderChildren: 1, closed: true, outputAbsent: true }, actualUnsupportedDriver: { inspectionRejected: true, renderChildren: 0, outputAbsent: true }, noAutomaticRetry: true, networkAttempts: attempts };
  fs.writeFileSync(path.join(qualification, "QUALIFICATION.json"), JSON.stringify(result, null, 2), { flag: "wx" });
  console.log("BLENDER_SUBPROCESS_COLOUR_QUALIFICATION_PASS", path.join(qualification, "QUALIFICATION.json"));
}
assert.deepEqual(attempts, []);
