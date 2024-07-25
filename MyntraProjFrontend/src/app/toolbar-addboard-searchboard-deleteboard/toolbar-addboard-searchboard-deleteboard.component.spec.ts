import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAddboardSearchboardDeleteboardComponent } from './toolbar-addboard-searchboard-deleteboard.component';

describe('ToolbarAddboardSearchboardDeleteboardComponent', () => {
  let component: ToolbarAddboardSearchboardDeleteboardComponent;
  let fixture: ComponentFixture<ToolbarAddboardSearchboardDeleteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarAddboardSearchboardDeleteboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolbarAddboardSearchboardDeleteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
