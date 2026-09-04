import { 
    AbstractControl, 
    AsyncValidatorFn, 
    ValidationErrors 
} from "@angular/forms";

import { 
    catchError, 
    map, 
    Observable, 
    of, 
    switchMap,
    takeUntil,
    timer 
} from "rxjs";

export type asyncUniqueValidatorOptions = {
    checkIfValueExists: (control: AbstractControl) => Observable<any>;
    responseParser: (response: any) => boolean;
    isUnchangedValue?: (control: AbstractControl) => boolean;
    debounceLimit?: number;
    errorKey?: string;
    useCache?: boolean;
    destroy$?: Observable<void>;
}

/**
 * @description
 * Creates a reusable async validator to check if a form control value is unique (e.g., username, email).
 
 * @param options - Configuration for the validator:
 *   - `checkIfValueExists`: (control) => Observable  
 *       Makes the API call to check whether the value already exists on the server.
 *   - `responseParser`: (response) => boolean  
 *       Parses the API response and returns `true` if the value is already taken (invalid).
 *   - `isUnchangedValue?`: (control) => boolean  
 *       Optional. Skips validation if the current value hasn’t changed (useful in edit mode).
 *   - `debounceLimit?`: number  
 *       Optional. Delay in milliseconds before triggering the API call. Default is 500ms.
 *   - `errorKey?`: string  
 *       Optional. The error key returned in case of validation failure. Default is `'duplicate'`.
 *
 * @returns AsyncValidatorFn - An Angular async validator function.
 */
export const asyncUniqueValidator = <T = string>(options: asyncUniqueValidatorOptions): AsyncValidatorFn => {

    const {
        checkIfValueExists,
        responseParser,
        isUnchangedValue = null,
        debounceLimit = 500,
        errorKey = 'duplicate',
        useCache = false,
        destroy$ = new Observable<void>()
    } = options;

    const validationResultCache: Map<T, ValidationErrors | null> = new Map(); 

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control?.value  ||isUnchangedValue?.(control)) {
            return of(null);
        }

        if (useCache && validationResultCache.has(control.value)) {
            return of(validationResultCache.get(control.value) as ValidationErrors | null);
        }


        return timer(debounceLimit)
        .pipe(
            takeUntil(destroy$),
            switchMap(() => {
                return checkIfValueExists(control)
                .pipe(
                    map((response) => {
                        const result = responseParser(response);

                        if (useCache) {
                            validationResultCache.set(control.value, result ? { [errorKey]: true } : null);
                        }
                        
                        return result  ? { [errorKey]: true } : null
                    }),
                    catchError(() => of(null))
                )
            })
        );
    };
}
