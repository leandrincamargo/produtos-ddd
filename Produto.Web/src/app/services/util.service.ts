import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private _visivelSpin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public visivelSpin: Observable<boolean> = this._visivelSpin.asObservable();

  constructor() {}

  alterarVisivelSpin() {
    this._visivelSpin.next(!this._visivelSpin.getValue());
  }

  isVisivelSpin() {
    return this._visivelSpin.getValue();
  }
}
