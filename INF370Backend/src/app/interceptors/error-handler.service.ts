



  import { ErrorHandler, Injectable, Injector } from '@angular/core';
// import { LoggingService } from '../services';
// import * as StackTrace from 'stacktrace-js';
@Injectable()
export class ErrorHandlerService implements ErrorHandler {
constructor(private injector: Injector) { }

handleError(error) {
    // const loggingService = this.injector.get(LoggingService);
    const message = error.message ? error.message : error.toString();
    // log on the server
      // loggingService.log({ message });
      throw error;
    }
 
  }
  
