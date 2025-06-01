import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthServiceService);


  const token = localStorage.getItem('userToken');
  if (!token) {
    _Router.navigate(['/login']);
    return false;
  }


  _AuthService.saveUserData();

  const role =
    _AuthService.userData?.[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];

  if (role === 'Admin') {
    return true;
  } else {
    _Router.navigate(['/home']); 
    return false;
  }
};
