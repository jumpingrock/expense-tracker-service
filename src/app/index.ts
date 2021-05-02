import { Application } from 'express';
import {
  Action,
  createExpressServer,
  UnauthorizedError,
} from 'routing-controllers';

import { controllers } from './controllers';
import { DB } from './DB';
import { ErrorHandler } from './errors/ErrorHandler';
import passport from 'passport';
import './auth/passportHandler';

export class ExpenseTrackerApp {
  static create(): Application {
    const app: Application = createExpressServer({
      cors: true,
      controllers,
      defaultErrorHandler: false,
      middlewares: [ErrorHandler],
      authorizationChecker: (action: Action, roles: string[]) =>
        new Promise<boolean>((resolve, reject) => {
          passport.authenticate('jwt', (err, user, jwtToken) => {
            if (err) {
              return reject(new UnauthorizedError('Unauthorized'));
            }
            if (!user) {
              return resolve(false);
            }
            action.request.user = user;
            return resolve(true);
          })(action.request, action.response, action.next);
        }),
      currentUserChecker: (action: Action) => action.request.user.id,
    });
    DB.init();
    return app;
  }
}
