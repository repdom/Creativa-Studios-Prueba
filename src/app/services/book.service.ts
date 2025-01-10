import { Injectable } from '@angular/core';
import {Inject} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url: string = '';
  constructor(
    private http: HttpClient
  ) {
  this.url = 'http://127.0.0.1:8082/api/libros';
}
  publicdelete(item: any) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    return this.http.delete<any>(this.url + '/' + item.id)
      .pipe(
        map(response => response),
      );
  }

  update(resourse: any, id: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    console.log(resourse);
    return this.http.put<any>(this.url + '/' + id, resourse)
      .pipe(
        map(response => response),
      );
  }

  getAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get<any>(this.url, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
      .pipe(
        map(response => response)
      );
  }
  getPagination(page: number, size: number, sortBy: string, sortDir: string, title: string) {
    // tslint:disable-next-line:max-line-length
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get<any>(this.url + '/', {
      params: {page: page, size: size, sortBy: sortBy, sortDir: sortDir, title: title},
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
      .pipe(
        map(response => response)
      );
  }

  getFromCode(codigo: number) {
    const headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    return this.http.get(this.url + '/' + codigo)
      .pipe(
        map(response => response),
      );
  }



  create(resourse: any) {
    console.log(resourse);
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url, resourse)
      .pipe(
        map(response => response),
      );
  }

}
