import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import * as CardActions from '../../redux/actions/cards.actions';

@Injectable()
export class YoutubeCardsEffects {
  public loadCards$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType('[Youtube Page] Get Youtube Cards'),
      mergeMap((action: { query: string }) =>
        this.youtubeService.getResponse(action.query).pipe(
          pluck('items'),
          map((cards) => CardActions.youtubeCardsLoadedSuccess({ cards })),
          catchError((error) => of(CardActions.youtubeCardsLoadedError({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private youtubeService: YoutubeService) {}
}
