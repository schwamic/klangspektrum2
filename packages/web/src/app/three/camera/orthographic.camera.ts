declare const THREE
/**
 * Camera
 * Use orthographic-camera for 2D-renderings
 *
 * - update
 * - current
 */

export class Camera {
  public camera: THREE.OrthographicCamera
  public ratio
  readonly FRUSTUM = 1000
  readonly FAR = 2000
  readonly NEAR = 1

  constructor(canvas, scene) {
    this.ratio = canvas.offsetWidth / canvas.offsetHeight
    this.camera = new THREE.OrthographicCamera(this.FRUSTUM * this.ratio / -2, this.FRUSTUM * this.ratio / 2, this.FRUSTUM / 2, this.FRUSTUM / -2, this.NEAR, this.FAR)
    this.camera.position.z = 400
    this.camera.lookAt(scene.position)
  }

  update(canvas, scene): void {
    this.ratio = canvas.offsetWidth / canvas.offsetHeight
    this.camera.left = -this.FRUSTUM * this.ratio / 2
    this.camera.right = this.FRUSTUM * this.ratio / 2
    this.camera.top = this.FRUSTUM / 2
    this.camera.bottom = -this.FRUSTUM / 2
    this.camera.updateProjectionMatrix()
    this.camera.lookAt(scene.position)
  }

  get current() {
    return this.camera
  }
}
