import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.loginService.getToken();
    let newHeaders = request.headers;
    console.log(request.headers);
    if (token) {
      console.log('Token is there...');
      newHeaders = newHeaders.append('x-access-token', token);
    }
    const authReq = request.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}
