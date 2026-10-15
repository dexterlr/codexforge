# Animation Studio everyday local launch

This launcher runs the accepted production build on the fixed local address `http://127.0.0.1:3379/animation-studio`. It does not build native code, install dependencies, enable providers, or expose a non-loopback listener.

## Everyday use

1. Open `C:\Users\User\Documents\CodexForge\Animation Studio\Start Studio.cmd`.
2. In Animation Studio, select **Personal Pilot — Neighbourhood Trailer**.
3. When finished, open `C:\Users\User\Documents\CodexForge\Animation Studio\Stop Studio.cmd`.

Starting twice reuses the exact recorded server. An unrelated process on port 3379 is reported and left untouched. Stop uses an authenticated loopback request and the recorded PID plus Windows creation identity; it never kills a PID merely because the number matches.

## Pinned local configuration

- Accepted compiled application and pilot project state: `C:\ai-lab\validation\trailer-05-everyday-pilot-20260930T094538Z\frontend`
- Launcher/configuration/evidence: `C:\ai-lab\validation\trailer-05-everyday-pilot-20260930T094538Z`
- Pilot namespace: `personal-pilot-trailer-05`
- D: imported-media library: `D:\CodexForge\.codexforge\media-libraries\0dbbc4391771e563403c0c678cd5bd7de96b070e054c948f0ca30ebd4cfafa5e`
- Render staging: `C:\ai-lab\validation\trailer-05-everyday-pilot-20260930T094538Z\render-work`
- Published outputs and project records: beneath the pilot project-state tree on C:

The named pilot uses the existing isolated **test-namespace persistence mechanism**. It is retained personal data, not a hardened production deployment. Imported source bytes are D:-backed; project records, editorial history, render ledgers, and completed outputs remain C:-backed by the current product contract.

The retained workspace is not a backup and does not protect against disk loss. Existing limits remain: the qualified renderer subset is 720p25 H.264/AAC, the supported export envelope is five minutes, interactive preview is approximate, resumable transfer is incomplete, and Browser download/large-transfer host limitations remain distinct from product success.

## Versioned application/workspace separation (T06-P1)

The v2 launcher configuration keeps `runtime.root` as the immutable accepted
application/build location and explicitly names `workspaceRoot` as the original
personal working directory. Source-library identity and writable project state
derive from that workspace, not from the newly installed application. The
existing v1 configuration remains supported without migration.

V2 pins a built-in-place artifact proof, its build-verification hash, actual
build ID, dependency location and unchanged native-addon hash. The qualified
workspace native binding is bootstrapped before Next loads. Start, Stop and
the private ownership record agree on application root, workspace root,
namespace, library and build. Duplicate Start and identity-verified graceful
Stop remain mandatory. The strict everyday configuration has no compatibility
binding field and its credential-free environment does not inherit that pin.

A launcher configuration update is not permission to change personal records.
Cutover requires a successful independent-copy compatibility render followed
by read-only Browser acceptance of the newly served client. A rollback to T05
is safe only while canonical personal data is unchanged; configuration rollback
never restores a stale project snapshot over newer user work. The versioned
promotion checkpoint records which application, if any, was actually promoted.
