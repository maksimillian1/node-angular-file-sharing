import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordShouldMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('password_confirmation');
  const errors = { passwordShouldMatch: { mismatch: true } };

  if (password?.value === confirmPassword?.value) {
    return null;
  }

  confirmPassword?.setErrors(errors);

  return errors;
}
