import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  let loginUserRequest = { email: 'test@gmail.com', password: 'test123' };

  const requestData = {
    firstData: "Wolf",
    secondData: "Flow",
    email: "test@gmail.com"
  };

  const dummyUserListResponse = {
    data: {
      "code": true,
      "value": "ANAGRAMS"
    }
  };

  let countResult = [["listen", "silent"], ["six", "xis"], ["knee", "keen"]];
  afterEach(() => {
    httpMock.verify();
  });

  let loginUserResponse = {
    "email": "tester@gmail.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDU3NDgxMDMsImlhdCI6MTYwNTY2MTcwMywic3ViIjoidGVzdGVyQGdtYWlsLmNvbSJ9.hLWZiVc6tQhqZ8EJrsOmqju0B-ywBwHzfYvGMs0rMCY",
    "value": true
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkAnagramForUser() service test', () => {
    service.checkAnagramForUser(requestData).subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpMock.expectOne('http://localhost:9000/check-anagram');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUserListResponse);
  });

  it('checkUser() service test', () => {
    service.checkUser("test@gmail.com").subscribe((res) => {
      expect(res).toEqual(true);
    });

    const req = httpMock.expectOne('http://localhost:9000/checkUser?email=test@gmail.com');
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('popularCounts() service test', () => {
    service.popularCounts().subscribe((res) => {
      expect(res).toEqual(countResult);
    });

    const req = httpMock.expectOne('http://localhost:9000/counts');
    expect(req.request.method).toBe('GET');
    req.flush(countResult);
  });

  it('loginUser() service test', () => {
    service.loginUser(loginUserRequest).subscribe((res) => {
      expect(res).toEqual(loginUserResponse);
    });

    const req = httpMock.expectOne('http://localhost:9000/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginUserResponse);
  });
});
