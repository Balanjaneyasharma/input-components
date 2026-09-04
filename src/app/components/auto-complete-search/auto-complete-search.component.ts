import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { asyncUniqueValidator } from '../../shared/validators/async-unique.validator';

@Component({
  selector: 'app-auto-complete-search',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './auto-complete-search.component.html',
  styleUrl: './auto-complete-search.component.css'
})
export class AutoCompleteSearchComponent implements OnInit{

    searchedText!: FormControl<string | null>;
    recipeText!: FormControl<string | null>;
    fetchedData!: any;
    appService = inject(AppService)
    validationMessages = {
      'recipeText': [
        { type: 'required', message: 'recipe is required'},
        { type: 'duplicate', message: 'recipe already exists'}
      ]
    }

    ngOnInit(): void {
		this.buildFormControl();
    }

    buildFormControl(): void {
		this.searchedText = new FormControl<string>('', {});
		this.recipeText = new FormControl('', {
			validators: [Validators.required],
			asyncValidators: [
				asyncUniqueValidator({
					checkIfValueExists: (control) => this.appService.isRecipeUnique(control.value as string),
					responseParser: (response) => response,
					debounceLimit: 2000,
				})
			]
		});
    }



	showRecipeErrors(): void {
		console.log(this.recipeText.errors);
  	}

  /** 
   * checkRecipes(): AsyncValidatorFn {
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(3000),
      switchMap((value) =>  {
        console.log('making call')
        return this.appService.isRecipeUnique(value)
        .pipe(
          map((response) =>  response ? {'duplicate': true} : null)
        )}
      )
    );
    return (control: AbstractControl) => {
      console.log("Inner AsyncValidator call");
      subject.next(control.value);
      return debouncedInput$;

    }
  }
  checkRecipes(): AsyncValidatorFn {
    const subject = new BehaviorSubject<string>('');
    return (control: AbstractControl) => {
      subject.next(control.value);
      return subject.asObservable().pipe(
        distinctUntilChanged(),
        debounceTime(3000),
        switchMap((value) => {
          console.log('making call');
          return this.appService.isRecipeUnique(value).pipe(
            map((response) => (response ? { duplicate: true } : null))
          );
        })
      );
    };
  }
   * */ 

 



}
