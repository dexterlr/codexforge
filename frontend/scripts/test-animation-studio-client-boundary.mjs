// Follow emitted runtime imports, not type-only edges. No bundler, process,
// browser, server, native storage, or network is started.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { builtinModules } from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const base = 'src/lib/codexforge/animation-studio/';
const roots = ['components/CompositionPanel.tsx', 'components/FoundationCopyPanel.tsx', 'components/BlenderSourcePanel.tsx', 'composition-contract.ts', 'validation.ts', 'blender-source-contract.ts'].map(name => base + name);
const builtin = new Set(builtinModules.flatMap(name => [name, name.replace(/^node:/u, '')]));
const sha = value => createHash('sha256').update(value).digest('hex');
function graph(overrides = new Map()) {
  const files = new Map();
  function visit(relative, trail) {
    if (files.has(relative)) return;
    assert.ok(!relative.includes('.server.'), 'Client runtime reached server module: ' + [...trail, relative].join(' -> '));
    const filename = path.join(frontend, relative), text = overrides.get(relative) ?? fs.readFileSync(filename, 'utf8');
    files.set(relative, sha(text));
    const compiled = ts.transpileModule(text, { fileName: filename, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.Preserve } }).outputText;
    const syntax = ts.createSourceFile(filename, compiled, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function dependency(specifier) {
      assert.ok(specifier !== 'server-only' && !specifier.startsWith('node:') && !builtin.has(specifier), 'Client runtime reached privileged dependency: ' + [...trail, relative, specifier].join(' -> '));
      if (!specifier.startsWith('.') && !specifier.startsWith('@/')) return;
      if (specifier.endsWith('.css')) return;
      const resolved = specifier.startsWith('@/') ? path.join(frontend, 'src', specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
      const found = [resolved, resolved + '.ts', resolved + '.tsx', path.join(resolved, 'index.ts')].find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      assert.ok(found, 'Unresolved runtime import ' + relative + ': ' + specifier);
      const next = path.relative(frontend, found).split(path.sep).join('/');
      assert.ok(next.startsWith('src/'), 'Client graph escaped source root.');
      visit(next, [...trail, relative]);
    }
    function scan(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) dependency(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || ts.isIdentifier(node.expression) && node.expression.text === 'require') && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) dependency(node.arguments[0].text);
      ts.forEachChild(node, scan);
    }
    scan(syntax);
  }
  roots.forEach(root => visit(root, []));
  return files;
}
const sourceBindings = [...graph()].map(([name, sha256]) => ({ name, sha256 }));
assert.ok(sourceBindings.some(item => item.name === base + 'blender-source-contract.ts'));
assert.ok(sourceBindings.some(item => item.name === base + 'validation.ts'));
const contract = base + 'blender-source-contract.ts';
assert.throws(() => graph(new Map([[contract, fs.readFileSync(path.join(frontend, contract), 'utf8') + '\nimport "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";\n']])), /Client runtime reached privileged dependency: .*server-only/u, 'The graph guard must reject the exact server-only leak that broke the candidate build.');
const evidence = path.join(frontend, '.codexforge/acceptance', 'studio-client-boundary-' + randomUUID());
fs.mkdirSync(evidence);
sourceBindings.push({ name: 'scripts/test-animation-studio-client-boundary.mjs', sha256: sha(fs.readFileSync(fileURLToPath(import.meta.url))) });
const report = { status: 'PASS', total: 2, passed: 2, failed: 0, roots, sourceBindings, results: ['Actual emitted client dependency graphs contain no server-only or Node runtime imports.', 'An in-memory reintroduction of the original Jarvis server-only dependency is rejected.'], sourceUnchanged: sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.name))) === item.sha256), nativeExecution: false, networkRequests: 0, build: false };
assert.equal(report.sourceUnchanged, true);
fs.writeFileSync(path.join(evidence, 'result.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ status: report.status, passed: 2, failed: 0, files: sourceBindings.length, evidence }));
