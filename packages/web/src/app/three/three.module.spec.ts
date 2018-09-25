import { ThreeModule } from './three.module'

describe('ThreeModule', () => {
  let threeModule: ThreeModule

  beforeEach(() => {
    threeModule = new ThreeModule()
  })

  it('should create an instance', () => {
    expect(threeModule).toBeTruthy()
  })
})
