import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "otp",
        loadComponent: () => import('./components/otp-input/otp-input.component').then(m => m.OtpInputComponent), 
    }
];
