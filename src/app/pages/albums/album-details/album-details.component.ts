import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from '@shared/components/card-details/card-details.component';
import { ActivatedRoute } from '@angular/router';
import { Album } from '@shared/models';
import { ApiService } from '@shared/services/api.service';
import { TracksComponent } from '@pages/tracks/tracks.component';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, CardDetailsComponent],
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  protected album: Album = {} as Album;

  ngOnInit() {
    this.getAlbum();
  }

  getAlbum() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.apiService.getItemById<Album>(id, 'album').subscribe((res) => {
          this.album = res;
        });
      }
    });
  }
}
