import { Directive, ElementRef, output } from '@angular/core';

import { 
    filter, 
    of, 
    Subject, 
    switchMap, 
    takeUntil, 
    timer 
} from 'rxjs';

@Directive({
    selector: '[trackVisibility]',
    standalone: true,
})
export class TrackVisibilityDirective {

    visibleForThreeSeconds = output<void>();

    visibility$: Subject<boolean> = new Subject<boolean>();
    destroyRef$: Subject<void> = new Subject<void>();
    observer!: IntersectionObserver;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.listenToIntersectionObserver();
        this.listenToVisibilityChanges();
    }

    listenToIntersectionObserver(): void {
        this.observer = new IntersectionObserver(([entry]) => {
            this.visibility$.next(entry.isIntersecting);
        }, {
            threshold: 0.5
        });
        this.observer?.observe(this.elementRef.nativeElement);
    }

    listenToVisibilityChanges(): void {
        this.visibility$
        .pipe(
            takeUntil(this.destroyRef$),
            switchMap((isVisible) => isVisible ? timer(3000): of(null)),
            filter((timerValue) => timerValue !== null)
        ).
        subscribe({
            next: () =>{
                this.visibleForThreeSeconds.emit();
                this.observer?.disconnect();
            } 
        })
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.destroyRef$.next();
        this.destroyRef$.complete();
    }   
}
