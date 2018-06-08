import { FirstModule } from './first.module';

describe('FirstModule', () => {
  let firstModule: FirstModule;

  beforeEach(() => {
    firstModule = new FirstModule();
  });

  it('should create an instance', () => {
    expect(firstModule).toBeTruthy();
  });
});
