import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemDTO } from './DTOs/ItemDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  todoUrl = 'http://localhost:3000/todos';
  private token = config.TOKEN;
  headerOptions = new HttpHeaders({
    'Authorization': `bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  getItems() {
    return this.http
      .get<ItemDTO[]>(this.todoUrl)
      .pipe(catchError(this.handleError));
  }

  postItem(item: ItemDTO) {
    console.log('posting Item');
    return this.http
      .post<ItemDTO>(this.todoUrl, item, { headers: this.headerOptions })
      .pipe(catchError(this.handleError));
  }

  deleteItem(id: number): Observable<unknown> {
    console.log('deleting Item');
    const url = '${this.deleteItemUrl}/${id}';
    return this.http
      .delete<ItemDTO>(url)
      .pipe(catchError(this.handleError))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // client-side or network error occured.
      console.error('An error occured:', error.error);
    } else {
      // Backend returned an unsuccessful response code.
      // Response Body may contain clues as to what went wrong.
      console.error(
        'Backend returned code ${error.status}, body was: ',
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('An Error happened during Communication with Server.')
    );
  }
}
