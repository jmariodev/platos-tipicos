import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionState } from '../../core/state/session.state';

export const authGuard: CanActivateFn = () => {
  const sessionState = inject(SessionState);
  const router = inject(Router);

  if (sessionState.usuario()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
