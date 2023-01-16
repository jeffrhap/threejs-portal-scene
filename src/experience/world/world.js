import Experience from "../experience.js";
import Loader from "../utils/loader.js";

import Portal from "./portal.js";
import Fireflies from "./fireflies.js";

import { gsap } from "gsap";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.loader = new Loader();

    // Loading progress
    this.resources.on("progress", (args) => {
      this.loader.updateLoader(args.loaded);

      if (args.loaded >= 1) {
        this.loader.finishLoading();
      }
    });

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.portal = new Portal();
      this.fireflies = new Fireflies();
    });
  }

  update() {
    if (this.portal) {
      this.portal.update();
    }

    if (this.fireflies) {
      this.fireflies.update();
    }
  }
}
