import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { spotifyAuthGuard } from '@core/guards/spotify-auth.guard';
import { BaseComponent } from '@pages/base/base.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'artists',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'callback',
    loadComponent: () => import('@pages/callback/callback.component').then(m => m.CallbackComponent),
  },
  {
    path: '',
    component: BaseComponent, 
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'artists',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'albums',
        loadComponent: () => import('@pages/albums/albums.component').then(m => m.AlbumsComponent),
      },
      {
        path: 'album/:id',
        loadComponent: () => import('@pages/albums/album-details/album-details.component').then(m => m.AlbumDetailsComponent),
      },
      {
        path: 'artists',
        loadComponent: () => import('@pages/artists/artists.component').then(m => m.ArtistsComponent),
      },
      {
        path: 'artist/:id',
        loadComponent: () => import('@pages/artists/artist-details/artist-details.component').then(m => m.ArtistDetailsComponent),
      },
      {
        path: 'tracks',
        loadComponent: () => import('@pages/tracks/tracks.component').then(m => m.TracksComponent),
      },
      {
        path: 'favorites',
        loadComponent: () => import('@pages/favorites/favorites.component').then(m => m.FavoritesComponent),
        canActivate: [spotifyAuthGuard]
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('@pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
      },
      {
        path: '**',
        redirectTo: 'artists',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
