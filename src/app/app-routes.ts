import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'clue/:parkCode/:clueId',
    loadComponent: () =>
      import('./clue-detail/clue-detail.page').then((m) => m.ClueDetailPage),
  },
  {
    path: 'park/:gameId',
    loadComponent: () => import('./park/park.page').then((m) => m.ParkPage),
  },
  {
    path: 'hint',
    loadComponent: () => import('./hint/hint.page').then((m) => m.HintPage),
  },
  {
    path: 'instructions',
    loadComponent: () =>
      import('./instructions/instructions.page').then(
        (m) => m.InstructionsPage
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./privacy/privacy.page').then((m) => m.PrivacyPage),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress/progress.page').then((m) => m.ProgressPage),
  },
  {
    path: 'terms',
    loadComponent: () => import('./terms/terms.page').then((m) => m.TermsPage),
  },
  {
    path: 'games',
    loadComponent: () => import('./games/games.page').then((m) => m.GamesPage),
  },
  {
    path: 'new-game',
    loadComponent: () =>
      import('./new-game/new-game.page').then((m) => m.NewGamePage),
  },
];
