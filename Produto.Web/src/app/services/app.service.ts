import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, public _router: Router) {}

  eventosCertificado = new EventEmitter();
  apiUrl = environment.api;

  getItems(caminho: string): Observable<any> {
    return this.http.get(this.apiUrl + caminho);
  }

  postItems(caminho: any, objeto: any): Observable<any> {
    return this.http.post(this.apiUrl + caminho, objeto);
  }

  putItems(caminho: any, objeto: any): Observable<any> {
    return this.http.put(this.apiUrl + caminho, objeto);
  }

  deleteItems(caminho: any): Observable<any> {
    return this.http.delete(this.apiUrl + caminho);
  }
}
