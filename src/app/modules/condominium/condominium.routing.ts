import {Route} from '@angular/router';
import {CondominiumListComponent} from './list/list.component';

export const condominiumRoutes: Route[] = [
    {
        path: '',
        component: CondominiumListComponent
    }
];
