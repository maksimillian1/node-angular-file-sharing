import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export type FieldErrors = { [key: string]: string[]}

export interface ApiHttpError {
  data: any;
  errors: {
    messages?: string;
    message?: string;
    fields?: FieldErrors | []
  },
  message: string;
}

export const httpErrorHandler = (toastr: ToastrService, cb?: () => void) => (response: HttpErrorResponse) => {
  const res = response.error as ApiHttpError;

  if(cb) {
    cb();
  }

  if(res?.errors.messages || res?.errors.message) {
    toastr.error('Error. Try again later');
    return;
  }

  Object.values(res?.errors?.fields || []).forEach((errorsList: string[]) => {
    toastr.error(errorsList[0]);
  });
};

export function createHttpHandlerWithErrorsHandler(
  next: any,
  toastr: ToastrService,
  complete?: any,
): {next: any, error: any, complete?: any} {
  return {
    next,
    error: httpErrorHandler(toastr),
    complete,
  };
}
