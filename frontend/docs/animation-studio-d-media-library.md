# D: media library — bounded local development

New imported MP4 media can be stored in the fixed native-handle library under `D:/CodexForge/.codexforge/media-libraries/<libraryId>/`. The library ID binds the canonical project checkout and the explicit development/test workspace. Project, editorial, audit and receipt metadata remain on C:. Original C: assets retain their exact records and bytes; no migration occurs.

The server-only setting `CODEXFORGE_STUDIO_MEDIA_STORAGE=d-drive` selects D: for NEW imports. Missing configuration or `workspace` retains the C: default. Empty, unknown, case-changed or path-valued settings fail closed. Browser requests cannot choose a filesystem path, library or destination. Switching new imports back to `workspace` does not relocate D-bound assets: each retains its recorded library identity.

The existing D: filesystem is used as-is. There is no format, global directory redirection, volume-wide cleanup or allocation of the entire drive. The fixed `D:/CodexForge` app base must exist. The earlier validation-only ownership marker is not treated as a production-library marker or changed. A new library is atomically published with its own exact marker; a competing/markerless directory is never adopted. D publication is marker-fenced and final C publication binds the exact C library marker.

Unavailable D: libraries fail closed without fallback or silent recreation. Editorial review can retain metadata and identify affected sources as offline; preview verifies the selected original bytes. Existing strict execution/mutation paths still validate all required media. Rechecking a restored library does not change source identities. Moving a bound workspace to another checkout path is not an automatic migration/restore procedure; a separately tested explicit transfer contract is required.

This remains the initial bounded import envelope: MP4 only, 16 MiB/file, eight imported versions and 64 MiB/project; native transfers remain at most 1 MiB, with 512 KiB media chunks. Available disk capacity does not relax validation. High-bitrate/long media, global cross-project media indexing, proxies and resumable streaming ingestion belong to the separately authorized scalable-editor foundation.

All activation and acceptance in the current milestone uses fresh synthetic test namespaces and an isolated preview. No production configuration or port-3000 process is modified. D writes are retained test data, not a claim that the existing production preview has been reconfigured.

## T06-P1 explicit read-only compatibility binding

Ordinary library identity remains SHA-256 of canonical JSON containing the
`studio-footage-library-identity-v1` format, the native-realpath checkout (forward
slashes), and its explicit workspace/namespace. Moving an independent copy
therefore still does not grant access to the owner's D: library.

The narrow server-only extension reads
`.codexforge/studio-compatibility/readonly-library.json` beneath the requesting
workspace. `CODEXFORGE_STUDIO_COMPATIBILITY_BINDING_SHA256` must exactly pin its
canonical bytes. Its strict v1 schema names the independent C: requester and
test scope, original owner and scope, original project-record hash, derived
library ID, and exact project/asset/version/path/hash/byte-length grants. It
accepts no arbitrary library filesystem path. The authoritative original
project record, C: owner marker and fixed D: library marker are verified using
qualified existing-mode native handles, including before each source read.
A copied project record or matching hash alone is not authority.

This mode requires `workspace` as the import-destination configuration and
rejects all source imports before receiver creation, reservation, session
replay/finalization, metadata publication or capacity mutation. Library
writers are denied; D: roots open only in native existing/read-only mode.
Canonical project/history/job/output writes stay under the requester's C:
scope. Renderer staging must be a strict C: descendant of that requester;
native handles retain every renameable ancestor and the exact job directory
through asynchronous processing. Job cleanup uses the qualified removable
handle, never a close-then-path fallback. This is application-enforced
authority and safe-path isolation, not an operating-system sandbox.

Repository/source caches include the actual requester path and binding
digest. Without the pin, the extension is inactive: existing library identity,
destination selection, missing-library failure and historical readers remain
unchanged. No migration, source-reference rewriting or automatic job replay
is introduced. The compatibility override must not appear in everyday launch
configuration. Fresh acceptance and promotion results belong to the separate
T06-P1 evidence checkpoint; this source documentation is not a promotion pass.
