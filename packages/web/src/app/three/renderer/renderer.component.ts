import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core'
import { AmbientLight, Color, Octree, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import * as Detector from 'three/examples/js/Detector.js'
import * as P5 from 'p5/lib/p5.js'
import * as Stats from 'stats.js/src/Stats.js'
import { CircleObject } from '@app/three/objects/circle.object'
import { Camera } from '../camera/orthographic.camera'
import { Throttle } from 'lodash-decorators'

/**
 * Animation-Lib p5.js
 * Render-Lib: three.js
 */

@Component({
  selector: 'three-renderer',
  template: '',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {

  camera: Camera
  scene: Scene
  renderer: WebGLRenderer
  Stats = Stats.default
  stats = new this.Stats()
  p5 = new P5()
  meshArray = []



  raycaster = new Raycaster()
  domMouse = {
    down: false,
    x: 0,
    y: 0,
    indexes: undefined,
    ray: undefined
  }
  mouse = new Vector2()

  constructor(public ele: ElementRef) {
  }

  ngAfterViewInit() {
    // Show status of animation
    this.ele.nativeElement.appendChild(this.stats.dom)
    // Start Three.js
    this.readyForTakeoff()
  }

  init() {
    // display/setup three.js: scene, camera and renderer are always needed
    this.scene = new Scene()
    this.scene.background = new Color(0xf5f5f5)

    /** Use orthographic-camera for 2D-renderings */
    this.camera = new Camera(this.ele.nativeElement, this.scene)
    this.renderer = new WebGLRenderer()
    this.renderer.setSize(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
    this.renderer.setPixelRatio(1)
    this.ele.nativeElement.appendChild(this.renderer.domElement)

    /** Init test-objects */
    for (let i = 0; i < 10; i++) {
      const circle = new CircleObject(this.p5, this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight, 5, '#2884C7')
      this.scene.add(circle.mesh)
      this.meshArray.push(circle)
    }
    // place mesh to scene and light
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
    // todo use vectors instead of x,y ???
    // this.mesh.position.addScaledVector(this.noiseGen.scaled3D(this.offsetY, this.offsetX, 1), 1)
    // todo noise2D && scene.transfer() && Buffer ???
    // https://github.com/mrdoob/three.js/blob/master/src/geometries/CircleGeometry.js
    /** Animate test-objects via p5.js*/
    this.meshArray.forEach((circle: CircleObject) => {
      circle.randomWalk(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
    })

    this.raycaster.setFromCamera(this.mouse, this.camera.current)
    const intersects = this.raycaster.intersectObjects( this.meshArray.map(obj => obj.mesh), false)
    for ( let i = 0; i < intersects.length; i++ ) {
      // @ts-ignore
      intersects[ i ].object.material.color.set( 0xff0000 )
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

  @HostListener('mousemove', ['$event'])
  @Throttle(100)
  setMouseCoordinates(e) {
    this.mouse.x = (e.clientX / this.ele.nativeElement.offsetWidth) * 2 - 1
    this.mouse.y = -(e.clientY / this.ele.nativeElement.offsetHeight) * 2 + 1
    this.domMouse.x = e.clientX
    this.domMouse.y = e.clientY
  }

  /** Resopnsive render-output */
  @HostListener('window:resize')
  onWindowResize() {
    this.camera.update(this.ele.nativeElement, this.scene)
    this.renderer.setSize(this.ele.nativeElement.offsetWidth, this.ele.nativeElement.offsetHeight)
    this.renderer.render(this.scene, this.camera.current)
  }
}
