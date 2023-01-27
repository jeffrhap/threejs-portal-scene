import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import Experience from "../experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
    }

    // Setup
    // this.setupEnvironment();
  }

  setupEnvironment() {
    const _this = this;
    new RGBELoader()
      .setPath(
        "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/"
      )
      .load("empty-wharehouse/empty_warehouse_01_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        _this.scene.background = texture;
        _this.scene.environment = texture;
      });
  }
}
