import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
        },
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
