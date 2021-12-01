import "./style.css";

import * as THREE from "three";

// var TDSLoader = require('three-tds-loader')(THREE);
 
// console.log(typeof THREE.TDSLoader);

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Torus

const geometry = new THREE.TorusKnotGeometry(20, 1, 100, 100);
// const geometry = new THREE.TorusGeometry(20, 1, 100, 100);

const material = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
  wireframe: false,
});

const torus = new THREE.Mesh(geometry, material);

// const gx = new THREE.IcosahedronGeometry(3, 2);
// const mx = new THREE.MeshStandardMaterial({ color: 0xdddddd, wireframe: false});
// const moon = new THREE.Mesh(gx, mx);
// scene.add( torus);

const moonTexture = new THREE.TextureLoader().load("norm.jpg");
const moon = new THREE.Mesh(
  new THREE.IcosahedronBufferGeometry(1, 1),
  new THREE.MeshBasicMaterial({ map: moonTexture })
);
moon.position.setX(2);
moon.position.setY(2.5);
moon.position.setZ(10);

scene.add(moon);

const doDecaHedronTexture = new THREE.TextureLoader().load("matrix.jpg");

const doDecaHedron = new THREE.Mesh(
  new THREE.DodecahedronGeometry(7),
  new THREE.MeshBasicMaterial({ map: doDecaHedronTexture, wireframe: false })
);
doDecaHedron.position.setX(-6);
doDecaHedron.position.setY(-2);
doDecaHedron.position.setZ(-10);
// scene.add(doDecaHedron);q

// const geo = new THREE.SphereGeometry( 2, 100, 100 );

// const wii = new THREE.WireframeGeometry( geo );

// const line = new THREE.LineSegments( wii );
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;
// line.position.x=2;
// line.position.z=25;

//scene.add(line);

//lights
// const pointLight = new THREE.PointLight(0x00ff55);
const pointLight = new THREE.PointLight(0xaaaaaa);

const pointLight1 = new THREE.PointLight(0xaa2200);

pointLight.position.set(30, 5, -10);
pointLight1.position.set(-5, 5, 10);

const ambientLight = new THREE.AmbientLight(0x555555);
//const ambientLight = new THREE.DirectionalLight(0xffffff);
// const light = new THREE.HemisphereLight(0x00ffaa, 0xffaa00);

//scene.add(pointLight1);
scene.add(pointLight, ambientLight);

//helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

//stars

function addStar() {
  //const starTexture = new THREE.TextureLoader().load('white.png');
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.png");
scene.background = spaceTexture;

//
const boxTexture = new THREE.TextureLoader().load("crate.gif");

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ map: boxTexture })
);
scene.add(box);
box.position.z = 20;
box.position.x = 1;
box.position.y = -2;

//roop

const roopTexture = new THREE.TextureLoader().load("roop.jpg");

const roop = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  // new THREE.SphereGeometry(3, 32,32),
  // new THREE.PlaneGeometry(3, 3, 3),

  new THREE.MeshBasicMaterial({ map: roopTexture })
);

scene.add(roop);

//Earth

const cloudTexture = new THREE.TextureLoader().load("cloud.jpg");
const normalTexture = new THREE.TextureLoader().load("norm.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshBasicMaterial({
    map: cloudTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 15;
earth.position.setX(-10);

roop.position.z = -5;
roop.position.x = 2;

//

// let loader = new THREE.TDSLoader();
// loader.load('iss.3ds', function(tds){
//   car = tds.scene.children[0];
//   car.scale.set(0.5,0.5,0.5);
//   scene.add(tds.scene);
// });

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.0;
  earth.rotation.y += 0.0;
  earth.rotation.z -= 0.1;

  //roop.position.z = t * -.0009;
  roop.rotation.y += 0.01;
  roop.rotation.z += 0.01;

  box.rotation.x -= 0.01;
  box.rotation.z += 0.01;

  camera.position.z = t * -0.005;
  camera.position.x = t * 0.0003;
  // camera.rotation.y = t * -0.00005;

  doDecaHedron.position.z = t * 0.001;
  doDecaHedron.position.x = t * 0.005;
  doDecaHedron.position.y = t * -0.002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  torus.rotation.x += 0.0001;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0;

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  doDecaHedron.rotation.x += 0.001;
  doDecaHedron.rotation.y += 0.009;
  doDecaHedron.rotation.z += 0.002;

  earth.rotation.z -= 0.01;
  earth.rotation.x += 0.0;
  earth.rotation.y += 0.0;

  //controls.update();

  renderer.render(scene, camera);
}

animate();
