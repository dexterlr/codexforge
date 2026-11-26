"use strict";

// The local Brain processes run the same TypeScript modules as the Next server.
// Source paths are relative to this installation. Storage is relative to the worker's cwd.
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const source = path.resolve(__dirname, "..", "src");
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, ...args) {
  return resolve.call(this, request.startsWith("@/") ? path.join(source, request.slice(2)) : request, ...args);
};
const load = Module._load;
Module._load = function(request, ...args) {
  return request === "server-only" ? {} : load.call(this, request, ...args);
};
require.extensions[".ts"] = function(module, filename) {
  const sourceText = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: filename,
  }).outputText, filename);
};
