import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');
  return password && confirmPassword && password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}