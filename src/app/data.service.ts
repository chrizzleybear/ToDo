import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDTO } from './ItemDTO';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  dbUrl = 'assets/exampleItems.json'

  getItems() {
    return this.http.get<ItemDTO[]>(this.dbUrl);
  }
}
