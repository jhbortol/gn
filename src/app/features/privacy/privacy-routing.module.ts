import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemovalRequestPageComponent } from './removal-request-page/removal-request-page';
import { RemovalStatusPageComponent } from './removal-status-page/removal-status-page';

const routes: Routes = [
    {
        path: 'request-removal',
        children: [
            {
                path: '',
                component: RemovalRequestPageComponent
            },
            {
                path: 'status',
                component: RemovalStatusPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivacyRoutingModule { }
