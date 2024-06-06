import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'app'
        },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'signed-in-redirect', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'empresas', data: {title: 'Empresas'}, loadChildren: () => import('app/modules/condominium/condominium.module').then(m => m.CondominiumModule)},
            { path: 'dashboard', data: { title: 'Dashboard' }, loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
            { path: 'compradores', data: { title: 'Compradores' }, loadChildren: () => import('app/modules/buyers/buyers.module').then(m => m.BuyersModule)},
            { path: 'configuracoes', data: {title: 'Configurações'}, loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)},
        ]
    },

   /* // Auth routes (guest)
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'user-password', loadChildren: () => import('app/modules/auth/user-password/user-password.module').then(m => m.AuthUserPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: '', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
        ]
    },

    // Auth routes (guest)
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
            layout: 'app'
        },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'signed-in-redirect', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'empresas', data: {title: 'Empresas'}, loadChildren: () => import('app/modules/condominium/condominium.module').then(m => m.CondominiumModule)},
            { path: 'dashboard', data: { title: 'Dashboard' }, loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
            { path: 'compradores', data: { title: 'Compradores' }, loadChildren: () => import('app/modules/buyers/buyers.module').then(m => m.BuyersModule)},
            { path: 'configuracoes', data: {title: 'Configurações'}, loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)},
        ]
    },*/

];
