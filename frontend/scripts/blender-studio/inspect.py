"""Application-owned, non-rendering inspection. Never executes embedded texts.

This is not a sandbox. Only a server-approved, content-pinned local source copy
may reach this adapter. Unsupported dependencies are reported, never resolved.
"""
import bpy
import hashlib
import json
from pathlib import Path
import sys


def identity(filename):
    source = Path(filename)
    return {"sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
            "sourceBytes": source.stat().st_size}


def inspect_loaded(filename):
    dependencies = []
    for collection, kind in ((bpy.data.libraries, "LIBRARY"), (bpy.data.images, "IMAGE"),
                             (bpy.data.sounds, "SOUND"), (bpy.data.movieclips, "MOVIE"),
                             (bpy.data.fonts, "FONT"), (bpy.data.cache_files, "CACHE"),
                             (bpy.data.volumes, "VOLUME")):
        for item in collection:
            location = getattr(item, "filepath", "")
            if location and location != "<builtin>":
                dependencies.append({"kind": kind, "path": location,
                                     "packed": bool(getattr(item, "packed_file", None))})
    drivers = []
    for collection_name in ("objects", "scenes", "materials", "worlds", "meshes", "curves",
                            "armatures", "shape_keys", "node_groups", "cameras", "lights", "textures"):
        collection = getattr(bpy.data, collection_name, [])
        for item in collection:
            data = getattr(item, "animation_data", None)
            for curve in getattr(data, "drivers", []):
                drivers.append({"owner": item.name, "type": curve.driver.type,
                                "expression": curve.driver.expression})
            tree = getattr(item, "node_tree", None)
            for curve in getattr(getattr(tree, "animation_data", None), "drivers", []):
                drivers.append({"owner": item.name + "/nodes", "type": curve.driver.type,
                                "expression": curve.driver.expression})
    scripts = [{"name": text.name, "autoRun": bool(text.use_module)} for text in bpy.data.texts]
    unsupported = []
    if any(not dep["packed"] for dep in dependencies):
        unsupported.append("EXTERNAL_DEPENDENCIES_UNSUPPORTED")
    if drivers:
        unsupported.append("DRIVERS_UNSUPPORTED")
    if any(text["autoRun"] for text in scripts):
        unsupported.append("AUTORUN_TEXT_UNSUPPORTED")
    scenes = []
    for scene in bpy.data.scenes:
        if scene.sequence_editor and len(scene.sequence_editor.strips):
            unsupported.append("SEQUENCER_UNSUPPORTED")
        tree = getattr(scene, "compositing_node_group", None) or getattr(scene, "node_tree", None)
        if tree and len(tree.nodes):
            unsupported.append("COMPOSITOR_UNSUPPORTED")
        if scene.render.engine != "BLENDER_EEVEE":
            unsupported.append("RENDER_ENGINE_UNSUPPORTED")
        if scene.view_settings.view_transform != "Standard" or scene.display_settings.display_device != "sRGB" or scene.view_settings.exposure != 0 or scene.view_settings.gamma != 1:
            unsupported.append("VIEW_TRANSFORM_UNSUPPORTED")
        for obj in scene.objects:
            for modifier in obj.modifiers:
                if modifier.type in ("FLUID", "CLOTH", "PARTICLE_SYSTEM", "OCEAN", "NODES", "MESH_CACHE", "MESH_SEQUENCE_CACHE"):
                    unsupported.append("SIMULATION_OR_PROCEDURAL_MODIFIER_UNSUPPORTED")
        scenes.append({"name": scene.name, "cameras": sorted(obj.name for obj in scene.objects if obj.type == "CAMERA"),
                       "activeCamera": scene.camera.name if scene.camera else None,
                       "frameStart": scene.frame_start, "frameEnd": scene.frame_end,
                       "fps": scene.render.fps, "fpsBase": scene.render.fps_base,
                       "width": scene.render.resolution_x, "height": scene.render.resolution_y,
                       "percentage": scene.render.resolution_percentage, "engine": scene.render.engine,
                       "renderSamples": scene.eevee.taa_render_samples,
                       "viewTransform": scene.view_settings.view_transform,
                       "displayDevice": scene.display_settings.display_device,
                       "look": scene.view_settings.look, "exposure": scene.view_settings.exposure,
                       "gamma": scene.view_settings.gamma, "filmTransparent": scene.render.film_transparent})
    for material in bpy.data.materials:
        if material.node_tree and any(node.type == "SCRIPT" for node in material.node_tree.nodes):
            unsupported.append("SCRIPT_SHADER_UNSUPPORTED")
    return {"schemaVersion": 1, "blenderVersion": bpy.app.version_string, **identity(filename),
            "scenes": scenes, "dependencies": dependencies, "embeddedScripts": scripts,
            "drivers": drivers, "addons": sorted(bpy.context.preferences.addons.keys()),
            "unsupported": sorted(set(unsupported)), "supported": not unsupported,
            "trustBoundary": "Known content-pinned source only. Blender may resolve native dependencies while opening, before this report; the catalogue must approve the exact self-contained bytes first. Disabled auto-execution is not an OS, filesystem, network or memory sandbox."}


def main():
    args = sys.argv[sys.argv.index("--") + 1:]
    if len(args) != 2:
        raise RuntimeError("INSPECTION_ARGUMENTS_INVALID")
    source, output = map(Path, args)
    if output.exists() or not source.is_file() or source.suffix.lower() != ".blend":
        raise RuntimeError("INSPECTION_PATH_INVALID")
    bpy.ops.wm.open_mainfile(filepath=str(source), load_ui=False, use_scripts=False)
    report = inspect_loaded(source)
    with output.open("x", encoding="utf-8") as handle:
        json.dump(report, handle, ensure_ascii=True, indent=2)
    print("STUDIO_INSPECTED " + json.dumps({"supported": report["supported"], "scenes": len(report["scenes"])}), flush=True)


if __name__ == "__main__":
    main()
