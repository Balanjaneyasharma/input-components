import { 
    Directive, 
    Input, 
    TemplateRef, 
    ViewContainerRef 
} from '@angular/core';

@Directive({
    selector: '[renderWhen]',
    standalone: true
})

// replica of *ngIf
export class RenderWhenDirective {

    isRendered = false;

    @Input() set renderWhen(condition: boolean) {
        if (condition && !this.isRendered) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.isRendered = true;
        } else if (this.isRendered && !condition) {
            this.viewContainerRef.clear();
            this.isRendered = false;
        }
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }


}
