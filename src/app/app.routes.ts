import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {BookDatatableComponent} from "./pages/book-datatable/book-datatable.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/book-datatable' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'book-datatable', loadChildren: () => import('./pages/book-datatable/book-datatable.routes').then(m => m.BOOK_DATATABLE_ROUTES) }
];
