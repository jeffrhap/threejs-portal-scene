import * as THREE from "three";

import Experience from "../experience.js";

import vertexShader from "@/assets/shaders/fireflies/vertex.glsl";
import fragmentShader from "@/assets/shaders/fireflies/fragment.glsl";

export default class Fireflies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Fireflies");
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.firefliesGeometry = new THREE.BufferGeometry();
    const firefliesCount = 30;
    const positionArray = new Float32Array(firefliesCount * 3);
    const scaleArray = new Float32Array(firefliesCount);

    for (let i = 0; i < firefliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
      positionArray[i * 3 + 1] = Math.random() * 1.5;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

      scaleArray[i] = Math.random();
    }

    this.firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );
    this.firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)
    );
  }

  setMaterial() {
    this.firefliesMaterial = new THREE.ShaderMaterial({
      // transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: this.sizes.pixelRatio },
        uSize: { value: 300 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    if (this.debug.active) {
      this.debugFolder
        .add(this.firefliesMaterial.uniforms.uSize, "value")
        .min(1)
        .max(500)
        .step(1)
        .name("firefliesSize");
    }
  }

  setMesh() {
    const fireflies = new THREE.Points(
      this.firefliesGeometry,
      this.firefliesMaterial
    );
    this.scene.add(fireflies);
  }

  update() {
    this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed / 1000 / 2;
  }
}
