import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

export type LoadingState = null | { message: string | null }

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private loadingSubject: BehaviorSubject<LoadingState> = new BehaviorSubject<LoadingState>(null)

  setLoading(message: string | null) {
    this.loadingSubject.next({ message: message })
  }

  stopLoading() {
    this.loadingSubject.next(null)
  }

  loadingObservable(): Observable<LoadingState> {
    return this.loadingSubject;
  }
}
