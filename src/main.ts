import * as THREE from "three";
import { animateMesh, bounceMesh } from "./functions";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { nebula, stars } from "./assets";

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

// Set camera
camera.position.set(-10, 30, 30);
orbit.update();

// Fog
scene.fog = new THREE.Fog(0xffffff, 0, 200);

// Make an happy box
const textureLoader = new THREE.TextureLoader();

const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: textureLoader.load(nebula),
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(5, 5, 0);
box.receiveShadow = true;
box.castShadow = true;

// Make a plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// Make an happy sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-5, 30, 0);
sphere.castShadow = true;

// Add meshes
scene.add(box);
scene.add(plane);
scene.add(sphere);

// Lights
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.scale.set(2, 2, 2);

const spotLight = new THREE.SpotLight(0xffffff, 10000);
spotLight.angle = 0.1;
spotLight.position.set(-30, 50, 0);
scene.add(spotLight);
spotLight.castShadow = true;

// Add helpers

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);

const sLightHelper = new THREE.SpotLightHelper(spotLight, 5);
scene.add(sLightHelper);

const sLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(sLightShadowHelper);

// Texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

// Add GUI
const gui = new dat.GUI();

const options = {
  sphereColor: sphere.material.color.getHex(),
  speed: 0.01,
  offset: 4,
  angle: 0.2,
  penumbra: 0,
  intensity: 3000,
};
gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});
gui.add(sphere.material, "wireframe");
gui.add(options, "speed", 0, 0.2);
gui.add(options, "offset", 0, 10);

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 10000);

// Animations

renderer.setAnimationLoop(() => {
  animateMesh(box, { x: 0.03, y: 0.01 });

  bounceMesh(sphere, options.speed, options.offset);

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;

  renderer.render(scene, camera);
});
