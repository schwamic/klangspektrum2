import * as Detector from 'three/examples/js/Detector.js'
import * as P5 from 'p5/lib/p5.js'
import * as Stats from 'stats.js/src/Stats.js'

import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core'
import { AmbientLight, Color, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'

import { Camera } from '../camera/orthographic.camera'
import { CircleObject } from '../objects/circle-three.object'
import { Throttle } from 'lodash-decorators'

/**
 * In Use:
 * Raycasting
 * Animation and raycaster synchronous
 * DevicePixelRatio
 * Header-height-fix
 * Set stats-position
 *
 * Currently missing:
 * Octree and InstancedBuffer
 */

@Component({
  selector: 'three-ray',
  template: '',
  styles: [`
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
  `]
})

export class RaycastingTestComponent implements AfterViewInit {

  camera: Camera
  scene: Scene
  renderer: WebGLRenderer
  Stats = Stats.default
  stats = new this.Stats()
  p5 = new P5()
  meshArray = []
  intersected = null
  raycaster = new Raycaster()
  mouse = new Vector2()

  constructor(public ele: ElementRef) {}

  /** Start Three.js */
  ngAfterViewInit() {
    // Init stats to show performance-information
    let statsDom = this.ele.nativeElement.appendChild(this.stats.dom)
    statsDom.classList.add('stats')
    this.readyForTakeoff()
  }

  init() {
    // Setup three.js: scene, camera and renderer are always needed */
    this.scene = new Scene()
    this.scene.background = new Color(0xf5f5f5)

    // Use orthographic-camera for 2D-renderings
    this.camera = new Camera(this.ele.nativeElement, this.scene)
    this.renderer = new WebGLRenderer()
    this.renderer.setSize(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.ele.nativeElement.appendChild(this.renderer.domElement)

    // Init test-objects
    for (let i = 0; i < 100; i++) {
      const circle = new CircleObject(this.p5, this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight, 5, '#2884C7')
      this.scene.add(circle.mesh)
      this.meshArray.push(circle)
    }
    // Place mesh to scene and light
    const ambientLight = new AmbientLight(Math.random() * 0x10)
    this.scene.add(ambientLight)

    // grid
    // const gridHelper = new GridHelper(this.ele.nativeElement.offsetWidth, 20)
    // this.scene.add(gridHelper)
  }

  /** Loop */
  animate() {
    this.stats.begin()
    this.update()
    this.render()
    this.stats.end()
    requestAnimationFrame(() => this.animate())
  }

  /** All calculations in animation-loop */
  update() {
    // Animate cicles via p5.js
    this.meshArray.forEach(circle => {
      if (this.intersected != circle.mesh) {
        circle.randomWalk(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
        circle.mesh.material.color.set('#2884C7')
      }
    })

    // Catch circles with mouse
    this.raycaster.setFromCamera(this.mouse, this.camera.current)
    const intersects = this.raycaster.intersectObjects(this.meshArray.map(obj => obj.mesh, false))
    if (intersects.length > 0) {
      if (this.intersected != intersects[0].object) {
        this.intersected = intersects[0].object
        this.intersected.material.color.set(0xff0000)
      }
    } else {
      this.intersected = null
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera.current)
  }

  /** WebGL compatibility check */
  readyForTakeoff() {
    if (Detector.webgl) {
      this.init()
      this.animate()
    } else {
      const warning = Detector.getWebGLErrorMessage()
      this.ele.nativeElement.appendChild(warning)
    }
  }

  /**
   * To get correct calculation you have to reduce the clientY with the header-height!
   * @param {*} e
   */
  @HostListener('mousemove', ['$event'])
  @Throttle(50)
  setMouseCoordinates(e: MouseEvent) {
    this.mouse.x = (e.clientX / this.ele.nativeElement.offsetWidth) * 2 - 1
    this.mouse.y = -((e.clientY - 64) / this.ele.nativeElement.offsetHeight) * 2 + 1 // add height of header-menu
  }

  /** Resopnsive render-output */
  @HostListener('window:resize')
  onWindowResize() {
    this.camera.update(this.ele.nativeElement, this.scene)
    this.renderer.setSize(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
    this.renderer.render(this.scene, this.camera.current)
  }
}
