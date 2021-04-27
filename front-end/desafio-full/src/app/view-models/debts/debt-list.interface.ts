import { IInstallmentDetails } from "../installments/installment-details.interface";

export interface IDebtList {
    id: number;
    titleNumber: number;
    debtorName: string;
    interestPercentageRate: number;
    penaltyPercentageRate: number;
    creationDate: Date;
    installments: IInstallmentDetails[];

    //only client
    numberOfInstallments: number;
    originalValue: number;
    daysOfDelay: number;
    updateValue:number;
  }
  