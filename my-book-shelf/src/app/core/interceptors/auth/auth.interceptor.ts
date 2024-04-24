import { HttpInterceptorFn } from '@angular/common/http';

const KEY = 'AIzaSyBv3aIM3TSyKmpKphyFoW155ovYY8iD-QQ';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers && req.headers.has('X-Skip-Interceptor')) {
    const headers = req.headers.delete('X-Skip-Interceptor');
    return next(req.clone({ headers }));
  }
  const authReq = req.clone({
    params: req.params.set('key', KEY),
  });
  return next(authReq);
};
