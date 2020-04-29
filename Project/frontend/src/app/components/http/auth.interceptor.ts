import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, publishLast, refCount, tap} from 'rxjs/operators';
import {TokenProvider} from './token.provider';

const TOKEN_HEADER_KEY = 'Authorization';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenProvider: TokenProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.tokenProvider.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenProvider.getToken())});
    }
    return next.handle(authReq).pipe(catchError((error: any) => {
      console.error("Interceptor error", error);
      return throwError(error);
    }));
  }
}
