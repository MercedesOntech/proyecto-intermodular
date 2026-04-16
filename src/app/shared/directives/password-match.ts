import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordMatchDirective),
      multi: true
    }
  ]
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') confirmPasswordControlName: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const confirmPassword = control.parent?.get(this.confirmPasswordControlName)?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}