"""Versioned native material-edit oracle. No rendering or embedded-code execution.

Captures saved scene semantics independently of the writer. The only permitted
delta is one qualified, unlinked base-colour socket. Unsupported structures fail
closed; serialization metadata, UI selection and dependency graph caches are not
scene semantics. This is not an OS sandbox.
"""
import bpy
import copy
import hashlib
import json
import math
import mathutils
from pathlib import Path
import struct
import sys

VERSION = "STUDIO_BLENDER_MATERIAL_EDIT_V1"


def fail(code):
    raise RuntimeError(code)


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False, allow_nan=False)


def digest(value):
    return hashlib.sha256(canonical(value).encode("utf-8")).hexdigest()


def file_identity(filename):
    p = Path(filename)
    if not p.is_file() or p.is_symlink() or p.suffix.lower() != ".blend" or not 0 < p.stat().st_size <= 128 * 1024**2:
        fail("NATIVE_FILE_INVALID")
    return {"sourceSha256": hashlib.sha256(p.read_bytes()).hexdigest(), "sourceBytes": p.stat().st_size}


def exact(value, fields):
    if not isinstance(value, dict) or set(value) != set(fields.split(",")):
        fail("NATIVE_REQUEST_INVALID")


def linear(value):
    if not isinstance(value, list) or len(value) != 4 or any(isinstance(x, bool) or not isinstance(x, (float, int)) or not math.isfinite(x) or x < 0 or x > 1 for x in value):
        fail("NATIVE_COLOUR_INVALID")
    return [struct.unpack("f", struct.pack("f", float(x)))[0] for x in value]


def simple(value):
    if value is None or isinstance(value, (str, bool, int)):
        return value
    if isinstance(value, float):
        if not math.isfinite(value):
            fail("NATIVE_NONFINITE_SEMANTIC_VALUE")
        return 0.0 if value == 0 else value
    if isinstance(value, bpy.types.ID):
        return {"idType": value.bl_rna.identifier, "name": value.name_full}
    if hasattr(value, "to_dict"):
        return {str(k): simple(v) for k, v in value.to_dict().items()}
    if isinstance(value, dict):
        return {str(k): simple(v) for k, v in value.items()}
    if isinstance(value, (set, frozenset)):
        return sorted(simple(v) for v in value)
    if isinstance(value, (mathutils.Vector, mathutils.Matrix, mathutils.Color, mathutils.Quaternion, mathutils.Euler)) or hasattr(value, "__iter__"):
        return [simple(v) for v in value]
    fail("NATIVE_SEMANTIC_VALUE_UNSUPPORTED:" + type(value).__name__)


def custom(value):
    return {k: simple(value[k]) for k in sorted(value.keys()) if k != "_RNA_UI"} if hasattr(value, "keys") else {}


def rna(value, depth=0):
    """Bounded structural properties for modifiers, constraints and settings."""
    if depth > 10:
        fail("NATIVE_SEMANTIC_DEPTH_UNSUPPORTED")
    result = {}
    for prop in value.bl_rna.properties:
        name = prop.identifier
        if name in {"rna_type", "id_data", "original", "session_uid", "users", "is_updated", "is_updated_data", "is_runtime_data", "is_evaluated", "library_weak_reference", "asset_data", "preview", "is_property_overridable_library", "execution_time"}:
            continue
        if isinstance(value, bpy.types.Node) and name in {"inputs", "outputs", "internal_links"}:
            continue  # Socket values and directed graph links have an explicit projection.
        # This generic settings projection omits computed diagnostics. Persistent
        # read-only geometry (notably rest bones and attributes) is explicit below.
        if prop.is_readonly and prop.type not in {"COLLECTION", "POINTER"}:
            continue
        item = getattr(value, name)
        if prop.type == "POINTER":
            if isinstance(item, (bpy.types.Node, bpy.types.NodeSocket, bpy.types.Bone)):
                result[name] = {"type": item.bl_rna.identifier, "name": item.name}
            else:
                result[name] = simple(item) if item is None or isinstance(item, bpy.types.ID) else rna(item, depth + 1)
        elif prop.type == "COLLECTION":
            if len(item) > 1_000_000:
                fail("NATIVE_SEMANTIC_CAPACITY")
            result[name] = [simple(x) if isinstance(x, bpy.types.ID) else {"bone": x.name} if isinstance(x, bpy.types.Bone) else rna(x, depth + 1) for x in item]
        else:
            result[name] = simple(item)
    return result


def curves(collection):
    return [{"path": c.data_path, "index": c.array_index, "extrapolation": c.extrapolation,
             "mute": c.mute, "autoSmoothing": c.auto_smoothing,
             "group": c.group.name if c.group else None,
             "keys": [{"co": list(k.co), "left": list(k.handle_left), "right": list(k.handle_right),
               "leftType": k.handle_left_type, "rightType": k.handle_right_type, "interpolation": k.interpolation,
               "easing": k.easing, "amplitude": k.amplitude, "back": k.back, "period": k.period, "type": k.type} for k in c.keyframe_points],
             "samples": [list(p.co) for p in c.sampled_points], "modifiers": [rna(m) for m in c.modifiers]} for c in collection]


def scalar_properties(value):
    return {p.identifier: simple(getattr(value, p.identifier)) for p in value.bl_rna.properties
            if p.identifier != "rna_type" and p.type not in {"POINTER", "COLLECTION"}}


def saved_scalar_properties(value, exclude=()):
    """Flat authored settings only: no traversal into ID pointers or caches."""
    return {p.identifier: simple(getattr(value, p.identifier)) for p in value.bl_rna.properties
            if not p.is_readonly and p.identifier not in {"rna_type", "tag", "use_extra_user", *exclude}
            and p.type not in {"POINTER", "COLLECTION"}}


def named_properties(value, names):
    # The executable version is separately pinned. Optional version-specific
    # properties still contribute whenever that pinned executable exposes them.
    return {name: simple(getattr(value, name)) for name in names if hasattr(value, name)}


def attribute_state(attribute):
    if len(attribute.data) > 1_000_000:
        fail("NATIVE_SEMANTIC_CAPACITY")
    values = [scalar_properties(item) for item in attribute.data]
    if any(not value for value in values):
        fail("NATIVE_ATTRIBUTE_VALUE_UNSUPPORTED:" + attribute.data_type)
    return {"name": attribute.name, "type": attribute.data_type, "domain": attribute.domain, "data": values}


def collection_state(collection):
    return {"objects": sorted(x.name for x in collection.objects),
            "children": sorted(x.name for x in collection.children),
            "properties": saved_scalar_properties(collection), "custom": custom(collection)}


def layer_collection_state(collection, depth=0):
    if depth > 32 or len(collection.children) > 1024:
        fail("NATIVE_VIEW_LAYER_CAPACITY")
    return {"collection": simple(collection.collection), "exclude": collection.exclude,
            "holdout": collection.holdout, "indirectOnly": collection.indirect_only,
            "hideViewport": collection.hide_viewport,
            "children": [layer_collection_state(x, depth + 1) for x in sorted(collection.children, key=lambda x: x.name)]}


def view_layer_state(layer):
    if len(layer.aovs) > 128 or len(layer.lightgroups) > 128:
        fail("NATIVE_VIEW_LAYER_CAPACITY")
    return {"name": layer.name, "properties": saved_scalar_properties(layer),
            "materialOverride": simple(layer.material_override),
            "collection": layer_collection_state(layer.layer_collection),
            "objectHide": {x.name: x.hide_get(view_layer=layer) for x in layer.objects},
            "aovs": [rna(x) for x in layer.aovs], "lightgroups": [rna(x) for x in layer.lightgroups],
            "cycles": rna(layer.cycles) if hasattr(layer, "cycles") else None, "custom": custom(layer)}


def bone_state(bone):
    # These are read-only in object mode but are authored rest geometry, not
    # diagnostics. A changed head/tail/roll can deform a rig with identical keys.
    return {"name": bone.name, "parent": bone.parent.name if bone.parent else None,
            "headLocal": simple(bone.head_local), "tailLocal": simple(bone.tail_local),
            "matrixLocal": simple(bone.matrix_local), "properties": rna(bone), "custom": custom(bone)}


def armature_state(armature):
    return {"properties": saved_scalar_properties(armature), "bones": [bone_state(b) for b in armature.bones],
            "collections": [{"name": c.name, "parent": c.parent.name if c.parent else None,
                             "properties": saved_scalar_properties(c), "bones": sorted(b.name for b in c.bones),
                             "custom": custom(c)} for c in armature.collections_all],
            "animation": animation(armature), "custom": custom(armature)}


def pose_bone_state(bone):
    return {"name": bone.name,
            # Includes IK limits/stiffness/stretch, B-bone and inheritance controls,
            # not just location/rotation. Derived pose matrices are intentionally
            # excluded; their authored rest geometry and controls are protected.
            "properties": saved_scalar_properties(bone, {"matrix", "matrix_basis"}),
            "customShape": simple(bone.custom_shape),
            "customShapeTransform": bone.custom_shape_transform.name if bone.custom_shape_transform else None,
            "bboneHandleStart": bone.bbone_custom_handle_start.name if bone.bbone_custom_handle_start else None,
            "bboneHandleEnd": bone.bbone_custom_handle_end.name if bone.bbone_custom_handle_end else None,
            "constraints": [rna(x) for x in bone.constraints], "custom": custom(bone)}


def animation(value):
    data = getattr(value, "animation_data", None)
    if not data:
        return None
    if len(data.drivers):
        fail("NATIVE_DRIVERS_UNSUPPORTED")
    return {"action": simple(data.action), "slot": getattr(data, "action_slot_handle", None),
            "settings": saved_scalar_properties(data),
            "blend": data.action_blend_type, "influence": data.action_influence,
            "extrapolation": data.action_extrapolation, "useNla": data.use_nla,
            "nla": [rna(track) for track in data.nla_tracks]}


def nodes(tree):
    if not tree:
        return None
    result = {}
    for node in tree.nodes:
        if getattr(node, "image", None) is not None:
            fail("NATIVE_IMAGE_ASSET_UNSUPPORTED")
        props = rna(node)
        for transient in ("location", "width", "height", "dimensions", "select", "show_options", "show_preview", "show_texture", "hide"):
            props.pop(transient, None)
        result[node.name] = {"type": node.bl_idname, "props": props,
            "inputs": {socket.identifier: simple(socket.default_value) for socket in node.inputs if hasattr(socket, "default_value")},
            "outputs": {socket.identifier: simple(socket.default_value) for socket in node.outputs if hasattr(socket, "default_value")}, "custom": custom(node)}
    return {"nodes": result, "links": sorted([link.from_node.name, link.from_socket.identifier, link.to_node.name, link.to_socket.identifier] for link in tree.links), "animation": animation(tree)}


def dependencies():
    rows = []
    for field, kind in (("libraries", "LIBRARY"), ("images", "IMAGE"), ("sounds", "SOUND"), ("movieclips", "MOVIE"), ("fonts", "FONT"), ("cache_files", "CACHE"), ("volumes", "VOLUME")):
        for item in getattr(bpy.data, field):
            location = getattr(item, "filepath", "")
            if location and location != "<builtin>":
                packed = getattr(item, "packed_file", None)
                if not packed:
                    fail("NATIVE_EXTERNAL_DEPENDENCY_UNSUPPORTED")
                rows.append({"kind": kind, "name": item.name, "path": location, "packedHash": hashlib.sha256(packed.data).hexdigest()})
    return sorted(rows, key=lambda r: (r["kind"], r["name"]))


def runtime_image_placeholders():
    # Blender can retain one empty Render Result ID even when the native source
    # has no image assets. Admit only the observed runtime placeholder; this is
    # not support for file/generated/packed pixels or image-backed scene data.
    if len(bpy.data.images) > 1:
        fail("NATIVE_IMAGE_ASSET_UNSUPPORTED")
    result = []
    for image in bpy.data.images:
        state = {"name": image.name, "source": image.source, "type": image.type,
                 "size": list(image.size), "hasData": image.has_data,
                 "packed": image.packed_file is not None,
                 "packedFileCount": len(image.packed_files),
                 "filepath": image.filepath, "filepathRaw": image.filepath_raw,
                 "users": image.users, "alpha": image.alpha_mode}
        if state != {"name": "Render Result", "source": "VIEWER", "type": "RENDER_RESULT",
                     "size": [0, 0], "hasData": False, "packed": False, "packedFileCount": 0,
                     "filepath": "", "filepathRaw": "", "users": 1, "alpha": "STRAIGHT"}:
            fail("NATIVE_IMAGE_ASSET_UNSUPPORTED")
        if len(image.pixels) or getattr(image, "animation_data", None) is not None:
            fail("NATIVE_IMAGE_ASSET_UNSUPPORTED")
        if any(obj.data == image for obj in bpy.data.objects) or any(
            background.image == image for camera in bpy.data.cameras for background in camera.background_images
        ):
            fail("NATIVE_IMAGE_ASSET_UNSUPPORTED")
        result.append({**state, "custom": custom(image)})
    return result


def snapshot():
    # This admission is deliberately narrower than Blender itself. Do not accept
    # unprojected geometry, image pixels/colour interpretation or legacy textures
    # merely because the chosen material happens to use a supported graph.
    for field in ("libraries", "node_groups", "particle_settings", "metaballs", "grease_pencils", "volumes", "cache_files", "movieclips",
                  "lattices", "pointclouds", "hair_curves", "lightprobes", "textures", "sounds"):
        if len(getattr(bpy.data, field, [])):
            fail("NATIVE_SEMANTIC_COLLECTION_UNSUPPORTED:" + field)
    runtime_images = runtime_image_placeholders()
    if any(font.filepath != "<builtin>" for font in bpy.data.fonts):
        fail("NATIVE_SEMANTIC_FONT_UNSUPPORTED")
    materials = {m.name: {"props": saved_scalar_properties(m, {"paint_active_slot", "paint_clone_slot"}),
                 "nodes": nodes(m.node_tree), "animation": animation(m), "custom": custom(m)} for m in bpy.data.materials}
    objects = {}
    for obj in bpy.data.objects:
        if obj.type not in {"MESH", "CURVE", "SURFACE", "FONT", "ARMATURE", "EMPTY", "CAMERA", "LIGHT"}:
            fail("NATIVE_OBJECT_TYPE_UNSUPPORTED:" + obj.type)
        if obj.rigid_body or obj.rigid_body_constraint or (obj.field and obj.field.type != "NONE"):
            fail("NATIVE_PHYSICS_UNSUPPORTED")
        objects[obj.name] = {"type": obj.type, "data": simple(obj.data), "parent": simple(obj.parent), "parentType": obj.parent_type,
            "parentBone": obj.parent_bone, "matrixParentInverse": simple(obj.matrix_parent_inverse), "location": list(obj.location),
            "rotationMode": obj.rotation_mode, "rotationEuler": list(obj.rotation_euler), "rotationQuaternion": list(obj.rotation_quaternion),
            "rotationAxisAngle": list(obj.rotation_axis_angle), "scale": list(obj.scale), "deltaLocation": list(obj.delta_location),
            "deltaRotationEuler": list(obj.delta_rotation_euler), "deltaRotationQuaternion": list(obj.delta_rotation_quaternion), "deltaScale": list(obj.delta_scale),
            "hideRender": obj.hide_render, "hideViewport": obj.hide_viewport, "visibleCamera": obj.visible_camera,
            "settings": saved_scalar_properties(obj, {"dimensions", "matrix_world", "matrix_local", "matrix_basis", "active_material_index"}),
            "instanceCollection": simple(obj.instance_collection),
            "lightLinking": named_properties(obj.light_linking, ("receiver_collection", "blocker_collection")) if hasattr(obj, "light_linking") else None,
            "slots": [{"material": simple(slot.material), "link": slot.link} for slot in obj.material_slots],
            "modifiers": [rna(x) for x in obj.modifiers], "constraints": [rna(x) for x in obj.constraints],
            "groups": [{"name": x.name, "index": x.index, "locked": x.lock_weight} for x in obj.vertex_groups],
            "pose": {"properties": saved_scalar_properties(obj.pose), "ik": rna(obj.pose.ik_param) if obj.pose.ik_param else None,
                     "bones": [pose_bone_state(p) for p in obj.pose.bones]} if obj.pose else None,
            "animation": animation(obj), "custom": custom(obj)}
    meshes = {}
    for mesh in bpy.data.meshes:
        geometry = {"vertices": [{"co": list(v.co), "groups": [[g.group, g.weight] for g in v.groups]} for v in mesh.vertices],
                    "edges": [list(e.vertices) for e in mesh.edges], "polygons": [{"vertices": list(p.vertices), "material": p.material_index, "smooth": p.use_smooth} for p in mesh.polygons],
                    "attributes": [attribute_state(a) for a in mesh.attributes],
                    "attributeSettings": named_properties(mesh.attributes, ("active_index", "active_color_index", "render_color_index", "default_color_name")),
                    "colorAttributeSettings": named_properties(mesh.color_attributes, ("active_color_index", "render_color_index", "default_color_name")),
                    "uvLayers": [{"name": uv.name, "activeRender": uv.active_render, "activeClone": uv.active_clone} for uv in mesh.uv_layers],
                    "settings": saved_scalar_properties(mesh),
                    "materials": [simple(m) for m in mesh.materials], "custom": custom(mesh), "animation": animation(mesh)}
        meshes[mesh.name] = digest(geometry)
    actions = {}
    for action in bpy.data.actions:
        actions[action.name] = {"slots": [{"identifier": s.identifier, "type": s.target_id_type, "handle": s.handle} for s in action.slots],
          "properties": saved_scalar_properties(action),
          "layers": [{"properties": scalar_properties(layer),
                      "strips": [{"properties": scalar_properties(strip), "bags": [{"slot": bag.slot_handle, "curves": curves(bag.fcurves)} for bag in strip.channelbags]} for strip in layer.strips]} for layer in action.layers],
          "legacyCurves": curves(getattr(action, "fcurves", [])), "custom": custom(action)}
    scenes = {}
    for scene in bpy.data.scenes:
        compositor = getattr(scene, "compositing_node_group", None) or getattr(scene, "node_tree", None)
        if (scene.sequence_editor and len(scene.sequence_editor.strips)) or (compositor and len(compositor.nodes)):
            fail("NATIVE_SEMANTIC_COMPOSITOR_UNSUPPORTED")
        if scene.rigidbody_world:
            fail("NATIVE_PHYSICS_UNSUPPORTED")
        if len(scene.view_layers) > 32:
            fail("NATIVE_VIEW_LAYER_CAPACITY")
        scenes[scene.name] = {"camera": simple(scene.camera), "world": simple(scene.world), "frameStart": scene.frame_start, "frameEnd": scene.frame_end,
            "frameCurrent": scene.frame_current, "render": rna(scene.render), "eevee": rna(scene.eevee), "view": rna(scene.view_settings),
            "timing": named_properties(scene, ("frame_subframe", "frame_step", "use_preview_range", "frame_preview_start", "frame_preview_end")),
            "gravity": list(scene.gravity), "useGravity": scene.use_gravity,
            "cycles": rna(scene.cycles) if hasattr(scene, "cycles") else None,
            "collection": collection_state(scene.collection),
            "viewLayers": [view_layer_state(x) for x in scene.view_layers],
            "display": rna(scene.display_settings), "unit": rna(scene.unit_settings), "animation": animation(scene),
            "objects": sorted(x.name for x in scene.objects), "custom": custom(scene)}
    return {"format": "studio-blender-semantic-v1", "objects": objects, "meshes": meshes, "materials": materials,
            "actions": actions, "scenes": scenes, "cameras": {x.name: rna(x) for x in bpy.data.cameras},
            "lights": {x.name: rna(x) for x in bpy.data.lights},
            "worlds": {x.name: {"nodes": nodes(x.node_tree), "useNodes": x.use_nodes, "properties": saved_scalar_properties(x),
                                "mist": rna(x.mist_settings), "animation": animation(x), "custom": custom(x)} for x in bpy.data.worlds},
            "armatures": {x.name: armature_state(x) for x in bpy.data.armatures},
            "curves": {x.name: rna(x) for x in bpy.data.curves}, "shapeKeys": {x.name: rna(x) for x in bpy.data.shape_keys},
            "collections": {x.name: collection_state(x) for x in bpy.data.collections},
            "runtimeImages": runtime_images,
            "texts": {x.name: {"hash": hashlib.sha256(x.as_string().encode()).hexdigest(), "autoRun": x.use_module} for x in bpy.data.texts}, "dependencies": dependencies()}


def validate_policy(policy, source_hash):
    exact(policy, "sourceSha256,allowedMaterials,protectedObjects,protectedMaterials")
    if policy["sourceSha256"] != source_hash:
        fail("NATIVE_POLICY_STALE")
    for key in ("allowedMaterials", "protectedObjects", "protectedMaterials"):
        values = policy[key]
        if not isinstance(values, list) or len(values) > 128 or len(set(values)) != len(values) or any(not isinstance(n, str) or not n or len(n) > 256 for n in values):
            fail("NATIVE_POLICY_INVALID")
    if set(policy["allowedMaterials"]) & set(policy["protectedMaterials"]):
        fail("NATIVE_POLICY_CONFLICT")
    if any(bpy.data.objects.get(n) is None for n in policy["protectedObjects"]) or any(bpy.data.materials.get(n) is None for n in policy["protectedMaterials"]):
        fail("NATIVE_PROTECTED_IDENTITY_MISSING")


def supported_colour_socket(tree):
    """Recognize two bounded graph families by topology, never by node names."""
    if not tree or any(n.mute for n in tree.nodes):
        return None, None
    outputs = [n for n in tree.nodes if n.bl_idname == "ShaderNodeOutputMaterial" and n.is_active_output]
    if len(outputs) != 1:
        return None, None
    output = outputs[0]
    def incoming(node, socket, expected_type):
        entry = node.inputs.get(socket)
        if not entry or len(entry.links) != 1 or entry.links[0].from_node.bl_idname != expected_type:
            raise ValueError("unsupported graph")
        return entry.links[0].from_node
    try:
        if len(tree.nodes) == 2 and len(tree.links) == 1:
            shader = incoming(output, "Surface", "ShaderNodeBsdfPrincipled")
            colour = shader.inputs.get("Base Color")
            if colour and not colour.is_linked:
                return shader, colour
        # Original EH illustrated shader: texture-modulated constant base tint,
        # multiplied by authored diffuse lighting, then emitted. Every existing
        # shader/link stays intact; only the unlinked base-tint value is eligible.
        if len(tree.nodes) != 15 or len(tree.links) != 14:
            return None, None
        emission = incoming(output, "Surface", "ShaderNodeEmission")
        shade_mix = incoming(emission, "Color", "ShaderNodeMixRGB")
        base_mix = incoming(shade_mix, "Color1", "ShaderNodeMixRGB")
        texture_add = incoming(base_mix, "Color2", "ShaderNodeMath")
        texture_mul = incoming(texture_add, "Value", "ShaderNodeMath")
        texture_sub = incoming(texture_mul, "Value", "ShaderNodeMath")
        noise = incoming(texture_sub, "Value", "ShaderNodeTexNoise")
        coordinates = incoming(noise, "Vector", "ShaderNodeTexCoord")
        shade_min = incoming(shade_mix, "Color2", "ShaderNodeMath")
        shade_add = incoming(shade_min, "Value", "ShaderNodeMath")
        shade_mul = incoming(shade_add, "Value", "ShaderNodeMath")
        bw = incoming(shade_mul, "Value", "ShaderNodeRGBToBW")
        rgb = incoming(bw, "Color", "ShaderNodeShaderToRGB")
        diffuse = incoming(rgb, "Shader", "ShaderNodeBsdfDiffuse")
        roles = [output, emission, shade_mix, base_mix, texture_add, texture_mul, texture_sub, noise, coordinates, shade_min, shade_add, shade_mul, bw, rgb, diffuse]
        if len({n.as_pointer() for n in roles}) != 15:
            return None, None
        for node, operation in ((texture_add, "ADD"), (texture_mul, "MULTIPLY"), (texture_sub, "SUBTRACT"), (shade_min, "MINIMUM"), (shade_add, "ADD"), (shade_mul, "MULTIPLY")):
            if node.operation != operation:
                return None, None
        for node in (base_mix, shade_mix):
            if node.blend_type != "MULTIPLY" or node.inputs["Fac"].is_linked or node.inputs["Fac"].default_value != 1:
                return None, None
        colour = base_mix.inputs["Color1"]
        if colour.is_linked:
            return None, None
        return base_mix, colour
    except (ValueError, KeyError):
        return None, None
    return None, None


def material_targets(source_hash, policy):
    validate_policy(policy, source_hash)
    targets = []
    for material in sorted(bpy.data.materials, key=lambda x: x.name):
        users = sorted(obj.name for obj in bpy.data.objects if any(slot.material == material for slot in obj.material_slots))
        reason = None
        tree = material.node_tree
        node, socket = supported_colour_socket(tree)
        if material.name in policy["protectedMaterials"] or set(users) & set(policy["protectedObjects"]):
            reason = "Protected scene element; native colour editing is prohibited."
        elif material.name not in policy["allowedMaterials"]:
            reason = "Not admitted by the exact-source material policy."
        elif material.library or material.override_library or not material.is_editable:
            reason = "Linked or read-only material data."
        elif len(users) != 1 or material.users > 1 or len([s for s in bpy.data.objects[users[0]].material_slots if s.material == material]) != 1:
            reason = "Shared or ambiguous material assignment."
        elif bpy.data.objects[users[0]].library or bpy.data.objects[users[0]].override_library or bpy.data.objects[users[0]].type != "MESH":
            reason = "Only a local, independently assigned mesh material is supported."
        elif material.animation_data or (tree and tree.animation_data):
            reason = "Animated or driven material inputs are unsupported."
        elif not material.use_nodes or not node or not socket:
            reason = "Unsupported shader graph: requires a simple Principled base colour or the qualified illustrated base-tint topology; the shader is not replaced."
        elif any(s.library or s.override_library for s in [bpy.data.objects[users[0]].data]):
            reason = "Linked or read-only mesh data."
        identity = {"sourceSha256": source_hash, "materialName": material.name, "nodeName": node.name if node else "", "socketIdentifier": socket.identifier if socket else "", "users": users}
        targets.append({"targetId": digest(identity), "materialName": material.name, "nodeName": identity["nodeName"],
                        "socketIdentifier": identity["socketIdentifier"], "originalLinear": list(socket.default_value) if socket else None,
                        "users": users, "eligible": reason is None, "reason": reason})
    return targets


def protected_digest(state, policy):
    # Every projected non-material semantic is protected, including rest bones,
    # view-layer overrides and world switches. Only named protected materials
    # enter this second digest; the full comparison still covers all materials.
    protected = {key: value for key, value in state.items() if key != "materials"}
    protected["materials"] = {n: state["materials"][n] for n in policy["protectedMaterials"]}
    return digest(protected)


def inspected(filename, policy):
    identity = file_identity(filename)
    targets = material_targets(identity["sourceSha256"], policy)
    state = snapshot()
    return {"format": "studio-blender-material-inspection-v1", **identity, "semanticDigest": digest(state),
            "dependenciesDigest": digest(state["dependencies"]), "targets": targets, "protectedDigest": protected_digest(state, policy), "policyDigest": digest(policy)}, state


def write_report(filename, report):
    with Path(filename).open("x", encoding="utf-8") as output:
        json.dump(report, output, sort_keys=True, ensure_ascii=True, allow_nan=False)


def verify(request):
    exact(request, "format,sourcePath,sourceSha256,outputPath,outputSha256,reportPath,policy,targetId,originalLinear,requestedLinear")
    if request["format"] != "studio-blender-semantic-verify-request-v1":
        fail("NATIVE_REQUEST_INVALID")
    if file_identity(request["sourcePath"])["sourceSha256"] != request["sourceSha256"] or file_identity(request["outputPath"])["sourceSha256"] != request["outputSha256"]:
        fail("NATIVE_FILE_CHANGED")
    bpy.ops.wm.open_mainfile(filepath=request["sourcePath"], load_ui=False, use_scripts=False)
    before_report, before = inspected(request["sourcePath"], request["policy"])
    target = next((x for x in before_report["targets"] if x["targetId"] == request["targetId"]), None)
    if not target or not target["eligible"] or target["originalLinear"] != linear(request["originalLinear"]):
        fail("NATIVE_TARGET_STALE")
    expected = copy.deepcopy(before)
    native_value = linear(request["requestedLinear"])
    if native_value[3] != target["originalLinear"][3] or native_value == target["originalLinear"]:
        fail("NATIVE_ALPHA_OR_NOOP_INVALID")
    edited = expected["materials"][target["materialName"]]["nodes"]["nodes"][target["nodeName"]]
    edited["inputs"][target["socketIdentifier"]] = native_value
    bpy.ops.wm.open_mainfile(filepath=request["outputPath"], load_ui=False, use_scripts=False)
    after = snapshot()
    if digest(expected) != digest(after):
        # Bounded diagnostic field paths, never a purported success result.
        changed = []
        def diff(a, b, at=""):
            if len(changed) >= 24: return
            if isinstance(a, dict) and isinstance(b, dict):
                for k in sorted(set(a) | set(b)):
                    if k not in a or k not in b: changed.append(at + "/" + k)
                    elif a[k] != b[k]: diff(a[k], b[k], at + "/" + k)
            elif isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
                for i, (x, y) in enumerate(zip(a, b)):
                    if x != y: diff(x, y, at + "/" + str(i))
            else: changed.append(at)
        diff(expected, after)
        fail("NATIVE_UNEXPECTED_SEMANTIC_CHANGE:" + json.dumps(changed))
    if protected_digest(before, request["policy"]) != protected_digest(after, request["policy"]):
        fail("NATIVE_PROTECTED_SEMANTICS_CHANGED")
    output_identity = file_identity(request["outputPath"])
    if output_identity["sourceSha256"] != request["outputSha256"] or file_identity(request["sourcePath"])["sourceSha256"] != request["sourceSha256"]:
        fail("NATIVE_FILE_CHANGED")
    report = {"format": "studio-blender-material-verification-v1", "outputSha256": output_identity["sourceSha256"], "outputBytes": output_identity["sourceBytes"],
              "beforeSemanticDigest": before_report["semanticDigest"], "afterSemanticDigest": digest(after), "protectedDigest": before_report["protectedDigest"],
              "changedTargetId": target["targetId"], "originalLinear": target["originalLinear"], "requestedLinear": native_value, "reopened": True, "onlyIntendedChange": True}
    write_report(request["reportPath"], report)
    print("STUDIO_NATIVE_REOPEN_VERIFIED", flush=True)


if __name__ == "__main__":
    args = sys.argv[sys.argv.index("--") + 1:]
    if len(args) != 1:
        fail("NATIVE_ARGUMENTS_INVALID")
    verify(json.loads(Path(args[0]).read_text(encoding="utf-8")))
