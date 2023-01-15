import * as THREE from "three";

import Experience from "../experience.js";
import Cube from "./singleCube.js";

export default class RubiksCube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.rubiksCubeGroup = new THREE.Group();

    this.initCube();
  }

  initCube() {
    this.cubes = [
      // Front face.
      new Cube(-1, 1, 1),
      new Cube(0, 1, 1),
      new Cube(1, 1, 1),
      new Cube(-1, 0, 1),
      new Cube(0, 0, 1),
      new Cube(1, 0, 1),
      new Cube(-1, -1, 1),
      new Cube(0, -1, 1),
      new Cube(1, -1, 1),

      // Middle face.
      new Cube(-1, 1, 0),
      new Cube(0, 1, 0),
      new Cube(1, 1, 0),
      new Cube(-1, 0, 0),
      new Cube(0, 0, 0),
      new Cube(1, 0, 0),
      new Cube(-1, -1, 0),
      new Cube(0, -1, 0),
      new Cube(1, -1, 0),

      // Back face.
      new Cube(-1, 1, -1),
      new Cube(0, 1, -1),
      new Cube(1, 1, -1),
      new Cube(-1, 0, -1),
      new Cube(0, 0, -1),
      new Cube(1, 0, -1),
      new Cube(-1, -1, -1),
      new Cube(0, -1, -1),
      new Cube(1, -1, -1),
    ];

    this.cubes.forEach((cube) => {
      this.rubiksCubeGroup.add(cube.cubeGroup);
    });

    this.scene.add(this.rubiksCubeGroup);
  }
}
