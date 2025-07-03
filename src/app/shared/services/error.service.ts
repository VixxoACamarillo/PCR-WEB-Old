import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
  constructor() {}

  getErrorMessaging(
    error: any,
    customMessage?: string,
    customHeader?: string
  ): any {
    if (!error) {
      return undefined;
    }
    const { status, statusMessage } = error;
    const type = 'error';
    let message = customMessage
      ? customMessage
      : 'The system was unable to process this request';
    let header = customHeader ? customHeader : 'Unknown Error';

    switch (status) {
      case 400:
        header = 'Bad Request';
        break;
      case 401:
        header = 'Unauthorized';
        break;
      case 403:
        header = 'Forbidden';
        break;
      case 404:
        header = 'Not Found';
        break;
      case 413:
        header = 'File too large';
        message = 'This file is too large, select another one and try again.';
        break;
      case 500:
        header = 'Data Connection Error';
        message = 'The system is unable to connect to the server.';
        break;
    }

    return {
      type,
      message,
      header
    };
  }
}
