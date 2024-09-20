import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowSummaryService {
  private _showSummary$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  showSummary$: Observable<boolean> = this._showSummary$.asObservable();

  updateShowSummaryStatus(showSummary: boolean) {
    this._showSummary$.next(showSummary);
  }
}
