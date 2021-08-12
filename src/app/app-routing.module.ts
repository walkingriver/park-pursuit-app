import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule) },
  { path: 'clue/:parkCode/:clueId', loadChildren: () => import('./clue-detail/clue-detail.module').then(m => m.ClueDetailPageModule) },
  { path: 'park/:gameId', loadChildren: () => import('./park/park.module').then(m => m.ParkPageModule) },
  { path: 'hint', loadChildren: () => import('./hint/hint.module').then(m => m.HintPageModule) },
  { path: 'instructions', loadChildren: () => import('./instructions/instructions.module').then(m => m.InstructionsPageModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyPageModule) },
  { path: 'progress', loadChildren: () => import('./progress/progress.module').then(m => m.ProgressPageModule) },
  { path: 'terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule) },
  { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesPageModule) },
  { path: 'new-game', loadChildren: () => import('./new-game/new-game.module').then(m => m.NewGamePageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
