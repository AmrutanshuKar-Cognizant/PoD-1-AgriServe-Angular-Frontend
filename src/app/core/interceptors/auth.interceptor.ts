import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Grab the token from Local Storage
  const token = localStorage.getItem('jwt_token'); 

  // Clone the request and attach the Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });
    
    return next(clonedRequest);
  }

  // If no token exists just send the normal request
  return next(req);
};