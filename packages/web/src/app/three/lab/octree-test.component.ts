import * as Detector from "three/examples/js/Detector.js";
import * as P5 from "p5/lib/p5.js";
import * as Stats from "stats.js/src/Stats.js";

import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener
} from "@angular/core";

import { Camera } from "@app/three/camera/orthographic.camera";
import { CircleObject } from "@app/three/objects/circle-three.object";
import { Raycaster } from 'three';
import { Throttle } from "lodash-decorators";
import { flattenStyles } from "@angular/platform-browser/src/dom/dom_renderer";
import { initialState } from '../../core/store/track.reducer';

/** 
 * 1. Make examples work:
 *  - three.js global import in cli.json
 *  - examples/plugin also in cli.json
 *  - plugin uses the global window.three and extends it with logic
 *  - declare THREE in all components needed -> make sure to use only one instance 
 *  - use it
 * 
 * 2. octree
 *  - data-structure for better raycast-search (folder-methphor)
 *  - works not good with animated objects
 * 
 * 3. instancedMesh
 * 
 */

// declare THREE in module
declare const THREE

@Component({
  selector: "three-octree",
  template: "",
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      ::ng-deep .stats {
        left: auto !important;
        right: 0 !important;
      }
    `
  ]
})

/**
 * In Use:
 * https://medium.com/@pailhead011/instancing-with-three-js-part-2-3be34ae83c57
 * https://github.com/pailhead/three-instanced-mesh
 */
export class OctreeTestComponent implements AfterViewInit{
  camera: Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  Stats = Stats.default;
  stats = new this.Stats();
  p5 = new P5();
  meshArray = [];
  intersected = null;
  raycaster: any;
  mouse = new THREE.Vector2();

  /** Because of the similar geometry instancing should be the better
   * methode to keep calculations simple and fast.
   * Check both, to see which is faster...
   */
  octree: THREE.Octree;
  // instancedGeometry: InstancedBufferGeometry; // todo use instancedMesh

  constructor(public ele: ElementRef) {}

  /** Start Three.js */
  ngAfterViewInit() {
    // Init stats to show performance-information
    let statsDom = this.ele.nativeElement.appendChild(this.stats.dom);
    statsDom.classList.add("stats");
    this.readyForTakeoff();
  }

  init() {
    // Setup three.js: scene, camera and renderer are always needed */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

    // Use orthographic-camera for 2D-renderings
    this.camera = new Camera(this.ele.nativeElement, this.scene);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.ele.nativeElement.offsetWidth,
      this.ele.nativeElement.offsetHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.ele.nativeElement.appendChild(this.renderer.domElement);

    // Init octree
    this.octree = new THREE.Octree({
      undeferred: false, // if is set to true, auto update no octree.update() needed
      depthMax: Infinity,
      objectsThreshold: 8,
      overlapPct: 0.15
    });

    // Init test-objects
    // this.instancedGeometry = new THREE.InstancedBufferGeometry();
    for (let i = 0; i < 1500; i++) {
      const circle = new CircleObject(this.p5, this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight, 7, '#2884C7')
      this.octree.add( circle.mesh, { useFaces: false } );
      this.scene.add(circle.mesh);
      this.meshArray.push(circle);
    }
    // Place mesh to scene and light
    const ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
    this.scene.add(ambientLight);

    this.raycaster = new THREE.Raycaster()
    console.log(this.octree)
    // grid
    // const gridHelper = new GridHelper(this.ele.nativeElement.offsetWidth, 20)
    // this.scene.add(gridHelper)
  }

  /** Loop */
  animate() {
    this.stats.begin();
    this.update();
    this.render();
    this.stats.end();
    requestAnimationFrame(() => this.animate());
  }

  /** All calculations in animation-loop */
  update() {
    // Animate cicles via p5.js
    this.meshArray.forEach(circle => {
      if (this.intersected != circle.mesh) {
        circle.randomWalk(
          this.ele.nativeElement.offsetWidth,
          this.ele.nativeElement.offsetHeight
        );
        circle.mesh.material.color.set("#2884C7");
        circle.mesh.position.z = 0;
      }
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera.current);
    this.octree.update();
  }

  /** WebGL compatibility check */
  readyForTakeoff() {
    if (Detector.webgl) {
      this.init();
      this.animate();
    } else {
      const warning = Detector.getWebGLErrorMessage();
      this.ele.nativeElement.appendChild(warning);
    }
  }

  /**
   * To get correct calculation you have to reduce the clientY with the header-height!
   * @param {*} e
   */
  @HostListener("mousemove", ["$event"])
  @Throttle(50)
  setMouseCoordinates(e: MouseEvent) {
    this.mouse.x = (e.clientX / this.ele.nativeElement.offsetWidth) * 2 - 1;
    this.mouse.y =
      -((e.clientY - 64) / this.ele.nativeElement.offsetHeight) * 2 + 1; // add height of header-menu
    console.log(this.mouse)
    this.raycaster.setFromCamera(this.mouse, this.camera.current);


   // Catch circles with mouse
    const octreeObjects = this.octree.search( this.raycaster.ray.origin, this.raycaster.ray.far, true, this.raycaster.ray.direction )
    // const intersects = this.raycaster.intersectOctreeObjects(octreeObjects.map(obj => obj.object))
    // const intersects = []
    const intersects = this.raycaster.intersectObjects(this.meshArray.map(obj => obj.mesh, false))
    console.log(intersects)
    // console.log({octreeObjects})
    if (intersects.length > 0) {
      if (this.intersected != intersects[0].object) {
        this.intersected = intersects[0].object;
        this.intersected.material.color.set(0xff0000);
        this.intersected.position.z = 1
      }
    } else {
      this.intersected = null;
    }
  }

  /** Resopnsive render-output */
  @HostListener("window:resize")
  onWindowResize() {
    this.camera.update(this.ele.nativeElement, this.scene);
    this.renderer.setSize(
      this.ele.nativeElement.offsetWidth,
      this.ele.nativeElement.offsetHeight
    );
    this.renderer.render(this.scene, this.camera.current);
  }
}
