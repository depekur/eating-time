import { RationModule } from './ration.module';

describe('RationModule', () => {
  let rationModule: RationModule;

  beforeEach(() => {
    rationModule = new RationModule();
  });

  it('should create an instance', () => {
    expect(rationModule).toBeTruthy();
  });
});
