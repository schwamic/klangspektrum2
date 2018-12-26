declare const THREE

/**
 * Circle Object
 *
 * - randomWalk
 * - controlledWalk
 */

export class CircleObject {
  private _p5
  private readonly _geometry: THREE.CircleGeometry
  private readonly _material: THREE.MeshBasicMaterial
  private _heartRateX: number
  private _heartRateY: number
  public mesh: THREE.Mesh

  constructor(p5, width: number, height: number, size: number, color: string) {
    this._p5 = p5
    this._heartRateX = this._p5.random(0, 1000000)
    this._heartRateY = this._p5.random(0, 1000000)
    this._geometry = new THREE.CircleGeometry(size, 32)
    this._material = new THREE.MeshBasicMaterial({color})
    this.mesh = new THREE.Mesh(this._geometry, this._material)
    this.mesh.position.x = this._p5.map(Math.random(), 0, 1, 90, width) - (width / 2)
    this.mesh.position.y = this._p5.map(Math.random(), 0, 1, 0, height) - (height / 2)
    this.mesh.position.z = 0
  }

  public randomWalk(width: number, height: number): void {
    this._heartRateX += 0.002
    this._heartRateY += 0.002
    this.mesh.position.x = this._p5.map(this._p5.noise(this._heartRateX), 0, 1, 90, width) - (width / 2)
    this.mesh.position.y = this._p5.map(this._p5.noise(this._heartRateY), 0, 1, 0, height) - (height / 2)
  }
}
