import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedIndexService {
  private _selectedIndex$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public selectedIndex$: Observable<number> =
    this._selectedIndex$.asObservable();

  constructor() {}

  updateSelectedIndex(selectedIndex: number) {
    this._selectedIndex$.next(selectedIndex);
  }
}
