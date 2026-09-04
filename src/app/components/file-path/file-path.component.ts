import { Component, Input } from '@angular/core';
import { FilePath } from '../../models/file-path';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-file-path',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './file-path.component.html',
    styles: ``
})
export class FilePathComponent {

    @Input() filePathData: FilePath[] = [];

    isDirectoryOpen: Map<number, boolean> = new Map();

    ngOnInit(): void {
        this.setInitialData();
    }

    setInitialData(): void {
        this.filePathData.forEach(item => {
            if (item.files) {
                this.setIsDirectoryOpen(item.id, false);
            }
        });
    }

    setIsDirectoryOpen(id: number, isOpen: boolean): void {
        this.isDirectoryOpen.set(id, isOpen);
    }


}
