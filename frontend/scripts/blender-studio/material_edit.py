"""One application-owned material base-colour operation, never arbitrary code."""
import bpy
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from semantic_snapshot import exact, fail, file_identity, inspected, linear, write_report


def main():
    args = sys.argv[sys.argv.index("--") + 1:]
    if len(args) != 1:
        fail("NATIVE_ARGUMENTS_INVALID")
    request = json.loads(Path(args[0]).read_text(encoding="utf-8"))
    fields = "format,action,sourcePath,sourceSha256,reportPath,policy"
    if request.get("action") == "apply":
        fields += ",targetId,originalLinear,requestedLinear,outputPath"
    exact(request, fields)
    if request["format"] != "studio-blender-material-edit-request-v1" or request["action"] not in ("inspect", "apply"):
        fail("NATIVE_REQUEST_INVALID")
    identity = file_identity(request["sourcePath"])
    if identity["sourceSha256"] != request["sourceSha256"] or Path(request["reportPath"]).exists():
        fail("NATIVE_SOURCE_OR_REPORT_CHANGED")
    bpy.ops.wm.open_mainfile(filepath=request["sourcePath"], load_ui=False, use_scripts=False)
    report, _ = inspected(request["sourcePath"], request["policy"])
    if request["action"] == "inspect":
        write_report(request["reportPath"], report)
        print("STUDIO_NATIVE_MATERIALS_INSPECTED", flush=True)
        return
    target = next((x for x in report["targets"] if x["targetId"] == request["targetId"]), None)
    if not target or not target["eligible"] or linear(request["originalLinear"]) != target["originalLinear"]:
        fail("NATIVE_TARGET_UNSUPPORTED_OR_STALE")
    colour = linear(request["requestedLinear"])
    if colour[3] != target["originalLinear"][3] or colour == target["originalLinear"]:
        fail("NATIVE_ALPHA_OR_NOOP_INVALID")
    destination, source = Path(request["outputPath"]), Path(request["sourcePath"])
    if destination.exists() or destination.suffix.lower() != ".blend" or destination.resolve().parent != source.resolve().parent or destination.resolve() == source.resolve():
        fail("NATIVE_SAVE_PATH_INVALID")
    # Eligibility supplies exact inspected identity; no caller-defined node path.
    material = bpy.data.materials[target["materialName"]]
    node = material.node_tree.nodes[target["nodeName"]]
    socket = next(s for s in node.inputs if s.identifier == target["socketIdentifier"])
    socket.default_value = colour
    bpy.ops.wm.save_as_mainfile(filepath=str(destination), check_existing=False, compress=True)
    saved = file_identity(destination)
    if file_identity(source) != identity:
        fail("NATIVE_ORIGINAL_CHANGED")
    write_report(request["reportPath"], {"format": "studio-blender-material-save-v1", "status": "SAVED_NOT_VERIFIED",
        "outputSha256": saved["sourceSha256"], "outputBytes": saved["sourceBytes"], "beforeSemanticDigest": report["semanticDigest"],
        "changedTargetId": target["targetId"], "originalLinear": target["originalLinear"], "requestedLinear": colour})
    print("STUDIO_NATIVE_SAVED_NOT_VERIFIED", flush=True)


if __name__ == "__main__":
    main()
