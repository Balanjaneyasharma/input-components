import {
    Component,
    ElementRef,
    Input,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-otp-input',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './otp-input.component.html',
    styleUrl: './otp-input.component.css',
})
export class OtpInputComponent {
    
    @ViewChildren('otpInputBox') otpInputBoxes!: QueryList<ElementRef>;
    @Input() otpInputs!: FormArray<FormControl<number>>;

    allowOnlyNumbers(event: KeyboardEvent): void {
        const charCode = event.key.charCodeAt(0);
        if (charCode < 48 || charCode > 57) {
            // Allow only numeric values (0-9)
            event.preventDefault();
        }
    }

    onOtpInput(event: any, index: number): void {
        if (!event.target.value?.trim()) return;

        if (event.inputType === 'insertFromPaste') {
            // copy paste event
            console.log(event.target.value);
            this.otpInputs.at(index).setValue(+event.target.value.at(0));
            this.otpInputBoxes.toArray().at(index)?.nativeElement.blur();
        } else {
            this.otpInputs.at(index).setValue(+event.target.value.slice(-1));
            this.otpInputs.at(index + 1)?.enable();
            this.otpInputBoxes
                .toArray()
                .at(index + 1)
                ?.nativeElement.focus();
        }
    }

    onOtpKeyDown(event: any, index: number): void {
        if (!event.target.value && event.key === 'Backspace' && index) {
            const lastNonEmptyIndex: number = this.findNearNonEmptyIndex(
                index,
                this.otpInputs.value
            );
            this.otpInputBoxes
                .toArray()
                .at(lastNonEmptyIndex)
                ?.nativeElement?.focus();
        }
    }

    onOtpPaste(event: ClipboardEvent, index: number): void {
        const pastedData: string[] = (
            event.clipboardData?.getData('text') || ''
        ).split('');
        
        pastedData.forEach((character) => {
            this.otpInputs.at(index)?.setValue(+character);
            index += 1;
        });
    }

    findNearNonEmptyIndex(index: number, array: any[]): number {
        let lastEmptyIndex: number = 0;
        let reversedArray = array.slice(0, index).reverse();
        const nearIndex = reversedArray.findIndex((value) => value || value === 0);

        nearIndex !== -1 && (lastEmptyIndex = reversedArray.length - nearIndex - 1);

        return lastEmptyIndex;
    }
}
