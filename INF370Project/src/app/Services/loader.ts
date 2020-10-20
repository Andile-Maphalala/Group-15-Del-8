// // errors-handler.ts
// import { ErrorHandler, Injectable} from '@angular/core';
// @Injectable()
// export class ErrorsHandler implements ErrorHandler {
//   handleError(error: Error) {
//      // Do whatever you like with the error (send it to the server?)
//      // And log it to the console
//      console.error('It happens: ', error);
//   }
// }


import { ErrorHandler, Injectable } from '@angular/core';
 
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
 
    constructor() { }
 
    handleError(error: Error) {
        const err = {
            message: "Something went wrong!",
            // stack: error.stack ? error.stack : ''
        };
 
        // Log  the error
        console.log(error);
 
        // Optionally send it to your back-end API
        // Notify the user
    }
}