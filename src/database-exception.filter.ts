import { DriverException } from '@mikro-orm/core';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(DriverException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (process.env.AWS_ACCOUNT === 'production') {
      throw new Error(`An unexpected error occurred: ${exception.name}`);
    } else {
      throw exception;
    }
  }
}
