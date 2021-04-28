import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';
import { IDebtList } from 'src/app/view-models/debts/debt-list.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(
    private http: HttpClient,
  ) { }

  public getDebts(): Observable<IServiceResponse<IDebtList[]>> {
    return this.http.get<IServiceResponse<IDebtList[]>>('https://localhost:44302/debts');
  }

  public getDebtsById(id: number): Observable<IServiceResponse<IDebtDetails>> {
    return this.http.get<IServiceResponse<IDebtDetails>>(`https://localhost:44302/debts/edit/${id}`);
  }

  public delete(id: number): Observable<IServiceResponse<null>> {
    return this.http.delete<IServiceResponse<null>>(`https://localhost:44302/debts/${id}`);
  }

  public save(debt: IDebtDetails): Observable<IServiceResponse<number>> {
    if (debt.id)
      return this.http.put<IServiceResponse<number>>(`https://localhost:44302/debts`, debt);
    else
      return this.http.post<IServiceResponse<number>>(`https://localhost:44302/debts`, debt);
  }
}
