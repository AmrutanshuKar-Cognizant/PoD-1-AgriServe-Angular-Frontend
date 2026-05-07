import { Routes } from '@angular/router';

import { Admindashboard} from './features/user/admindashboard/admindashboard';
import { Allusers } from './features/user/allusers/allusers';
import { Updateuserform } from './features/user/updateuserform/updateuserform';

export const routes: Routes = [
  {
    path: 'admin',
    component: Admindashboard
  },
  {
    path: 'users',
    component: Allusers
  },
  {
    path: 'users/update/:id',
    component: Updateuserform
  }
];