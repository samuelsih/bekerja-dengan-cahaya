import * as THREE from 'three';
import { RectAreaLightHelper }  from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class Scene {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.group = undefined;

    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 48;

    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    //group box
    this.group = new THREE.Group();
    this.group.position.y = 0.5;
    this.scene.add(this.group);

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addGround(color, yPosition) {
    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: color });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = yPosition;
    this.group.add(groundMesh);
  }

  addBox(color, xPosition) {
    const bg = new THREE.BoxGeometry(1, 1, 1);
    const bm = new THREE.MeshPhongMaterial({ color: color });
    const boxMesh = new THREE.Mesh(bg, bm);
    boxMesh.castShadow = true;
    boxMesh.position.x = xPosition;
    this.group.add(boxMesh);
  }

  AmbientLight(color, intensity) {
    const light = new THREE.AmbientLight(color, intensity);
    this.group.add(light);

    return light;
  }

  DirectionalLight(color, intensity) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 2, 2);
    light.castShadow = true;
    const helper = new THREE.DirectionalLightHelper(light, 3);
    this.group.add(light);

    return [light, helper];
  }

  HemisphereLight(topColor, bottomColor, intensity) {
    const light = new THREE.HemisphereLight(topColor, bottomColor, intensity);
    const helper = new THREE.HemisphereLightHelper( light, 5 );

    this.group.add(light);
    return [light, helper];
  }

  PointLight(color, intensity) {
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, -2, 2);

    const helper = new THREE.PointLightHelper( light, 1 );
    this.group.add(light);

    return [light, helper];
  }

  RectArea(width, height, color, intensity) {
    const light = new THREE.RectAreaLight(color, intensity, width, height);

    light.position.set(5, 5, 0);
    light.lookAt(0, 0, 0)

    const helper = new RectAreaLightHelper(light)

    this.group.add(light);

    return [light, helper];
  }
}