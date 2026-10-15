"""Bounded direct-scene preview; saved native animation is never changed/saved."""
import bpy
import importlib.util
import json
from pathlib import Path
import sys
import time

loader = importlib.util.spec_from_file_location("studio_blender_inspection", Path(__file__).with_name("inspect.py"))
inspection = importlib.util.module_from_spec(loader)
loader.loader.exec_module(inspection)


def main():
    args = sys.argv[sys.argv.index("--") + 1:]
    if len(args) != 1:
        raise RuntimeError("RENDER_ARGUMENTS_INVALID")
    request = json.loads(Path(args[0]).read_text(encoding="utf-8"))
    source = Path(request["sourcePath"])
    output = Path(request["outputDirectory"])
    if not output.is_dir() or any(output.iterdir()):
        raise RuntimeError("RENDER_DIRECTORY_NOT_EMPTY")
    if inspection.identity(source)["sourceSha256"] != request["sourceSha256"]:
        raise RuntimeError("RENDER_SOURCE_CHANGED")
    bpy.ops.wm.open_mainfile(filepath=str(source), load_ui=False, use_scripts=False)
    report = inspection.inspect_loaded(source)
    if not report["supported"] or bpy.app.version_string != "5.0.1":
        raise RuntimeError("RENDER_SOURCE_UNSUPPORTED")
    scene = bpy.data.scenes.get(request["scene"])
    camera = scene.objects.get(request["camera"]) if scene else None
    start, end = request["startFrame"], request["endFrame"]
    if not scene or scene.render.engine != "BLENDER_EEVEE" or not camera or camera.type != "CAMERA" or not (scene.frame_start <= start <= end <= scene.frame_end) or end-start+1 > 75:
        raise RuntimeError("RENDER_SELECTION_INVALID")
    if scene.render.fps != 25 or scene.render.fps_base != 1 or request["width"] != 1280 or request["height"] != 720:
        raise RuntimeError("RENDER_PRESET_UNSUPPORTED")
    scene.camera = camera
    scene.render.resolution_x, scene.render.resolution_y = 1280, 720
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGB"
    scene.render.image_settings.color_depth = "16"
    scene.render.image_settings.compression = 25
    scene.render.use_file_extension = True
    scene.render.use_compositing = False
    scene.render.use_sequencer = False
    scene.render.threads_mode = "FIXED"
    scene.render.threads = 2
    scene.eevee.taa_render_samples = 32
    scene.render.dither_intensity = 0
    scene.render.use_motion_blur = False
    began = time.monotonic()
    for ordinal, frame in enumerate(range(start, end+1), 1):
        if time.monotonic() - began > 900:
            raise RuntimeError("RENDER_TIME_LIMIT")
        scene.frame_set(frame)
        bpy.context.view_layer.update()
        target = output / ("frame_%04d.png" % ordinal)
        if target.exists():
            raise RuntimeError("RENDER_OUTPUT_EXISTS")
        scene.render.filepath = str(target)
        bpy.ops.render.render(write_still=True, scene=scene.name)
        if sum(p.stat().st_size for p in output.iterdir()) > 1024**3:
            raise RuntimeError("RENDER_STORAGE_LIMIT")
        print("STUDIO_FRAME " + json.dumps({"completed": ordinal, "total": end-start+1, "sourceFrame": frame}), flush=True)
    if inspection.identity(source)["sourceSha256"] != request["sourceSha256"]:
        raise RuntimeError("RENDER_SOURCE_CHANGED")
    print("STUDIO_RENDER_COMPLETE", flush=True)


if __name__ == "__main__":
    main()
