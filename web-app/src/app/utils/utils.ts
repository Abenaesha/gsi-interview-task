import { FormControl, ValidationErrors } from "@angular/forms";

export const jsonValidator = (control: FormControl): ValidationErrors | null => {
  try {
    JSON.parse(control.value);
    return null;
  } catch (e) {
    return { jsonInvalid: true };
  }
};
