import { SecondModule } from './second.module';

describe('SecondModule', () => {
  let secondModule: SecondModule;

  beforeEach(() => {
    secondModule = new SecondModule();
  });

  it('should create an instance', () => {
    expect(secondModule).toBeTruthy();
  });
});
