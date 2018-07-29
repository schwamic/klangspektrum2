import { VisualizationModule } from './visualization.module';

describe('VisualizationModule', () => {
  let visualizationModule: VisualizationModule;

  beforeEach(() => {
    visualizationModule = new VisualizationModule();
  });

  it('should create an instance', () => {
    expect(visualizationModule).toBeTruthy();
  });
});
