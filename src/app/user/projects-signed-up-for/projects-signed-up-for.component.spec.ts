import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSignedUpForComponent } from './projects-signed-up-for.component';

describe('ProjectsSignedUpForComponent', () => {
  let component: ProjectsSignedUpForComponent;
  let fixture: ComponentFixture<ProjectsSignedUpForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsSignedUpForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsSignedUpForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
