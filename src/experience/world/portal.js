import * as THREE from "three";
import gsap from "gsap";

import Experience from "../experience.js";

import vertexShader from "@/assets/shaders/portal/vertex.glsl";
import fragmentShader from "@/assets/shaders/portal/fragment.glsl";

export default class RubiksCube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Portal");
    }

    // Setup
    this.resourceModel = this.resources.items.portalModel;
    this.resourceMaterial = this.resources.items.portalMaterial;

    this.setMaterials();
    this.setModel();
  }

  setMaterials() {
    const debugObject = {};

    // Material settings
    this.resourceMaterial.flipY = false;
    this.resourceMaterial.encoding = THREE.sRGBEncoding;

    // Baked material
    this.bakedMaterial = new THREE.MeshBasicMaterial({
      map: this.resourceMaterial,
    });

    // Pole light material
    this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

    debugObject.portalColorStart = "#7e068e";
    debugObject.portalColorEnd = "#f4a8f5";

    if (this.debug.active) {
      this.debugFolder
        .addColor(debugObject, "portalColorStart")
        .onChange(() => {
          this.portalLightMaterial.uniforms.uColorStart.value.set(
            debugObject.portalColorStart
          );
        });

      this.debugFolder.addColor(debugObject, "portalColorEnd").onChange(() => {
        this.portalLightMaterial.uniforms.uColorEnd.value.set(
          debugObject.portalColorEnd
        );
      });
    }

    // Portal light material
    this.portalLightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
        uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  setModel() {
    this.model = this.resourceModel.scene;

    const bakedMesh = this.model.children.find(
      (child) => child.name === "baked"
    );
    const portalLightMesh = this.model.children.find(
      (child) => child.name === "portalLight"
    );
    const poleLightAMesh = this.model.children.find(
      (child) => child.name === "poleLightA"
    );
    const poleLightBMesh = this.model.children.find(
      (child) => child.name === "poleLightB"
    );

    bakedMesh.material = this.bakedMaterial;
    portalLightMesh.material = this.portalLightMaterial;
    poleLightAMesh.material = this.poleLightMaterial;
    poleLightBMesh.material = this.poleLightMaterial;

    this.scene.add(this.model);

    const portalScene = this.scene.children.find(
      (item) => item.name === "Scene"
    );

    document.addEventListener("mousemove", (e) => {
      let xPos = e.pageX / window.innerWidth - 0.5;
      let yPos = e.pageY / window.innerHeight - 0.5;

      gsap.to(portalScene.rotation, {
        x: -yPos / 8,
        y: -xPos / 8,
        ease: "Power1.easeOut",
      });
    });
  }

  update() {
    this.portalLightMaterial.uniforms.uTime.value = this.time.elapsed / 1000;
  }
}
