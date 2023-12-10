import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Authentication/login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'error',
  //   component: ErrorPageComponent
  // },
  {
    path: 'signup',
    loadChildren: () => import('./Authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./Authentication/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./Dashboard/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'searchUser',
    loadChildren: () => import('./Dashboard/search-user/search-user.module').then( m => m.SearchUserPageModule)
  },
  {
    path: 'searchEvent',
    loadChildren: () => import('./Dashboard/search-event/search-event.module').then( m => m.SearchEventPageModule)
  },
  {
    path: 'searchReward',
    loadChildren: () => import('./Dashboard/search-reward/search-reward.module').then( m => m.SearchRewardPageModule)
  },
  {
    path: 'reward',
    loadChildren: () => import('./Dashboard/create-reward/create-reward.module').then( m => m.CreateRewardPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./Dashboard/create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'help-desk',
    loadChildren: () => import('./Dashboard/help-desk/help-desk.module').then( m => m.HelpDeskPageModule)
  },
  {
    path: 'help-desk-history',
    loadChildren: () => import('./Dashboard/help-desk-history/help-desk-history.module').then( m => m.HelpDeskHistoryPageModule)
  },
  {
    path: 'leaderBoard',
    loadChildren: () => import('./Dashboard/leader-board/leader-board.module').then( m => m.LeaderBoardPageModule)
  },
  {
    path: 'upComingEvent',
    loadChildren: () => import('./Dashboard/user-event-list/user-event-list.module').then( m => m.UserEventListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
