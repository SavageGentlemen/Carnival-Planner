const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/emulate-_ssiyvKY.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/emotion-unitless.esm-BWDbD2bQ.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { d as TrianglesDrawMode, e as TriangleFanDrawMode, f as TriangleStripDrawMode, L as Loader, g as LoaderUtils, F as FileLoader, M as MeshPhysicalMaterial, V as Vector2, h as Color, i as LinearSRGBColorSpace, S as SRGBColorSpace, k as SpotLight, l as PointLight, D as DirectionalLight, m as Matrix4, n as Vector3, I as InstancedMesh, Q as Quaternion, o as InstancedBufferAttribute, p as Object3D, q as TextureLoader, r as ImageBitmapLoader, B as BufferAttribute, s as InterleavedBuffer, t as LinearMipmapLinearFilter, N as NearestMipmapLinearFilter, v as LinearMipmapNearestFilter, w as NearestMipmapNearestFilter, x as LinearFilter, y as NearestFilter, R as RepeatWrapping, z as MirroredRepeatWrapping, A as ClampToEdgeWrapping, G as PointsMaterial, J as Material, K as LineBasicMaterial, U as MeshStandardMaterial, W as DoubleSide, X as MeshBasicMaterial, Y as PropertyBinding, Z as BufferGeometry, $ as SkinnedMesh, a0 as Mesh, a1 as LineSegments, a2 as Line, a3 as LineLoop, a4 as Points, a5 as Group, a6 as PerspectiveCamera, a7 as MathUtils, a8 as OrthographicCamera, a9 as Skeleton, aa as AnimationClip, ab as Bone, ac as InterpolateDiscrete, ad as InterpolateLinear, ae as InterleavedBufferAttribute, af as Texture, ag as VectorKeyframeTrack, ah as NumberKeyframeTrack, ai as QuaternionKeyframeTrack, aj as ColorManagement, ak as FrontSide, al as Interpolant, am as Box3, an as Sphere, ao as Ray, ap as SphereGeometry, aq as Triangle, ar as Line3, as as Plane, at as Raycaster, _ as __vitePreload, au as BoxGeometry, av as PlaneGeometry, aw as Box2, ax as Shape, ay as ShapeGeometry, az as CylinderGeometry, aA as WebGLRenderTarget, aB as DepthTexture, aC as HalfFloatType, aD as VideoTexture, aE as QuadraticBezierCurve3, aF as Euler, aG as MeshLineGeometry, aH as MeshLineMaterial, aI as useSyncExternalStoreExports, aJ as suspend, c as useFrame, j as jsxRuntimeExports, aK as createPortal, aL as useLoader, aM as useStore$1, aN as useThree, aO as reconciler, aP as context, aQ as tunnel, aR as createRoot, aS as Scene, aT as Vector4, aU as addEffect } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, R as React } from "./vendor-swr-BEHUV5vo.js";
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
const ButtonTouchThreshold = 0.05;
const AxisTouchThreshold = 0.1;
function updateXRControllerGamepadState(target, inputSource, layout) {
  const gamepad = inputSource.gamepad;
  if (gamepad == null) {
    return;
  }
  const layoutComponents = layout.components;
  for (const key in layoutComponents) {
    let component = target[key];
    if (component == null) {
      target[key] = component = {};
    }
    const { gamepadIndices } = layoutComponents[key];
    let pressed = false;
    let touched = false;
    if (gamepadIndices.button != null && gamepadIndices.button < gamepad.buttons.length) {
      const gamepadButton = gamepad.buttons[gamepadIndices.button];
      component.button = clamp(gamepadButton.value, 0, 1);
      pressed || (pressed = gamepadButton.pressed || component.button === 1);
      touched || (touched = gamepadButton.touched || component.button > ButtonTouchThreshold);
    }
    if (gamepadIndices.xAxis != null && gamepadIndices.xAxis < gamepad.axes.length) {
      component.xAxis = clamp(gamepad.axes[gamepadIndices.xAxis], -1, 1);
      touched || (touched = Math.abs(component.xAxis) > AxisTouchThreshold);
    }
    if (gamepadIndices.yAxis != null && gamepadIndices.yAxis < gamepad.axes.length) {
      component.yAxis = clamp(gamepad.axes[gamepadIndices.yAxis], -1, 1);
      touched || (touched = Math.abs(component.yAxis) > AxisTouchThreshold);
    }
    component.state = pressed ? "pressed" : touched ? "touched" : "default";
  }
}
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) {
    console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
    return geometry;
  }
  if (drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode) {
    let index = geometry.getIndex();
    if (index === null) {
      const indices = [];
      const position = geometry.getAttribute("position");
      if (position !== void 0) {
        for (let i2 = 0; i2 < position.count; i2++) {
          indices.push(i2);
        }
        geometry.setIndex(indices);
        index = geometry.getIndex();
      } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
        return geometry;
      }
    }
    const numberOfTriangles = index.count - 2;
    const newIndices = [];
    if (drawMode === TriangleFanDrawMode) {
      for (let i2 = 1; i2 <= numberOfTriangles; i2++) {
        newIndices.push(index.getX(0));
        newIndices.push(index.getX(i2));
        newIndices.push(index.getX(i2 + 1));
      }
    } else {
      for (let i2 = 0; i2 < numberOfTriangles; i2++) {
        if (i2 % 2 === 0) {
          newIndices.push(index.getX(i2));
          newIndices.push(index.getX(i2 + 1));
          newIndices.push(index.getX(i2 + 2));
        } else {
          newIndices.push(index.getX(i2 + 2));
          newIndices.push(index.getX(i2 + 1));
          newIndices.push(index.getX(i2));
        }
      }
    }
    if (newIndices.length / 3 !== numberOfTriangles) {
      console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    }
    const newGeometry = geometry.clone();
    newGeometry.setIndex(newIndices);
    newGeometry.clearGroups();
    return newGeometry;
  } else {
    console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
    return geometry;
  }
}
class GLTFLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function(parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsDispersionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureBasisUExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureWebPExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureAVIFExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSheenExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsVolumeExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIorExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsEmissiveStrengthExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSpecularExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIridescenceExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsAnisotropyExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsBumpExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFLightsExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshoptCompression(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshGpuInstancing(parser);
    });
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    let resourcePath;
    if (this.resourcePath !== "") {
      resourcePath = this.resourcePath;
    } else if (this.path !== "") {
      const relativeUrl = LoaderUtils.extractUrlBase(url);
      resourcePath = LoaderUtils.resolveURL(relativeUrl, this.path);
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    }
    this.manager.itemStart(url);
    const _onError = function(e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(data) {
      try {
        scope.parse(data, resourcePath, function(gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  }
  setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  }
  setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  }
  setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  }
  register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }
    return this;
  }
  unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }
    return this;
  }
  parse(data, path, onLoad, onError) {
    let json;
    const extensions = {};
    const plugins = {};
    const textDecoder = new TextDecoder();
    if (typeof data === "string") {
      json = JSON.parse(data);
    } else if (data instanceof ArrayBuffer) {
      const magic = textDecoder.decode(new Uint8Array(data, 0, 4));
      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError) onError(error);
          return;
        }
        json = JSON.parse(extensions[EXTENSIONS.KHR_BINARY_GLTF].content);
      } else {
        json = JSON.parse(textDecoder.decode(data));
      }
    } else {
      json = data;
    }
    if (json.asset === void 0 || json.asset.version[0] < 2) {
      if (onError) onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const parser = new GLTFParser(json, {
      path: path || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);
    for (let i2 = 0; i2 < this.pluginCallbacks.length; i2++) {
      const plugin = this.pluginCallbacks[i2](parser);
      if (!plugin.name) console.error("THREE.GLTFLoader: Invalid plugin found: missing name");
      plugins[plugin.name] = plugin;
      extensions[plugin.name] = true;
    }
    if (json.extensionsUsed) {
      for (let i2 = 0; i2 < json.extensionsUsed.length; ++i2) {
        const extensionName = json.extensionsUsed[i2];
        const extensionsRequired = json.extensionsRequired || [];
        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;
          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
            break;
          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;
          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;
          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }
        }
      }
    }
    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  }
  parseAsync(data, path) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.parse(data, path, resolve, reject);
    });
  }
}
function GLTFRegistry() {
  let objects = {};
  return {
    get: function(key) {
      return objects[key];
    },
    add: function(key, object) {
      objects[key] = object;
    },
    remove: function(key) {
      delete objects[key];
    },
    removeAll: function() {
      objects = {};
    }
  };
}
const EXTENSIONS = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class GLTFLightsExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
    this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const parser = this.parser;
    const nodeDefs = this.parser.json.nodes || [];
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  }
  _loadLight(lightIndex) {
    const parser = this.parser;
    const cacheKey = "light:" + lightIndex;
    let dependency = parser.cache.get(cacheKey);
    if (dependency) return dependency;
    const json = parser.json;
    const extensions = json.extensions && json.extensions[this.name] || {};
    const lightDefs = extensions.lights || [];
    const lightDef = lightDefs[lightIndex];
    let lightNode;
    const color = new Color(16777215);
    if (lightDef.color !== void 0) color.setRGB(lightDef.color[0], lightDef.color[1], lightDef.color[2], LinearSRGBColorSpace);
    const range = lightDef.range !== void 0 ? lightDef.range : 0;
    switch (lightDef.type) {
      case "directional":
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      case "point":
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;
      case "spot":
        lightNode = new SpotLight(color);
        lightNode.distance = range;
        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
    }
    lightNode.position.set(0, 0, 0);
    lightNode.decay = 2;
    assignExtrasToUserData(lightNode, lightDef);
    if (lightDef.intensity !== void 0) lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  }
  getDependency(type, index) {
    if (type !== "light") return;
    return this._loadLight(index);
  }
  createNodeAttachment(nodeIndex) {
    const self2 = this;
    const parser = this.parser;
    const json = parser.json;
    const nodeDef = json.nodes[nodeIndex];
    const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    const lightIndex = lightDef.light;
    if (lightIndex === void 0) return null;
    return this._loadLight(lightIndex).then(function(light) {
      return parser._getNodeRef(self2.cache, lightIndex, light);
    });
  }
}
class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(materialParams, materialDef, parser) {
    const pending = [];
    materialParams.color = new Color(1, 1, 1);
    materialParams.opacity = 1;
    const metallicRoughness = materialDef.pbrMetallicRoughness;
    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsEmissiveStrengthExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const emissiveStrength = materialDef.extensions[this.name].emissiveStrength;
    if (emissiveStrength !== void 0) {
      materialParams.emissiveIntensity = emissiveStrength;
    }
    return Promise.resolve();
  }
}
class GLTFMaterialsClearcoatExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.clearcoatFactor !== void 0) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }
    if (extension.clearcoatTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
    }
    if (extension.clearcoatRoughnessFactor !== void 0) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }
    if (extension.clearcoatRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
    }
    if (extension.clearcoatNormalTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
      if (extension.clearcoatNormalTexture.scale !== void 0) {
        const scale = extension.clearcoatNormalTexture.scale;
        materialParams.clearcoatNormalScale = new Vector2(scale, scale);
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsDispersionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const extension = materialDef.extensions[this.name];
    materialParams.dispersion = extension.dispersion !== void 0 ? extension.dispersion : 0;
    return Promise.resolve();
  }
}
class GLTFMaterialsIridescenceExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.iridescenceFactor !== void 0) {
      materialParams.iridescence = extension.iridescenceFactor;
    }
    if (extension.iridescenceTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
    }
    if (extension.iridescenceIor !== void 0) {
      materialParams.iridescenceIOR = extension.iridescenceIor;
    }
    if (materialParams.iridescenceThicknessRange === void 0) {
      materialParams.iridescenceThicknessRange = [100, 400];
    }
    if (extension.iridescenceThicknessMinimum !== void 0) {
      materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
    }
    if (extension.iridescenceThicknessMaximum !== void 0) {
      materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
    }
    if (extension.iridescenceThicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsSheenExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    materialParams.sheenColor = new Color(0, 0, 0);
    materialParams.sheenRoughness = 0;
    materialParams.sheen = 1;
    const extension = materialDef.extensions[this.name];
    if (extension.sheenColorFactor !== void 0) {
      const colorFactor = extension.sheenColorFactor;
      materialParams.sheenColor.setRGB(colorFactor[0], colorFactor[1], colorFactor[2], LinearSRGBColorSpace);
    }
    if (extension.sheenRoughnessFactor !== void 0) {
      materialParams.sheenRoughness = extension.sheenRoughnessFactor;
    }
    if (extension.sheenColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, SRGBColorSpace));
    }
    if (extension.sheenRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsTransmissionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.transmissionFactor !== void 0) {
      materialParams.transmission = extension.transmissionFactor;
    }
    if (extension.transmissionTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsVolumeExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
    if (extension.thicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
    }
    materialParams.attenuationDistance = extension.attenuationDistance || Infinity;
    const colorArray = extension.attenuationColor || [1, 1, 1];
    materialParams.attenuationColor = new Color().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    return Promise.all(pending);
  }
}
class GLTFMaterialsIorExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IOR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const extension = materialDef.extensions[this.name];
    materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
    return Promise.resolve();
  }
}
class GLTFMaterialsSpecularExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
    if (extension.specularTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
    }
    const colorArray = extension.specularColorFactor || [1, 1, 1];
    materialParams.specularColor = new Color().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    if (extension.specularColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, SRGBColorSpace));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsBumpExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_MATERIALS_BUMP;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.bumpScale = extension.bumpFactor !== void 0 ? extension.bumpFactor : 1;
    if (extension.bumpTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "bumpMap", extension.bumpTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsAnisotropyExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.anisotropyStrength !== void 0) {
      materialParams.anisotropy = extension.anisotropyStrength;
    }
    if (extension.anisotropyRotation !== void 0) {
      materialParams.anisotropyRotation = extension.anisotropyRotation;
    }
    if (extension.anisotropyTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "anisotropyMap", extension.anisotropyTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFTextureBasisUExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }
  loadTexture(textureIndex) {
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }
    const extension = textureDef.extensions[this.name];
    const loader = parser.options.ktx2Loader;
    if (!loader) {
      if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      } else {
        return null;
      }
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
}
class GLTFTextureWebPExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
    this.isSupported = null;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return this.detectSupport().then(function(isSupported) {
      if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
      if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      }
      return parser.loadTexture(textureIndex);
    });
  }
  detectSupport() {
    if (!this.isSupported) {
      this.isSupported = new Promise(function(resolve) {
        const image = new Image();
        image.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
        image.onload = image.onerror = function() {
          resolve(image.height === 1);
        };
      });
    }
    return this.isSupported;
  }
}
class GLTFTextureAVIFExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
    this.isSupported = null;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return this.detectSupport().then(function(isSupported) {
      if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
      if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      }
      return parser.loadTexture(textureIndex);
    });
  }
  detectSupport() {
    if (!this.isSupported) {
      this.isSupported = new Promise(function(resolve) {
        const image = new Image();
        image.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
        image.onload = image.onerror = function() {
          resolve(image.height === 1);
        };
      });
    }
    return this.isSupported;
  }
}
class GLTFMeshoptCompression {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
    this.parser = parser;
  }
  loadBufferView(index) {
    const json = this.parser.json;
    const bufferView = json.bufferViews[index];
    if (bufferView.extensions && bufferView.extensions[this.name]) {
      const extensionDef = bufferView.extensions[this.name];
      const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
      const decoder = this.parser.options.meshoptDecoder;
      if (!decoder || !decoder.supported) {
        if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        } else {
          return null;
        }
      }
      return buffer.then(function(res) {
        const byteOffset = extensionDef.byteOffset || 0;
        const byteLength = extensionDef.byteLength || 0;
        const count = extensionDef.count;
        const stride = extensionDef.byteStride;
        const source = new Uint8Array(res, byteOffset, byteLength);
        if (decoder.decodeGltfBufferAsync) {
          return decoder.decodeGltfBufferAsync(count, stride, source, extensionDef.mode, extensionDef.filter).then(function(res2) {
            return res2.buffer;
          });
        } else {
          return decoder.ready.then(function() {
            const result = new ArrayBuffer(count * stride);
            decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
            return result;
          });
        }
      });
    } else {
      return null;
    }
  }
}
class GLTFMeshGpuInstancing {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
    this.parser = parser;
  }
  createNodeMesh(nodeIndex) {
    const json = this.parser.json;
    const nodeDef = json.nodes[nodeIndex];
    if (!nodeDef.extensions || !nodeDef.extensions[this.name] || nodeDef.mesh === void 0) {
      return null;
    }
    const meshDef = json.meshes[nodeDef.mesh];
    for (const primitive of meshDef.primitives) {
      if (primitive.mode !== WEBGL_CONSTANTS.TRIANGLES && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && primitive.mode !== void 0) {
        return null;
      }
    }
    const extensionDef = nodeDef.extensions[this.name];
    const attributesDef = extensionDef.attributes;
    const pending = [];
    const attributes = {};
    for (const key in attributesDef) {
      pending.push(this.parser.getDependency("accessor", attributesDef[key]).then((accessor) => {
        attributes[key] = accessor;
        return attributes[key];
      }));
    }
    if (pending.length < 1) {
      return null;
    }
    pending.push(this.parser.createNodeMesh(nodeIndex));
    return Promise.all(pending).then((results) => {
      const nodeObject = results.pop();
      const meshes = nodeObject.isGroup ? nodeObject.children : [nodeObject];
      const count = results[0].count;
      const instancedMeshes = [];
      for (const mesh of meshes) {
        const m = new Matrix4();
        const p = new Vector3();
        const q = new Quaternion();
        const s = new Vector3(1, 1, 1);
        const instancedMesh = new InstancedMesh(mesh.geometry, mesh.material, count);
        for (let i2 = 0; i2 < count; i2++) {
          if (attributes.TRANSLATION) {
            p.fromBufferAttribute(attributes.TRANSLATION, i2);
          }
          if (attributes.ROTATION) {
            q.fromBufferAttribute(attributes.ROTATION, i2);
          }
          if (attributes.SCALE) {
            s.fromBufferAttribute(attributes.SCALE, i2);
          }
          instancedMesh.setMatrixAt(i2, m.compose(p, q, s));
        }
        for (const attributeName in attributes) {
          if (attributeName === "_COLOR_0") {
            const attr = attributes[attributeName];
            instancedMesh.instanceColor = new InstancedBufferAttribute(attr.array, attr.itemSize, attr.normalized);
          } else if (attributeName !== "TRANSLATION" && attributeName !== "ROTATION" && attributeName !== "SCALE") {
            mesh.geometry.setAttribute(attributeName, attributes[attributeName]);
          }
        }
        Object3D.prototype.copy.call(instancedMesh, mesh);
        this.parser.assignFinalMaterial(instancedMesh);
        instancedMeshes.push(instancedMesh);
      }
      if (nodeObject.isGroup) {
        nodeObject.clear();
        nodeObject.add(...instancedMeshes);
        return nodeObject;
      }
      return instancedMeshes[0];
    });
  }
}
const BINARY_EXTENSION_HEADER_MAGIC = "glTF";
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 1313821514, BIN: 5130562 };
class GLTFBinaryExtension {
  constructor(data) {
    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
    const textDecoder = new TextDecoder();
    this.header = {
      magic: textDecoder.decode(new Uint8Array(data.slice(0, 4))),
      version: headerView.getUint32(4, true),
      length: headerView.getUint32(8, true)
    };
    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    } else if (this.header.version < 2) {
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    }
    const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
    const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    let chunkIndex = 0;
    while (chunkIndex < chunkContentsLength) {
      const chunkLength = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      const chunkType = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
        const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
        this.content = textDecoder.decode(contentArray);
      } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
        const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
        this.body = data.slice(byteOffset, byteOffset + chunkLength);
      }
      chunkIndex += chunkLength;
    }
    if (this.content === null) {
      throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
}
class GLTFDracoMeshCompressionExtension {
  constructor(json, dracoLoader) {
    if (!dracoLoader) {
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    }
    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }
  decodePrimitive(primitive, parser) {
    const json = this.json;
    const dracoLoader = this.dracoLoader;
    const bufferViewIndex = primitive.extensions[this.name].bufferView;
    const gltfAttributeMap = primitive.extensions[this.name].attributes;
    const threeAttributeMap = {};
    const attributeNormalizedMap = {};
    const attributeTypeMap = {};
    for (const attributeName in gltfAttributeMap) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }
    for (const attributeName in primitive.attributes) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      if (gltfAttributeMap[attributeName] !== void 0) {
        const accessorDef = json.accessors[primitive.attributes[attributeName]];
        const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[threeAttributeName] = componentType.name;
        attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
      }
    }
    return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
      return new Promise(function(resolve, reject) {
        dracoLoader.decodeDracoFile(bufferView, function(geometry) {
          for (const attributeName in geometry.attributes) {
            const attribute = geometry.attributes[attributeName];
            const normalized = attributeNormalizedMap[attributeName];
            if (normalized !== void 0) attribute.normalized = normalized;
          }
          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject);
      });
    });
  }
}
class GLTFTextureTransformExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(texture, transform) {
    if ((transform.texCoord === void 0 || transform.texCoord === texture.channel) && transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
      return texture;
    }
    texture = texture.clone();
    if (transform.texCoord !== void 0) {
      texture.channel = transform.texCoord;
    }
    if (transform.offset !== void 0) {
      texture.offset.fromArray(transform.offset);
    }
    if (transform.rotation !== void 0) {
      texture.rotation = transform.rotation;
    }
    if (transform.scale !== void 0) {
      texture.repeat.fromArray(transform.scale);
    }
    texture.needsUpdate = true;
    return texture;
  }
}
class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }
}
class GLTFCubicSplineInterpolant extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
    for (let i2 = 0; i2 !== valueSize; i2++) {
      result[i2] = values[offset + i2];
    }
    return result;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const stride2 = stride * 2;
    const stride3 = stride * 3;
    const td = t1 - t0;
    const p = (t - t0) / td;
    const pp = p * p;
    const ppp = pp * p;
    const offset1 = i1 * stride3;
    const offset0 = offset1 - stride3;
    const s2 = -2 * ppp + 3 * pp;
    const s3 = ppp - pp;
    const s0 = 1 - s2;
    const s1 = s3 - pp + p;
    for (let i2 = 0; i2 !== stride; i2++) {
      const p0 = values[offset0 + i2 + stride];
      const m0 = values[offset0 + i2 + stride2] * td;
      const p1 = values[offset1 + i2 + stride];
      const m1 = values[offset1 + i2] * td;
      result[i2] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
    }
    return result;
  }
}
const _q = new Quaternion();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
  interpolate_(i1, t0, t, t1) {
    const result = super.interpolate_(i1, t0, t, t1);
    _q.fromArray(result).normalize().toArray(result);
    return result;
  }
}
const WEBGL_CONSTANTS = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};
const WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
const WEBGL_TYPE_SIZES = {
  "SCALAR": 1,
  "VEC2": 2,
  "VEC3": 3,
  "VEC4": 4,
  "MAT2": 4,
  "MAT3": 9,
  "MAT4": 16
};
const ATTRIBUTES = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
const PATH_PROPERTIES = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
const INTERPOLATION = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
const ALPHA_MODES = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function createDefaultMaterial(cache) {
  if (cache["DefaultMaterial"] === void 0) {
    cache["DefaultMaterial"] = new MeshStandardMaterial({
      color: 16777215,
      emissive: 0,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide
    });
  }
  return cache["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  for (const name in objectDef.extensions) {
    if (knownExtensions[name] === void 0) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== void 0) {
    if (typeof gltfDef.extras === "object") {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
    }
  }
}
function addMorphTargets(geometry, targets, parser) {
  let hasMorphPosition = false;
  let hasMorphNormal = false;
  let hasMorphColor = false;
  for (let i2 = 0, il = targets.length; i2 < il; i2++) {
    const target = targets[i2];
    if (target.POSITION !== void 0) hasMorphPosition = true;
    if (target.NORMAL !== void 0) hasMorphNormal = true;
    if (target.COLOR_0 !== void 0) hasMorphColor = true;
    if (hasMorphPosition && hasMorphNormal && hasMorphColor) break;
  }
  if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor) return Promise.resolve(geometry);
  const pendingPositionAccessors = [];
  const pendingNormalAccessors = [];
  const pendingColorAccessors = [];
  for (let i2 = 0, il = targets.length; i2 < il; i2++) {
    const target = targets[i2];
    if (hasMorphPosition) {
      const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }
    if (hasMorphNormal) {
      const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
      pendingNormalAccessors.push(pendingAccessor);
    }
    if (hasMorphColor) {
      const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
      pendingColorAccessors.push(pendingAccessor);
    }
  }
  return Promise.all([
    Promise.all(pendingPositionAccessors),
    Promise.all(pendingNormalAccessors),
    Promise.all(pendingColorAccessors)
  ]).then(function(accessors) {
    const morphPositions = accessors[0];
    const morphNormals = accessors[1];
    const morphColors = accessors[2];
    if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    if (hasMorphColor) geometry.morphAttributes.color = morphColors;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();
  if (meshDef.weights !== void 0) {
    for (let i2 = 0, il = meshDef.weights.length; i2 < il; i2++) {
      mesh.morphTargetInfluences[i2] = meshDef.weights[i2];
    }
  }
  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    const targetNames = meshDef.extras.targetNames;
    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};
      for (let i2 = 0, il = targetNames.length; i2 < il; i2++) {
        mesh.morphTargetDictionary[targetNames[i2]] = i2;
      }
    } else {
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
    }
  }
}
function createPrimitiveKey(primitiveDef) {
  let geometryKey;
  const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  if (dracoExtension) {
    geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
  }
  if (primitiveDef.targets !== void 0) {
    for (let i2 = 0, il = primitiveDef.targets.length; i2 < il; i2++) {
      geometryKey += ":" + createAttributesKey(primitiveDef.targets[i2]);
    }
  }
  return geometryKey;
}
function createAttributesKey(attributes) {
  let attributesKey = "";
  const keys = Object.keys(attributes).sort();
  for (let i2 = 0, il = keys.length; i2 < il; i2++) {
    attributesKey += keys[i2] + ":" + attributes[keys[i2]] + ";";
  }
  return attributesKey;
}
function getNormalizedComponentScale(constructor) {
  switch (constructor) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function getImageURIMimeType(uri) {
  if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
  if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0) return "image/webp";
  if (uri.search(/\.ktx2($|\?)/i) > 0 || uri.search(/^data\:image\/ktx2/) === 0) return "image/ktx2";
  return "image/png";
}
const _identityMatrix = new Matrix4();
class GLTFParser {
  constructor(json = {}, options = {}) {
    this.json = json;
    this.extensions = {};
    this.plugins = {};
    this.options = options;
    this.cache = new GLTFRegistry();
    this.associations = /* @__PURE__ */ new Map();
    this.primitiveCache = {};
    this.nodeCache = {};
    this.meshCache = { refs: {}, uses: {} };
    this.cameraCache = { refs: {}, uses: {} };
    this.lightCache = { refs: {}, uses: {} };
    this.sourceCache = {};
    this.textureCache = {};
    this.nodeNamesUsed = {};
    let isSafari = false;
    let safariVersion = -1;
    let isFirefox = false;
    let firefoxVersion = -1;
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent;
      isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) === true;
      const safariMatch = userAgent.match(/Version\/(\d+)/);
      safariVersion = isSafari && safariMatch ? parseInt(safariMatch[1], 10) : -1;
      isFirefox = userAgent.indexOf("Firefox") > -1;
      firefoxVersion = isFirefox ? userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    if (typeof createImageBitmap === "undefined" || isSafari && safariVersion < 17 || isFirefox && firefoxVersion < 98) {
      this.textureLoader = new TextureLoader(this.options.manager);
    } else {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    }
    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType("arraybuffer");
    if (this.options.crossOrigin === "use-credentials") {
      this.fileLoader.setWithCredentials(true);
    }
  }
  setExtensions(extensions) {
    this.extensions = extensions;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
  }
  parse(onLoad, onError) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    this.cache.removeAll();
    this.nodeCache = {};
    this._invokeAll(function(ext) {
      return ext._markDefs && ext._markDefs();
    });
    Promise.all(this._invokeAll(function(ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function() {
      return Promise.all([
        parser.getDependencies("scene"),
        parser.getDependencies("animation"),
        parser.getDependencies("camera")
      ]);
    }).then(function(dependencies) {
      const result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json.asset,
        parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json);
      assignExtrasToUserData(result, json);
      return Promise.all(parser._invokeAll(function(ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function() {
        for (const scene of result.scenes) {
          scene.updateMatrixWorld();
        }
        onLoad(result);
      });
    }).catch(onError);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const nodeDefs = this.json.nodes || [];
    const skinDefs = this.json.skins || [];
    const meshDefs = this.json.meshes || [];
    for (let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      const joints2 = skinDefs[skinIndex].joints;
      for (let i2 = 0, il = joints2.length; i2 < il; i2++) {
        nodeDefs[joints2[i2]].isBone = true;
      }
    }
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.mesh !== void 0) {
        this._addNodeRef(this.meshCache, nodeDef.mesh);
        if (nodeDef.skin !== void 0) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }
      if (nodeDef.camera !== void 0) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(cache, index) {
    if (index === void 0) return;
    if (cache.refs[index] === void 0) {
      cache.refs[index] = cache.uses[index] = 0;
    }
    cache.refs[index]++;
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(cache, index, object) {
    if (cache.refs[index] <= 1) return object;
    const ref = object.clone();
    const updateMappings = (original, clone2) => {
      const mappings = this.associations.get(original);
      if (mappings != null) {
        this.associations.set(clone2, mappings);
      }
      for (const [i2, child] of original.children.entries()) {
        updateMappings(child, clone2.children[i2]);
      }
    };
    updateMappings(object, ref);
    ref.name += "_instance_" + cache.uses[index]++;
    return ref;
  }
  _invokeOne(func) {
    const extensions = Object.values(this.plugins);
    extensions.push(this);
    for (let i2 = 0; i2 < extensions.length; i2++) {
      const result = func(extensions[i2]);
      if (result) return result;
    }
    return null;
  }
  _invokeAll(func) {
    const extensions = Object.values(this.plugins);
    extensions.unshift(this);
    const pending = [];
    for (let i2 = 0; i2 < extensions.length; i2++) {
      const result = func(extensions[i2]);
      if (result) pending.push(result);
    }
    return pending;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(type, index) {
    const cacheKey = type + ":" + index;
    let dependency = this.cache.get(cacheKey);
    if (!dependency) {
      switch (type) {
        case "scene":
          dependency = this.loadScene(index);
          break;
        case "node":
          dependency = this._invokeOne(function(ext) {
            return ext.loadNode && ext.loadNode(index);
          });
          break;
        case "mesh":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;
        case "accessor":
          dependency = this.loadAccessor(index);
          break;
        case "bufferView":
          dependency = this._invokeOne(function(ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;
        case "buffer":
          dependency = this.loadBuffer(index);
          break;
        case "material":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;
        case "texture":
          dependency = this._invokeOne(function(ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;
        case "skin":
          dependency = this.loadSkin(index);
          break;
        case "animation":
          dependency = this._invokeOne(function(ext) {
            return ext.loadAnimation && ext.loadAnimation(index);
          });
          break;
        case "camera":
          dependency = this.loadCamera(index);
          break;
        default:
          dependency = this._invokeOne(function(ext) {
            return ext != this && ext.getDependency && ext.getDependency(type, index);
          });
          if (!dependency) {
            throw new Error("Unknown type: " + type);
          }
          break;
      }
      this.cache.add(cacheKey, dependency);
    }
    return dependency;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(type) {
    let dependencies = this.cache.get(type);
    if (!dependencies) {
      const parser = this;
      const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
      dependencies = Promise.all(defs.map(function(def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }
    return dependencies;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(bufferIndex) {
    const bufferDef = this.json.buffers[bufferIndex];
    const loader = this.fileLoader;
    if (bufferDef.type && bufferDef.type !== "arraybuffer") {
      throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
    }
    if (bufferDef.uri === void 0 && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }
    const options = this.options;
    return new Promise(function(resolve, reject) {
      loader.load(LoaderUtils.resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(bufferViewIndex) {
    const bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
      const byteLength = bufferViewDef.byteLength || 0;
      const byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(accessorIndex) {
    const parser = this;
    const json = this.json;
    const accessorDef = this.json.accessors[accessorIndex];
    if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const normalized = accessorDef.normalized === true;
      const array = new TypedArray(accessorDef.count * itemSize);
      return Promise.resolve(new BufferAttribute(array, itemSize, normalized));
    }
    const pendingBufferViews = [];
    if (accessorDef.bufferView !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }
    if (accessorDef.sparse !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
    }
    return Promise.all(pendingBufferViews).then(function(bufferViews) {
      const bufferView = bufferViews[0];
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const elementBytes = TypedArray.BYTES_PER_ELEMENT;
      const itemBytes = elementBytes * itemSize;
      const byteOffset = accessorDef.byteOffset || 0;
      const byteStride = accessorDef.bufferView !== void 0 ? json.bufferViews[accessorDef.bufferView].byteStride : void 0;
      const normalized = accessorDef.normalized === true;
      let array, bufferAttribute;
      if (byteStride && byteStride !== itemBytes) {
        const ibSlice = Math.floor(byteOffset / byteStride);
        const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
        let ib = parser.cache.get(ibCacheKey);
        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
          ib = new InterleavedBuffer(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }
        bufferAttribute = new InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }
        bufferAttribute = new BufferAttribute(array, itemSize, normalized);
      }
      if (accessorDef.sparse !== void 0) {
        const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
        if (bufferView !== null) {
          bufferAttribute = new BufferAttribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }
        bufferAttribute.normalized = false;
        for (let i2 = 0, il = sparseIndices.length; i2 < il; i2++) {
          const index = sparseIndices[i2];
          bufferAttribute.setX(index, sparseValues[i2 * itemSize]);
          if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i2 * itemSize + 1]);
          if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i2 * itemSize + 2]);
          if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i2 * itemSize + 3]);
          if (itemSize >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        bufferAttribute.normalized = normalized;
      }
      return bufferAttribute;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(textureIndex) {
    const json = this.json;
    const options = this.options;
    const textureDef = json.textures[textureIndex];
    const sourceIndex = textureDef.source;
    const sourceDef = json.images[sourceIndex];
    let loader = this.textureLoader;
    if (sourceDef.uri) {
      const handler = options.manager.getHandler(sourceDef.uri);
      if (handler !== null) loader = handler;
    }
    return this.loadTextureImage(textureIndex, sourceIndex, loader);
  }
  loadTextureImage(textureIndex, sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const textureDef = json.textures[textureIndex];
    const sourceDef = json.images[sourceIndex];
    const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
    if (this.textureCache[cacheKey]) {
      return this.textureCache[cacheKey];
    }
    const promise = this.loadImageSource(sourceIndex, loader).then(function(texture) {
      texture.flipY = false;
      texture.name = textureDef.name || sourceDef.name || "";
      if (texture.name === "" && typeof sourceDef.uri === "string" && sourceDef.uri.startsWith("data:image/") === false) {
        texture.name = sourceDef.uri;
      }
      const samplers = json.samplers || {};
      const sampler = samplers[textureDef.sampler] || {};
      texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
      texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      texture.generateMipmaps = !texture.isCompressedTexture && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
      parser.associations.set(texture, { textures: textureIndex });
      return texture;
    }).catch(function() {
      return null;
    });
    this.textureCache[cacheKey] = promise;
    return promise;
  }
  loadImageSource(sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const options = this.options;
    if (this.sourceCache[sourceIndex] !== void 0) {
      return this.sourceCache[sourceIndex].then((texture) => texture.clone());
    }
    const sourceDef = json.images[sourceIndex];
    const URL2 = self.URL || self.webkitURL;
    let sourceURI = sourceDef.uri || "";
    let isObjectURL = false;
    if (sourceDef.bufferView !== void 0) {
      sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
        isObjectURL = true;
        const blob = new Blob([bufferView], { type: sourceDef.mimeType });
        sourceURI = URL2.createObjectURL(blob);
        return sourceURI;
      });
    } else if (sourceDef.uri === void 0) {
      throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
    }
    const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
      return new Promise(function(resolve, reject) {
        let onLoad = resolve;
        if (loader.isImageBitmapLoader === true) {
          onLoad = function(imageBitmap) {
            const texture = new Texture(imageBitmap);
            texture.needsUpdate = true;
            resolve(texture);
          };
        }
        loader.load(LoaderUtils.resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
      });
    }).then(function(texture) {
      if (isObjectURL === true) {
        URL2.revokeObjectURL(sourceURI);
      }
      assignExtrasToUserData(texture, sourceDef);
      texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
      return texture;
    }).catch(function(error) {
      console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
      throw error;
    });
    this.sourceCache[sourceIndex] = promise;
    return promise;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(materialParams, mapName, mapDef, colorSpace) {
    const parser = this;
    return this.getDependency("texture", mapDef.index).then(function(texture) {
      if (!texture) return null;
      if (mapDef.texCoord !== void 0 && mapDef.texCoord > 0) {
        texture = texture.clone();
        texture.channel = mapDef.texCoord;
      }
      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
        if (transform) {
          const gltfReference = parser.associations.get(texture);
          texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
          parser.associations.set(texture, gltfReference);
        }
      }
      if (colorSpace !== void 0) {
        texture.colorSpace = colorSpace;
      }
      materialParams[mapName] = texture;
      return texture;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(mesh) {
    const geometry = mesh.geometry;
    let material = mesh.material;
    const useDerivativeTangents = geometry.attributes.tangent === void 0;
    const useVertexColors = geometry.attributes.color !== void 0;
    const useFlatShading = geometry.attributes.normal === void 0;
    if (mesh.isPoints) {
      const cacheKey = "PointsMaterial:" + material.uuid;
      let pointsMaterial = this.cache.get(cacheKey);
      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false;
        this.cache.add(cacheKey, pointsMaterial);
      }
      material = pointsMaterial;
    } else if (mesh.isLine) {
      const cacheKey = "LineBasicMaterial:" + material.uuid;
      let lineMaterial = this.cache.get(cacheKey);
      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        lineMaterial.map = material.map;
        this.cache.add(cacheKey, lineMaterial);
      }
      material = lineMaterial;
    }
    if (useDerivativeTangents || useVertexColors || useFlatShading) {
      let cacheKey = "ClonedMaterial:" + material.uuid + ":";
      if (useDerivativeTangents) cacheKey += "derivative-tangents:";
      if (useVertexColors) cacheKey += "vertex-colors:";
      if (useFlatShading) cacheKey += "flat-shading:";
      let cachedMaterial = this.cache.get(cacheKey);
      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useVertexColors) cachedMaterial.vertexColors = true;
        if (useFlatShading) cachedMaterial.flatShading = true;
        if (useDerivativeTangents) {
          if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
        }
        this.cache.add(cacheKey, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }
      material = cachedMaterial;
    }
    mesh.material = material;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(materialIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const materialDef = json.materials[materialIndex];
    let materialType;
    const materialParams = {};
    const materialExtensions = materialDef.extensions || {};
    const pending = [];
    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      const metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color(1, 1, 1);
      materialParams.opacity = 1;
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
      materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
      materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
      if (metallicRoughness.metallicRoughnessTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
      }
      materialType = this._invokeOne(function(ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function(ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }
    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide;
    }
    const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true;
      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;
      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
      }
    }
    if (materialDef.normalTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
      materialParams.normalScale = new Vector2(1, 1);
      if (materialDef.normalTexture.scale !== void 0) {
        const scale = materialDef.normalTexture.scale;
        materialParams.normalScale.set(scale, scale);
      }
    }
    if (materialDef.occlusionTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
      if (materialDef.occlusionTexture.strength !== void 0) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }
    if (materialDef.emissiveFactor !== void 0 && materialType !== MeshBasicMaterial) {
      const emissiveFactor = materialDef.emissiveFactor;
      materialParams.emissive = new Color().setRGB(emissiveFactor[0], emissiveFactor[1], emissiveFactor[2], LinearSRGBColorSpace);
    }
    if (materialDef.emissiveTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, SRGBColorSpace));
    }
    return Promise.all(pending).then(function() {
      const material = new materialType(materialParams);
      if (materialDef.name) material.name = materialDef.name;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, { materials: materialIndex });
      if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(originalName) {
    const sanitizedName = PropertyBinding.sanitizeNodeName(originalName || "");
    if (sanitizedName in this.nodeNamesUsed) {
      return sanitizedName + "_" + ++this.nodeNamesUsed[sanitizedName];
    } else {
      this.nodeNamesUsed[sanitizedName] = 0;
      return sanitizedName;
    }
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(primitives) {
    const parser = this;
    const extensions = this.extensions;
    const cache = this.primitiveCache;
    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }
    const pending = [];
    for (let i2 = 0, il = primitives.length; i2 < il; i2++) {
      const primitive = primitives[i2];
      const cacheKey = createPrimitiveKey(primitive);
      const cached = cache[cacheKey];
      if (cached) {
        pending.push(cached.promise);
      } else {
        let geometryPromise;
        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          geometryPromise = addPrimitiveAttributes(new BufferGeometry(), primitive, parser);
        }
        cache[cacheKey] = { primitive, promise: geometryPromise };
        pending.push(geometryPromise);
      }
    }
    return Promise.all(pending);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(meshIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const meshDef = json.meshes[meshIndex];
    const primitives = meshDef.primitives;
    const pending = [];
    for (let i2 = 0, il = primitives.length; i2 < il; i2++) {
      const material = primitives[i2].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i2].material);
      pending.push(material);
    }
    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function(results) {
      const materials = results.slice(0, results.length - 1);
      const geometries = results[results.length - 1];
      const meshes = [];
      for (let i2 = 0, il = geometries.length; i2 < il; i2++) {
        const geometry = geometries[i2];
        const primitive = primitives[i2];
        let mesh;
        const material = materials[i2];
        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, material) : new Mesh(geometry, material);
          if (mesh.isSkinnedMesh === true) {
            mesh.normalizeSkinWeights();
          }
          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, material);
        } else {
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
        }
        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }
        mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }
      for (let i2 = 0, il = meshes.length; i2 < il; i2++) {
        parser.associations.set(meshes[i2], {
          meshes: meshIndex,
          primitives: i2
        });
      }
      if (meshes.length === 1) {
        if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, meshes[0], meshDef);
        return meshes[0];
      }
      const group = new Group();
      if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, group, meshDef);
      parser.associations.set(group, { meshes: meshIndex });
      for (let i2 = 0, il = meshes.length; i2 < il; i2++) {
        group.add(meshes[i2]);
      }
      return group;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(cameraIndex) {
    let camera;
    const cameraDef = this.json.cameras[cameraIndex];
    const params = cameraDef[cameraDef.type];
    if (!params) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    if (cameraDef.type === "perspective") {
      camera = new PerspectiveCamera(MathUtils.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === "orthographic") {
      camera = new OrthographicCamera(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }
    if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(skinIndex) {
    const skinDef = this.json.skins[skinIndex];
    const pending = [];
    for (let i2 = 0, il = skinDef.joints.length; i2 < il; i2++) {
      pending.push(this._loadNodeShallow(skinDef.joints[i2]));
    }
    if (skinDef.inverseBindMatrices !== void 0) {
      pending.push(this.getDependency("accessor", skinDef.inverseBindMatrices));
    } else {
      pending.push(null);
    }
    return Promise.all(pending).then(function(results) {
      const inverseBindMatrices = results.pop();
      const jointNodes = results;
      const bones = [];
      const boneInverses = [];
      for (let i2 = 0, il = jointNodes.length; i2 < il; i2++) {
        const jointNode = jointNodes[i2];
        if (jointNode) {
          bones.push(jointNode);
          const mat = new Matrix4();
          if (inverseBindMatrices !== null) {
            mat.fromArray(inverseBindMatrices.array, i2 * 16);
          }
          boneInverses.push(mat);
        } else {
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[i2]);
        }
      }
      return new Skeleton(bones, boneInverses);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(animationIndex) {
    const json = this.json;
    const parser = this;
    const animationDef = json.animations[animationIndex];
    const animationName = animationDef.name ? animationDef.name : "animation_" + animationIndex;
    const pendingNodes = [];
    const pendingInputAccessors = [];
    const pendingOutputAccessors = [];
    const pendingSamplers = [];
    const pendingTargets = [];
    for (let i2 = 0, il = animationDef.channels.length; i2 < il; i2++) {
      const channel = animationDef.channels[i2];
      const sampler = animationDef.samplers[channel.sampler];
      const target = channel.target;
      const name = target.node;
      const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
      const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
      if (target.node === void 0) continue;
      pendingNodes.push(this.getDependency("node", name));
      pendingInputAccessors.push(this.getDependency("accessor", input));
      pendingOutputAccessors.push(this.getDependency("accessor", output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }
    return Promise.all([
      Promise.all(pendingNodes),
      Promise.all(pendingInputAccessors),
      Promise.all(pendingOutputAccessors),
      Promise.all(pendingSamplers),
      Promise.all(pendingTargets)
    ]).then(function(dependencies) {
      const nodes = dependencies[0];
      const inputAccessors = dependencies[1];
      const outputAccessors = dependencies[2];
      const samplers = dependencies[3];
      const targets = dependencies[4];
      const tracks = [];
      for (let i2 = 0, il = nodes.length; i2 < il; i2++) {
        const node = nodes[i2];
        const inputAccessor = inputAccessors[i2];
        const outputAccessor = outputAccessors[i2];
        const sampler = samplers[i2];
        const target = targets[i2];
        if (node === void 0) continue;
        if (node.updateMatrix) {
          node.updateMatrix();
        }
        const createdTracks = parser._createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target);
        if (createdTracks) {
          for (let k = 0; k < createdTracks.length; k++) {
            tracks.push(createdTracks[k]);
          }
        }
      }
      return new AnimationClip(animationName, void 0, tracks);
    });
  }
  createNodeMesh(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    if (nodeDef.mesh === void 0) return null;
    return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
      const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
      if (nodeDef.weights !== void 0) {
        node.traverse(function(o) {
          if (!o.isMesh) return;
          for (let i2 = 0, il = nodeDef.weights.length; i2 < il; i2++) {
            o.morphTargetInfluences[i2] = nodeDef.weights[i2];
          }
        });
      }
      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    const nodePending = parser._loadNodeShallow(nodeIndex);
    const childPending = [];
    const childrenDef = nodeDef.children || [];
    for (let i2 = 0, il = childrenDef.length; i2 < il; i2++) {
      childPending.push(parser.getDependency("node", childrenDef[i2]));
    }
    const skeletonPending = nodeDef.skin === void 0 ? Promise.resolve(null) : parser.getDependency("skin", nodeDef.skin);
    return Promise.all([
      nodePending,
      Promise.all(childPending),
      skeletonPending
    ]).then(function(results) {
      const node = results[0];
      const children = results[1];
      const skeleton = results[2];
      if (skeleton !== null) {
        node.traverse(function(mesh) {
          if (!mesh.isSkinnedMesh) return;
          mesh.bind(skeleton, _identityMatrix);
        });
      }
      for (let i2 = 0, il = children.length; i2 < il; i2++) {
        node.add(children[i2]);
      }
      return node;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(nodeIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const parser = this;
    if (this.nodeCache[nodeIndex] !== void 0) {
      return this.nodeCache[nodeIndex];
    }
    const nodeDef = json.nodes[nodeIndex];
    const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
    const pending = [];
    const meshPromise = parser._invokeOne(function(ext) {
      return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
    });
    if (meshPromise) {
      pending.push(meshPromise);
    }
    if (nodeDef.camera !== void 0) {
      pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
        return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
      }));
    }
    parser._invokeAll(function(ext) {
      return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
    }).forEach(function(promise) {
      pending.push(promise);
    });
    this.nodeCache[nodeIndex] = Promise.all(pending).then(function(objects) {
      let node;
      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }
      if (node !== objects[0]) {
        for (let i2 = 0, il = objects.length; i2 < il; i2++) {
          node.add(objects[i2]);
        }
      }
      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }
      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);
      if (nodeDef.matrix !== void 0) {
        const matrix = new Matrix4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== void 0) {
          node.position.fromArray(nodeDef.translation);
        }
        if (nodeDef.rotation !== void 0) {
          node.quaternion.fromArray(nodeDef.rotation);
        }
        if (nodeDef.scale !== void 0) {
          node.scale.fromArray(nodeDef.scale);
        }
      }
      if (!parser.associations.has(node)) {
        parser.associations.set(node, {});
      }
      parser.associations.get(node).nodes = nodeIndex;
      return node;
    });
    return this.nodeCache[nodeIndex];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(sceneIndex) {
    const extensions = this.extensions;
    const sceneDef = this.json.scenes[sceneIndex];
    const parser = this;
    const scene = new Group();
    if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    const nodeIds = sceneDef.nodes || [];
    const pending = [];
    for (let i2 = 0, il = nodeIds.length; i2 < il; i2++) {
      pending.push(parser.getDependency("node", nodeIds[i2]));
    }
    return Promise.all(pending).then(function(nodes) {
      for (let i2 = 0, il = nodes.length; i2 < il; i2++) {
        scene.add(nodes[i2]);
      }
      const reduceAssociations = (node) => {
        const reducedAssociations = /* @__PURE__ */ new Map();
        for (const [key, value] of parser.associations) {
          if (key instanceof Material || key instanceof Texture) {
            reducedAssociations.set(key, value);
          }
        }
        node.traverse((node2) => {
          const mappings = parser.associations.get(node2);
          if (mappings != null) {
            reducedAssociations.set(node2, mappings);
          }
        });
        return reducedAssociations;
      };
      parser.associations = reduceAssociations(scene);
      return scene;
    });
  }
  _createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target) {
    const tracks = [];
    const targetName = node.name ? node.name : node.uuid;
    const targetNames = [];
    if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
      node.traverse(function(object) {
        if (object.morphTargetInfluences) {
          targetNames.push(object.name ? object.name : object.uuid);
        }
      });
    } else {
      targetNames.push(targetName);
    }
    let TypedKeyframeTrack;
    switch (PATH_PROPERTIES[target.path]) {
      case PATH_PROPERTIES.weights:
        TypedKeyframeTrack = NumberKeyframeTrack;
        break;
      case PATH_PROPERTIES.rotation:
        TypedKeyframeTrack = QuaternionKeyframeTrack;
        break;
      case PATH_PROPERTIES.position:
      case PATH_PROPERTIES.scale:
        TypedKeyframeTrack = VectorKeyframeTrack;
        break;
      default:
        switch (outputAccessor.itemSize) {
          case 1:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;
          case 2:
          case 3:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack;
            break;
        }
        break;
    }
    const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
    const outputArray = this._getArrayFromAccessor(outputAccessor);
    for (let j = 0, jl = targetNames.length; j < jl; j++) {
      const track = new TypedKeyframeTrack(
        targetNames[j] + "." + PATH_PROPERTIES[target.path],
        inputAccessor.array,
        outputArray,
        interpolation
      );
      if (sampler.interpolation === "CUBICSPLINE") {
        this._createCubicSplineTrackInterpolant(track);
      }
      tracks.push(track);
    }
    return tracks;
  }
  _getArrayFromAccessor(accessor) {
    let outputArray = accessor.array;
    if (accessor.normalized) {
      const scale = getNormalizedComponentScale(outputArray.constructor);
      const scaled = new Float32Array(outputArray.length);
      for (let j = 0, jl = outputArray.length; j < jl; j++) {
        scaled[j] = outputArray[j] * scale;
      }
      outputArray = scaled;
    }
    return outputArray;
  }
  _createCubicSplineTrackInterpolant(track) {
    track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
      const interpolantType = this instanceof QuaternionKeyframeTrack ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
      return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
    };
    track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
  }
}
function computeBounds(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const box = new Box3();
  if (attributes.POSITION !== void 0) {
    const accessor = parser.json.accessors[attributes.POSITION];
    const min = accessor.min;
    const max = accessor.max;
    if (min !== void 0 && max !== void 0) {
      box.set(
        new Vector3(min[0], min[1], min[2]),
        new Vector3(max[0], max[1], max[2])
      );
      if (accessor.normalized) {
        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else {
    return;
  }
  const targets = primitiveDef.targets;
  if (targets !== void 0) {
    const maxDisplacement = new Vector3();
    const vector = new Vector3();
    for (let i2 = 0, il = targets.length; i2 < il; i2++) {
      const target = targets[i2];
      if (target.POSITION !== void 0) {
        const accessor = parser.json.accessors[target.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
          vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
          vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
          vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
          if (accessor.normalized) {
            const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            vector.multiplyScalar(boxScale);
          }
          maxDisplacement.max(vector);
        } else {
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        }
      }
    }
    box.expandByVector(maxDisplacement);
  }
  geometry.boundingBox = box;
  const sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const pending = [];
  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }
  for (const gltfAttributeName in attributes) {
    const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
    if (threeAttributeName in geometry.attributes) continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }
  if (primitiveDef.indices !== void 0 && !geometry.index) {
    const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
      geometry.setIndex(accessor2);
    });
    pending.push(accessor);
  }
  if (ColorManagement.workingColorSpace !== LinearSRGBColorSpace && "COLOR_0" in attributes) {
    console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ColorManagement.workingColorSpace}" not supported.`);
  }
  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function() {
    return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}
function createHandPoseState(hand) {
  return {
    //distances: {},
    //name: undefined,
    data: new Float32Array(hand.size * 16)
  };
}
function updateXRHandPoseState(state, frame, hand, manager, handedness) {
  const referenceSpace = manager.getReferenceSpace();
  if (referenceSpace == null || frame == null || frame.session.visibilityState === "visible-blurred" || frame.session.visibilityState === "hidden") {
    return;
  }
  const validPose = updateXRHandPoseData(frame, referenceSpace, hand, state.data);
  if (!validPose) {
    return;
  }
}
const invertedWirstHelper = new Matrix4();
const matrixHelper$3 = new Matrix4();
function updateXRHandPoseData(frame, referenceSpace, hand, handPoseData) {
  const validPose = frame.fillPoses(hand.values(), referenceSpace, handPoseData);
  if (!validPose) {
    return false;
  }
  invertedWirstHelper.fromArray(handPoseData, 0);
  invertedWirstHelper.invert();
  for (let i2 = 0; i2 < handPoseData.length; i2 += 16) {
    matrixHelper$3.fromArray(handPoseData, i2);
    matrixHelper$3.premultiply(invertedWirstHelper);
    matrixHelper$3.toArray(handPoseData, i2);
  }
  return true;
}
function clone(source) {
  const sourceLookup = /* @__PURE__ */ new Map();
  const cloneLookup = /* @__PURE__ */ new Map();
  const clone2 = source.clone();
  parallelTraverse(source, clone2, function(sourceNode, clonedNode) {
    sourceLookup.set(clonedNode, sourceNode);
    cloneLookup.set(sourceNode, clonedNode);
  });
  clone2.traverse(function(node) {
    if (!node.isSkinnedMesh) return;
    const clonedMesh = node;
    const sourceMesh = sourceLookup.get(node);
    const sourceBones = sourceMesh.skeleton.bones;
    clonedMesh.skeleton = sourceMesh.skeleton.clone();
    clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);
    clonedMesh.skeleton.bones = sourceBones.map(function(bone) {
      return cloneLookup.get(bone);
    });
    clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
  });
  return clone2;
}
function parallelTraverse(a, b, callback) {
  callback(a, b);
  for (let i2 = 0; i2 < a.children.length; i2++) {
    parallelTraverse(a.children[i2], b.children[i2], callback);
  }
}
const DefaultDefaultXRHandProfileId = "generic-hand";
function getXRHandAssetPath(handedness, options) {
  const baseAssetPath = options?.baseAssetPath ?? DefaultAssetBasePath;
  const defaultProfileId = options?.defaultXRHandProfileId ?? DefaultDefaultXRHandProfileId;
  return new URL(`${defaultProfileId}/${handedness}.glb`, baseAssetPath).href;
}
function cloneXRHandGltf({ scene }) {
  const result = clone(scene);
  const mesh = result.getObjectByProperty("type", "SkinnedMesh");
  if (mesh == null) {
    throw new Error(`missing SkinnedMesh in loaded XRHand model`);
  }
  mesh.frustumCulled = false;
  return result;
}
function configureXRHandModel(model, options) {
  model.renderOrder = options?.renderOrder ?? 0;
  model.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof Material) {
      child.material.colorWrite = options?.colorWrite ?? true;
    }
  });
}
function createXRHandState(id, inputSource, options, events, isPrimary) {
  return {
    id,
    isPrimary,
    type: "hand",
    inputSource,
    pose: createHandPoseState(inputSource.hand),
    assetPath: getXRHandAssetPath(inputSource.handedness, options),
    events
  };
}
function updateXRHandState({ inputSource, pose }, frame, manager) {
  updateXRHandPoseState(pose, frame, inputSource.hand, manager, inputSource.handedness);
}
const joints = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-intermediate",
  "index-finger-phalanx-distal",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-intermediate",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-intermediate",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-phalanx-intermediate",
  "pinky-finger-phalanx-distal",
  "pinky-finger-tip"
];
function createUpdateXRHandVisuals(hand, handModel, referenceSpace) {
  const buffer = new Float32Array(hand.size * 16);
  const jointObjects = joints.map((joint) => {
    const jointObject = handModel.getObjectByName(joint);
    if (jointObject == null) {
      throw new Error(`missing joint "${joint}" in hand model`);
    }
    jointObject.matrixAutoUpdate = false;
    return jointObject;
  });
  return (frame) => {
    const resolvedReferenceSpace = typeof referenceSpace === "function" ? referenceSpace() : referenceSpace;
    if (frame == null || resolvedReferenceSpace == null) {
      return;
    }
    frame.fillPoses(hand.values(), resolvedReferenceSpace, buffer);
    const length = jointObjects.length;
    for (let i2 = 0; i2 < length; i2++) {
      jointObjects[i2].matrix.fromArray(buffer, i2 * 16);
    }
  };
}
function isXRInputSourceState(val) {
  return val != null && typeof val === "object" && "inputSource" in val;
}
function setupEvents(session, events) {
  const listener = (e) => events.push(e);
  session.addEventListener("selectstart", listener);
  session.addEventListener("selectend", listener);
  session.addEventListener("select", listener);
  session.addEventListener("squeeze", listener);
  session.addEventListener("squeezestart", listener);
  session.addEventListener("squeezeend", listener);
  return () => {
    session.removeEventListener("selectstart", listener);
    session.removeEventListener("selectend", listener);
    session.removeEventListener("select", listener);
    session.removeEventListener("squeeze", listener);
    session.removeEventListener("squeezestart", listener);
    session.removeEventListener("squeezeend", listener);
  };
}
let idCounter = 0;
function createSyncXRInputSourceStates(addController, options) {
  const cleanupMap = /* @__PURE__ */ new Map();
  const controllerLayoutLoader = new XRControllerLayoutLoader(options);
  const idMap = /* @__PURE__ */ new Map();
  return (session, current, changes) => {
    if (changes === "remove-all") {
      for (const cleanup of cleanupMap.values()) {
        cleanup();
      }
      return current;
    }
    const target = [...current];
    for (const { added, isPrimary, removed } of changes) {
      if (removed != null) {
        for (const inputSource of removed) {
          const index = target.findIndex(({ inputSource: is, isPrimary: ip }) => ip === isPrimary && is === inputSource);
          if (index === -1) {
            continue;
          }
          target.splice(index, 1);
          cleanupMap.get(inputSource)?.();
          cleanupMap.delete(inputSource);
        }
      }
      if (added == null) {
        continue;
      }
      for (const inputSource of added) {
        const events = [];
        let cleanup = setupEvents(session, events);
        const key = `${inputSource.handedness}-${inputSource.hand ? "hand" : "nohand"}-${inputSource.targetRayMode}-${inputSource.profiles.join(",")}`;
        let id;
        if ((id = idMap.get(key)) == null) {
          idMap.set(key, id = `${idCounter++}`);
        }
        if (inputSource.hand != null) {
          target.push(createXRHandState(id, inputSource, options, events, isPrimary));
        } else {
          switch (inputSource.targetRayMode) {
            case "gaze":
              target.push({ id, isPrimary, type: "gaze", inputSource, events });
              break;
            case "screen":
              target.push({ id, isPrimary, type: "screenInput", inputSource, events });
              break;
            case "transient-pointer":
              target.push({ id, isPrimary, type: "transientPointer", inputSource, events });
              break;
            case "tracked-pointer":
              let aborted = false;
              const cleanupEvents = cleanup;
              cleanup = () => {
                cleanupEvents();
                aborted = true;
              };
              const stateResult = createXRControllerState(id, inputSource, controllerLayoutLoader, events, isPrimary);
              if (stateResult instanceof Promise) {
                stateResult.then((state) => !aborted && addController(state)).catch(console.error);
              } else {
                target.push(stateResult);
              }
              break;
          }
        }
        cleanupMap.set(inputSource, cleanup);
      }
    }
    return target;
  };
}
function setupSyncIsVisible(store, setIsVisible) {
  const update = (state, prevState) => {
    if (prevState != null && state.visibilityState === prevState.visibilityState) {
      return;
    }
    setIsVisible(state.visibilityState === "visible");
  };
  update(store.getState());
  return store.subscribe(update);
}
class PointerCursorMaterial extends MeshBasicMaterial {
  constructor() {
    super({ transparent: true, toneMapped: false, depthWrite: false });
  }
  onBeforeCompile(parameters, renderer) {
    super.onBeforeCompile(parameters, renderer);
    parameters.vertexShader = `varying vec2 vLocalPosition;
` + parameters.vertexShader;
    parameters.vertexShader = parameters.vertexShader.replace(`#include <color_vertex>`, `#include <color_vertex>
        vLocalPosition = position.xy * 2.0;`);
    parameters.fragmentShader = `varying vec2 vLocalPosition;
` + parameters.fragmentShader;
    parameters.fragmentShader = parameters.fragmentShader.replace("#include <color_fragment>", `#include <color_fragment>
          float value = max(0.0, 1.0 - sqrt(dot(vLocalPosition, vLocalPosition)));
          diffuseColor.a = diffuseColor.a * value * value;`);
  }
}
const ZAxis = new Vector3(0, 0, 1);
const quaternionHelper$3 = new Quaternion();
const offsetHelper = new Vector3();
function updatePointerCursorModel(pointerGroup, mesh, material, pointer, options) {
  const intersection = pointer.getIntersection();
  if (intersection == null || !pointer.getEnabled() || intersection.object.isVoidObject === true || !isVisble(pointerGroup)) {
    mesh.visible = false;
    return;
  }
  mesh.visible = true;
  const color = typeof options.color === "function" ? options.color(pointer) : options.color;
  if (Array.isArray(color)) {
    material.color.set(...color);
  } else {
    material.color.set(color ?? "white");
  }
  material.opacity = typeof options.opacity === "function" ? options.opacity(pointer) : options.opacity ?? 0.4;
  mesh.position.copy(intersection.pointOnFace);
  mesh.scale.setScalar(options.size ?? 0.1);
  const normal = intersection.normal ?? intersection.face?.normal;
  if (normal != null) {
    quaternionHelper$3.setFromUnitVectors(ZAxis, normal);
    intersection.object.getWorldQuaternion(mesh.quaternion);
    mesh.quaternion.multiply(quaternionHelper$3);
    offsetHelper.set(0, 0, options.cursorOffset ?? 0.01);
    offsetHelper.applyQuaternion(mesh.quaternion);
    mesh.position.add(offsetHelper);
  }
  mesh.updateMatrix();
}
function isVisble({ visible, parent }) {
  if (!visible) {
    return false;
  }
  if (parent == null) {
    return true;
  }
  return isVisble(parent);
}
class PointerRayMaterial extends MeshBasicMaterial {
  constructor() {
    super({ transparent: true, toneMapped: false });
  }
  onBeforeCompile(parameters, renderer) {
    super.onBeforeCompile(parameters, renderer);
    parameters.vertexShader = `varying float vFade;
` + parameters.vertexShader;
    parameters.vertexShader = parameters.vertexShader.replace(`#include <color_vertex>`, `#include <color_vertex>
            vFade = position.z + 0.5;`);
    parameters.fragmentShader = `varying float vFade;
` + parameters.fragmentShader;
    parameters.fragmentShader = parameters.fragmentShader.replace("#include <color_fragment>", `#include <color_fragment>
              diffuseColor.a *= vFade;`);
  }
}
function updatePointerRayModel(mesh, material, pointer, options) {
  const intersection = pointer.getIntersection();
  if (!pointer.getEnabled() || intersection == null) {
    mesh.visible = false;
    return;
  }
  mesh.visible = true;
  const color = typeof options.color === "function" ? options.color(pointer) : options.color;
  if (Array.isArray(color)) {
    material.color.set(...color);
  } else {
    material.color.set(color ?? "white");
  }
  material.opacity = typeof options.opacity === "function" ? options.opacity(pointer) : options.opacity ?? 0.4;
  const length = Math.min(options.maxLength ?? 1, intersection.distance);
  mesh.position.z = -length / 2;
  const size = options.size ?? 5e-3;
  mesh.scale.set(size, size, length);
  mesh.updateMatrix();
}
function bindPointerXRInputSourceEvent(pointer, session, inputSource, event, missingEvents, options = {}) {
  const downListener = (e) => {
    if (e.inputSource === inputSource) {
      pointer.down(Object.assign(e, { button: options.button ?? 0 }));
    }
  };
  const upListener = (e) => {
    if (e.inputSource === inputSource) {
      pointer.up(Object.assign(e, { button: options.button ?? 0 }));
    }
  };
  const downEventName = `${event}start`;
  const upEventName = `${event}end`;
  const length = missingEvents.length;
  for (let i2 = 0; i2 < length; i2++) {
    const event2 = missingEvents[i2];
    switch (event2.type) {
      case downEventName:
        downListener(event2);
        break;
      case upEventName:
        upListener(event2);
        break;
    }
  }
  session.addEventListener(downEventName, downListener);
  session.addEventListener(upEventName, upListener);
  return () => {
    session.removeEventListener(downEventName, downListener);
    session.removeEventListener(upEventName, upListener);
  };
}
function defaultGrabPointerOpacity(pointer) {
  if (pointer.getButtonsDown().size > 0) {
    return 0.6;
  }
  return map$1(pointer.getIntersection()?.distance ?? Infinity, 0.07, 0, 0.2, 0.4);
}
function defaultRayPointerOpacity(pointer) {
  if (pointer.getButtonsDown().size > 0) {
    return 0.6;
  }
  return 0.4;
}
function defaultTouchPointerOpacity(pointer) {
  return map$1(pointer.getIntersection()?.distance ?? Infinity, 0.1, 0.03, 0.2, 0.6);
}
function map$1(value, fromMin, fromMax, toMin, toMax) {
  return toMin + Math.max(0, Math.min(1, (value - fromMin) / (fromMax - fromMin))) * (toMax - toMin);
}
function createGetXRSpaceMatrix(space, referenceSpace) {
  return (target, frame) => {
    if (space === referenceSpace) {
      target.identity();
      return true;
    }
    const resolvedReferenceSpace = typeof referenceSpace === "function" ? referenceSpace() : referenceSpace;
    if (resolvedReferenceSpace == null) {
      return false;
    }
    const pose = frame?.getPose(space, resolvedReferenceSpace);
    if (pose == null) {
      return false;
    }
    target.fromArray(pose.transform.matrix);
    return true;
  };
}
function getSpaceFromAncestors(object, origin, originReferenceSpace, targetOffsetMatrix) {
  object.updateWorldMatrix(true, false);
  targetOffsetMatrix?.copy(object.matrix);
  const result = getXRSpaceFromAncestorsRec(object.parent, object, targetOffsetMatrix);
  if (result != null) {
    return result;
  }
  if (targetOffsetMatrix != null) {
    computeOriginReferenceSpaceOffset(object, origin, targetOffsetMatrix);
  }
  return originReferenceSpace;
}
function computeOriginReferenceSpaceOffset(object, origin, target) {
  object.updateWorldMatrix(true, false);
  if (origin == null) {
    target.copy(object.matrixWorld);
    return;
  }
  origin.updateWorldMatrix(true, false);
  target.copy(origin.matrixWorld).invert().multiply(object.matrixWorld);
}
function getXRSpaceFromAncestorsRec(object, targetObject, targetOffsetMatrix) {
  if (object == null) {
    return void 0;
  }
  if (object.xrSpace != null) {
    if (targetOffsetMatrix != null) {
      targetOffsetMatrix.copy(object.matrixWorld).invert().multiply(targetObject.matrixWorld);
    }
    return object.xrSpace;
  }
  return getXRSpaceFromAncestorsRec(object.parent, targetObject, targetOffsetMatrix);
}
class HtmlEvent {
  constructor(nativeEvent) {
    __publicField(this, "nativeEvent");
    __publicField(this, "NONE", 0);
    __publicField(this, "CAPTURING_PHASE", 1);
    __publicField(this, "AT_TARGET", 2);
    __publicField(this, "BUBBLING_PHASE", 3);
    __publicField(this, "relatedTarget", null);
    this.nativeEvent = nativeEvent;
  }
  get altKey() {
    return this.getFromNative("altKey", false);
  }
  get button() {
    return this.getFromNative("button", 0);
  }
  get buttons() {
    return this.getFromNative("buttons", 0);
  }
  get clientX() {
    return this.getFromNative("clientX", 0);
  }
  get clientY() {
    return this.getFromNative("clientY", 0);
  }
  get ctrlKey() {
    return this.getFromNative("ctrlKey", false);
  }
  get layerX() {
    return this.getFromNative("layerX", 0);
  }
  get layerY() {
    return this.getFromNative("layerY", 0);
  }
  get metaKey() {
    return this.getFromNative("metaKey", false);
  }
  get movementX() {
    return this.getFromNative("movementX", 0);
  }
  get movementY() {
    return this.getFromNative("movementY", 0);
  }
  get offsetX() {
    return this.getFromNative("offsetX", 0);
  }
  get offsetY() {
    return this.getFromNative("offsetY", 0);
  }
  get pageX() {
    return this.getFromNative("pageX", 0);
  }
  get pageY() {
    return this.getFromNative("pageY", 0);
  }
  get screenX() {
    return this.getFromNative("screenX", 0);
  }
  get screenY() {
    return this.getFromNative("screenY", 0);
  }
  get shiftKey() {
    return this.getFromNative("shiftKey", false);
  }
  get x() {
    return this.getFromNative("x", 0);
  }
  get y() {
    return this.getFromNative("y", 0);
  }
  get detail() {
    return this.getFromNative("detail", 0);
  }
  get view() {
    return this.getFromNative("view", null);
  }
  get which() {
    return this.getFromNative("which", 0);
  }
  get cancelBubble() {
    return this.getFromNative("cancelBubble", false);
  }
  get composed() {
    return this.getFromNative("composed", false);
  }
  get eventPhase() {
    return this.getFromNative("eventPhase", 0);
  }
  get isTrusted() {
    return this.getFromNative("isTrusted", false);
  }
  get returnValue() {
    return this.getFromNative("returnValue", false);
  }
  get timeStamp() {
    return this.getFromNative("timeStamp", 0);
  }
  get cancelable() {
    return this.getFromNative("cancelable", false);
  }
  get defaultPrevented() {
    return this.getFromNative("defaultPrevented", false);
  }
  getFromNative(key, defaultValue) {
    if (key in this.nativeEvent) {
      return this.nativeEvent[key];
    }
    return defaultValue;
  }
}
const helperVector = new Vector3();
class PointerEvent extends HtmlEvent {
  constructor(type, bubbles, nativeEvent, internalPointer, intersection, camera, currentObject = intersection.object, object = currentObject, propagationState = {
    stopped: !bubbles,
    stoppedImmediate: false
  }) {
    super(nativeEvent);
    __publicField(this, "type");
    __publicField(this, "bubbles");
    __publicField(this, "internalPointer");
    __publicField(this, "intersection");
    __publicField(this, "camera");
    __publicField(this, "currentObject");
    __publicField(this, "object");
    __publicField(this, "propagationState");
    __publicField(this, "_pointer");
    __publicField(this, "_ray");
    __publicField(this, "_intersections", []);
    __publicField(this, "_unprojectedPoint");
    this.type = type;
    this.bubbles = bubbles;
    this.internalPointer = internalPointer;
    this.intersection = intersection;
    this.camera = camera;
    this.currentObject = currentObject;
    this.object = object;
    this.propagationState = propagationState;
  }
  //--- pointer events data
  get pointerId() {
    return this.internalPointer.id;
  }
  get pointerType() {
    return this.internalPointer.type;
  }
  get pointerState() {
    return this.internalPointer.state;
  }
  //--- intersection data
  get distance() {
    return this.intersection.distance;
  }
  get distanceToRay() {
    return this.intersection.distanceToRay;
  }
  get point() {
    return this.intersection.point;
  }
  get index() {
    return this.intersection.index;
  }
  get face() {
    return this.intersection.face;
  }
  get faceIndex() {
    return this.intersection.faceIndex;
  }
  get uv() {
    return this.intersection.uv;
  }
  get uv1() {
    return this.intersection.uv1;
  }
  get normal() {
    return this.intersection.normal;
  }
  get instanceId() {
    return this.intersection.instanceId;
  }
  get pointOnLine() {
    return this.intersection.pointOnLine;
  }
  get batchId() {
    return this.intersection.batchId;
  }
  get pointerPosition() {
    return this.intersection.pointerPosition;
  }
  get pointerQuaternion() {
    return this.intersection.pointerQuaternion;
  }
  get pointOnFace() {
    return this.intersection.pointOnFace;
  }
  get localPoint() {
    return this.intersection.localPoint;
  }
  get details() {
    return this.intersection.details;
  }
  /** same as object */
  get target() {
    return this.object;
  }
  /** same as currentObject */
  get currentTarget() {
    return this.currentObject;
  }
  /** same as currentObject */
  get eventObject() {
    return this.currentObject;
  }
  /** same as object */
  get srcElement() {
    return this.currentObject;
  }
  get pointer() {
    if (this._pointer == null) {
      helperVector.copy(this.intersection.point).project(this.camera);
      this._pointer = new Vector2(helperVector.x, helperVector.y);
    }
    return this._pointer;
  }
  get ray() {
    if (this._ray != null) {
      return this._ray;
    }
    switch (this.intersection.details.type) {
      case "screen-ray":
      case "ray":
      case "sphere":
        return this._ray = new Ray(this.intersection.pointerPosition, new Vector3(0, 0, -1).applyQuaternion(this.intersection.pointerQuaternion));
      case "lines":
        return this._ray = new Ray(this.intersection.details.line.start, this.intersection.details.line.end.clone().sub(this.intersection.details.line.start).normalize());
    }
  }
  get intersections() {
    if (this._intersections == null) {
      this._intersections = [{ ...this.intersection, eventObject: this.currentObject }];
    }
    return this._intersections;
  }
  get unprojectedPoint() {
    if (this._unprojectedPoint == null) {
      const p = this.pointer;
      this._unprojectedPoint = new Vector3(p.x, p.y, 0).unproject(this.camera);
    }
    return this._unprojectedPoint;
  }
  get stopped() {
    return this.propagationState.stoppedImmediate || this.propagationState.stopped;
  }
  get stoppedImmediate() {
    return this.propagationState.stoppedImmediate;
  }
  get delta() {
    throw new Error(`not supported`);
  }
  stopPropagation() {
    this.propagationState.stopped = true;
  }
  stopImmediatePropagation() {
    this.propagationState.stoppedImmediate = true;
  }
  /**
   * for internal use
   */
  retarget(currentObject) {
    return new PointerEvent(this.type, this.bubbles, this.nativeEvent, this.internalPointer, this.intersection, this.camera, currentObject, this.target, this.propagationState);
  }
}
class WheelEvent extends PointerEvent {
  get deltaX() {
    return this.nativeEvent.deltaX;
  }
  get deltaY() {
    return this.nativeEvent.deltaY;
  }
  get deltaZ() {
    return this.nativeEvent.deltaZ;
  }
  constructor(nativeEvent, pointer, intersection, camera, currentObject, object) {
    super("wheel", true, nativeEvent, pointer, intersection, camera, currentObject, object);
  }
  /**
   * for internal use
   */
  retarget(currentObject) {
    return new WheelEvent(this.nativeEvent, this.internalPointer, this.intersection, this.camera, currentObject, this.target);
  }
}
function emitPointerEvent(event) {
  emitPointerEventRec(event, event.currentObject);
}
function emitPointerEventRec(baseEvent, currentObject) {
  if (currentObject == null) {
    return;
  }
  const listeners = getObjectListeners(currentObject, baseEvent.type);
  if (listeners != null && listeners.length > 0) {
    const event = baseEvent.retarget(currentObject);
    const length = listeners.length;
    for (let i2 = 0; i2 < length && !event.stoppedImmediate; i2++) {
      listeners[i2](event);
    }
  }
  if (baseEvent.stopped) {
    return;
  }
  emitPointerEventRec(baseEvent, currentObject.parent);
}
const r3fEventToHandlerMap = {
  click: "onClick",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick",
  pointercancel: "onPointerCancel",
  pointerdown: "onPointerDown",
  pointerenter: "onPointerEnter",
  pointerleave: "onPointerLeave",
  pointermove: "onPointerMove",
  pointerout: "onPointerOut",
  pointerover: "onPointerOver",
  pointerup: "onPointerUp",
  wheel: "onWheel"
};
const listenerNames = Object.keys(r3fEventToHandlerMap);
function getObjectListeners(object, forEvent) {
  if (object._listeners != null && forEvent in object._listeners) {
    return object._listeners[forEvent];
  }
  let handler;
  if (object.isVoidObject && forEvent === "click" && object.parent?.__r3f != null) {
    handler = object.parent.__r3f.root.getState().onPointerMissed;
  }
  if (object.__r3f != null) {
    handler = object.__r3f.handlers[r3fEventToHandlerMap[forEvent]];
  }
  if (handler == null) {
    return void 0;
  }
  return [handler];
}
const VoidObjectRadius = 1e10;
const VoidObjectGeometry = new SphereGeometry(VoidObjectRadius);
const sceneVoidObjectMap = /* @__PURE__ */ new Map();
function getVoidObject(scene) {
  let entry = sceneVoidObjectMap.get(scene);
  if (entry == null) {
    entry = new Mesh(VoidObjectGeometry);
    entry.isVoidObject = true;
    entry.parent = scene;
    entry.pointerEventsOrder = -Infinity;
    sceneVoidObjectMap.set(scene, entry);
  }
  return entry;
}
function computeIntersectionWorldPlane(target, intersection, objectMatrixWorld) {
  const normal = intersection.normal ?? intersection.face?.normal;
  if (normal == null) {
    return false;
  }
  target.setFromNormalAndCoplanarPoint(normal, intersection.localPoint);
  target.applyMatrix4(objectMatrixWorld);
  return true;
}
function isPointerEventsAllowed(hasListener, pointerEvents, pointerEventsType) {
  if (pointerEvents === "none") {
    return false;
  }
  if (pointerEvents === "listener" && !hasListener) {
    return false;
  }
  if (pointerEventsType === "all") {
    return true;
  }
  if (typeof pointerEventsType === "function") {
    return ({ id, type, state }) => pointerEventsType(id, type, state);
  }
  let value;
  let invert;
  if ("deny" in pointerEventsType) {
    invert = true;
    value = pointerEventsType.deny;
  } else {
    invert = false;
    value = pointerEventsType.allow;
  }
  if (Array.isArray(value)) {
    return (pointer) => invertIf(value.includes(pointer.type), invert);
  }
  return (pointer) => invertIf(value === pointer.type, invert);
}
function invertIf(toInvert, ifIsTrue) {
  return ifIsTrue ? !toInvert : toInvert;
}
function intersectPointerEventTargets(type, object, pointers, parentHasListener = false, parentPointerEvents, parentPointerEventsType, parentPointerEventsOrder) {
  const hasListener = parentHasListener || hasObjectListeners(type, object);
  const pointerEvents = object.pointerEvents ?? parentPointerEvents;
  const pointerEventsOrDefault = pointerEvents ?? object.defaultPointerEvents ?? "listener";
  const pointerEventsType = object.pointerEventsType ?? parentPointerEventsType ?? "all";
  const pointerEventsOrder = object.pointerEventsOrder ?? parentPointerEventsOrder ?? 0;
  const isAllowed = isPointerEventsAllowed(hasListener, pointerEventsOrDefault, pointerEventsType);
  const length = pointers.length;
  if (length === 1) {
    if (isAllowed === true || typeof isAllowed === "function" && isAllowed(pointers[0])) {
      filterAndInteresct(pointers[0], object, pointerEventsOrDefault, pointerEventsType, pointerEventsOrder);
    }
  } else if (isAllowed === true) {
    for (let i2 = 0; i2 < length; i2++) {
      filterAndInteresct(pointers[i2], object, pointerEventsOrDefault, pointerEventsType, pointerEventsOrder);
    }
  } else if (typeof isAllowed === "function") {
    for (let i2 = 0; i2 < length; i2++) {
      const pointer = pointers[i2];
      if (!isAllowed(pointer)) {
        continue;
      }
      filterAndInteresct(pointer, object, pointerEventsOrDefault, pointerEventsType, pointerEventsOrder);
    }
  }
  if (object.children.length === 0 || object.intersectChildren === false) {
    return;
  }
  const descendants = object.interactableDescendants ?? object.children;
  const descendantsLength = descendants.length;
  for (let i2 = 0; i2 < descendantsLength; i2++) {
    intersectPointerEventTargets(type, descendants[i2], pointers, hasListener, pointerEvents, pointerEventsType, pointerEventsOrder);
  }
}
function hasObjectListeners(type, object) {
  if (object.ancestorsHaveListeners) {
    return true;
  }
  if (type === "pointer" && object.ancestorsHavePointerListeners) {
    return true;
  }
  if (type === "wheel" && object.ancestorsHaveWheelListeners) {
    return true;
  }
  if (object.__r3f != null && object.__r3f?.eventCount > 0) {
    if (type === "wheel" && object.__r3f["handlers"]["onWheel"] != null) {
      return true;
    }
    if (type === "pointer" && Object.keys(object.__r3f["handlers"]).some((key) => key != "onWheel")) {
      return true;
    }
  }
  if (object._listeners == null) {
    return false;
  }
  if (type === "wheel") {
    const wheelListeners = object._listeners.wheel;
    return wheelListeners != null && wheelListeners.length > 0;
  }
  const entries = Object.entries(object._listeners);
  const length = entries.length;
  for (let i2 = 0; i2 < length; i2++) {
    const entry = entries[i2];
    if (entry[0] === "wheel") {
      continue;
    }
    if (!listenerNames.includes(entry[0])) {
      continue;
    }
    if (entry[1] != null && entry[1].length > 0) {
      return true;
    }
  }
  return false;
}
function filterAndInteresct({ intersector, options }, object, pointerEvents, pointerEventsType, pointerEventsOrder) {
  if (options.filter?.(object, pointerEvents, pointerEventsType, pointerEventsOrder) === false) {
    return;
  }
  intersector.executeIntersection(object, pointerEventsOrder);
}
function getDominantIntersectionIndex(intersections, pointerEventsOrders, { customSort: compare = defaultSort } = {}, filter) {
  let intersection = void 0;
  let pointerEventsOrder = void 0;
  let index = void 0;
  const length = intersections.length;
  for (let i2 = 0; i2 < length; i2++) {
    const newIntersection = intersections[i2];
    if (filter?.(newIntersection) === false) {
      continue;
    }
    const newPointerEventsOrder = pointerEventsOrders?.[i2];
    if (intersection == null || compare(newIntersection, newPointerEventsOrder, intersection, pointerEventsOrder) < 0) {
      index = i2;
      intersection = newIntersection;
      pointerEventsOrder = newPointerEventsOrder;
    }
  }
  return index;
}
function defaultSort(i1, pointerEventsOrder1 = 0, i2, pointerEventsOrder2 = 0) {
  if (pointerEventsOrder1 != pointerEventsOrder2) {
    return pointerEventsOrder2 - pointerEventsOrder1;
  }
  return i1.distance - i2.distance;
}
const VoidObjectDistance = 1e7;
function voidObjectIntersectionFromRay(scene, ray, getDetails, pointerPosition, pointerQuaternion, addToDistance = 0) {
  const point = ray.direction.clone().multiplyScalar(VoidObjectDistance);
  const distanceOnRay = VoidObjectDistance;
  return {
    distance: distanceOnRay + addToDistance,
    object: getVoidObject(scene),
    point,
    normal: ray.origin.clone().sub(point).normalize(),
    details: getDetails(point, distanceOnRay),
    pointerPosition,
    pointerQuaternion,
    pointOnFace: point,
    localPoint: point
  };
}
function pushTimes(target, value, times) {
  while (times > 0) {
    target.push(value);
    --times;
  }
}
const buttonsDownTimeKey = Symbol("buttonsDownTime");
const buttonsClickTimeKey = Symbol("buttonsClickTime");
globalThis.pointerEventspointerMap ?? (globalThis.pointerEventspointerMap = /* @__PURE__ */ new Map());
Object3D.prototype.setPointerCapture = function(pointerId) {
  getPointerById(pointerId)?.setCapture(this);
};
Object3D.prototype.releasePointerCapture = function(pointerId) {
  const pointer = getPointerById(pointerId);
  if (pointer == null || !pointer.hasCaptured(this)) {
    return;
  }
  pointer.setCapture(void 0);
};
Object3D.prototype.hasPointerCapture = function(pointerId) {
  return getPointerById(pointerId)?.hasCaptured(this) ?? false;
};
function getPointerById(pointerId) {
  return globalThis.pointerEventspointerMap?.get(pointerId);
}
class Pointer {
  constructor(id, type, state, intersector, getCamera, onMoveCommited, parentSetPointerCapture, parentReleasePointerCapture, options = {}) {
    __publicField(this, "id");
    __publicField(this, "type");
    __publicField(this, "state");
    __publicField(this, "intersector");
    __publicField(this, "getCamera");
    __publicField(this, "onMoveCommited");
    __publicField(this, "parentSetPointerCapture");
    __publicField(this, "parentReleasePointerCapture");
    __publicField(this, "options");
    //state
    __publicField(this, "prevIntersection");
    __publicField(this, "intersection");
    __publicField(this, "prevEnabled", true);
    __publicField(this, "enabled", true);
    __publicField(this, "wheelIntersection");
    //derived state
    /**
     * ordered leaf -> root (bottom -> top)
     */
    __publicField(this, "pointerEntered", []);
    __publicField(this, "pointerEnteredHelper", []);
    __publicField(this, "pointerCapture");
    __publicField(this, "buttonsDownTime", /* @__PURE__ */ new Map());
    __publicField(this, "buttonsDown", /* @__PURE__ */ new Set());
    //to handle interaction before first move (after exit)
    __publicField(this, "wasMoved", false);
    __publicField(this, "onFirstMove", []);
    this.id = id;
    this.type = type;
    this.state = state;
    this.intersector = intersector;
    this.getCamera = getCamera;
    this.onMoveCommited = onMoveCommited;
    this.parentSetPointerCapture = parentSetPointerCapture;
    this.parentReleasePointerCapture = parentReleasePointerCapture;
    this.options = options;
    globalThis.pointerEventspointerMap?.set(id, this);
  }
  getPointerCapture() {
    return this.pointerCapture;
  }
  hasCaptured(object) {
    return this.pointerCapture?.object === object;
  }
  setCapture(object) {
    if (this.pointerCapture?.object === object) {
      return;
    }
    if (this.pointerCapture != null) {
      this.parentReleasePointerCapture?.();
      this.pointerCapture = void 0;
    }
    if (object != null && this.intersection != null) {
      this.pointerCapture = { object, intersection: this.intersection };
      this.parentSetPointerCapture?.();
    }
  }
  getButtonsDown() {
    return this.buttonsDown;
  }
  /**
   * @returns undefined if no intersection was executed yet
   */
  getIntersection() {
    return this.intersection;
  }
  getEnabled() {
    return this.enabled;
  }
  setEnabled(enabled, nativeEvent, commit = true) {
    if (this.enabled === enabled) {
      return;
    }
    if (!enabled && this.pointerCapture != null) {
      this.parentReleasePointerCapture?.();
      this.pointerCapture = void 0;
    }
    this.enabled = enabled;
    if (commit) {
      this.commit(nativeEvent, false);
    }
  }
  computeIntersection(type, scene, nativeEvent) {
    if (this.pointerCapture != null) {
      return this.intersector.intersectPointerCapture(this.pointerCapture, nativeEvent);
    }
    this.intersector.startIntersection(nativeEvent);
    intersectPointerEventTargets(type, scene, [this]);
    return this.intersector.finalizeIntersection(scene);
  }
  setIntersection(intersection) {
    this.intersection = intersection;
  }
  commit(nativeEvent, emitMove) {
    const camera = this.getCamera();
    const prevIntersection = this.prevEnabled ? this.prevIntersection : void 0;
    const intersection = this.enabled ? this.intersection : void 0;
    if (prevIntersection != null && prevIntersection.object != intersection?.object) {
      emitPointerEvent(new PointerEvent("pointerout", true, nativeEvent, this, prevIntersection, camera));
    }
    const pointerLeft = this.pointerEntered;
    this.pointerEntered = [];
    this.pointerEnteredHelper.length = 0;
    computeEnterLeave(intersection?.object, this.pointerEntered, pointerLeft, this.pointerEnteredHelper);
    const length = pointerLeft.length;
    for (let i2 = 0; i2 < length; i2++) {
      const object = pointerLeft[i2];
      emitPointerEvent(new PointerEvent("pointerleave", false, nativeEvent, this, prevIntersection, camera, object));
    }
    if (intersection != null && prevIntersection?.object != intersection.object) {
      emitPointerEvent(new PointerEvent("pointerover", true, nativeEvent, this, intersection, camera));
    }
    for (let i2 = this.pointerEnteredHelper.length - 1; i2 >= 0; i2--) {
      const object = this.pointerEnteredHelper[i2];
      emitPointerEvent(new PointerEvent("pointerenter", false, nativeEvent, this, intersection, camera, object));
    }
    if (emitMove && intersection != null) {
      emitPointerEvent(new PointerEvent("pointermove", true, nativeEvent, this, intersection, camera));
    }
    this.prevIntersection = this.intersection;
    this.prevEnabled = this.enabled;
    if (!this.wasMoved && this.intersector.isReady()) {
      this.wasMoved = true;
      const length2 = this.onFirstMove.length;
      for (let i2 = 0; i2 < length2; i2++) {
        this.onFirstMove[i2](camera);
      }
      this.onFirstMove.length = 0;
    }
    this.onMoveCommited?.(this);
  }
  /**
   * computes and commits a move
   */
  move(scene, nativeEvent) {
    this.intersection = this.computeIntersection("pointer", scene, nativeEvent);
    this.commit(nativeEvent, true);
  }
  /**
   * computes and commits the pointer if a move has not yet occured
   */
  over(scene, nativeEvent) {
    if (!this.wasMoved) {
      this.intersection = this.computeIntersection("pointer", scene, nativeEvent);
      this.commit(nativeEvent, false);
    }
  }
  /**
   * emits a move without (re-)computing the intersection
   * just emitting a move event to the current intersection
   */
  emitMove(nativeEvent) {
    if (this.intersection == null) {
      return;
    }
    emitPointerEvent(new PointerEvent("pointermove", true, nativeEvent, this, this.intersection, this.getCamera()));
  }
  down(nativeEvent) {
    this.buttonsDown.add(nativeEvent.button);
    if (!this.enabled) {
      return;
    }
    if (!this.wasMoved) {
      this.onFirstMove.push(this.down.bind(this, nativeEvent));
      return;
    }
    if (this.intersection == null) {
      return;
    }
    emitPointerEvent(new PointerEvent("pointerdown", true, nativeEvent, this, this.intersection, this.getCamera()));
    const { object } = this.intersection;
    object[buttonsDownTimeKey] ?? (object[buttonsDownTimeKey] = /* @__PURE__ */ new Map());
    object[buttonsDownTimeKey].set(nativeEvent.button, nativeEvent.timeStamp);
    this.buttonsDownTime.set(nativeEvent.button, nativeEvent.timeStamp);
  }
  up(nativeEvent) {
    this.buttonsDown.delete(nativeEvent.button);
    if (!this.enabled) {
      return;
    }
    if (!this.wasMoved) {
      this.onFirstMove.push(this.up.bind(this, nativeEvent));
      return;
    }
    if (this.intersection == null) {
      return;
    }
    const { clickThesholdMs, contextMenuButton = 2, dblClickThresholdMs = 500, clickThresholdMs = clickThesholdMs ?? 300 } = this.options;
    this.pointerCapture = void 0;
    const isClicked = getIsClicked(this.buttonsDownTime, this.intersection.object[buttonsDownTimeKey], nativeEvent.button, nativeEvent.timeStamp, clickThresholdMs);
    const camera = this.getCamera();
    if (isClicked && nativeEvent.button === contextMenuButton) {
      emitPointerEvent(new PointerEvent("contextmenu", true, nativeEvent, this, this.intersection, camera));
    }
    emitPointerEvent(new PointerEvent("pointerup", true, nativeEvent, this, this.intersection, camera));
    if (!isClicked || nativeEvent.button === contextMenuButton) {
      return;
    }
    emitPointerEvent(new PointerEvent("click", true, nativeEvent, this, this.intersection, camera));
    const { object } = this.intersection;
    const buttonsClickTime = object[buttonsClickTimeKey] ?? (object[buttonsClickTimeKey] = /* @__PURE__ */ new Map());
    const buttonClickTime = buttonsClickTime.get(nativeEvent.button);
    if (buttonClickTime == null || nativeEvent.timeStamp - buttonClickTime > dblClickThresholdMs) {
      buttonsClickTime.set(nativeEvent.button, nativeEvent.timeStamp);
      return;
    }
    emitPointerEvent(new PointerEvent("dblclick", true, nativeEvent, this, this.intersection, camera));
    buttonsClickTime.delete(nativeEvent.button);
  }
  cancel(nativeEvent) {
    if (!this.enabled) {
      return;
    }
    if (!this.wasMoved) {
      this.onFirstMove.push(this.cancel.bind(this, nativeEvent));
      return;
    }
    if (this.intersection == null) {
      return;
    }
    emitPointerEvent(new PointerEvent("pointercancel", true, nativeEvent, this, this.intersection, this.getCamera()));
  }
  wheel(scene, nativeEvent, useMoveIntersection = false) {
    if (!this.enabled) {
      return;
    }
    if (!this.wasMoved && useMoveIntersection) {
      this.onFirstMove.push(this.wheel.bind(this, scene, nativeEvent, useMoveIntersection));
      return;
    }
    if (!useMoveIntersection) {
      this.wheelIntersection = this.computeIntersection("wheel", scene, nativeEvent);
    }
    const intersection = useMoveIntersection ? this.intersection : this.wheelIntersection;
    if (intersection == null) {
      return;
    }
    emitPointerEvent(new WheelEvent(nativeEvent, this, intersection, this.getCamera()));
  }
  emitWheel(nativeEvent, useMoveIntersection = false) {
    if (!this.enabled) {
      return;
    }
    if (!this.wasMoved && useMoveIntersection) {
      this.onFirstMove.push(this.emitWheel.bind(this, nativeEvent, useMoveIntersection));
      return;
    }
    const intersection = useMoveIntersection ? this.intersection : this.wheelIntersection;
    if (intersection == null) {
      return;
    }
    emitPointerEvent(new WheelEvent(nativeEvent, this, intersection, this.getCamera()));
  }
  exit(nativeEvent) {
    if (this.wasMoved) {
      if (this.pointerCapture != null) {
        this.parentReleasePointerCapture?.();
        this.pointerCapture = void 0;
      }
      this.intersection = void 0;
      this.commit(nativeEvent, false);
    }
    this.onFirstMove.length = 0;
    this.wasMoved = false;
  }
}
function computeEnterLeave(currentObject, targetAllAncestors, targeDiffRemovedAncestors, targetDiffAddedAncestors) {
  if (currentObject == null) {
    return;
  }
  const index = targeDiffRemovedAncestors.indexOf(currentObject);
  if (index != -1) {
    targeDiffRemovedAncestors.splice(index, 1);
  } else {
    targetDiffAddedAncestors.push(currentObject);
  }
  targetAllAncestors.push(currentObject);
  computeEnterLeave(currentObject.parent, targetAllAncestors, targeDiffRemovedAncestors, targetDiffAddedAncestors);
}
function getIsClicked(pointerButtonsPressTime, objectButtonsDownTime, button, buttonUpTime, clickThresholdMs) {
  if (objectButtonsDownTime == null) {
    return false;
  }
  const objectButtonPressTime = objectButtonsDownTime.get(button);
  if (objectButtonPressTime == null) {
    return false;
  }
  if (buttonUpTime - objectButtonPressTime > clickThresholdMs) {
    return false;
  }
  if (objectButtonPressTime != pointerButtonsPressTime.get(button)) {
    return false;
  }
  return true;
}
function updateAndCheckWorldTransformation(object) {
  if (object.transformReady === false) {
    return false;
  }
  if (object.parent == null) {
    object.matrixWorld.copy(object.matrix);
    return true;
  }
  if (!updateAndCheckWorldTransformation(object.parent)) {
    return false;
  }
  object.matrixWorld.multiplyMatrices(object.parent.matrixWorld, object.matrix);
  return true;
}
const triangleHelper1 = new Triangle();
const triangleHelper2 = new Triangle();
const aVec2Helper = new Vector2();
const bVec2Helper = new Vector2();
const cVec2Helper = new Vector2();
const pointHelper = new Vector3();
const inverseMatrix = new Matrix4();
const localPointHelper = new Vector3();
function getClosestUV(target, point, mesh) {
  localPointHelper.copy(point).applyMatrix4(inverseMatrix.copy(mesh.matrixWorld).invert());
  const uv = mesh.geometry.attributes.uv;
  if (uv == null || !(uv instanceof BufferAttribute)) {
    return false;
  }
  let clostestDistance;
  loopThroughTriangles(mesh, (i1, i2, i3) => {
    mesh.getVertexPosition(i1, triangleHelper1.a);
    mesh.getVertexPosition(i2, triangleHelper1.b);
    mesh.getVertexPosition(i3, triangleHelper1.c);
    const distance = triangleHelper1.closestPointToPoint(localPointHelper, pointHelper).distanceTo(localPointHelper);
    if (clostestDistance != null && distance >= clostestDistance) {
      return;
    }
    clostestDistance = distance;
    triangleHelper2.copy(triangleHelper1);
    aVec2Helper.fromBufferAttribute(uv, i1);
    bVec2Helper.fromBufferAttribute(uv, i2);
    cVec2Helper.fromBufferAttribute(uv, i3);
  });
  if (clostestDistance == null) {
    return false;
  }
  triangleHelper2.closestPointToPoint(localPointHelper, pointHelper);
  triangleHelper2.getInterpolation(pointHelper, aVec2Helper, bVec2Helper, cVec2Helper, target);
  return true;
}
function loopThroughTriangles(mesh, fn) {
  const drawRange = mesh.geometry.drawRange;
  if (mesh.geometry.index != null) {
    const index = mesh.geometry.index;
    const start2 = Math.max(0, drawRange.start);
    const end2 = Math.min(index.count, drawRange.start + drawRange.count);
    for (let i2 = start2; i2 < end2; i2 += 3) {
      fn(index.getX(i2), index.getX(i2 + 1), index.getX(i2 + 2));
    }
    return;
  }
  const position = mesh.geometry.attributes.position;
  if (position == null) {
    return;
  }
  const start = Math.max(0, drawRange.start);
  const end = Math.min(position.count, drawRange.start + drawRange.count);
  for (let i2 = start; i2 < end; i2 += 3) {
    fn(i2, i2 + 1, i2 + 2);
  }
}
const invertedMatrixHelper$2 = new Matrix4();
const lineHelper = new Line3();
const scaleHelper$4 = new Vector3();
const planeHelper$2 = new Plane();
const rayHelper = new Ray();
const point2Helper$2 = new Vector2();
const defaultLinePoints = [new Vector3(0, 0, 0), new Vector3(0, 0, 1)];
class LinesIntersector {
  constructor(space, options) {
    __publicField(this, "space");
    __publicField(this, "options");
    __publicField(this, "raycasters", []);
    __publicField(this, "fromMatrixWorld", new Matrix4());
    __publicField(this, "ready");
    __publicField(this, "intersects", []);
    __publicField(this, "pointerEventsOrders", []);
    __publicField(this, "raycasterIndices", []);
    this.space = space;
    this.options = options;
  }
  isReady() {
    return this.ready ?? this.prepareTransformation();
  }
  prepareTransformation() {
    const spaceObject = this.space.current;
    if (spaceObject == null) {
      return this.ready = false;
    }
    this.ready = updateAndCheckWorldTransformation(spaceObject);
    if (!this.ready) {
      return false;
    }
    this.fromMatrixWorld.copy(spaceObject.matrixWorld);
    return true;
  }
  intersectPointerCapture({ intersection, object }) {
    const details = intersection.details;
    if (details.type != "lines") {
      throw new Error(`unable to process a pointer capture of type "${intersection.details.type}" with a lines intersector`);
    }
    if (!this.prepareTransformation()) {
      return intersection;
    }
    const linePoints = this.options.linePoints ?? defaultLinePoints;
    lineHelper.set(linePoints[details.lineIndex], linePoints[details.lineIndex + 1]).applyMatrix4(this.fromMatrixWorld);
    const point = lineHelper.at(details.distanceOnLine / lineHelper.distance(), new Vector3());
    intersection.object.updateWorldMatrix(true, false);
    computeIntersectionWorldPlane(planeHelper$2, intersection, intersection.object.matrixWorld);
    const pointOnFace = rayHelper.intersectPlane(planeHelper$2, new Vector3()) ?? point;
    const pointerPosition = new Vector3();
    const pointerQuaternion = new Quaternion();
    this.fromMatrixWorld.decompose(pointerPosition, pointerQuaternion, scaleHelper$4);
    let uv = intersection.uv;
    if (intersection.object instanceof Mesh && getClosestUV(point2Helper$2, point, intersection.object)) {
      uv = point2Helper$2.clone();
    }
    return {
      ...intersection,
      object,
      uv,
      pointOnFace,
      point,
      pointerPosition,
      pointerQuaternion
    };
  }
  startIntersection() {
    if (!this.prepareTransformation()) {
      return;
    }
    const linePoints = this.options.linePoints ?? defaultLinePoints;
    const length = linePoints.length - 1;
    for (let i2 = 0; i2 < length; i2++) {
      const start = linePoints[i2];
      const end = linePoints[i2 + 1];
      const raycaster = this.raycasters[i2] ?? (this.raycasters[i2] = new Raycaster());
      raycaster.ray.origin.copy(start).applyMatrix4(this.fromMatrixWorld);
      raycaster.ray.direction.copy(end).applyMatrix4(this.fromMatrixWorld);
      raycaster.ray.direction.sub(raycaster.ray.origin);
      const lineLength = raycaster.ray.direction.length();
      raycaster.ray.direction.divideScalar(lineLength);
      raycaster.far = lineLength;
    }
    this.raycasters.length = length;
    return;
  }
  executeIntersection(object, objectPointerEventsOrder) {
    if (!this.isReady()) {
      return;
    }
    const startOuter = this.intersects.length;
    const length = this.raycasters.length;
    for (let i2 = 0; i2 < length; i2++) {
      const raycaster = this.raycasters[i2];
      const startInner = this.intersects.length;
      object.raycast(raycaster, this.intersects);
      pushTimes(this.raycasterIndices, i2, this.intersects.length - startInner);
    }
    pushTimes(this.pointerEventsOrders, objectPointerEventsOrder, this.intersects.length - startOuter);
  }
  finalizeIntersection(scene) {
    const pointerPosition = new Vector3().setFromMatrixPosition(this.fromMatrixWorld);
    const pointerQuaternion = new Quaternion().setFromRotationMatrix(this.fromMatrixWorld);
    const index = getDominantIntersectionIndex(this.intersects, this.pointerEventsOrders, this.options);
    const intersection = index == null ? void 0 : this.intersects[index];
    const raycasterIndex = index == null ? void 0 : this.raycasterIndices[index];
    this.intersects.length = 0;
    this.raycasterIndices.length = 0;
    this.pointerEventsOrders.length = 0;
    if (intersection == null || raycasterIndex == null) {
      const lastRaycasterIndex = this.raycasters.length - 1;
      const prevDistance = this.raycasters.reduce((prev, caster, i2) => i2 === lastRaycasterIndex ? prev : prev + caster.far, 0);
      const lastRaycaster = this.raycasters[lastRaycasterIndex];
      return voidObjectIntersectionFromRay(scene, lastRaycaster.ray, (point, distanceOnLine) => ({
        line: new Line3(lastRaycaster.ray.origin.clone(), point),
        lineIndex: this.raycasters.length - 1,
        distanceOnLine,
        type: "lines"
      }), pointerPosition, pointerQuaternion, prevDistance);
    }
    let distance = intersection.distance;
    for (let i2 = 0; i2 < raycasterIndex; i2++) {
      distance += this.raycasters[i2].far;
    }
    intersection.object.updateWorldMatrix(true, false);
    const raycaster = this.raycasters[raycasterIndex];
    return Object.assign(intersection, {
      details: {
        lineIndex: raycasterIndex,
        distanceOnLine: intersection.distance,
        type: "lines",
        line: new Line3(raycaster.ray.origin.clone(), raycaster.ray.direction.clone().multiplyScalar(raycaster.far).add(raycaster.ray.origin))
      },
      distance,
      pointerPosition,
      pointerQuaternion,
      pointOnFace: intersection.point,
      localPoint: intersection.point.clone().applyMatrix4(invertedMatrixHelper$2.copy(intersection.object.matrixWorld).invert())
    });
  }
}
const invertedMatrixHelper$1 = new Matrix4();
const scaleHelper$3 = new Vector3();
const NegZAxis = new Vector3(0, 0, -1);
const planeHelper$1 = new Plane();
const point2Helper$1 = new Vector2();
class RayIntersector {
  constructor(space, options) {
    __publicField(this, "space");
    __publicField(this, "options");
    __publicField(this, "raycaster", new Raycaster());
    __publicField(this, "raycasterQuaternion", new Quaternion());
    __publicField(this, "worldScale", 0);
    __publicField(this, "ready");
    __publicField(this, "intersects", []);
    __publicField(this, "pointerEventsOrders", []);
    this.space = space;
    this.options = options;
  }
  isReady() {
    return this.ready ?? this.prepareTransformation();
  }
  prepareTransformation() {
    const spaceObject = this.space.current;
    if (spaceObject == null) {
      return this.ready = false;
    }
    this.ready = updateAndCheckWorldTransformation(spaceObject);
    if (!this.ready) {
      return false;
    }
    spaceObject.matrixWorld.decompose(this.raycaster.ray.origin, this.raycasterQuaternion, scaleHelper$3);
    this.worldScale = scaleHelper$3.x;
    this.raycaster.ray.direction.copy(this.options?.direction ?? NegZAxis).applyQuaternion(this.raycasterQuaternion);
    return true;
  }
  intersectPointerCapture({ intersection, object }) {
    if (intersection.details.type != "ray") {
      throw new Error(`unable to process a pointer capture of type "${intersection.details.type}" with a ray intersector`);
    }
    if (!this.prepareTransformation()) {
      return intersection;
    }
    intersection.object.updateWorldMatrix(true, false);
    computeIntersectionWorldPlane(planeHelper$1, intersection, intersection.object.matrixWorld);
    const { ray } = this.raycaster;
    const pointOnFace = ray.intersectPlane(planeHelper$1, new Vector3()) ?? intersection.point;
    const point = ray.direction.clone().multiplyScalar(intersection.pointerPosition.distanceTo(intersection.point)).add(ray.origin);
    let uv = intersection.uv;
    if (intersection.object instanceof Mesh && getClosestUV(point2Helper$1, point, intersection.object)) {
      uv = point2Helper$1.clone();
    }
    return {
      ...intersection,
      uv,
      object,
      pointOnFace,
      point,
      pointerPosition: ray.origin.clone(),
      pointerQuaternion: this.raycasterQuaternion.clone()
    };
  }
  startIntersection() {
    this.prepareTransformation();
  }
  executeIntersection(object, objectPointerEventsOrder) {
    if (!this.isReady()) {
      return;
    }
    const start = this.intersects.length;
    object.raycast(this.raycaster, this.intersects);
    pushTimes(this.pointerEventsOrders, objectPointerEventsOrder, this.intersects.length - start);
  }
  finalizeIntersection(scene) {
    const pointerPosition = this.raycaster.ray.origin.clone();
    const pointerQuaternion = this.raycasterQuaternion.clone();
    let filter;
    if (this.options.minDistance != null) {
      const localMinDistance = this.options.minDistance / this.worldScale;
      filter = (intersection2) => intersection2.distance >= localMinDistance;
    }
    const index = getDominantIntersectionIndex(this.intersects, this.pointerEventsOrders, this.options, filter);
    const intersection = index == null ? void 0 : this.intersects[index];
    this.intersects.length = 0;
    this.pointerEventsOrders.length = 0;
    if (intersection == null) {
      return voidObjectIntersectionFromRay(scene, this.raycaster.ray, () => ({ type: "ray" }), pointerPosition, pointerQuaternion);
    }
    intersection.object.updateWorldMatrix(true, false);
    return Object.assign(intersection, {
      details: {
        type: "ray"
      },
      pointerPosition,
      pointerQuaternion,
      pointOnFace: intersection.point,
      localPoint: intersection.point.clone().applyMatrix4(invertedMatrixHelper$1.copy(intersection.object.matrixWorld).invert())
    });
  }
}
const directionHelper = new Vector3();
class ScreenRayIntersector {
  constructor(prepareTransformation, options) {
    __publicField(this, "prepareTransformation");
    __publicField(this, "options");
    __publicField(this, "raycaster", new Raycaster());
    __publicField(this, "cameraQuaternion", new Quaternion());
    __publicField(this, "fromPosition", new Vector3());
    __publicField(this, "fromQuaternion", new Quaternion());
    __publicField(this, "coords", new Vector2());
    __publicField(this, "viewPlane", new Plane());
    __publicField(this, "intersects", []);
    __publicField(this, "pointerEventsOrders", []);
    this.prepareTransformation = prepareTransformation;
    this.options = options;
  }
  isReady() {
    return true;
  }
  intersectPointerCapture({ intersection, object }, nativeEvent) {
    const details = intersection.details;
    if (details.type != "screen-ray") {
      throw new Error(`unable to process a pointer capture of type "${intersection.details.type}" with a camera ray intersector`);
    }
    if (!this.startIntersection(nativeEvent)) {
      return intersection;
    }
    this.viewPlane.constant -= details.distanceViewPlane;
    const point = this.raycaster.ray.intersectPlane(this.viewPlane, new Vector3());
    if (point == null) {
      return intersection;
    }
    intersection.object.updateWorldMatrix(true, false);
    computeIntersectionWorldPlane(this.viewPlane, intersection, intersection.object.matrixWorld);
    let uv = intersection.uv;
    if (intersection.object instanceof Mesh && getClosestUV(point2Helper$1, point, intersection.object)) {
      uv = point2Helper$1.clone();
    }
    return {
      ...intersection,
      details: {
        ...details,
        direction: this.raycaster.ray.direction.clone(),
        screenPoint: this.coords.clone()
      },
      uv,
      object,
      point,
      pointOnFace: point,
      pointerPosition: this.raycaster.ray.origin.clone(),
      pointerQuaternion: this.cameraQuaternion.clone()
    };
  }
  startIntersection(nativeEvent) {
    const from = this.prepareTransformation(nativeEvent, this.coords);
    if (from == null) {
      return false;
    }
    from.updateWorldMatrix(true, false);
    from.matrixWorld.decompose(this.fromPosition, this.fromQuaternion, scaleHelper$3);
    this.raycaster.setFromCamera(this.coords, from);
    this.viewPlane.setFromNormalAndCoplanarPoint(from.getWorldDirection(directionHelper), this.raycaster.ray.origin);
    return true;
  }
  executeIntersection(object, objectPointerEventsOrder) {
    const start = this.intersects.length;
    object.raycast(this.raycaster, this.intersects);
    pushTimes(this.pointerEventsOrders, objectPointerEventsOrder, this.intersects.length - start);
  }
  finalizeIntersection(scene) {
    const pointerPosition = this.fromPosition.clone();
    const pointerQuaternion = this.cameraQuaternion.clone();
    const pointerDirection = this.raycaster.ray.direction.clone();
    const index = getDominantIntersectionIndex(this.intersects, this.pointerEventsOrders, this.options);
    const intersection = index == null ? void 0 : this.intersects[index];
    this.intersects.length = 0;
    this.pointerEventsOrders.length = 0;
    if (intersection == null) {
      return voidObjectIntersectionFromRay(scene, this.raycaster.ray, (_point, distance) => ({
        type: "screen-ray",
        distanceViewPlane: distance,
        screenPoint: this.coords.clone(),
        direction: pointerDirection
      }), pointerPosition, pointerQuaternion);
    }
    intersection.object.updateWorldMatrix(true, false);
    invertedMatrixHelper$1.copy(intersection.object.matrixWorld).invert();
    return Object.assign(intersection, {
      details: {
        type: "screen-ray",
        distanceViewPlane: this.viewPlane.distanceToPoint(intersection.point),
        screenPoint: this.coords.clone(),
        direction: pointerDirection
      },
      pointOnFace: intersection.point,
      pointerPosition,
      pointerQuaternion,
      localPoint: intersection.point.clone().applyMatrix4(invertedMatrixHelper$1)
    });
  }
}
const scaleHelper$2 = new Vector3();
const point2Helper = new Vector2();
class SphereIntersector {
  constructor(space, getSphereRadius, options) {
    __publicField(this, "space");
    __publicField(this, "getSphereRadius");
    __publicField(this, "options");
    __publicField(this, "fromPosition", new Vector3());
    __publicField(this, "fromQuaternion", new Quaternion());
    __publicField(this, "collisionSphere", new Sphere());
    __publicField(this, "ready");
    __publicField(this, "intersects", []);
    this.space = space;
    this.getSphereRadius = getSphereRadius;
    this.options = options;
  }
  isReady() {
    return this.ready ?? this.prepareTransformation();
  }
  prepareTransformation() {
    const spaceObject = this.space.current;
    if (spaceObject == null) {
      return this.ready = false;
    }
    this.ready = updateAndCheckWorldTransformation(spaceObject);
    if (!this.ready) {
      return false;
    }
    spaceObject.matrixWorld.decompose(this.fromPosition, this.fromQuaternion, scaleHelper$2);
    return true;
  }
  intersectPointerCapture({ intersection, object }) {
    if (intersection.details.type != "sphere") {
      throw new Error(`unable to process a pointer capture of type "${intersection.details.type}" with a sphere intersector`);
    }
    if (!this.prepareTransformation()) {
      return intersection;
    }
    oldInputDevicePointOffset.copy(intersection.point).sub(intersection.pointerPosition);
    inputDeviceQuaternionOffset.copy(intersection.pointerQuaternion).invert().multiply(this.fromQuaternion);
    const point = oldInputDevicePointOffset.clone().applyQuaternion(inputDeviceQuaternionOffset).add(this.fromPosition);
    intersection.object.updateWorldMatrix(true, false);
    computeIntersectionWorldPlane(planeHelper, intersection, intersection.object.matrixWorld);
    const pointOnFace = planeHelper.projectPoint(this.fromPosition, new Vector3());
    let uv = intersection.uv;
    if (intersection.object instanceof Mesh && getClosestUV(point2Helper, point, intersection.object)) {
      uv = point2Helper.clone();
    }
    return {
      details: {
        type: "sphere"
      },
      uv,
      distance: point.distanceTo(pointOnFace),
      pointerPosition: this.fromPosition.clone(),
      pointerQuaternion: this.fromQuaternion.clone(),
      object,
      point,
      pointOnFace,
      face: intersection.face,
      localPoint: intersection.localPoint
    };
  }
  startIntersection() {
    if (!this.prepareTransformation()) {
      return;
    }
    this.collisionSphere.center.copy(this.fromPosition);
    this.collisionSphere.radius = this.getSphereRadius();
  }
  executeIntersection(object) {
    if (!this.isReady()) {
      return;
    }
    intersectSphereWithObject(this.collisionSphere, object, this.intersects);
  }
  finalizeIntersection(scene) {
    const pointerPosition = this.fromPosition.clone();
    const pointerQuaternion = this.fromQuaternion.clone();
    const index = getDominantIntersectionIndex(this.intersects, void 0, this.options);
    const intersection = index == null ? void 0 : this.intersects[index];
    this.intersects.length = 0;
    if (intersection == null) {
      return {
        details: {
          type: "sphere"
        },
        distance: 0,
        point: pointerPosition,
        object: getVoidObject(scene),
        pointerPosition,
        pointerQuaternion,
        pointOnFace: pointerPosition,
        localPoint: pointerPosition
      };
    }
    intersection.object.updateWorldMatrix(true, false);
    return Object.assign(intersection, {
      details: {
        type: "sphere"
      },
      pointOnFace: intersection.point,
      pointerPosition: this.fromPosition.clone(),
      pointerQuaternion: this.fromQuaternion.clone(),
      localPoint: intersection.point.clone().applyMatrix4(invertedMatrixHelper.copy(intersection.object.matrixWorld).invert())
    });
  }
}
const matrixHelper$2 = new Matrix4();
function intersectSphereWithObject(pointerSphere, object, target) {
  object.updateWorldMatrix(true, false);
  if (object.spherecast != null) {
    object.spherecast(pointerSphere, target);
    return;
  }
  if (object instanceof InstancedMesh) {
    if (object.geometry.boundingSphere == null) {
      object.geometry.computeBoundingSphere();
    }
    if (object.geometry.boundingBox == null) {
      object.geometry.computeBoundingBox();
    }
    for (let i2 = 0; i2 < object.count; i2++) {
      object.getMatrixAt(i2, matrixHelper$2);
      matrixHelper$2.premultiply(object.matrixWorld);
      if (!isSphereIntersectingMesh(pointerSphere, object, matrixHelper$2)) {
        continue;
      }
      const intersection2 = intersectSphereMesh(pointerSphere, object, matrixHelper$2, i2);
      if (intersection2 == null) {
        continue;
      }
      target.push(intersection2);
    }
  }
  if (!(object instanceof Mesh)) {
    return;
  }
  if (!isSphereIntersectingMesh(pointerSphere, object, object.matrixWorld)) {
    return;
  }
  invertedMatrixHelper.copy(object.matrixWorld).invert();
  const intersection = intersectSphereMesh(pointerSphere, object, object.matrixWorld);
  if (intersection == null) {
    return;
  }
  target.push(intersection);
}
const oldInputDevicePointOffset = new Vector3();
const inputDeviceQuaternionOffset = new Quaternion();
const planeHelper = new Plane();
const helperSphere = new Sphere();
function isSphereIntersectingMesh(pointerSphere, { geometry }, meshMatrixWorld) {
  if (geometry.boundingSphere == null) {
    geometry.computeBoundingSphere();
  }
  helperSphere.copy(geometry.boundingSphere).applyMatrix4(meshMatrixWorld);
  return helperSphere.center.distanceToSquared(pointerSphere.center) < (pointerSphere.radius + helperSphere.radius) ** 2;
}
const vectorHelper$2 = new Vector3();
const boxSizeHelper = new Vector3();
const boxCenterHelper = new Vector3();
const vec0_0001 = new Vector3(1e-4, 1e-4, 1e-4);
const invertedMatrixHelper = new Matrix4();
function intersectSphereMesh(pointerSphere, mesh, meshMatrixWorld, instanceId) {
  invertedMatrixHelper.copy(meshMatrixWorld).invert();
  helperSphere.copy(pointerSphere).applyMatrix4(invertedMatrixHelper);
  const { geometry } = mesh;
  if (geometry.boundingBox == null) {
    geometry.computeBoundingBox();
  }
  geometry.boundingBox.getSize(boxSizeHelper);
  geometry.boundingBox.getCenter(boxCenterHelper);
  geometry.boundingBox.clampPoint(helperSphere.center, vectorHelper$2);
  vectorHelper$2.applyMatrix4(meshMatrixWorld);
  const distanceToSphereCenterSquared = vectorHelper$2.distanceToSquared(pointerSphere.center);
  if (distanceToSphereCenterSquared > pointerSphere.radius * pointerSphere.radius) {
    return void 0;
  }
  boxSizeHelper.max(vec0_0001);
  const normal = helperSphere.center.clone().sub(boxCenterHelper);
  normal.divide(boxSizeHelper);
  maximizeAxisVector(normal);
  const point = vectorHelper$2.clone();
  let uv;
  if (getClosestUV(point2Helper, point, mesh)) {
    uv = point2Helper.clone();
  }
  return {
    distance: Math.sqrt(distanceToSphereCenterSquared),
    face: {
      a: 0,
      b: 0,
      c: 0,
      materialIndex: 0,
      normal
    },
    uv,
    normal,
    point,
    instanceId,
    object: mesh
  };
}
function maximizeAxisVector(vec) {
  const absX = Math.abs(vec.x);
  const absY = Math.abs(vec.y);
  const absZ = Math.abs(vec.z);
  if (absX >= absY && absX >= absZ) {
    vec.set(vec.x < 0 ? -1 : 1, 0, 0);
    return;
  }
  if (absY >= absX && absY >= absZ) {
    vec.set(0, vec.y < 0 ? -1 : 1, 0);
    return;
  }
  vec.set(0, 0, vec.z < 0 ? -1 : 1);
}
function createGrabPointer(getCamera, space, pointerState, options = {}, pointerType = "grab") {
  return new Pointer(generateUniquePointerId(), pointerType, pointerState, new SphereIntersector(space, () => options.radius ?? 0.07, options), getCamera, void 0, void 0, void 0, options);
}
function createRayPointer(getCamera, space, pointerState, options = {}, pointerType = "ray") {
  return new Pointer(generateUniquePointerId(), pointerType, pointerState, new RayIntersector(space, options), getCamera, void 0, void 0, void 0, options);
}
function createLinesPointer(getCamera, space, pointerState, options = {}, pointerType = "lines") {
  return new Pointer(generateUniquePointerId(), pointerType, pointerState, new LinesIntersector(space, options), getCamera, void 0, void 0, void 0, options);
}
function createTouchPointer(getCamera, space, pointerState, options = {}, pointerType = "touch") {
  return new Pointer(generateUniquePointerId(), pointerType, pointerState, new SphereIntersector(space, () => options.hoverRadius ?? 0.1, options), getCamera, createUpdateTouchPointer(options), void 0, void 0, options);
}
function createUpdateTouchPointer(options) {
  let wasPointerDown = false;
  return (pointer) => {
    if (!pointer.getEnabled()) {
      return;
    }
    const intersection = pointer.getIntersection();
    const isPointerDown = computeIsPointerDown(intersection, options.downRadius ?? 0.03);
    if (isPointerDown === wasPointerDown) {
      return;
    }
    const nativeEvent = { timeStamp: performance.now(), button: options.button ?? 0 };
    if (isPointerDown) {
      pointer.down(nativeEvent);
    } else {
      pointer.up(nativeEvent);
    }
    wasPointerDown = isPointerDown;
  };
}
function computeIsPointerDown(intersection, downRadius) {
  if (intersection == null) {
    return false;
  }
  return intersection.distance <= downRadius;
}
let pointerIdCounter = 23412;
function generateUniquePointerId() {
  return pointerIdCounter++;
}
function htmlEventToCoords(element, e, target) {
  if (!(e instanceof globalThis.MouseEvent)) {
    return target.set(0, 0);
  }
  const { width, height, top, left } = element.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  return target.set(x / width * 2 - 1, -(y / height) * 2 + 1);
}
function forwardHtmlEvents(fromElement, getCamera, scene, options) {
  return forwardEvents(
    fromElement,
    //backwards compatibility
    typeof getCamera === "function" ? getCamera : () => getCamera,
    scene,
    htmlEventToCoords.bind(null, fromElement),
    fromElement.setPointerCapture.bind(fromElement),
    (pointerId) => {
      if (fromElement.hasPointerCapture(pointerId)) {
        fromElement.releasePointerCapture(pointerId);
      }
    },
    {
      pointerTypePrefix: "screen-",
      ...options
    }
  );
}
function portalEventToCoords(e, target) {
  if (!(e instanceof PointerEvent)) {
    return target.set(0, 0);
  }
  if (e.uv == null) {
    return target.set(0, 0);
  }
  return target.copy(e.uv).multiplyScalar(2).addScalar(-1);
}
function forwardObjectEvents(fromPortal, getCamera, scene, options) {
  return forwardEvents(fromPortal, getCamera, scene, portalEventToCoords, fromPortal.setPointerCapture.bind(fromPortal), fromPortal.releasePointerCapture.bind(fromPortal), options);
}
function forwardEvents(from, getCamera, scene, toCoords, setPointerCapture, releasePointerCapture, options = {}) {
  const forwardPointerCapture = options?.forwardPointerCapture ?? true;
  const pointerMap = /* @__PURE__ */ new Map();
  const pointerTypePrefix = options.pointerTypePrefix ?? "forward-";
  const getInnerPointer = (event, eventType) => {
    let innerPointer = pointerMap.get(event.pointerId);
    if (innerPointer != null) {
      return innerPointer;
    }
    innerPointer = new Pointer(generateUniquePointerId(), `${pointerTypePrefix}${event.pointerType}`, event.pointerState, new ScreenRayIntersector((nativeEvent, coords) => {
      toCoords(nativeEvent, coords);
      return getCamera();
    }, options), getCamera, void 0, forwardPointerCapture ? setPointerCapture.bind(null, event.pointerId) : void 0, forwardPointerCapture ? releasePointerCapture.bind(null, event.pointerId) : void 0, options);
    if (eventType != "move" && eventType != "wheel") {
      innerPointer.setIntersection(innerPointer.computeIntersection("pointer", scene, event));
      innerPointer.commit(event, false);
    }
    pointerMap.set(event.pointerId, innerPointer);
    return innerPointer;
  };
  const latestWheelEventMap = /* @__PURE__ */ new Map();
  const latestMoveEventMap = /* @__PURE__ */ new Map();
  const movedPointerList = [];
  const eventList = [];
  const emitEvent = (type, event, pointer) => {
    switch (type) {
      case "move":
        pointer.move(scene, event);
        return;
      case "over":
        pointer.move(scene, event);
        return;
      case "wheel":
        pointer.wheel(scene, event);
        return;
      case "cancel":
        pointer.cancel(event);
        return;
      case "down":
        if (!hasButton(event)) {
          return;
        }
        pointer.down(event);
        return;
      case "up":
        if (!hasButton(event)) {
          return;
        }
        pointer.up(event);
        return;
      case "exit":
        latestMoveEventMap.delete(pointer);
        latestWheelEventMap.delete(pointer);
        pointer.exit(event);
        return;
    }
  };
  const onEvent = (type, event) => {
    const pointer = getInnerPointer(event, type);
    if (type === "move") {
      latestMoveEventMap.set(pointer, event);
    }
    if (type === "wheel") {
      latestWheelEventMap.set(pointer, event);
    }
    if (options.batchEvents ?? true) {
      eventList.push({ type, event });
    } else {
      emitEvent(type, event, pointer);
    }
  };
  const pointerMoveListener = onEvent.bind(null, "move");
  const pointerOverListener = onEvent.bind(null, "over");
  const pointerCancelListener = onEvent.bind(null, "cancel");
  const pointerDownListener = onEvent.bind(null, "down");
  const pointerUpListener = onEvent.bind(null, "up");
  const wheelListener = onEvent.bind(null, "wheel");
  const pointerLeaveListener = onEvent.bind(null, "exit");
  from.addEventListener("pointermove", pointerMoveListener);
  from.addEventListener("pointerover", pointerOverListener);
  from.addEventListener("pointercancel", pointerCancelListener);
  from.addEventListener("pointerdown", pointerDownListener);
  from.addEventListener("pointerup", pointerUpListener);
  from.addEventListener("wheel", wheelListener);
  from.addEventListener("pointerleave", pointerLeaveListener);
  return {
    destroy() {
      from.removeEventListener("pointermove", pointerMoveListener);
      from.removeEventListener("pointerover", pointerOverListener);
      from.removeEventListener("pointercancel", pointerCancelListener);
      from.removeEventListener("pointerdown", pointerDownListener);
      from.removeEventListener("pointerup", pointerUpListener);
      from.removeEventListener("wheel", wheelListener);
      from.removeEventListener("pointerleave", pointerLeaveListener);
      latestMoveEventMap.clear();
      latestWheelEventMap.clear();
    },
    update() {
      const length = eventList.length;
      for (let i2 = 0; i2 < length; i2++) {
        const { type, event } = eventList[i2];
        const pointer = getInnerPointer(event, type);
        if (type === "move") {
          movedPointerList.push(pointer);
          if (latestMoveEventMap.get(pointer) != event) {
            pointer.emitMove(event);
            continue;
          }
        }
        if (type === "wheel" && latestWheelEventMap.get(pointer) != event) {
          pointer.emitWheel(event);
          continue;
        }
        emitEvent(type, event, pointer);
      }
      eventList.length = 0;
      if (options.intersectEveryFrame ?? false) {
        for (const [pointer, event] of latestMoveEventMap.entries()) {
          if (movedPointerList.includes(pointer)) {
            continue;
          }
          pointer.move(scene, event);
        }
      }
      movedPointerList.length = 0;
    }
  };
}
function hasButton(val) {
  return val.button != null;
}
let CombinedPointer$1 = class CombinedPointer {
  constructor(enableMultiplePointers) {
    __publicField(this, "enableMultiplePointers");
    __publicField(this, "pointers", []);
    __publicField(this, "isDefaults", []);
    __publicField(this, "enabled", true);
    __publicField(this, "activePointer");
    __publicField(this, "nonCapturedPointers", []);
    this.enableMultiplePointers = enableMultiplePointers;
  }
  register(pointer, isDefault = false) {
    this.pointers.push(pointer);
    this.isDefaults.push(isDefault);
    return this.unregister.bind(this, pointer);
  }
  unregister(pointer) {
    const index = this.pointers.indexOf(pointer);
    if (index === -1) {
      return;
    }
    this.isDefaults.splice(index, 1);
    this.pointers.splice(index, 1);
  }
  /**
   * @returns true if any pointer is captured
   */
  startIntersection(nonCapturedPointers, nativeEvent) {
    const length = this.pointers.length;
    let anyPointerIsCaptured = false;
    for (let i2 = 0; i2 < length; i2++) {
      const pointer = this.pointers[i2];
      if (pointer instanceof CombinedPointer) {
        pointer.startIntersection(nonCapturedPointers, nativeEvent);
        continue;
      }
      const pointerCapture = pointer.getPointerCapture();
      if (pointerCapture != null) {
        anyPointerIsCaptured = true;
        pointer.setIntersection(pointer.intersector.intersectPointerCapture(pointerCapture, nativeEvent));
        continue;
      }
      nonCapturedPointers.push(pointer);
      pointer.intersector.startIntersection(nativeEvent);
    }
    return anyPointerIsCaptured;
  }
  /**
   * only for internal use
   */
  getIntersection() {
    return this.activePointer?.getIntersection();
  }
  /**
   * only for internal use
   */
  getPointerCapture() {
    return this.activePointer?.getPointerCapture();
  }
  computeActivePointer() {
    let smallestDistance;
    this.activePointer = void 0;
    const length = this.pointers.length;
    for (let i2 = 0; i2 < length; i2++) {
      const pointer = this.pointers[i2];
      if (pointer instanceof CombinedPointer) {
        pointer.computeActivePointer();
      }
      const intersection = pointer.getIntersection();
      const distance = pointer.getPointerCapture() != null ? -Infinity : intersection?.object.isVoidObject ? Infinity : intersection?.distance ?? Infinity;
      const isDefault = this.isDefaults[i2];
      if (smallestDistance == null || isDefault && distance === smallestDistance || distance < smallestDistance) {
        this.activePointer = pointer;
        smallestDistance = distance;
      }
    }
  }
  /**
   * only for internal use
   */
  commit(nativeEvent, emitMove, computeActivePointer = true) {
    if (this.enableMultiplePointers) {
      const length2 = this.pointers.length;
      for (let i2 = 0; i2 < length2; i2++) {
        this.pointers[i2].commit(nativeEvent, emitMove);
      }
      return;
    }
    if (computeActivePointer) {
      this.computeActivePointer();
    }
    const length = this.pointers.length;
    for (let i2 = 0; i2 < length; i2++) {
      const pointer = this.pointers[i2];
      pointer.setEnabled(pointer === this.activePointer, nativeEvent, false);
      pointer.commit(nativeEvent, emitMove, false);
    }
  }
  move(scene, nativeEvent) {
    if (!this.enabled) {
      return;
    }
    this.nonCapturedPointers.length = 0;
    const anyPointerIsCaptured = this.startIntersection(this.nonCapturedPointers, nativeEvent);
    if (!anyPointerIsCaptured || this.enableMultiplePointers) {
      intersectPointerEventTargets("pointer", scene, this.nonCapturedPointers);
      const nonCapturedPointerLength = this.nonCapturedPointers.length;
      for (let i2 = 0; i2 < nonCapturedPointerLength; i2++) {
        const pointer = this.nonCapturedPointers[i2];
        pointer.setIntersection(pointer.intersector.finalizeIntersection(scene));
      }
    }
    this.commit(nativeEvent, true);
  }
  setEnabled(enabled, nativeEvent) {
    this.enabled = enabled;
    const length = this.pointers.length;
    for (let i2 = 0; i2 < length; i2++) {
      const pointer = this.pointers[i2];
      pointer.setEnabled(enabled && (this.enableMultiplePointers || pointer == this.activePointer), nativeEvent);
    }
  }
};
const __vite_import_meta_env__$2 = {};
const createStoreImpl$1 = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore$1 = (createState) => createState ? createStoreImpl$1(createState) : createStoreImpl$1;
new Vector3();
new Vector3();
new Vector3();
function isAppleVisionPro() {
  return navigator.userAgent.includes("Macintosh") && navigator.xr != null;
}
function buildXRSessionInit(mode, domOverlayRoot, {
  anchors = true,
  handTracking = isAppleVisionPro() ? false : true,
  layers = true,
  meshDetection = true,
  planeDetection = true,
  customSessionInit,
  depthSensing = false,
  hitTest = true,
  domOverlay = true,
  bodyTracking = false,
  //until 6.7 since breaking change
  bounded
} = {}) {
  if (customSessionInit != null) {
    return customSessionInit;
  }
  const requiredFeatures = bounded == null ? ["local-floor"] : bounded ? ["bounded-floor"] : ["unbounded", "local-floor"];
  const optionalFeatures = [];
  if (domOverlay instanceof Element) {
    domOverlay = true;
  }
  addXRSessionFeature(anchors, "anchors", requiredFeatures, optionalFeatures);
  addXRSessionFeature(handTracking, "hand-tracking", requiredFeatures, optionalFeatures);
  addXRSessionFeature(layers, "layers", requiredFeatures, optionalFeatures);
  addXRSessionFeature(meshDetection, "mesh-detection", requiredFeatures, optionalFeatures);
  addXRSessionFeature(planeDetection, "plane-detection", requiredFeatures, optionalFeatures);
  addXRSessionFeature(depthSensing, "depth-sensing", requiredFeatures, optionalFeatures);
  addXRSessionFeature(domOverlay, "dom-overlay", requiredFeatures, optionalFeatures);
  addXRSessionFeature(hitTest, "hit-test", requiredFeatures, optionalFeatures);
  addXRSessionFeature(bodyTracking, "body-tracking", requiredFeatures, optionalFeatures);
  const init = {
    requiredFeatures,
    optionalFeatures
  };
  if (domOverlayRoot != null) {
    init.domOverlay = { root: domOverlayRoot };
  }
  if (depthSensing) {
    Object.assign(init, { depthSensing: { usagePreference: ["gpu-optimized"], dataFormatPreference: [] } });
  }
  return init;
}
function addXRSessionFeature(value, key, requiredFeatures, optionalFeatures) {
  if (value === false) {
    return;
  }
  if (value === true) {
    optionalFeatures.push(key);
    return;
  }
  requiredFeatures.push(key);
}
function resolveInputSourceImplementation(implementation, handedness, defaultValue) {
  if (typeof implementation === "function") {
    return implementation;
  }
  if (typeof implementation === "object") {
    if (handedness != null && hasKey(implementation, handedness)) {
      implementation = implementation[handedness];
    } else if ("default" in implementation) {
      implementation = implementation.default;
    }
  }
  if (implementation === false) {
    return false;
  }
  if (implementation === true) {
    return defaultValue;
  }
  return implementation ?? defaultValue;
}
function hasKey(val, key) {
  return key in val;
}
const baseInitialState = {
  session: void 0,
  mediaBinding: void 0,
  originReferenceSpace: void 0,
  visibilityState: void 0,
  mode: null,
  frameRate: void 0,
  inputSourceStates: [],
  detectedMeshes: [],
  detectedPlanes: [],
  layerEntries: []
};
async function injectEmulator(store, emulateOptions, alert) {
  if (typeof navigator === "undefined") {
    return false;
  }
  const [vr, ar] = await Promise.all([
    navigator.xr?.isSessionSupported("immersive-vr").catch((e) => {
      console.error(e);
      return false;
    }),
    navigator.xr?.isSessionSupported("immersive-ar").catch((e) => {
      console.error(e);
      return false;
    })
  ]);
  if (ar || vr) {
    return false;
  }
  const { emulate } = await __vitePreload(async () => {
    const { emulate: emulate2 } = await import("./emulate-_ssiyvKY.js");
    return { emulate: emulate2 };
  }, true ? __vite__mapDeps([0,1,2,3,4]) : void 0);
  if (alert) {
    window.alert(`emulator started`);
  }
  store.setState({
    emulator: emulate(emulateOptions === true ? "metaQuest3" : emulateOptions)
  });
  return true;
}
const cameraWorldPosition = new Vector3();
const tempLayerWorldPosition = new Vector3();
function createXRStore$1(options) {
  const domOverlayRoot = typeof HTMLElement === "undefined" ? void 0 : options?.domOverlay instanceof HTMLElement ? options.domOverlay : document.createElement("div");
  const store = createStore$1(() => ({
    ...baseInitialState,
    controller: options?.controller,
    hand: options?.hand,
    gaze: options?.gaze,
    screenInput: options?.screenInput,
    transientPointer: options?.transientPointer,
    domOverlayRoot
  }));
  const unsubscribeSessionOffer = store.subscribe(({ session }, { session: oldSession }) => {
    if (oldSession != null && session == null && xrManager != null) {
      offerSession(xrManager, options, domOverlayRoot).catch(console.error);
    }
  });
  const emulate = options?.emulate ?? "metaQuest3";
  let cleanupEmulate;
  if (typeof window !== "undefined" && emulate != false) {
    const inject = (typeof emulate === "object" ? emulate.inject : void 0) ?? { hostname: "localhost" };
    if (inject === true || typeof inject != "boolean" && window.location.hostname === inject.hostname) {
      injectEmulator(store, emulate, false).then((emulate2) => {
        if (!emulate2 || xrManager == null) {
          return;
        }
        offerSession(xrManager, options, domOverlayRoot);
      });
    }
    const keydownListener = (e) => {
      if (e.altKey && e.metaKey && e.code === "KeyE") {
        injectEmulator(store, emulate, true).then((emulate2) => {
          if (!emulate2 || xrManager == null) {
            return;
          }
          offerSession(xrManager, options, domOverlayRoot);
        });
      }
    };
    window.addEventListener("keydown", keydownListener);
    cleanupEmulate = () => window.removeEventListener("keydown", keydownListener);
  }
  let cleanupDomOverlayRoot;
  if (domOverlayRoot != null) {
    if (domOverlayRoot.parentNode == null) {
      const setupDisplay = (state) => {
        domOverlayRoot.style.display = state.session != null ? "block" : "none";
      };
      const unsubscribe = store.subscribe(setupDisplay);
      setupDisplay(store.getState());
      document.body.appendChild(domOverlayRoot);
      cleanupDomOverlayRoot = () => {
        domOverlayRoot.remove();
        unsubscribe();
      };
    }
    document.body.append(domOverlayRoot);
  }
  const syncXRInputSourceStates = createSyncXRInputSourceStates((state) => store.setState({ inputSourceStates: [...store.getState().inputSourceStates, state] }), options);
  const bindToSession = createBindToSession(store, syncXRInputSourceStates, options?.secondaryInputSources ?? false);
  const cleanupSessionGrantedListener = setupSessionGrantedListener(options?.enterGrantedSession, (mode) => enterXRSession(domOverlayRoot, mode, options, xrManager));
  const frameRequests = [];
  let xrManager;
  const onSessionStart = () => {
    store.setState(bindToSession(xrManager.getSession()));
  };
  return Object.assign(store, {
    addLayerEntry(layerEntry) {
      if (store.getState().session == null) {
        return;
      }
      store.setState({ layerEntries: [...store.getState().layerEntries, layerEntry] });
    },
    removeLayerEntry(layerEntry) {
      if (store.getState().session == null) {
        return;
      }
      store.setState({ layerEntries: store.getState().layerEntries.filter((entry) => entry != layerEntry) });
    },
    requestFrame() {
      return new Promise((resolve) => frameRequests.push(resolve));
    },
    setWebXRManager(newXrManager) {
      if (xrManager === newXrManager) {
        return;
      }
      xrManager?.removeEventListener("sessionstart", onSessionStart);
      xrManager = newXrManager;
      xrManager.addEventListener("sessionstart", onSessionStart);
      const { foveation, bounded } = options ?? {};
      xrManager.setReferenceSpaceType(bounded ? "bounded-floor" : "local-floor");
      if (foveation != null) {
        xrManager.setFoveation(foveation);
      }
      offerSession(xrManager, options, domOverlayRoot).catch(console.error);
    },
    setFrameRate(value) {
      const { session } = store.getState();
      if (session == null) {
        return;
      }
      setFrameRate(session, value);
    },
    setHand(implementation, handedness) {
      if (handedness == null) {
        store.setState({ hand: implementation });
        return;
      }
      const currentImplementation = store.getState().hand;
      const newControllerImplementation = {};
      if (typeof currentImplementation === "object") {
        Object.assign(newControllerImplementation, currentImplementation);
      }
      Object.assign(newControllerImplementation, {
        default: resolveInputSourceImplementation(currentImplementation, void 0, {}),
        [handedness]: implementation
      });
      store.setState({
        hand: newControllerImplementation
      });
    },
    setController(implementation, handedness) {
      if (handedness == null) {
        store.setState({ controller: implementation });
        return;
      }
      const currentImplementation = store.getState().controller;
      const newControllerImplementation = {};
      if (typeof currentImplementation === "object") {
        Object.assign(newControllerImplementation, currentImplementation);
      }
      Object.assign(newControllerImplementation, {
        default: resolveInputSourceImplementation(currentImplementation, void 0, {}),
        [handedness]: implementation
      });
      store.setState({
        controller: newControllerImplementation
      });
    },
    setTransientPointer(implementation, handedness) {
      if (handedness == null) {
        store.setState({ transientPointer: implementation });
        return;
      }
      const currentImplementation = store.getState().transientPointer;
      const newControllerImplementation = {};
      if (typeof currentImplementation === "object") {
        Object.assign(newControllerImplementation, currentImplementation);
      }
      Object.assign(newControllerImplementation, {
        default: resolveInputSourceImplementation(currentImplementation, void 0, {}),
        [handedness]: implementation
      });
      store.setState({
        transientPointer: newControllerImplementation
      });
    },
    setGaze(implementation) {
      store.setState({ gaze: implementation });
    },
    setScreenInput(implementation) {
      store.setState({ screenInput: implementation });
    },
    destroy() {
      xrManager?.removeEventListener("sessionstart", onSessionStart);
      cleanupEmulate?.();
      cleanupDomOverlayRoot?.();
      cleanupSessionGrantedListener?.();
      unsubscribeSessionOffer();
      bindToSession(void 0);
    },
    enterXR: (mode) => enterXRSession(domOverlayRoot, mode, options, xrManager),
    enterAR: () => enterXRSession(domOverlayRoot, "immersive-ar", options, xrManager),
    enterVR: () => enterXRSession(domOverlayRoot, "immersive-vr", options, xrManager),
    onBeforeFrame(scene, camera, frame) {
      let update;
      const referenceSpace = xrManager?.getReferenceSpace() ?? void 0;
      const state = store.getState();
      const origin = camera.parent ?? scene;
      if (state.origin != origin) {
        update ?? (update = {});
        update.origin = origin;
      }
      if (referenceSpace != state.originReferenceSpace) {
        update ?? (update = {});
        update.originReferenceSpace = referenceSpace;
      }
      origin.xrSpace = referenceSpace;
      if (state.origin != origin && state.origin != null) {
        state.origin.xrSpace = void 0;
      }
      if (frame != null) {
        if (xrManager != null) {
          updateSession(store, frame, xrManager);
        }
        if (state.body != frame.body) {
          update ?? (update = {});
          update.body = frame.body;
        }
      }
      if (update != null) {
        store.setState(update);
      }
      if (frame != null) {
        const length = frameRequests.length;
        for (let i2 = 0; i2 < length; i2++) {
          frameRequests[i2](frame);
        }
        frameRequests.length = 0;
      }
    },
    onBeforeRender() {
      const { session, layerEntries } = store.getState();
      if (session == null || xrManager == null) {
        return;
      }
      const xrCamera = xrManager.getCamera();
      xrCamera.aspect = xrCamera.projectionMatrix.elements[5] / xrCamera.projectionMatrix.elements[0];
      const currentLayers = session?.renderState.layers;
      if (currentLayers == null) {
        return;
      }
      xrCamera.getWorldPosition(cameraWorldPosition);
      layerEntries.sort((entryA, entryB) => {
        const renderOrderDifference = entryA.renderOrder - entryB.renderOrder;
        if (renderOrderDifference !== 0) {
          return renderOrderDifference;
        }
        entryA.object3D.getWorldPosition(tempLayerWorldPosition);
        const distA_sq = tempLayerWorldPosition.distanceToSquared(cameraWorldPosition);
        entryB.object3D.getWorldPosition(tempLayerWorldPosition);
        const distB_sq = tempLayerWorldPosition.distanceToSquared(cameraWorldPosition);
        return distB_sq - distA_sq;
      });
      let changed = false;
      const layers = layerEntries.map(({ layer }, i2) => {
        if (layer != currentLayers[i2]) {
          changed = true;
        }
        return layer;
      });
      if (!changed) {
        return;
      }
      layers.push(xrManager.getBaseLayer());
      session.updateRenderState({
        layers
      });
    }
  });
}
async function offerSession(manager, options, domOverlayRoot) {
  const offerSessionOptions = options?.offerSession ?? true;
  if (navigator.xr?.offerSession == null || offerSessionOptions === false) {
    return;
  }
  let mode;
  if (offerSessionOptions === true) {
    const arSupported = await navigator.xr.isSessionSupported("immersive-ar") ?? false;
    mode = arSupported ? "immersive-ar" : "immersive-vr";
  } else {
    mode = offerSessionOptions;
  }
  const session = await navigator.xr.offerSession(mode, buildXRSessionInit(mode, domOverlayRoot, options));
  setupXRSession(session, manager, options);
}
async function setFrameRate(session, frameRate) {
  if (frameRate === false) {
    return;
  }
  const { supportedFrameRates } = session;
  if (supportedFrameRates == null || supportedFrameRates.length === 0) {
    return;
  }
  if (typeof frameRate === "function") {
    const value = frameRate(supportedFrameRates);
    if (value === false) {
      return;
    }
    await session.updateTargetFrameRate(value);
    return;
  }
  const multiplier = frameRate === "high" ? 1 : frameRate === "mid" ? 0.5 : 0;
  await session.updateTargetFrameRate(supportedFrameRates[Math.ceil((supportedFrameRates.length - 1) * multiplier)]);
}
async function enterXRSession(domOverlayRoot, mode, options, manager) {
  if (typeof navigator === "undefined" || navigator.xr == null) {
    return Promise.reject(new Error(`WebXR not supported`));
  }
  if (manager == null) {
    return Promise.reject(new Error(`not connected to three.js. You either might be missing the <XR> component or the canvas is not yet loaded?`));
  }
  const session = await navigator.xr.requestSession(mode, buildXRSessionInit(mode, domOverlayRoot, options));
  await setupXRSession(session, manager, options);
  return session;
}
async function setupXRSession(session, manager, options) {
  await Promise.all([setFrameRate(session, options?.frameRate ?? "high"), setupXRManager(manager, session, options)]);
}
async function setupXRManager(xr, session, options) {
  if (xr == null) {
    return;
  }
  const maxFrameBufferScalingFactor = XRWebGLLayer.getNativeFramebufferScaleFactor(session);
  let frameBufferScaling = options?.frameBufferScaling;
  if (typeof frameBufferScaling === "function") {
    frameBufferScaling = frameBufferScaling(maxFrameBufferScalingFactor);
  }
  if (typeof frameBufferScaling === "string") {
    frameBufferScaling = frameBufferScaling === "high" ? maxFrameBufferScalingFactor : frameBufferScaling === "mid" ? 1 : 0.5;
  }
  if (frameBufferScaling != null) {
    xr?.setFramebufferScaleFactor(frameBufferScaling);
  }
  await xr?.setSession(session);
}
const allSessionModes = ["immersive-ar", "immersive-vr", "inline"];
function setupSessionGrantedListener(enterGrantedSession = allSessionModes, enterXR) {
  if (typeof navigator === "undefined" || enterGrantedSession === false) {
    return;
  }
  if (enterGrantedSession === true) {
    enterGrantedSession = allSessionModes;
  }
  const sessionGrantedListener = async () => {
    for (const mode of enterGrantedSession) {
      if (!await navigator.xr?.isSessionSupported(mode)) {
        continue;
      }
      enterXR(mode);
    }
  };
  navigator.xr?.addEventListener("sessiongranted", sessionGrantedListener);
  return () => navigator.xr?.removeEventListener("sessiongranted", sessionGrantedListener);
}
function createBindToSession(store, syncXRInputSourceStates, secondayInputSources) {
  let cleanupSession;
  return (session) => {
    cleanupSession?.();
    if (session == null) {
      return {};
    }
    const inputSourceChangesList = [];
    let inputSourceChangesTimeout;
    const applySourcesChange = () => {
      inputSourceChangesTimeout = void 0;
      store.setState({
        inputSourceStates: syncXRInputSourceStates(session, store.getState().inputSourceStates, inputSourceChangesList)
      });
      inputSourceChangesList.length = 0;
    };
    const onSourcesChange = (isPrimary, e) => {
      inputSourceChangesList.push({ isPrimary, added: e.added, removed: e.removed });
      if (inputSourceChangesTimeout != null) {
        return;
      }
      if (secondayInputSources) {
        inputSourceChangesTimeout = setTimeout(applySourcesChange, 100);
      } else {
        applySourcesChange();
      }
    };
    const onInputSourcesChange = onSourcesChange.bind(null, true);
    session.addEventListener("inputsourceschange", onInputSourcesChange);
    let cleanupSecondaryInputSources;
    if (secondayInputSources) {
      const onTrackedSourcesChange = onSourcesChange.bind(null, false);
      session.addEventListener("trackedsourceschange", onTrackedSourcesChange);
      cleanupSecondaryInputSources = () => session.removeEventListener("trackedsourceschange", onTrackedSourcesChange);
    }
    const onChange = () => store.setState({ frameRate: session.frameRate, visibilityState: session.visibilityState });
    session.addEventListener("frameratechange", onChange);
    session.addEventListener("visibilitychange", onChange);
    const onEnd = () => {
      cleanupSession?.();
      cleanupSession = void 0;
      store.setState({
        emulator: store.getState().emulator,
        ...baseInitialState
      });
    };
    session.addEventListener("end", onEnd);
    const initialChanges = [
      { isPrimary: true, added: session.inputSources }
    ];
    if (secondayInputSources) {
      initialChanges.push({ isPrimary: false, added: session.trackedSources });
    }
    const inputSourceStates = syncXRInputSourceStates(session, [], initialChanges);
    cleanupSession = () => {
      cleanupSecondaryInputSources?.();
      clearTimeout(inputSourceChangesTimeout);
      syncXRInputSourceStates(session, store.getState().inputSourceStates, "remove-all");
      session.removeEventListener("end", onEnd);
      session.removeEventListener("frameratechange", onChange);
      session.removeEventListener("visibilitychange", onChange);
      session.removeEventListener("inputsourceschange", onInputSourcesChange);
    };
    return {
      inputSourceStates,
      frameRate: session.frameRate,
      visibilityState: session.visibilityState,
      detectedMeshes: [],
      detectedPlanes: [],
      mode: session.environmentBlendMode === "opaque" ? "immersive-vr" : "immersive-ar",
      session,
      mediaBinding: typeof XRMediaBinding == "undefined" ? void 0 : new XRMediaBinding(session)
    };
  };
}
function updateSession(store, frame, manager) {
  const referenceSpace = manager.getReferenceSpace();
  const { detectedMeshes: prevMeshes, detectedPlanes: prevPlanes, session, inputSourceStates } = store.getState();
  if (referenceSpace == null || session == null) {
    return;
  }
  const detectedPlanes = updateDetectedEntities(prevPlanes, frame.detectedPlanes);
  const detectedMeshes = updateDetectedEntities(prevMeshes, frame.detectedMeshes);
  if (prevPlanes != detectedPlanes || prevMeshes != detectedMeshes) {
    store.setState({ detectedPlanes, detectedMeshes });
  }
  const inputSourceStatesLength = inputSourceStates.length;
  for (let i2 = 0; i2 < inputSourceStatesLength; i2++) {
    const inputSourceState = inputSourceStates[i2];
    switch (inputSourceState.type) {
      case "controller":
        updateXRControllerState(inputSourceState);
        break;
      case "hand":
        updateXRHandState(inputSourceState, frame, manager);
        break;
    }
  }
}
const emptyArray = [];
function updateDetectedEntities(prevDetectedEntities, detectedEntities) {
  if (detectedEntities == null) {
    return emptyArray;
  }
  if (prevDetectedEntities != null && equalContent(detectedEntities, prevDetectedEntities)) {
    return prevDetectedEntities;
  }
  return Array.from(detectedEntities);
}
function equalContent(set, arr) {
  if (set.size != arr.length) {
    return false;
  }
  for (const entry of arr) {
    if (!set.has(entry)) {
      return false;
    }
  }
  return true;
}
new BoxGeometry();
new PlaneGeometry();
async function loadXRControllerModel(layout, loader = DefaultGltfLoader) {
  const { scene } = await loader.loadAsync(layout.assetPath);
  return scene.clone(true);
}
function configureXRControllerModel(model, options) {
  model.renderOrder = options?.renderOrder ?? 0;
  model.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof Material) {
      child.material.colorWrite = options?.colorWrite ?? true;
    }
  });
}
function createUpdateXRControllerVisuals(model, layout, gamepadState) {
  const updateVisuals = [];
  for (const componentName in layout.components) {
    const component = layout.components[componentName];
    let state = gamepadState[componentName];
    if (state == null) {
      gamepadState[componentName] = state = {
        state: "default"
      };
    }
    updateVisuals.push(...Object.values(component.visualResponses).map((visualResponse) => createUpdateVisualResponse(model, state, visualResponse)));
  }
  return () => {
    const length = updateVisuals.length;
    for (let i2 = 0; i2 < length; i2++) {
      updateVisuals[i2]();
    }
  };
}
function createUpdateVisualResponse(model, componentState, visualResponse) {
  const valueNode = model.getObjectByName(visualResponse.valueNodeName);
  componentState.object = valueNode;
  if (valueNode == null) {
    return () => {
    };
  }
  if (visualResponse.valueNodeProperty === "visibility") {
    return () => valueNode.visible = visualResponse.states.includes(componentState.state);
  }
  const minNode = model.getObjectByName(visualResponse.minNodeName);
  const maxNode = model.getObjectByName(visualResponse.maxNodeName);
  if (minNode == null || maxNode == null) {
    return () => {
    };
  }
  return () => {
    const value = getVisualReponseValue(componentState, visualResponse);
    valueNode.quaternion.slerpQuaternions(minNode.quaternion, maxNode.quaternion, value);
    valueNode.position.lerpVectors(minNode.position, maxNode.position, value);
    valueNode.updateMatrix();
  };
}
function getVisualReponseValue(componentState, { componentProperty, states }) {
  const stateIsActive = states.includes(componentState.state);
  switch (componentProperty) {
    case "xAxis":
      return stateIsActive ? getNormalizesAxis(componentState).x : 0.5;
    case "yAxis":
      return stateIsActive ? getNormalizesAxis(componentState).y : 0.5;
    case "button":
      return stateIsActive ? componentState.button ?? 0 : 0;
    case "state":
      return stateIsActive ? 1 : 0;
  }
}
const vector2Helper = new Vector2();
function getNormalizesAxis({ xAxis = 0, yAxis = 0 }) {
  const hypotenuse = vector2Helper.lengthSq();
  if (hypotenuse > 1) {
    const theta = Math.atan2(yAxis, xAxis);
    vector2Helper.set(Math.cos(theta), Math.sin(theta));
  } else {
    vector2Helper.set(xAxis, yAxis);
  }
  vector2Helper.multiplyScalar(0.5).addScalar(0.5);
  return vector2Helper;
}
function updateXRMeshGeometry(mesh, geometry) {
  if (geometry != null && geometry.createdAt != null && geometry.createdAt >= mesh.lastChangedTime) {
    return geometry;
  }
  const newGeometry = new BufferGeometry();
  newGeometry.setIndex(new BufferAttribute(mesh.indices, 1));
  newGeometry.setAttribute("position", new BufferAttribute(mesh.vertices, 3));
  return Object.assign(newGeometry, { creationTime: mesh.lastChangedTime });
}
function updateXRPlaneGeometry(plane, geometry) {
  if (geometry != null && geometry.createdAt != null && geometry.createdAt >= plane.lastChangedTime) {
    return geometry;
  }
  return Object.assign(createGeometryFromPolygon(plane.polygon), { createdAt: plane.lastChangedTime });
}
const boxHelper = new Box2();
const sizeHelper = new Vector2();
function createGeometryFromPolygon(polygon) {
  if (polygon.length === 0) {
    return new BufferGeometry();
  }
  const shape = new Shape();
  const points = polygon.map(({ x, z }) => new Vector2(x, z));
  boxHelper.setFromPoints(points);
  boxHelper.getSize(sizeHelper);
  for (const point of points) {
    point.sub(boxHelper.min);
    point.divide(sizeHelper);
  }
  shape.setFromPoints(points);
  const geometry = new ShapeGeometry(shape);
  geometry.scale(sizeHelper.x, sizeHelper.y, 1);
  geometry.translate(boxHelper.min.x, boxHelper.min.y, 0);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}
function toDOMPointInit(value, defaultW = 1) {
  if (value == null) {
    return void 0;
  }
  return {
    x: nanToDefault(value.x),
    y: nanToDefault(value.y),
    z: nanToDefault(value.z),
    w: "w" in value ? nanToDefault(value.w, defaultW) : defaultW
  };
}
function nanToDefault(value, defaultValue = 0) {
  if (isNaN(value)) {
    return defaultValue;
  }
  return value;
}
const DefaultCentralAngle = 60 / 180 * Math.PI;
const DefaultCentralHorizontalAngle = 60 / 180 * Math.PI;
const DefaultLowerVerticalAngle = -30 / 180 * Math.PI;
const DefaultUpperVerticalAngle = 30 / 180 * Math.PI;
function createXRLayer(src, state, originReferenceSpace, xrManager, relativeTo, options, properties) {
  return src instanceof HTMLVideoElement ? createXRVideoLayer(src, state, originReferenceSpace, relativeTo, options, properties) : createXRNormalLayer(src, state.origin, originReferenceSpace, xrManager, relativeTo, options, properties);
}
function createXRVideoLayer(src, state, originReferenceSpace, relativeTo, { invertStereo, layout, shape = "quad" }, properties = {}) {
  const space = getSpaceFromAncestors(relativeTo, state.origin, originReferenceSpace, matrixHelper$1);
  const transform = matrixToRigidTransform(matrixHelper$1, scaleHelper$1);
  const init = {
    invertStereo,
    layout,
    space,
    transform
  };
  applyXRLayerScale(shape, init, properties.centralAngle, scaleHelper$1);
  const fnName = `create${capitalize(shape)}Layer`;
  const layer = state.mediaBinding?.[fnName](src, init);
  if (layer == null) {
    return void 0;
  }
  updateXRLayerProperties(layer, properties);
  return layer;
}
function createXRNormalLayer(src, origin, originReferenceSpace, xrManager, relativeTo, { shape = "quad", ...options }, properties = {}) {
  const space = getSpaceFromAncestors(relativeTo, origin, originReferenceSpace, matrixHelper$1);
  const transform = matrixToRigidTransform(matrixHelper$1, scaleHelper$1);
  const init = {
    ...options,
    isStatic: !(src instanceof WebGLRenderTarget),
    textureType: "texture",
    viewPixelWidth: options.layout === "stereo-left-right" ? src.width / 2 : src.width,
    viewPixelHeight: options.layout === "stereo-top-bottom" ? src.height / 2 : src.height,
    space,
    transform
  };
  applyXRLayerScale(shape, init, properties.centralAngle, scaleHelper$1);
  const fnName = `create${capitalize(shape)}Layer`;
  const layer = xrManager.getBinding()?.[fnName](init);
  if (layer == null) {
    return void 0;
  }
  updateXRLayerProperties(layer, properties);
  return layer;
}
const matrixHelper$1 = new Matrix4();
const vectorHelper$1 = new Vector3();
const quaternionHelper$2 = new Quaternion();
const scaleHelper$1 = new Vector3();
function matrixToRigidTransform(matrix, scaleTarget = scaleHelper$1) {
  matrix.decompose(vectorHelper$1, quaternionHelper$2, scaleTarget);
  scaleTarget.x = nanToDefault(scaleTarget.x);
  scaleTarget.y = nanToDefault(scaleTarget.y);
  scaleTarget.z = nanToDefault(scaleTarget.z);
  return new XRRigidTransform(toDOMPointInit(vectorHelper$1), toDOMPointInit(quaternionHelper$2));
}
const segmentPerAngle = 64 / Math.PI;
function computeSegmentAmount(angle) {
  return Math.ceil(angle * segmentPerAngle);
}
function setXRLayerRenderTarget(renderer, renderTarget, layerEntry, frame) {
  if (layerEntry != null && frame != null) {
    const subImage = renderer.xr.getBinding().getSubImage(layerEntry.layer, frame);
    renderer.setRenderTargetTextures(renderTarget, subImage.colorTexture);
  }
  renderer.setRenderTarget(renderTarget);
}
function createXRLayerGeometry(shape, properties) {
  switch (shape) {
    case "cylinder":
      const centralAngle = properties.centralAngle ?? DefaultCentralAngle;
      return new CylinderGeometry(1, 1, 1, computeSegmentAmount(centralAngle), 1, true, Math.PI - centralAngle / 2, centralAngle).scale(-1, 1, 1);
    case "equirect": {
      const centralHorizontalAngle = properties.centralHorizontalAngle ?? DefaultCentralHorizontalAngle;
      const upperVerticalAngle = properties.upperVerticalAngle ?? DefaultUpperVerticalAngle;
      const lowerVerticalAngle = properties.lowerVerticalAngle ?? DefaultLowerVerticalAngle;
      const centralVerticalAngle = upperVerticalAngle - lowerVerticalAngle;
      return new SphereGeometry(1, computeSegmentAmount(centralHorizontalAngle), computeSegmentAmount(centralVerticalAngle), -Math.PI / 2 - centralHorizontalAngle / 2, centralHorizontalAngle, Math.PI / 2 - upperVerticalAngle, centralVerticalAngle).scale(-1, 1, 1);
    }
    case "quad":
      return new PlaneGeometry();
  }
}
function capitalize(text) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}
function updateXRLayerProperties(target, properties = {}) {
  target.chromaticAberrationCorrection = properties.chromaticAberrationCorrection;
  target.quality = properties.quality ?? "default";
  target.blendTextureSourceAlpha = properties.blendTextureSourceAlpha ?? false;
  if (target instanceof XRCylinderLayer) {
    target.centralAngle = properties?.centralAngle ?? DefaultCentralAngle;
    return;
  }
  if (target instanceof XREquirectLayer) {
    target.centralHorizontalAngle = properties?.centralHorizontalAngle ?? DefaultCentralHorizontalAngle;
    target.lowerVerticalAngle = properties?.lowerVerticalAngle ?? DefaultLowerVerticalAngle;
    target.upperVerticalAngle = properties?.upperVerticalAngle ?? DefaultUpperVerticalAngle;
  }
}
function setupXRImageLayer(renderer, store, layer, src) {
  let stop = false;
  const draw = async () => {
    const frame = await store.requestFrame();
    if (stop) {
      return;
    }
    writeContentToXRLayer(renderer, layer, frame, src);
  };
  layer.addEventListener("redraw", draw);
  draw();
  return () => {
    stop = true;
    layer.removeEventListener("redraw", draw);
  };
}
async function waitForXRLayerSrcSize(src) {
  if (src instanceof HTMLImageElement && !src.complete) {
    await new Promise((resolve) => {
      const onResolve = () => {
        resolve();
        src.removeEventListener("load", onResolve);
      };
      src.addEventListener("load", onResolve);
    });
  }
  if (src instanceof HTMLVideoElement && src.readyState < 1) {
    return new Promise((resolve) => {
      const onResolve = () => {
        resolve();
        src.removeEventListener("loadedmetadata", onResolve);
      };
      src.addEventListener("loadedmetadata", onResolve);
    });
  }
}
function getXRLayerSrcTexture(src) {
  if (src instanceof WebGLRenderTarget) {
    return src.texture;
  }
  const texture = src instanceof HTMLVideoElement ? new VideoTexture(src) : new Texture(src);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
function writeContentToXRLayer(renderer, layer, frame, content) {
  const context2 = renderer.getContext();
  const subImage = renderer.xr.getBinding().getSubImage(layer, frame);
  renderer.state.bindTexture(context2.TEXTURE_2D, subImage.colorTexture);
  context2.pixelStorei(context2.UNPACK_FLIP_Y_WEBGL, true);
  context2.texSubImage2D(context2.TEXTURE_2D, 0, 0, 0, content.width, content.height, context2.RGBA, context2.UNSIGNED_BYTE, content);
}
function updateXRLayerTransform(state, target, centralAngle, relativeTo) {
  if (state.originReferenceSpace == null) {
    return;
  }
  target.space = getSpaceFromAncestors(relativeTo, state.origin, state.originReferenceSpace, matrixHelper$1);
  target.transform = matrixToRigidTransform(matrixHelper$1, scaleHelper$1);
  applyXRLayerScale(getLayerShape(target), target, centralAngle, scaleHelper$1);
}
function applyXRLayerScale(shape, target, centralAngle, scale) {
  if (shape === "cylinder") {
    const scaleXZ = (scale.x + scale.z) / 2;
    const radius = scaleXZ;
    const layerWidth = radius * (centralAngle ?? DefaultCentralAngle);
    target.radius = radius;
    target.aspectRatio = scale.y === 0 ? 1 : layerWidth / scale.y;
  } else if (shape === "quad") {
    target.width = scale.x / 2;
    target.height = scale.y / 2;
  } else {
    target.radius = (scale.x + scale.y + scale.z) / 3;
  }
}
function getLayerShape(layer) {
  if (layer instanceof XRCylinderLayer) {
    return "cylinder";
  }
  if (layer instanceof XREquirectLayer) {
    return "equirect";
  }
  return "quad";
}
function createXRLayerRenderTarget(pixelWidth, pixelHeight, dpr) {
  return new WebGLRenderTarget(pixelWidth * dpr, pixelHeight * dpr, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    depthTexture: new DepthTexture(pixelWidth, pixelHeight)
  });
}
const eulerHelper = new Euler(0, 0, 0, "YXZ");
const quaternionHelper$1 = new Quaternion();
function syncTeleportPointerRayGroup(space, rayGroup, deltaTimeMs) {
  space.updateWorldMatrix(true, false);
  space.matrixWorld.decompose(rayGroup.position, quaternionHelper$1, rayGroup.scale);
  eulerHelper.setFromQuaternion(quaternionHelper$1);
  eulerHelper.z = 0;
  eulerHelper.x = clamp(eulerHelper.x - 10 * Math.PI / 180, -Math.PI / 2, 1.1 * Math.PI / 4);
  quaternionHelper$1.setFromEuler(eulerHelper);
  rayGroup.quaternion.slerp(quaternionHelper$1, deltaTimeMs / 100);
}
function isTeleportTarget(object) {
  return object.userData.teleportTarget === true;
}
function buildTeleportTargetFilter(options = {}) {
  return (object, pointerEvents, pointerEventsType, pointerEventsOrder) => {
    if (!isTeleportTarget(object)) {
      return false;
    }
    if (options.filter != null && !options.filter(object, pointerEvents, pointerEventsType, pointerEventsOrder)) {
      return false;
    }
    return true;
  };
}
function createTeleportRayLine() {
  const curve = new QuadraticBezierCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, -8), new Vector3(0, -20, -15));
  return curve.getPoints(20);
}
let TeleportPointerRayModel$1 = class TeleportPointerRayModel extends Mesh {
  constructor(points) {
    const geometry = new MeshLineGeometry();
    const float32Array = new Float32Array(points.length * 3);
    for (let i2 = 0; i2 < points.length; i2++) {
      points[i2].toArray(float32Array, i2 * 3);
    }
    geometry.setPoints(float32Array);
    const multiplier = (points.length * 3 - 3) / (points.length * 3 - 1);
    const material = new MeshLineMaterial({
      lineWidth: 0.1,
      resolution: void 0,
      visibility: multiplier
    });
    super(geometry, material);
    __publicField(this, "multiplier");
    __publicField(this, "lineLengths");
    __publicField(this, "options", {});
    this.material.transparent = true;
    this.multiplier = multiplier;
    this.material = material;
    this.lineLengths = points.slice(0, -1).map((p, i2) => p.distanceTo(points[i2 + 1]));
  }
  update(pointer) {
    const enabled = pointer.getEnabled();
    const intersection = pointer.getIntersection();
    if (!enabled || pointer.getButtonsDown().size === 0 || intersection == null) {
      this.visible = false;
      return;
    }
    this.visible = true;
    if (intersection.details.type != "lines") {
      this.material.visibility = this.multiplier;
      return;
    }
    const { distanceOnLine, lineIndex } = intersection.details;
    const lineLength = this.lineLengths[lineIndex];
    this.material.visibility = this.multiplier * (lineIndex + distanceOnLine / lineLength) / this.lineLengths.length;
    const { color = "white", opacity = 0.4, size = 0.01 } = this.options;
    this.material.lineWidth = size;
    this.material.opacity = typeof opacity === "function" ? opacity(pointer) : opacity;
    const resolvedColor = typeof color === "function" ? color(pointer) : color;
    if (Array.isArray(resolvedColor)) {
      this.material.color.set(...resolvedColor);
    } else {
      this.material.color.set(resolvedColor);
    }
  }
};
const matrixHelper = new Matrix4();
const vectorHelper = new Vector3();
const scaleHelper = new Vector3();
const quaternionHelper = new Quaternion();
async function createXRHitTestSource(store, session, relativeTo, trackableType = ["point", "plane", "mesh"]) {
  if (typeof relativeTo === "string") {
    relativeTo = await session.requestReferenceSpace(relativeTo);
  }
  const entityTypes = Array.isArray(trackableType) ? trackableType : [trackableType];
  let options;
  let baseSpace;
  let object;
  const state = store.getState();
  if (relativeTo instanceof XRSpace) {
    options = { space: relativeTo, entityTypes };
    object = state.origin;
  } else {
    const space = getSpaceFromAncestors(relativeTo, state.origin, state.originReferenceSpace, matrixHelper);
    if (space == null) {
      return void 0;
    }
    matrixHelper.decompose(vectorHelper, quaternionHelper, scaleHelper);
    const point = toDOMPointInit(vectorHelper);
    vectorHelper.set(0, 0, -1).applyQuaternion(quaternionHelper);
    const offsetRay = new XRRay(point, toDOMPointInit(vectorHelper, 0));
    object = relativeTo;
    options = { space, offsetRay, entityTypes };
    baseSpace = space;
  }
  const source = await session?.requestHitTestSource?.(options);
  if (source == null) {
    return void 0;
  }
  return {
    source,
    getWorldMatrix: computeWorldMatrixFromXRHitTestResult.bind(null, store, baseSpace, object)
  };
}
function computeWorldMatrixFromXRHitTestResult(store, baseSpace, object, target, result) {
  baseSpace ?? (baseSpace = store.getState().originReferenceSpace);
  if (baseSpace == null) {
    return false;
  }
  const pose = result.getPose(baseSpace);
  if (pose == null) {
    return false;
  }
  target.fromArray(pose.transform.matrix);
  if (object != null) {
    object.updateWorldMatrix(true, false);
    target.premultiply(object.matrixWorld);
  }
  return true;
}
new Vector3(1, 1, 1);
new Vector3(0, 0, 0);
new Matrix4();
new Matrix4();
new Vector3();
new Vector3();
new Vector3();
new Euler();
new Vector3();
new Vector3();
const DefaultGltfLoader = new GLTFLoader();
const DefaultAssetBasePath = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/";
function syncAsync(fn, ...fns) {
  let value = fn();
  for (const fnEntry of fns) {
    if (value instanceof Promise) {
      value = value.then(fnEntry);
    } else {
      value = fnEntry(value);
    }
  }
  return value;
}
const DefaultDefaultControllerProfileId = "generic-trigger";
class XRControllerLayoutLoader {
  constructor(options) {
    __publicField(this, "baseAssetPath");
    __publicField(this, "defaultProfileId");
    //cache
    __publicField(this, "profilesListCache");
    __publicField(this, "profileCacheMap", /* @__PURE__ */ new Map());
    //alias for Loader compatibility
    __publicField(this, "loadAsync", this.load);
    this.baseAssetPath = options?.baseAssetPath ?? DefaultAssetBasePath;
    this.defaultProfileId = options?.defaultControllerProfileId ?? DefaultDefaultControllerProfileId;
  }
  load(inputSourceProfileIds, handedness) {
    return syncAsync(
      //load profile
      () => this.loadProfile(inputSourceProfileIds),
      //get controller layout from profile
      (profile) => {
        for (const key in profile.layouts) {
          if (!key.includes(handedness)) {
            continue;
          }
          return profile.layouts[key];
        }
        throw new Error(`No matching layout for "${handedness}", in profile ${profile.profileId} with layouts ${Object.keys(profile.layouts).join(", ")}.`);
      }
    );
  }
  loadProfile(inputSourceProfileIds) {
    return syncAsync(
      //load profiles list
      () => this.profilesListCache ?? fetchJson(new URL("profilesList.json", this.baseAssetPath).href).then((profilesList) => this.profilesListCache = profilesList),
      //load profile
      (profilesList) => {
        const length = inputSourceProfileIds.length;
        let profileInfo;
        for (let i2 = 0; i2 < length; i2++) {
          profileInfo = profilesList[inputSourceProfileIds[i2]];
          if (profileInfo != null) {
            break;
          }
        }
        profileInfo ?? (profileInfo = profilesList[this.defaultProfileId]);
        if (profileInfo == null) {
          throw new Error(`no matching profile found for profiles "${inputSourceProfileIds.join(", ")}" in profile list ${JSON.stringify(profilesList)}`);
        }
        return this.loadProfileFromPath(profileInfo.path);
      }
    );
  }
  loadProfileFromPath(relativeProfilePath) {
    const result = this.profileCacheMap.get(relativeProfilePath);
    if (result != null) {
      return result;
    }
    const absoluteProfilePath = new URL(relativeProfilePath, this.baseAssetPath).href;
    return fetchJson(absoluteProfilePath).then((profile) => {
      for (const key in profile.layouts) {
        const layout = profile.layouts[key];
        if (layout == null) {
          continue;
        }
        layout.assetPath = new URL(layout.assetPath, absoluteProfilePath).href;
      }
      this.profileCacheMap.set(relativeProfilePath, profile);
      return profile;
    });
  }
}
async function fetchJson(url) {
  let response = await fetch(url);
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  return response.json();
}
function createXRControllerState(id, inputSource, layoutLoader, events, isPrimary) {
  return syncAsync(() => layoutLoader.load(inputSource.profiles, inputSource.handedness), (layout) => {
    const gamepad = {};
    updateXRControllerGamepadState(gamepad, inputSource, layout);
    return {
      id,
      isPrimary,
      events,
      type: "controller",
      inputSource,
      gamepad,
      layout
    };
  });
}
function updateXRControllerState({ gamepad, inputSource, layout }) {
  updateXRControllerGamepadState(gamepad, inputSource, layout);
}
const xrContext = reactExports.createContext(void 0);
const xrInputSourceStateContext = reactExports.createContext(void 0);
const xrSpaceContext = reactExports.createContext(void 0);
const combinedPointerContext = reactExports.createContext(void 0);
const __vite_import_meta_env__$1 = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const __vite_import_meta_env__ = {};
const { useDebugValue } = React;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function shallow$1(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const keyA of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}
reactExports.forwardRef(({ id, children, onPress, onRelease }, ref) => {
  const state = useXRInputSourceStateContext("controller");
  const [object, setObject] = reactExports.useState(void 0);
  reactExports.useImperativeHandle(ref, () => object, [object]);
  useXRControllerButtonEvent(state, id, (state2) => state2 === "pressed" ? onPress?.() : onRelease?.());
  useFrame(() => setObject(state.gamepad[id]?.object));
  if (object == null) {
    return;
  }
  return createPortal(children, object);
});
function useXRControllerButtonEvent(controller, id, onChange) {
  const state = reactExports.useRef(void 0);
  useFrame(() => {
    const currentState = controller?.gamepad[id]?.state;
    if (currentState != null && currentState != state.current) {
      onChange(currentState);
    }
    state.current = currentState;
  });
}
const LoadXRControllerModelSymbol = Symbol("loadXRControllerModel");
const XRControllerModel = reactExports.forwardRef((options, ref) => {
  const state = useXRInputSourceStateContext("controller");
  const model = suspend(loadXRControllerModel, [state.layout, void 0, LoadXRControllerModelSymbol]);
  configureXRControllerModel(model, options);
  state.object = model;
  reactExports.useImperativeHandle(ref, () => model, [model]);
  const update = reactExports.useMemo(() => createUpdateXRControllerVisuals(model, state.layout, state.gamepad), [model, state.layout, state.gamepad]);
  useFrame(update);
  return jsxRuntimeExports.jsx(XRSpace$1, { space: "grip-space", children: jsxRuntimeExports.jsx("primitive", { object: model }) });
});
const XRHandModel = reactExports.forwardRef((options, ref) => {
  const state = useXRInputSourceStateContext("hand");
  const gltf = useLoader(GLTFLoader, state.assetPath);
  const model = reactExports.useMemo(() => cloneXRHandGltf(gltf), [gltf]);
  configureXRHandModel(model, options);
  state.object = model;
  reactExports.useImperativeHandle(ref, () => model, [model]);
  const referenceSpace = useXRSpace();
  const update = reactExports.useMemo(() => createUpdateXRHandVisuals(state.inputSource.hand, model, referenceSpace), [state.inputSource, model, referenceSpace]);
  useFrame((_state, _delta, frame) => update(frame));
  return jsxRuntimeExports.jsx("primitive", { object: model });
});
reactExports.forwardRef(({ joint, children }, ref) => {
  return jsxRuntimeExports.jsx(XRSpace$1, { ref, space: joint, children });
});
function CombinedPointer2({ children }) {
  const pointer = reactExports.useMemo(() => new CombinedPointer$1(false), []);
  useSetupPointer(pointer);
  return jsxRuntimeExports.jsx(combinedPointerContext.Provider, { value: pointer, children });
}
function clearObject(object) {
  for (const key of Object.keys(object)) {
    delete object[key];
  }
}
function useGrabPointer(spaceRef, pointerState, currentOptions, pointerType) {
  const options = reactExports.useMemo(() => ({}), []);
  clearObject(options);
  Object.assign(options, currentOptions);
  const store = useStore$1();
  const pointer = reactExports.useMemo(() => createGrabPointer(() => store.getState().camera, spaceRef, pointerState, options, pointerType), [store, spaceRef, pointerState, options, pointerType]);
  useSetupPointer(pointer, currentOptions?.makeDefault);
  return pointer;
}
function useRayPointer(spaceRef, pointerState, currentOptions, pointerType) {
  const options = reactExports.useMemo(() => ({}), []);
  clearObject(options);
  Object.assign(options, currentOptions);
  const store = useStore$1();
  const pointer = reactExports.useMemo(() => createRayPointer(() => store.getState().camera, spaceRef, pointerState, options, pointerType), [store, spaceRef, pointerState, options, pointerType]);
  useSetupPointer(pointer, currentOptions?.makeDefault);
  return pointer;
}
function useLinesPointer(spaceRef, pointerState, currentOptions, pointerType) {
  const options = reactExports.useMemo(() => ({}), []);
  clearObject(options);
  Object.assign(options, currentOptions);
  const store = useStore$1();
  const pointer = reactExports.useMemo(() => createLinesPointer(() => store.getState().camera, spaceRef, pointerState, options, pointerType), [store, spaceRef, pointerState, options, pointerType]);
  useSetupPointer(pointer, currentOptions?.makeDefault);
  return pointer;
}
function useTouchPointer(spaceRef, pointerState, currentOptions, pointerType) {
  const options = reactExports.useMemo(() => ({}), []);
  clearObject(options);
  Object.assign(options, currentOptions);
  const store = useStore$1();
  const pointer = reactExports.useMemo(() => createTouchPointer(() => store.getState().camera, spaceRef, pointerState, options, pointerType), [store, spaceRef, pointerState, options, pointerType]);
  useSetupPointer(pointer, currentOptions?.makeDefault);
  return pointer;
}
const PointerRayModel = reactExports.forwardRef((props, ref) => {
  const material = reactExports.useMemo(() => {
    const MaterialClass = props.materialClass ?? PointerRayMaterial;
    return new MaterialClass();
  }, [props.materialClass]);
  const internalRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => internalRef.current, []);
  useFrame(() => internalRef.current != null && updatePointerRayModel(internalRef.current, material, props.pointer, props));
  return jsxRuntimeExports.jsx("mesh", { matrixAutoUpdate: false, renderOrder: props.renderOrder ?? 2, ref: internalRef, material, children: jsxRuntimeExports.jsx("boxGeometry", {}) });
});
const PointerCursorModel = reactExports.forwardRef((props, ref) => {
  const material = reactExports.useMemo(() => {
    const MaterialClass = props.materialClass ?? PointerCursorMaterial;
    return new MaterialClass();
  }, [props.materialClass]);
  const internalRef = reactExports.useRef(null);
  const groupRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => internalRef.current, []);
  useFrame(() => internalRef.current != null && groupRef.current != null && updatePointerCursorModel(groupRef.current, internalRef.current, material, props.pointer, props));
  const scene = useThree((s) => s.scene);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("group", { ref: groupRef }), createPortal(jsxRuntimeExports.jsx("mesh", { renderOrder: props.renderOrder ?? 1, ref: internalRef, matrixAutoUpdate: false, material, children: jsxRuntimeExports.jsx("planeGeometry", {}) }), scene)] });
});
function usePointerXRInputSourceEvents(pointer, inputSource, event, missingEvents) {
  const session = useXR((xr) => xr.session);
  reactExports.useEffect(() => {
    if (session == null) {
      return;
    }
    return bindPointerXRInputSourceEvent(pointer, session, inputSource, event, missingEvents);
  }, [event, inputSource, pointer, session, missingEvents]);
}
function useSetupPointer(pointer, makeDefault = false) {
  const combinedPointer = reactExports.useContext(combinedPointerContext);
  if (combinedPointer == null) {
    throw new Error(`xr pointers can only be used inside the XR component`);
  }
  reactExports.useEffect(() => {
    const unregister = combinedPointer.register(pointer, makeDefault);
    return () => {
      unregister();
    };
  }, [combinedPointer, pointer, makeDefault]);
  reactExports.useEffect(() => {
    if (!(pointer instanceof Pointer)) {
      return;
    }
    return () => pointer.exit({ timeStamp: performance.now() });
  }, [pointer]);
}
const TeleportPointerRayModel2 = reactExports.forwardRef(({ pointer, linePoints, ...options }, ref) => {
  const mesh = reactExports.useMemo(() => new TeleportPointerRayModel$1(linePoints), [linePoints]);
  reactExports.useImperativeHandle(ref, () => mesh, [mesh]);
  mesh.options = options;
  useFrame(() => mesh.update(pointer));
  return jsxRuntimeExports.jsx("primitive", { object: mesh });
});
function DefaultXRInputSourceGrabPointer(event, spaceType, options) {
  const state = reactExports.useContext(xrInputSourceStateContext);
  if (state == null) {
    throw new Error(`DefaultXRInputSourceGrabPointer can only be used inside a XRInputSource`);
  }
  const ref = reactExports.useRef(null);
  const pointer = useGrabPointer(ref, state, options);
  usePointerXRInputSourceEvents(pointer, state.inputSource, event, state.events);
  const cursorModelOptions = options.cursorModel;
  return jsxRuntimeExports.jsx(XRSpace$1, { ref, space: spaceType, children: cursorModelOptions !== false && jsxRuntimeExports.jsx(PointerCursorModel, { pointer, opacity: defaultGrabPointerOpacity, ...spreadable$1(cursorModelOptions) }) });
}
const DefaultXRHandGrabPointer = DefaultXRInputSourceGrabPointer.bind(null, "select", "index-finger-tip");
const DefaultXRControllerGrabPointer = DefaultXRInputSourceGrabPointer.bind(null, "squeeze", "grip-space");
function DefaultXRInputSourceRayPointer(props) {
  const state = useXRInputSourceStateContext();
  const ref = reactExports.useRef(null);
  const pointer = useRayPointer(ref, state, props);
  usePointerXRInputSourceEvents(pointer, state.inputSource, "select", state.events);
  const rayModelOptions = props.rayModel;
  const cursorModelOptions = props.cursorModel;
  return jsxRuntimeExports.jsxs(XRSpace$1, { ref, space: "target-ray-space", children: [rayModelOptions !== false && jsxRuntimeExports.jsx(PointerRayModel, { pointer, opacity: defaultRayPointerOpacity, ...spreadable$1(rayModelOptions) }), cursorModelOptions !== false && jsxRuntimeExports.jsx(PointerCursorModel, { pointer, opacity: defaultRayPointerOpacity, ...spreadable$1(cursorModelOptions) })] });
}
function DefaultXRHandTouchPointer(props) {
  const state = useXRInputSourceStateContext("hand");
  const ref = reactExports.useRef(null);
  const pointer = useTouchPointer(ref, state, props);
  const cursorModelOptions = props.cursorModel;
  return jsxRuntimeExports.jsx(XRSpace$1, { ref, space: state.inputSource.hand.get("index-finger-tip"), children: cursorModelOptions !== false && jsxRuntimeExports.jsx(PointerCursorModel, { pointer, opacity: defaultTouchPointerOpacity, ...spreadable$1(cursorModelOptions) }) });
}
function DefaultXRController(props) {
  const modelOptions = props.model;
  const grabPointerOptions = props.grabPointer;
  const rayPointerOptions = props.rayPointer;
  const teleportPointerOptions = props.teleportPointer ?? false;
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [modelOptions !== false && jsxRuntimeExports.jsx(reactExports.Suspense, { children: jsxRuntimeExports.jsx(XRControllerModel, { ...spreadable$1(modelOptions) }) }), jsxRuntimeExports.jsxs(CombinedPointer2, { children: [grabPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRControllerGrabPointer, { ...spreadable$1(grabPointerOptions) }), rayPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRInputSourceRayPointer, { makeDefault: true, minDistance: 0.2, ...spreadable$1(rayPointerOptions) }), teleportPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRInputSourceTeleportPointer, { ...spreadable$1(teleportPointerOptions) })] })] });
}
function DefaultXRHand(props) {
  const modelOptions = props.model;
  const grabPointerOptions = props.grabPointer;
  const rayPointerOptions = props.rayPointer;
  const touchPointerOptions = props.touchPointer;
  const teleportPointerOptions = props.teleportPointer ?? false;
  const rayPointerRayModelOptions = rayPointerOptions === false ? false : spreadable$1(rayPointerOptions)?.rayModel;
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [modelOptions !== false && jsxRuntimeExports.jsx(reactExports.Suspense, { children: jsxRuntimeExports.jsx(XRHandModel, { ...spreadable$1(modelOptions) }) }), jsxRuntimeExports.jsxs(CombinedPointer2, { children: [grabPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRHandGrabPointer, { ...spreadable$1(grabPointerOptions) }), touchPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRHandTouchPointer, { ...spreadable$1(touchPointerOptions) }), rayPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRInputSourceRayPointer, { makeDefault: true, minDistance: 0.2, ...spreadable$1(rayPointerOptions), rayModel: rayPointerRayModelOptions === false ? false : { maxLength: 0.2, ...spreadable$1(rayPointerRayModelOptions) } }), teleportPointerOptions !== false && jsxRuntimeExports.jsx(DefaultXRInputSourceTeleportPointer, { ...spreadable$1(teleportPointerOptions) })] })] });
}
function DefaultXRTransientPointer(props) {
  return jsxRuntimeExports.jsx(DefaultXRInputSourceRayPointer, { ...props, rayModel: false });
}
function DefaultXRGaze(props) {
  return jsxRuntimeExports.jsx(DefaultXRInputSourceRayPointer, { ...props, rayModel: false });
}
function DefaultXRScreenInput(props) {
  return jsxRuntimeExports.jsx(DefaultXRInputSourceRayPointer, { ...props, cursorModel: false, rayModel: false });
}
function DefaultXRInputSourceTeleportPointer(props) {
  const state = reactExports.useContext(xrInputSourceStateContext);
  if (state == null) {
    throw new Error(`DefaultXRInputSourceRayPointer can only be used inside a XRInputSource`);
  }
  const ref = reactExports.useRef(null);
  const groupRef = reactExports.useRef(null);
  const linePoints = reactExports.useMemo(() => createTeleportRayLine(), []);
  const pointer = useLinesPointer(groupRef, state, {
    ...props,
    linePoints,
    filter: buildTeleportTargetFilter(props)
  }, "teleport");
  usePointerXRInputSourceEvents(pointer, state.inputSource, "select", state.events);
  const rayModelOptions = props.rayModel;
  const cursorModelOptions = props.cursorModel;
  const scene = useThree((state2) => state2.scene);
  const cursorRef = reactExports.useRef(null);
  useFrame((_, delta) => {
    if (cursorRef.current != null) {
      cursorRef.current.visible = pointer.getEnabled() && pointer.getButtonsDown().size > 0;
    }
    const target = groupRef.current;
    const source = ref.current;
    if (target == null || source == null) {
      return;
    }
    syncTeleportPointerRayGroup(source, target, delta * 1e3);
  });
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(XRSpace$1, { ref, space: "target-ray-space" }), createPortal(jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [rayModelOptions !== false && jsxRuntimeExports.jsx(TeleportPointerRayModel2, { linePoints, pointer, opacity: defaultRayPointerOpacity, ...spreadable$1(rayModelOptions) }), cursorModelOptions !== false && jsxRuntimeExports.jsx(PointerCursorModel, { ref: cursorRef, pointer, opacity: defaultRayPointerOpacity, ...spreadable$1(cursorModelOptions) })] }), scene)] });
}
function spreadable$1(value) {
  if (value === true) {
    return void 0;
  }
  return value;
}
function useXRSessionVisibilityState() {
  return useXR((xr) => xr.visibilityState);
}
function useXRSessionModeSupported(mode, onError) {
  const onErrorRef = reactExports.useRef(onError);
  onErrorRef.current = onError;
  const [subscribe, getSnapshot] = reactExports.useMemo(() => {
    let sessionSupported = void 0;
    return [
      (onChange) => {
        let canceled = false;
        if (typeof navigator === "undefined" || navigator.xr == null) {
          sessionSupported = false;
          return () => {
          };
        }
        navigator.xr.isSessionSupported(mode).then((isSupported) => {
          sessionSupported = isSupported;
          if (canceled) {
            return;
          }
          onChange();
        }).catch((e) => {
          if (canceled) {
            return;
          }
          onErrorRef.current?.(e);
        });
        return () => canceled = true;
      },
      () => sessionSupported
    ];
  }, [mode]);
  return reactExports.useSyncExternalStore(subscribe, getSnapshot);
}
function useXRSessionFeatureEnabled(feature) {
  return useXR(({ session }) => session?.enabledFeatures?.includes(feature) ?? false);
}
let i = 0;
const map = /* @__PURE__ */ new Map();
function objectToKey(object) {
  let key = map.get(object);
  if (key == null) {
    map.set(object, key = i++);
  }
  return key;
}
function XRElements({ children }) {
  const referenceSpace = useXR((xr) => xr.originReferenceSpace);
  const origin = useXR((xr) => xr.origin);
  const visible = useXRSessionVisibilityState() === "visible";
  const store = useStore$1();
  const storeWithOriginAsScene = reactExports.useMemo(() => Object.assign({}, store, {
    getState() {
      return { ...store.getState(), scene: origin };
    }
  }), [origin, store]);
  if (origin == null || referenceSpace == null) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: reconciler.createPortal(jsxRuntimeExports.jsx(context.Provider, { value: store, children: jsxRuntimeExports.jsxs(xrSpaceContext.Provider, { value: referenceSpace, children: [jsxRuntimeExports.jsxs("group", { matrixAutoUpdate: false, visible, children: [jsxRuntimeExports.jsx(XRControllers, {}), jsxRuntimeExports.jsx(XRHands, {}), jsxRuntimeExports.jsx(XRTransientPointers, {}), jsxRuntimeExports.jsx(XRGazes, {}), jsxRuntimeExports.jsx(XRScreenInputs, {})] }), children] }) }), storeWithOriginAsScene, null) });
}
function XRControllers() {
  const controllerStates = useXR((xr) => xr.inputSourceStates.filter((state) => state.type === "controller"), shallow$1);
  let Implementation = useXR((xr) => xr.controller);
  if (Implementation === false) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: controllerStates.map((state) => {
    const ResolvedImpl = resolveInputSourceImplementation(Implementation, state.inputSource.handedness, {});
    if (ResolvedImpl === false) {
      return null;
    }
    return jsxRuntimeExports.jsx(xrInputSourceStateContext.Provider, { value: state, children: jsxRuntimeExports.jsx(XRSpace$1, { space: "target-ray-space", children: jsxRuntimeExports.jsx(reactExports.Suspense, { children: typeof ResolvedImpl === "function" ? jsxRuntimeExports.jsx(ResolvedImpl, {}) : jsxRuntimeExports.jsx(DefaultXRController, { ...ResolvedImpl }) }) }) }, state.id);
  }) });
}
function XRHands() {
  const handStates = useXR((xr) => xr.inputSourceStates.filter((state) => state.type === "hand"), shallow$1);
  const Implementation = useXR((xr) => xr.hand);
  if (Implementation === false) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: handStates.map((state) => {
    const ResolvedImpl = resolveInputSourceImplementation(Implementation, state.inputSource.handedness, {});
    if (ResolvedImpl === false) {
      return null;
    }
    return jsxRuntimeExports.jsx(xrInputSourceStateContext.Provider, { value: state, children: jsxRuntimeExports.jsx(XRSpace$1, { space: "target-ray-space", children: jsxRuntimeExports.jsx(reactExports.Suspense, { children: typeof ResolvedImpl === "function" ? jsxRuntimeExports.jsx(ResolvedImpl, {}) : jsxRuntimeExports.jsx(DefaultXRHand, { ...ResolvedImpl }) }) }) }, objectToKey(state));
  }) });
}
function XRTransientPointers() {
  const transientPointerStates = useXR((xr) => xr.inputSourceStates.filter((state) => state.type === "transientPointer"), shallow$1);
  const Implementation = useXR((xr) => xr.transientPointer);
  if (Implementation === false) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: transientPointerStates.map((state) => {
    const ResolvedImpl = resolveInputSourceImplementation(Implementation, state.inputSource.handedness, {});
    if (ResolvedImpl === false) {
      return null;
    }
    return jsxRuntimeExports.jsx(xrInputSourceStateContext.Provider, { value: state, children: jsxRuntimeExports.jsx(XRSpace$1, { space: "target-ray-space", children: jsxRuntimeExports.jsx(reactExports.Suspense, { children: typeof ResolvedImpl === "function" ? jsxRuntimeExports.jsx(ResolvedImpl, {}) : jsxRuntimeExports.jsx(DefaultXRTransientPointer, { ...ResolvedImpl }) }) }) }, objectToKey(state));
  }) });
}
function XRGazes() {
  const gazeStates = useXR((xr) => xr.inputSourceStates.filter((state) => state.type === "gaze"), shallow$1);
  const Implementation = useXR((xr) => xr.gaze);
  if (Implementation === false) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: gazeStates.map((state) => {
    return jsxRuntimeExports.jsx(xrInputSourceStateContext.Provider, { value: state, children: jsxRuntimeExports.jsx(XRSpace$1, { space: "target-ray-space", children: jsxRuntimeExports.jsx(reactExports.Suspense, { children: typeof Implementation === "function" ? jsxRuntimeExports.jsx(Implementation, {}) : jsxRuntimeExports.jsx(DefaultXRGaze, { ...spreadable(Implementation) }) }) }) }, objectToKey(state));
  }) });
}
function XRScreenInputs() {
  const screenInputStates = useXR((xr) => xr.inputSourceStates.filter((state) => state.type === "screenInput"), shallow$1);
  const Implementation = useXR((xr) => xr.screenInput);
  if (Implementation === false) {
    return null;
  }
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: screenInputStates.map((state) => {
    return jsxRuntimeExports.jsx(xrInputSourceStateContext.Provider, { value: state, children: jsxRuntimeExports.jsx(XRSpace$1, { space: "target-ray-space", children: jsxRuntimeExports.jsx(reactExports.Suspense, { children: typeof Implementation === "function" ? jsxRuntimeExports.jsx(Implementation, {}) : jsxRuntimeExports.jsx(DefaultXRScreenInput, { ...spreadable(Implementation) }) }) }) }, objectToKey(state));
  }) });
}
function spreadable(value) {
  if (value === true) {
    return void 0;
  }
  return value;
}
function createXRStore(options) {
  return createXRStore$1(options);
}
function XR({ children, store }) {
  store.setWebXRManager(useThree((s) => s.gl.xr));
  const rootStore = useStore$1();
  reactExports.useEffect(() => {
    let initialCamera;
    return store.subscribe((state, prevState) => {
      if (state.session === prevState.session) {
        return;
      }
      if (state.session != null) {
        const { camera, gl } = rootStore.getState();
        initialCamera = camera;
        rootStore.setState({ camera: gl.xr.getCamera() });
        return;
      }
      if (initialCamera == null) {
        return;
      }
      rootStore.setState({ camera: initialCamera });
    });
  }, [rootStore, store]);
  useFrame((state, _delta, frame) => store.onBeforeFrame(state.scene, state.camera, frame), -1e3);
  useFrame(() => store.onBeforeRender());
  return jsxRuntimeExports.jsx(xrContext.Provider, { value: store, children: jsxRuntimeExports.jsxs(RootCombinedPointer, { children: [jsxRuntimeExports.jsx(XRElements, {}), children] }) });
}
function RootCombinedPointer({ children }) {
  const store = useXRStore();
  const pointer = reactExports.useMemo(() => new CombinedPointer$1(true), []);
  reactExports.useEffect(() => setupSyncIsVisible(store, (visible) => pointer.setEnabled(visible, { timeStamp: performance.now() })), [store, pointer]);
  useFrame((state) => pointer.move(state.scene, { timeStamp: performance.now() }), -50);
  return jsxRuntimeExports.jsx(combinedPointerContext.Provider, { value: pointer, children });
}
function useXRStore() {
  const store = reactExports.useContext(xrContext);
  if (store == null) {
    throw new Error(`XR features can only be used inside the <XR> component`);
  }
  return store;
}
function useXR(selector = (state) => state, equalityFn) {
  return useStore(useXRStore(), selector, equalityFn);
}
function useXRInputSourceStateContext(type) {
  const state = reactExports.useContext(xrInputSourceStateContext);
  if (state == null) {
    throw new Error(`useXRInputSourceStateContext() can only be used inside the xr store config`);
  }
  if (type != null && state.type != type) {
    throw new Error(`useXRInputSourceStateContext(${type}) can not be used inside a component for input type "${state.type}"`);
  }
  return state;
}
const XRSpace$1 = reactExports.forwardRef(({ space, children }, ref) => {
  const internalRef = reactExports.useRef(null);
  const resolvedSpace = typeof space === "string" ? useXRSpace(space) : space;
  reactExports.useImperativeHandle(ref, () => internalRef.current, []);
  useApplyXRSpaceMatrix(internalRef, resolvedSpace);
  const setRef = reactExports.useCallback((group) => {
    if (group != null) {
      group.transformReady = false;
      group.visible = false;
    }
    internalRef.current = group;
  }, []);
  return jsxRuntimeExports.jsx("group", { xrSpace: resolvedSpace, matrixAutoUpdate: false, ref: setRef, children: resolvedSpace && jsxRuntimeExports.jsx(xrSpaceContext.Provider, { value: resolvedSpace, children }) });
});
function useXRSpace(type) {
  switch (type) {
    case "grip-space":
      return useXRInputSourceStateContext().inputSource.gripSpace;
    case "target-ray-space":
      return useXRInputSourceStateContext().inputSource.targetRaySpace;
    case "wrist":
    case "thumb-metacarpal":
    case "thumb-phalanx-proximal":
    case "thumb-phalanx-distal":
    case "thumb-tip":
    case "index-finger-metacarpal":
    case "index-finger-phalanx-proximal":
    case "index-finger-phalanx-intermediate":
    case "index-finger-phalanx-distal":
    case "index-finger-tip":
    case "middle-finger-metacarpal":
    case "middle-finger-phalanx-proximal":
    case "middle-finger-phalanx-intermediate":
    case "middle-finger-phalanx-distal":
    case "middle-finger-tip":
    case "ring-finger-metacarpal":
    case "ring-finger-phalanx-proximal":
    case "ring-finger-phalanx-intermediate":
    case "ring-finger-phalanx-distal":
    case "ring-finger-tip":
    case "pinky-finger-metacarpal":
    case "pinky-finger-phalanx-proximal":
    case "pinky-finger-phalanx-intermediate":
    case "pinky-finger-phalanx-distal":
    case "pinky-finger-tip":
      return useXRInputSourceStateContext("hand").inputSource.hand.get(type);
    case "root":
    case "hips":
    case "spine-lower":
    case "spine-middle":
    case "spine-upper":
    case "chest":
    case "neck":
    case "head":
    case "left-shoulder":
    case "left-scapula":
    case "left-arm-upper":
    case "left-arm-lower":
    case "left-hand-wrist-twist":
    case "right-shoulder":
    case "right-scapula":
    case "right-arm-upper":
    case "right-arm-lower":
    case "right-hand-wrist-twist":
    case "left-hand-palm":
    case "left-hand-wrist":
    case "left-hand-thumb-metacarpal":
    case "left-hand-thumb-phalanx-proximal":
    case "left-hand-thumb-phalanx-distal":
    case "left-hand-thumb-tip":
    case "left-hand-index-metacarpal":
    case "left-hand-index-phalanx-proximal":
    case "left-hand-index-phalanx-intermediate":
    case "left-hand-index-phalanx-distal":
    case "left-hand-index-tip":
    case "left-hand-middle-metacarpal":
    case "left-hand-middle-phalanx-proximal":
    case "left-hand-middle-phalanx-intermediate":
    case "left-hand-middle-phalanx-distal":
    case "left-hand-middle-tip":
    case "left-hand-ring-metacarpal":
    case "left-hand-ring-phalanx-proximal":
    case "left-hand-ring-phalanx-intermediate":
    case "left-hand-ring-phalanx-distal":
    case "left-hand-ring-tip":
    case "left-hand-little-metacarpal":
    case "left-hand-little-phalanx-proximal":
    case "left-hand-little-phalanx-intermediate":
    case "left-hand-little-phalanx-distal":
    case "left-hand-little-tip":
    case "right-hand-palm":
    case "right-hand-wrist":
    case "right-hand-thumb-metacarpal":
    case "right-hand-thumb-phalanx-proximal":
    case "right-hand-thumb-phalanx-distal":
    case "right-hand-thumb-tip":
    case "right-hand-index-metacarpal":
    case "right-hand-index-phalanx-proximal":
    case "right-hand-index-phalanx-intermediate":
    case "right-hand-index-phalanx-distal":
    case "right-hand-index-tip":
    case "right-hand-middle-metacarpal":
    case "right-hand-middle-phalanx-proximal":
    case "right-hand-middle-phalanx-intermediate":
    case "right-hand-middle-phalanx-distal":
    case "right-hand-middle-tip":
    case "right-hand-ring-metacarpal":
    case "right-hand-ring-phalanx-proximal":
    case "right-hand-ring-phalanx-intermediate":
    case "right-hand-ring-phalanx-distal":
    case "right-hand-ring-tip":
    case "right-hand-little-metacarpal":
    case "right-hand-little-phalanx-proximal":
    case "right-hand-little-phalanx-intermediate":
    case "right-hand-little-phalanx-distal":
    case "right-hand-little-tip":
    case "left-upper-leg":
    case "left-lower-leg":
    case "left-foot-ankle-twist":
    case "left-foot-ankle":
    case "left-foot-subtalar":
    case "left-foot-transverse":
    case "left-foot-ball":
    case "right-upper-leg":
    case "right-lower-leg":
    case "right-foot-ankle-twist":
    case "right-foot-ankle":
    case "right-foot-subtalar":
    case "right-foot-transverse":
    case "right-foot-ball":
      return useXR((state) => state.body)?.get(type);
  }
  if (type == null) {
    const context2 = reactExports.useContext(xrSpaceContext);
    if (context2 == null) {
      throw new Error(`XR objects must be placed inside the XROrigin`);
    }
    return context2;
  }
  const [referenceSpace, setReferenceSpace] = reactExports.useState(void 0);
  const session = useXR((xr) => xr.session);
  reactExports.useEffect(() => {
    if (session == null) {
      return;
    }
    let aborted = false;
    session.requestReferenceSpace(type).then((space) => {
      if (aborted) {
        return;
      }
      setReferenceSpace(space);
    });
    return () => void (aborted = true);
  }, [session, type]);
  return referenceSpace;
}
function useGetXRSpaceMatrix(space) {
  const localReferenceSpace = reactExports.useContext(xrSpaceContext);
  const referenceSpace = useXR((xr) => localReferenceSpace ?? xr.originReferenceSpace);
  return reactExports.useMemo(() => space == null || referenceSpace == null ? void 0 : createGetXRSpaceMatrix(space, referenceSpace), [space, referenceSpace]);
}
function useApplyXRSpaceMatrix(ref, space, onFrame) {
  const getXRSpaceMatrix = useGetXRSpaceMatrix(space);
  useFrame((state, delta, frame) => {
    if (ref.current != null) {
      ref.current.visible = ref.current.transformReady = getXRSpaceMatrix?.(ref.current.matrix, frame) ?? false;
    }
  }, -100);
}
reactExports.forwardRef(({ mesh, ...rest }, ref) => {
  const geometry = useXRMeshGeometry(mesh);
  return jsxRuntimeExports.jsx("mesh", { ref, geometry, ...rest });
});
function useXRMeshGeometry(mesh, disposeBuffer = true) {
  const [geometry, setGeometry] = reactExports.useState(updateXRMeshGeometry(mesh, void 0));
  useFrame(() => setGeometry((geometry2) => updateXRMeshGeometry(mesh, geometry2)));
  reactExports.useEffect(() => {
    if (!disposeBuffer) {
      return;
    }
    return () => geometry.dispose();
  }, [geometry]);
  return geometry;
}
reactExports.forwardRef(({ plane, ...rest }, ref) => {
  const geometry = useXRPlaneGeometry(plane);
  return jsxRuntimeExports.jsx("mesh", { ref, geometry, ...rest });
});
function useXRPlaneGeometry(plane, disposeBuffer = true) {
  const [geometry, setGeometry] = reactExports.useState(updateXRPlaneGeometry(plane, void 0));
  useFrame(() => setGeometry((geometry2) => updateXRPlaneGeometry(plane, geometry2)));
  reactExports.useEffect(() => {
    if (!disposeBuffer) {
      return;
    }
    return () => geometry.dispose();
  }, [geometry]);
  return geometry;
}
reactExports.forwardRef(({ children, disabled, ...props }, ref) => {
  const xrCamera = useThree((s) => s.gl.xr.getCamera());
  const internalRef = reactExports.useRef(null);
  const referenceSpace = useXR((xr) => xr.originReferenceSpace);
  reactExports.useImperativeHandle(ref, () => internalRef.current, []);
  reactExports.useEffect(() => {
    const group = internalRef.current;
    if (group == null || disabled) {
      return;
    }
    group.add(xrCamera);
    return () => void group.remove(xrCamera);
  }, [disabled, xrCamera]);
  return jsxRuntimeExports.jsx("group", { ref: internalRef, ...props, children: jsxRuntimeExports.jsx(xrSpaceContext.Provider, { value: referenceSpace, children }) });
});
function useXRHitTest(fn, relativeTo, trackableType) {
  const sourceRef = reactExports.useRef(void 0);
  useCreateXRHitTestSource(relativeTo, trackableType, reactExports.useCallback((source) => sourceRef.current = source, []));
  useFrame((_s, _d, frame) => {
    if (fn == null || frame == null || sourceRef.current == null) {
      return;
    }
    fn(frame.getHitTestResults(sourceRef.current.source), sourceRef.current.getWorldMatrix);
  });
}
function useCreateXRHitTestSource(relativeTo, trackableType, onLoad) {
  const store = useXRStore();
  const session = useStore(store, (s) => s.session);
  reactExports.useEffect(() => {
    if (session == null) {
      return;
    }
    let storedResult;
    let cancelled = false;
    const relativeToResolved = relativeTo instanceof XRSpace || typeof relativeTo === "string" ? relativeTo : relativeTo?.current;
    if (relativeToResolved == null) {
      return;
    }
    createXRHitTestSource(store, session, relativeToResolved, trackableType).then((result) => {
      if (cancelled) {
        return;
      }
      storedResult = result;
      onLoad(result);
    });
    return () => {
      onLoad(void 0);
      cancelled = true;
      storedResult?.source.cancel();
    };
  }, [session, store, relativeTo, trackableType, onLoad]);
}
reactExports.forwardRef(({ trackableType, onResults, space, ...rest }, ref) => {
  const internalRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => internalRef.current);
  useXRHitTest(onResults, space ?? internalRef, trackableType);
  return jsxRuntimeExports.jsx("group", { ...rest, ref: internalRef });
});
reactExports.forwardRef((props, ref) => {
  const domOverlayRoot = useXR((xr) => xr.domOverlayRoot);
  const { In, Out } = reactExports.useMemo(tunnel, []);
  reactExports.useEffect(() => {
    if (domOverlayRoot == null) {
      return;
    }
    const root = createRoot(domOverlayRoot);
    root.render(jsxRuntimeExports.jsx(Out, {}));
    return () => root.unmount();
  }, [domOverlayRoot, Out]);
  return jsxRuntimeExports.jsx(In, { children: jsxRuntimeExports.jsx("div", { ...props, ref }) });
});
reactExports.forwardRef(function XRLayer({ src, pixelWidth = 1024, pixelHeight = 1024, dpr = 1, renderPriority = 0, children, customRender, ...props }, forwardedRef) {
  const [hasSize, setHasSize] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const renderTargetRef = reactExports.useRef(void 0);
  const layerEntryRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    setHasSize(false);
    let aborted = false;
    waitForXRLayerSrcSize(src).then(() => !aborted && setHasSize(true));
    return () => void (aborted = true);
  }, [src]);
  const layersEnabled = useXRSessionFeatureEnabled("layers");
  const geometry = reactExports.useMemo(() => createXRLayerGeometry(props.shape ?? "quad", {
    centralAngle: props.centralAngle,
    centralHorizontalAngle: props.centralHorizontalAngle,
    lowerVerticalAngle: props.lowerVerticalAngle,
    upperVerticalAngle: props.upperVerticalAngle
  }), [props.centralAngle, props.centralHorizontalAngle, props.lowerVerticalAngle, props.shape, props.upperVerticalAngle]);
  const store = useLayerStore(pixelWidth, pixelHeight, dpr);
  useForwardEvents(store, ref, [hasSize, layersEnabled]);
  reactExports.useImperativeHandle(forwardedRef, () => ref.current, [hasSize, layersEnabled]);
  if (!hasSize) {
    return null;
  }
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [src == null && jsxRuntimeExports.jsx(ChildrenToRenderTarget, { customRender, store, renderPriority, renderTargetRef, layerEntryRef: layersEnabled ? layerEntryRef : void 0, children }), layersEnabled ? jsxRuntimeExports.jsx(XRLayerImplementation, { renderTargetRef, layerEntryRef, pixelWidth, pixelHeight, dpr, ref, ...props, src, geometry }) : jsxRuntimeExports.jsx(FallbackXRLayerImplementation, { renderTargetRef, ref, ...props, src, pixelWidth, pixelHeight, dpr, geometry })] });
});
const XRLayerImplementation = reactExports.forwardRef(({ src, shape, colorFormat, depthFormat, layout, mipLevels, renderOrder = 0, blendTextureSourceAlpha, centralAngle, centralHorizontalAngle, chromaticAberrationCorrection, lowerVerticalAngle, quality, upperVerticalAngle, invertStereo, pixelWidth, pixelHeight, dpr, renderTargetRef, layerEntryRef, ...props }, ref) => {
  const internalRef = reactExports.useRef(null);
  const renderer = useThree((state) => state.gl);
  const store = useXRStore();
  const layerProperties = {
    blendTextureSourceAlpha,
    centralAngle,
    centralHorizontalAngle,
    chromaticAberrationCorrection,
    lowerVerticalAngle,
    quality,
    upperVerticalAngle
  };
  const layerPropertiesRef = reactExports.useRef(layerProperties);
  layerPropertiesRef.current = layerProperties;
  const renderOrderRef = reactExports.useRef(renderOrder);
  renderOrderRef.current = renderOrder;
  const originReferenceSpace = useXR((s) => s.originReferenceSpace);
  reactExports.useEffect(() => {
    if (internalRef.current == null || originReferenceSpace == null) {
      return;
    }
    const resolvedSrc = src ?? (renderTargetRef.current = createXRLayerRenderTarget(pixelWidth, pixelHeight, dpr));
    const layer = createXRLayer(resolvedSrc, store.getState(), originReferenceSpace, renderer.xr, internalRef.current, {
      colorFormat,
      depthFormat,
      invertStereo,
      layout,
      mipLevels,
      shape
    }, layerPropertiesRef.current);
    if (layer == null) {
      return;
    }
    const layerEntry = layerEntryRef.current = {
      layer,
      renderOrder: renderOrderRef.current,
      object3D: internalRef.current
    };
    store.addLayerEntry(layerEntry);
    if (resolvedSrc instanceof HTMLVideoElement || resolvedSrc instanceof WebGLRenderTarget) {
      return () => {
        store.removeLayerEntry(layerEntry);
        layer.destroy();
      };
    }
    const cleanupXRImageLayer = setupXRImageLayer(renderer, store, layer, resolvedSrc);
    return () => {
      store.removeLayerEntry(layerEntry);
      cleanupXRImageLayer();
      layer.destroy();
    };
  }, [
    originReferenceSpace,
    colorFormat,
    depthFormat,
    invertStereo,
    layerEntryRef,
    layout,
    mipLevels,
    pixelHeight,
    pixelWidth,
    dpr,
    renderTargetRef,
    renderer,
    shape,
    src,
    store
  ]);
  if (layerEntryRef.current != null) {
    layerEntryRef.current.renderOrder = renderOrder;
  }
  if (layerEntryRef.current != null) {
    updateXRLayerProperties(layerEntryRef.current.layer, layerPropertiesRef.current);
  }
  useFrame(() => {
    if (layerEntryRef.current == null || internalRef.current == null) {
      return;
    }
    updateXRLayerTransform(store.getState(), layerEntryRef.current.layer, layerPropertiesRef.current.centralAngle, internalRef.current);
  });
  reactExports.useImperativeHandle(ref, () => internalRef.current, []);
  return jsxRuntimeExports.jsx("mesh", { ...props, renderOrder: -Infinity, ref: internalRef, children: jsxRuntimeExports.jsx("meshBasicMaterial", { colorWrite: false }) });
});
const FallbackXRLayerImplementation = reactExports.forwardRef(({ src, renderTargetRef, dpr, renderOrder, pixelWidth, pixelHeight, ...props }, ref) => {
  const materialRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (materialRef.current == null) {
      return;
    }
    const resolvedSrc = src ?? (renderTargetRef.current = createXRLayerRenderTarget(pixelWidth, pixelHeight, dpr));
    const texture = getXRLayerSrcTexture(resolvedSrc);
    materialRef.current.map = texture;
    materialRef.current.needsUpdate = true;
    return () => {
      if (resolvedSrc instanceof WebGLRenderTarget) {
        resolvedSrc.dispose();
        return;
      }
      texture.dispose();
    };
  }, [src, pixelWidth, pixelHeight, dpr, renderTargetRef]);
  return jsxRuntimeExports.jsx("mesh", { ref, ...props, children: jsxRuntimeExports.jsx("meshBasicMaterial", { ref: materialRef, toneMapped: false }) });
});
function useForwardEvents(store, ref, deps) {
  reactExports.useEffect(() => {
    const { current } = ref;
    if (current == null) {
      return;
    }
    let cleanup;
    const update = (state, prevState) => {
      if (state.camera === prevState?.camera && state.scene === prevState.scene) {
        return;
      }
      cleanup?.();
      const { destroy, update: update2 } = forwardObjectEvents(current, () => state.camera, state.scene);
      const cleanupUpdate = addEffect(update2);
      cleanup = () => {
        destroy();
        cleanupUpdate();
      };
    };
    update(store.getState());
    const unsubscribe = store.subscribe(update);
    return () => {
      unsubscribe();
      cleanup?.();
    };
  }, [store, ref, ...deps]);
}
const privateKeys = [
  "set",
  "get",
  "setSize",
  "setFrameloop",
  "setDpr",
  "events",
  "invalidate",
  "advance",
  "size",
  "viewport"
];
function useLayerStore(width, height, dpr) {
  const previousRoot = useStore$1();
  const layerStore = reactExports.useMemo(() => {
    let previousState = previousRoot.getState();
    const camera = new PerspectiveCamera(50, 1, 0.1, 1e3);
    camera.position.set(0, 0, 5);
    const pointer = new Vector2();
    let ownState = {
      events: { enabled: false, priority: 0 },
      size: { width: 1, height: 1, left: 0, top: 0 },
      camera,
      scene: new Scene(),
      raycaster: new Raycaster(),
      pointer,
      mouse: pointer,
      previousRoot
    };
    const store = create((innerSet, get) => {
      const merge = () => {
        const result = {};
        for (const key in previousState) {
          if (privateKeys.includes(key)) {
            continue;
          }
          result[key] = previousState[key];
        }
        return Object.assign(result, ownState, {
          events: { ...previousState.events, ...ownState.events },
          viewport: Object.assign({}, previousState.viewport, previousState.viewport.getCurrentViewport(camera, new Vector3(), ownState.size))
        });
      };
      const update = () => innerSet(merge());
      return {
        ...previousState,
        // Set and get refer to this root-state
        set(newOwnState) {
          if (typeof newOwnState === "function") {
            newOwnState = newOwnState(get());
          }
          Object.assign(ownState, newOwnState);
          update();
        },
        setPreviousState(prevState) {
          previousState = prevState;
          update();
        },
        get,
        setEvents() {
        },
        ...merge()
      };
    });
    return Object.assign(store, {
      setState(state) {
        store.getState().set(state);
      }
    });
  }, [previousRoot]);
  reactExports.useEffect(() => previousRoot.subscribe(layerStore.getState().setPreviousState), [previousRoot, layerStore]);
  reactExports.useEffect(() => {
    const viewport = {
      factor: 1,
      distance: 0,
      dpr,
      initialDpr: dpr,
      left: 0,
      top: 0,
      getCurrentViewport: () => viewport,
      width,
      height,
      aspect: width / height
    };
    layerStore.setState({
      size: { width, height, top: 0, left: 0 },
      viewport
    });
  }, [width, height, dpr, layerStore, previousRoot]);
  return layerStore;
}
const v4Helper = new Vector4();
function getSize(target) {
  this.getViewport(v4Helper);
  target.x = v4Helper.z - v4Helper.x;
  target.y = v4Helper.w - v4Helper.y;
  return target;
}
const viewportHelper = new Vector4();
function ChildrenToRenderTarget({ renderPriority, children, layerEntryRef, renderTargetRef, store, customRender }) {
  reactExports.useEffect(() => {
    const update = (state, prevState) => {
      const { size, camera } = state;
      if (camera instanceof OrthographicCamera) {
        camera.left = size.width / -2;
        camera.right = size.width / 2;
        camera.top = size.height / 2;
        camera.bottom = size.height / -2;
      } else {
        camera.aspect = size.width / size.height;
      }
      if (size !== prevState?.size || camera !== prevState.camera) {
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
      }
    };
    update(store.getState());
    return store.subscribe(update);
  }, [store]);
  let oldAutoClear;
  let oldXrEnabled;
  let oldIsPresenting;
  let oldRenderTarget;
  let oldGetDrawingBufferSize;
  let oldGetSize;
  useFrame((_, delta, frame) => {
    if (renderTargetRef.current == null || layerEntryRef != null && (layerEntryRef.current == null || frame == null)) {
      return;
    }
    const state = store.getState();
    const { gl, scene, camera } = state;
    oldAutoClear = gl.autoClear;
    oldXrEnabled = gl.xr.enabled;
    oldIsPresenting = gl.xr.isPresenting;
    oldRenderTarget = gl.getRenderTarget();
    oldGetSize = gl.getSize;
    oldGetDrawingBufferSize = gl.getDrawingBufferSize;
    gl.getViewport(viewportHelper);
    gl.autoClear = true;
    gl.xr.enabled = false;
    gl.xr.isPresenting = false;
    const renderTarget = renderTargetRef.current;
    gl.setViewport(0, 0, renderTarget.width, renderTarget.height);
    gl.getSize = getSize;
    gl.getDrawingBufferSize = getSize;
    setXRLayerRenderTarget(gl, renderTarget, layerEntryRef?.current, frame);
    if (customRender != null) {
      customRender(renderTarget, state, delta, frame);
    } else {
      gl.render(scene, camera);
    }
    gl.setRenderTarget(oldRenderTarget);
    gl.setViewport(viewportHelper);
    gl.autoClear = oldAutoClear;
    gl.xr.enabled = oldXrEnabled;
    gl.xr.isPresenting = oldIsPresenting;
    gl.getSize = oldGetSize;
    gl.getDrawingBufferSize = oldGetDrawingBufferSize;
  }, renderPriority);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: reconciler.createPortal(jsxRuntimeExports.jsx(context.Provider, { value: store, children }), store, null) });
}
const XRButton = reactExports.forwardRef(({ store, mode, onError, children, ...props }, ref) => {
  const session = useStore(store, (xr) => xr.session);
  const supported = useXRSessionModeSupported(mode, onError);
  return jsxRuntimeExports.jsx("button", { ref, ...props, onClick: () => session != null ? session.end() : store.enterXR(mode).catch(onError), children: typeof children === "function" ? children(supported ? session != null ? "entered" : "exited" : "unsupported") : children });
});
reactExports.forwardRef((props, ref) => {
  return jsxRuntimeExports.jsx(XRButton, { ref, mode: "immersive-ar", ...props });
});
reactExports.forwardRef((props, ref) => {
  return jsxRuntimeExports.jsx(XRButton, { ref, mode: "immersive-vr", ...props });
});
const eventTranslations = {
  onBlur: "pointerleave",
  onHover: "pointerenter",
  onMove: "pointermove",
  onSelect: {
    type: "click",
    filter: (e) => e.pointerType === "ray"
  },
  onSelectEnd: {
    type: "pointerup",
    filter: (e) => e.pointerType === "ray"
  },
  onSelectStart: {
    type: "pointerdown",
    filter: (e) => e.pointerType === "ray"
  },
  onSqueeze: {
    type: "click",
    filter: (e) => e.pointerType === "grab"
  },
  onSqueezeEnd: {
    type: "pointerup",
    filter: (e) => e.pointerType === "grab"
  },
  onSqueezeStart: {
    type: "pointerdown",
    filter: (e) => e.pointerType === "grab"
  }
};
function useInteraction(ref, type, handler) {
  const handlerRef = reactExports.useRef(handler);
  handlerRef.current = handler;
  reactExports.useEffect(() => {
    const { current } = ref;
    if (current == null) {
      return;
    }
    const translation = eventTranslations[type];
    const fn = typeof translation === "string" ? (event) => handlerRef.current?.({ intersection: event, intersections: [event], target: event.pointerState }) : (event) => {
      if (event instanceof PointerEvent && !translation.filter(event)) {
        return;
      }
      handlerRef.current?.({ intersection: event, intersections: [event], target: event.pointerState });
    };
    const eventName = typeof translation === "string" ? translation : translation.type;
    current.addEventListener(eventName, fn);
    return () => current.removeEventListener(eventName, fn);
  }, [ref, type]);
}
const Interactive = reactExports.forwardRef(({ onHover, onBlur, onSelectStart, onSelectEnd, onSelect, onSqueezeStart, onSqueezeEnd, onSqueeze, onMove, children }, passedRef) => {
  const ref = reactExports.useRef(null);
  reactExports.useImperativeHandle(passedRef, () => ref.current);
  useInteraction(ref, "onHover", onHover);
  useInteraction(ref, "onBlur", onBlur);
  useInteraction(ref, "onSelectStart", onSelectStart);
  useInteraction(ref, "onSelectEnd", onSelectEnd);
  useInteraction(ref, "onSelect", onSelect);
  useInteraction(ref, "onSqueezeStart", onSqueezeStart);
  useInteraction(ref, "onSqueezeEnd", onSqueezeEnd);
  useInteraction(ref, "onSqueeze", onSqueeze);
  useInteraction(ref, "onMove", onMove);
  return jsxRuntimeExports.jsx("group", { ref, children });
});
reactExports.forwardRef(function RayGrab({ onSelectStart, onSelectEnd, children, ...rest }, forwardedRef) {
  const grabbingController = reactExports.useRef(void 0);
  const groupRef = reactExports.useRef(null);
  const previousTransform = reactExports.useMemo(() => new Matrix4(), []);
  reactExports.useImperativeHandle(forwardedRef, () => groupRef.current);
  useFrame(() => {
    const controller = grabbingController.current;
    const group = groupRef.current;
    if (!group || !controller)
      return;
    group.applyMatrix4(previousTransform);
    controller.updateWorldMatrix(true, false);
    group.applyMatrix4(controller.matrixWorld);
    group.updateMatrixWorld();
    previousTransform.copy(controller.matrixWorld).invert();
  });
  return jsxRuntimeExports.jsx(Interactive, { ref: groupRef, onSelectStart: (e) => {
    if (isXRInputSourceState(e.target) && (e.target.type === "controller" || e.target.type === "hand") && e.target.object != null) {
      grabbingController.current = e.target.object;
      e.target.object.updateWorldMatrix(true, false);
      previousTransform.copy(e.target.object.matrixWorld).invert();
      onSelectStart?.(e);
    }
  }, onSelectEnd: (e) => {
    if (e.target.controller === grabbingController.current) {
      grabbingController.current = void 0;
    }
    onSelectEnd?.(e);
  }, ...rest, children });
});
export {
  XR as X,
  clamp as a,
  createXRStore as c,
  forwardHtmlEvents as f
};
