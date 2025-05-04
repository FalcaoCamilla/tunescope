import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@shared/services/api.service';
import { Artist } from '@shared/models';
import { AlbumsComponent } from '@pages/albums/albums.component';
import { CardDetailsComponent } from '@shared/components/card-details/card-details.component';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, AlbumsComponent, CardDetailsComponent],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);

  protected artist: Artist = {} as Artist;

  ngOnInit() {
    this.getArtist();
  }

  getArtist() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.apiService.getItemById<Artist>(id, 'artist').subscribe((res) => {
          this.artist = res;
        });
      }
    });
  }

  goToExternalUrl(): void {
    const externalUrl = this.artist?.external_urls?.spotify; 
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    }
  }
}
