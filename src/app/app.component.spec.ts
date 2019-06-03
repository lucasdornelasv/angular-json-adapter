import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JsonAdapterModule } from 'json-adapter';
import { UserModel } from './shared/models/user.model';
import { UserAdapter } from './shared/adapters/user.adapter';
import { UserService } from './shared/services/user.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        JsonAdapterModule.withAdapters([
          { type: UserModel, adapter: UserAdapter }
        ])
      ],
      providers: [UserService],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-json-adapter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-json-adapter');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to my-json-adapter!'
    );
  });
});
