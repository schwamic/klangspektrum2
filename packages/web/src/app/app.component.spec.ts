import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
