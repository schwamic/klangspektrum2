import * as Detector from "three/examples/js/Detector.js";
import * as P5 from "p5/lib/p5.js";
import * as Stats from "stats.js/src/Stats.js";

import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener
} from "@angular/core";

import { BufferGeometry } from "three";
import { Camera } from "@app/three/camera/orthographic.camera";
import { CircleObject } from "@app/three/objects/circle.object";
import { Throttle } from "lodash-decorators";

// declare THREE in module
declare const THREE

/**
 * In Use:
 * Raycasting
 * Animation and raycaster synchronous
 * DevicePixelRatio
 * Header-height-fix
 * Set stats-position
 *
 * Currently missing:
 * InstancedMesh: https://github.com/pailhead/three-instanced-mesh#readme -> not really good implemented...
 * 
 * Improve draw calls: https://stackoverflow.com/questions/41817879/minimizing-number-of-three-js-draws#41906410
 * Check also InstancedBufferGeometry/ InstancedBufferAttribute, maybe this is good enough / GPGPU
 * 
 * Improve performance: use one geometry for all meshes (quick)
 * log renderer.info.memory to check how many geometries are in use
 * 
 * GPU picking instead of Octree/Raycast (CPU) for more performance
 * https://stackoverflow.com/questions/51768396/three-js-raycasting-with-points-instancedbuffergeometry-and-rawshadermaterial
 * 
 */


 // Reduce draw-calls: geometry + sprite? -> test.ts
 // https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_buffergeometry.html



@Component({
  selector: "three-instance",
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
export class InstanceTestComponent implements AfterViewInit {

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
  log = true
  
  constructor(public ele: ElementRef) {}

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

    // Init test-objects
    //  const geom = new THREE.BoxGeometry()
    //  const material = new THREE.MeshBasicMaterial()
    //  const mergedGeometry = new THREE.BufferGeometry()
    //  for ( let i = 0 ; i < 25 ; i ++ ) {
    //    const nodeGeometry = geom.clone()
    //    nodeGeometry.translate(random(),random(),random())
    //    mergedGeometry.merge(nodeGeometry)
    //  }
    //  const myCluster = new THREE.Mesh( mergedGeometry, material)

    const geometry = new THREE.CircleGeometry( 10, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let mergedGeometry = new THREE.Geometry()
    let circles = []

    for (let i = 0; i < 15; i++) {
      const circle = new CircleObject(this.p5, this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight, 7, '#2884C7', geometry)
      circles.push(circle)
      const nodeGeometry = geometry.clone()
      nodeGeometry.translate( i * 40, 0, 40 );
      mergedGeometry.merge(nodeGeometry)
    }
    // NOT WORKING -> FOR ANIMATION, SELECTING, FILTERING...
    const cluster = new THREE.Mesh( mergedGeometry, material )
    console.log(cluster)
    this.scene.add(cluster)

    // Place mesh to scene and light
    const ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
    this.scene.add(ambientLight);

    this.raycaster = new THREE.Raycaster()
  }

  /** Loop */
  animate() {
    this.stats.begin();
    this.update();
    this.render();
  
    if(this.log){
      console.log(this.renderer.info.render.calls)  
      this.log = false
    }
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
    // Catch circles with mouse
    this.raycaster.setFromCamera(this.mouse, this.camera.current)
    const intersects = this.raycaster.intersectObjects(this.meshArray.map(obj => obj.mesh, false))
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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.render(this.scene, this.camera.current);
  }
}
 