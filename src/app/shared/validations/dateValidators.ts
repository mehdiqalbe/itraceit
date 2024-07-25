import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup;
    const start = formGroup.get('Billing_Start_Data')?.value;
    const end = formGroup.get('Billing_End_Data')?.value;

    return start && end && start > end ? { 'dateRange': true } : null;
  };
}