import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'recover-password',
        loadComponent: () =>
            import('./auth/recover-password/recover-password.component').then(
                (m) => m.RecoverPasswordComponent
            ),
    },
    {
        path: 'event',        
        children: [
            {
                path: 'event-list',
                loadComponent: () =>
                    import('./event/event-list/event-list.component').then(
                        (m) => m.EventListComponent
                    ),
                canActivate: [authGuard],
            },
            {
                path: 'new',
                loadComponent: () =>
                    import('./event/event/event.component').then(
                        (m) => m.EventComponent
                    ),
                canActivate: [authGuard],
            },
            {
                path: ':id',
                loadComponent: () =>
                    import('./event/event/event.component').then(
                        (m) => m.EventComponent
                    ),
                canActivate: [authGuard],
            },           
            {
                path: 'detail/:id',
                loadComponent: () =>
                    import('./event/event-detail/event-detail.component').then(
                        (m) => m.EventDetailComponent
                    ),  
            },
        ],
    },
    {
        path: 'guest/:id',
        loadComponent: () =>
            import('./guest/guest-managment/guest-managment.component').then(
                (m) => m.GuestManagmentComponent
            ),
        canActivate: [authGuard],
    },
    {
        path: 'complete',
        loadComponent: () =>
            import('./shared/pages/complete/complete.component').then(
                (m) => m.CompleteComponent
            ),
    },
    {
        path: 'error',
        loadComponent: () =>
            import('./shared/pages/error/error.component').then(
                (m) => m.ErrorComponent
            ),
    },
   
    {
        path: 'ticket-purchase/:id',
        loadComponent: () =>
            import('./ticket-purchase/ticket-purchase.component').then(
                (m) => m.TicketPurchaseComponent 
            ),
    },
    {
        path: ':eventId/event-page/:guestId',
        loadComponent: () =>
            import('./event/event-page/event-page.component').then(
                (m) => m.EventPageComponent
            ),
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
