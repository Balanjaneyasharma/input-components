import { Component, inject } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, tap } from 'rxjs';

import { nestedCheckbox } from './models/nested-checkbox.interface';
import { FilePath } from './models/file-path';
import { AppService } from './services/app.service';
import { RenderWhenDirective } from "./directives/render-when.directive";
import { TrackVisibilityDirective } from "./directives/track-visibility.directive";
import { AutoCompleteSearchComponent } from "./components/auto-complete-search/auto-complete-search.component";
import { NestedCheckboxComponent } from './components/nested-checkbox/nested-checkbox.component';
import { OtpInputComponent } from "./components/otp-input/otp-input.component";
import { FilePathComponent } from './components/file-path/file-path.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NestedCheckboxComponent, 
        OtpInputComponent, 
        AutoCompleteSearchComponent, 
        ReactiveFormsModule, 
        FilePathComponent, 
        RenderWhenDirective, 
        TrackVisibilityDirective
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    otpInputs!: FormArray<FormControl>;

    searchText: FormControl = new FormControl("");
    private appService = inject(AppService);
    products = [
        'iPhone 9',
        'iPhone X',
        'Samsung Universe 9',
        'OPPO F19',
        'Huawei P30',
        'MacBook Pro',
        'Microsoft Surface Laptop 4',
        'Infinix INBOOK',
        'HP Pavilion 15',
        'Google Pixel 7',
        'OnePlus Nord',
    ]

    filteredTexts: string []= [];
    filePathData: FilePath[] = [];
    checkboxes: nestedCheckbox[] = []


    ngOnInit(): void {
        this.setOtpInputsData();
        this.listenToValueChanges();
        this.getFilePath();
        this.getCheckboxData();

    }

    onTrackVisibilityChanged(): void {
        console.log('Element visibility for more than 3 seconds');
    }

    setOtpInputsData():void{
        this.otpInputs = new FormArray(
            Array.from({ length: 10 }, () => new FormControl(null)) // Initialize controls with default values
        );
        this.otpInputs.valueChanges.subscribe(value => console.log(value));
    }

    getFilePath(): void {
         this.appService.getMockData().subscribe({
            next: (data) => {
                this.filePathData = data;
            }
        });
    }

    getCheckboxData(): void {
        this.appService.getNestedCheckboxData()
        .pipe(
            tap((data) => this.checkboxes = data)
        ).subscribe();
    }

    listenToValueChanges(): void {
        this.searchText.valueChanges
        .pipe(
            debounceTime(3000),
            tap((value) => {
                const lowerCaseValue = (value ?? "").toLowerCase();
                this.filteredTexts =  !!value ? this.products.filter((product) => product.toLowerCase().includes((lowerCaseValue ?? ""))) : [];
            })
        )
        .subscribe();
    }

}
