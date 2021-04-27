import { IInstallmentDetails } from "../installments/installment-details.interface";

export interface IDebtDetails {
    id: number;
    titleNumber: number;
    debtorName: string;
    debtorCpf: string;
    interestPercentageRate: number;
    penaltyPercentageRate: number;
    creationDate: Date;
    installments: IInstallmentDetails[];
}
