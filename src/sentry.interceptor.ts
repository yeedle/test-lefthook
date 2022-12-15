import * as Sentry from '@sentry/node';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const sendToSentry = (err: Error) => {
  Sentry.captureException(err);
  return throwError(() => err);
};
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(catchError(sendToSentry));
  }
}
