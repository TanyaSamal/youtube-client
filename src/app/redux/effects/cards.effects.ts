import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import * as CardActions from '../../redux/actions/cards.actions';

@Injectable()
export class YoutubeCardsEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Youtube Page] Get Youtube Cards'),
      mergeMap((action: { query: string }) =>
        this.youtubeService.getResponse(action.query).pipe(
          pluck('items'),
          map((cards) => CardActions.youtubeCardsLoadedSuccess({ cards })),
          catchError(() => of({ type: '[Youtube API] Youtube Cards Loaded Error' })),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private youtubeService: YoutubeService) {}
}
