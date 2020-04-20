import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private form = new BehaviorSubject(false);
  public displayForm = this.form.asObservable();

  public setFormDisplay(display: boolean): void {
    this.form.next(display);
  }
}
