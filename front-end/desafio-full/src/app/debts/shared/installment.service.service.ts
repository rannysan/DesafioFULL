import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IInstallmentDetails } from 'src/app/view-models/installments/installment-details.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {
  constructor(
    private http: HttpClient,
  ) { }

  public getInstallments(debtId: number): Observable<IServiceResponse<IInstallmentDetails[]>> {
    return this.http.get<IServiceResponse<IInstallmentDetails[]>>(`https://localhost:44302/installments/${debtId}`);
  }

  public getDInstallmentById(id: number): Observable<IServiceResponse<IInstallmentDetails>> {
    return this.http.get<IServiceResponse<IInstallmentDetails>>(`https://localhost:44302/installments/edit/${id}`);
  }

  public delete(id: number): Observable<IServiceResponse<null>> {
    return this.http.delete<IServiceResponse<null>>(`https://localhost:44302/installments/${id}`);
  }

  public save(installments: IInstallmentDetails): Observable<IServiceResponse<null>> {
    if (installments.id)
      return this.http.put<IServiceResponse<null>>(`https://localhost:44302/installments`, installments);
    else
      return this.http.post<IServiceResponse<null>>(`https://localhost:44302/installments`, installments);
  }
}
