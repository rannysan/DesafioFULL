import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(
    private http: HttpClient,
  ) { }

  public getDebts(): Observable<any> {
    return this.http.get('https://localhost:44302/debts');
  }

  public getDebtsById(id: number): Observable<any> {
    return this.http.get(`https://localhost:44302/debts/edit/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`https://localhost:44302/debts/${id}`);
  }
}
