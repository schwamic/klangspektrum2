import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { LandingpageComponent } from './landingpage.component'
import { ApiService } from '@app/core/services/api.service'


class MockApiService {
}

describe('LandingpageComponent', () => {
  let component: LandingpageComponent
  let fixture: ComponentFixture<LandingpageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingpageComponent],
      providers: [{provide: ApiService, useClass: MockApiService}]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
