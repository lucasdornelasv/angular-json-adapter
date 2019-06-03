import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './shared/services/user.service';
import { of } from 'rxjs';
import { UserModel } from './shared/models/user.model';

describe('AppComponent', () => {
  const userService: UserService = {
    getUser() {}
  } as any;

  const user = new UserModel();

  beforeEach(async(() => {
    user.id = 1;
    user.name = 'User Test 1';
    spyOn(userService, 'getUser').and.returnValue(of(user));

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userService }],
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

  it('should render User as json', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      '"name": "User Test 1"'
    );
  });
});
