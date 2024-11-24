import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cubeMesh);
const group = new THREE.Group()
group.add(cubeMesh)
group.add(cubeMesh2)
group.add(cubeMesh3)

scene.add(group);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper)
// cubeMesh.position.x = 0.5;
// cubeMesh.position.y = 0.5;
// cubeMesh.position.z = 0.5;

// const tempVector = new THREE.Vector3(1, 1, 1);
// cubeMesh.position.copy(tempVector)

// const origin = new THREE.Vector3(0,0,0)
// console.log(origin.distanceTo(camera.position))

cubeMesh2.position.x = 2;
cubeMesh3.position.x = -2;

// group.scale.y = 2;
group.position.y = 2;
group.scale.setScalar(2);
cubeMesh.position.y = -1;
cubeMesh.scale.setScalar(0.5)

cubeMesh.add(axisHelper)

cubeMesh.rotation.z = Math.PI * 0.5;
cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);

cubeMesh.rotation.reorder('YXZ')

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render the scene
const renderloop = () => {
  controls.update();  
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
