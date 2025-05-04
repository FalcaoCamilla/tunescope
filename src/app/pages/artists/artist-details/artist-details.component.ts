import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@shared/services/api.service';
import { Artist } from '@shared/models';
import { AlbumsComponent } from '@pages/albums/albums.component';
import { CardDetailsComponent } from '@shared/components/card-details/card-details.component';
import { WikipediaService } from '@shared/services/wikipedia.service';
import { finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, AlbumsComponent, CardDetailsComponent],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  apiService = inject(ApiService);
  wikipediaService = inject(WikipediaService);
  route = inject(ActivatedRoute);
  protected artist: Artist = {} as Artist;

  ngOnInit() {
    this.getArtist();
  }

  getArtist() {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        const id = params.get('id');
        if(id) return this.apiService.getItemById<Artist>(id, 'artist');
        return of(null); //retorna um observable vazio se o id não existir
      }),
      switchMap((artist) => {
        if (artist) {
          this.artist = artist;
          return this.wikipediaService.getBiography(artist.name);
        }
        return of(''); //retorna um observable vazio se o artista não existir
      }),
      finalize(() => {
        if(!this.artist.biography) this.artist.biography = 'Loading biography...';
      })
    )
    .subscribe({
      next: (biography) => {
        if(biography) this.artist.biography = biography;
      },
      error: () => {
        this.artist.biography = 'Sorry, I could not find any information about this artist.';
      }
    });
  }
}
