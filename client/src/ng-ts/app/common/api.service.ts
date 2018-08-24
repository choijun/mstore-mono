import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ApiService {
  constructor(protected http: HttpClient) { }

  protected get<T>(url: string, result?: T): Promise<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError(url, result))).toPromise();
  }

  protected post<T>(url: string, body: any, result?: T): Promise<T> {
    return this.http.post<T>(url, body).pipe(catchError(this.handleError(url, result))).toPromise();
  }

  private handleError<T>(url = '', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Failed on request to ${url} caused by: ${error.message}`);
      return of(result as T);
    };
  }
}