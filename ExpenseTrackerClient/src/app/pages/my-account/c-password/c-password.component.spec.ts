import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPasswordComponent } from './c-password.component';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CPasswordComponent', () => {
  let component: CPasswordComponent;
  let fixture: ComponentFixture<CPasswordComponent>;
  let mockSettingsService: Partial<SettingsService>;

  beforeEach(async () => {
    mockSettingsService = {

    };

    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
      declarations: [ CPasswordComponent ],
      providers: [{ provide: SettingsService , useValue: mockSettingsService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
