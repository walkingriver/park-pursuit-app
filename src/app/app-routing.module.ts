import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'clue/:parkCode/:clueId', loadChildren: './clue-detail/clue-detail.module#ClueDetailPageModule' },
  { path: 'park/:gameId', loadChildren: './park/park.module#ParkPageModule' },
  { path: 'hint', loadChildren: './hint/hint.module#HintPageModule' },
  { path: 'instructions', loadChildren: './instructions/instructions.module#InstructionsPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
  { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'games', loadChildren: './games/games.module#GamesPageModule' },
  { path: 'new-game', loadChildren: './new-game/new-game.module#NewGamePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
