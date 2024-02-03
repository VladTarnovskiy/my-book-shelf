import { HttpInterceptorFn } from '@angular/common/http';

const KEY = 'AIzaSyBv3aIM3TSyKmpKphyFoW155ovYY8iD-QQ';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    params: req.params.set('key', KEY),
  });
  return next(authReq);
};
