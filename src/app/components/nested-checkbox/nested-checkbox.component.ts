import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { nestedCheckbox } from '../../models/nested-checkbox.interface';

@Component({
    selector: 'app-nested-checkbox',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './nested-checkbox.component.html',
    styleUrl: './nested-checkbox.component.css'
})
export class NestedCheckboxComponent {

    @Input() checkbox!: nestedCheckbox;
    @Output() updateParent: EventEmitter<void> = new EventEmitter();
    
    toggleCheckbox(checkbox: nestedCheckbox): void {
        checkbox.children?.forEach((ChildCheckbox) => this.makeCheckEveryChildCheckbox(checkbox.checked, ChildCheckbox));
        this.updateParent.emit();
    }

    updateParentCheckbox(): void {
        this.checkbox.checked  = this.isEveryChildCheckboxChecked(this.checkbox);
        this.updateParent.emit();
    }

    makeCheckEveryChildCheckbox(isChecked: boolean , checkbox: nestedCheckbox): void {
        checkbox.checked = isChecked;
        (checkbox.children ?? []).forEach((ChildCheckbox) => {
            this.makeCheckEveryChildCheckbox(isChecked,ChildCheckbox);
        })
    }

    isEveryChildCheckboxChecked(checkbox: nestedCheckbox): boolean {
        if(!checkbox.children?.length) {
            return checkbox.checked
        }
        return (checkbox.children).every((checkbox) => checkbox.checked && this.isEveryChildCheckboxChecked(checkbox));
    }
}
