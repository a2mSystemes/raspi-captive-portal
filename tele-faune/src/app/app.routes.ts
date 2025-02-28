import { Routes } from '@angular/router';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { SystemComponent } from './components/system/system.component';
import {LoginComponent} from './components/login/login.component';


export const routes: Routes = [
    {path: 'file-manager', component: FileManagerComponent},
    {path: 'parameters', component: ParametersComponent},
    {path: 'system', component: SystemComponent},
    {path: 'login', component: LoginComponent}
];
