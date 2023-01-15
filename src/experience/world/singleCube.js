import * as THREE from "three";

import Experience from "../experience.js";
import { vertexShader, fragmentShader } from "./shaders";

export default class Floor {
  constructor(xOffset, yOffset, zOffset) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.cubeGroup = new THREE.Group();
    this.uniforms = {
      opacity: {
        type: "f",
        value: 1.0,
      },
    };
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = zOffset;

    this.setGeometery();
    this.setMaterial();
    this.setMesh();

    this.setOutline();
  }

  setGeometery() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: this.uniforms,
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.cubeGroup.add(this.mesh);
  }

  setOutline() {
    this.outlineGeometry = new THREE.EdgesGeometry(this.mesh.geometry);
    this.outlineMaterial = new THREE.LineBasicMaterial({ color: "#000000" });
    this.outlineMesh = new THREE.LineSegments(
      this.outlineGeometry,
      this.outlineMaterial
    );

    this.cubeGroup.add(this.outlineMesh);
    this.cubeGroup.position.x = this.xOffset;
    this.cubeGroup.position.y = this.yOffset;
    this.cubeGroup.position.z = this.zOffset;
  }
}
