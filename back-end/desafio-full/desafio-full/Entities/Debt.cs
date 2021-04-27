using System;
using System.Collections.Generic;

namespace desafio_full.Entities
{
    public class Debt
    {
        public int Id { get; set; }
        public int TitleNumber { get; set; }
        public string DebtorName { get; set; }
        public string DebtorCPF { get; set; }
        public decimal InterestPercentageRate { get; set; }
        public decimal PenaltyPercentageRate { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset LastUpdate { get; set; }
        public List<Installment> Installments { get; set; }


        protected Debt()
        {
            CreationDate = DateTimeOffset.Now;
        }

        public Debt(
            int titleNumber,
            string debtorName,
            string debtorCPF,
            decimal interestPercentageRate,
            decimal penaltyPercentageRate
        ) : this()
        {
            SetData(
                titleNumber: titleNumber,
                debtorName: debtorName,
                debtorCPF: debtorCPF,
                interestPercentageRate: interestPercentageRate,
                penaltyPercentageRate: penaltyPercentageRate
            );
        }

        public void SetData(
            int titleNumber,
            string debtorName,
            string debtorCPF,
            decimal interestPercentageRate,
            decimal penaltyPercentageRate
        )
        {
            TitleNumber = titleNumber;
            DebtorName = debtorName;
            DebtorCPF = debtorCPF;
            InterestPercentageRate = interestPercentageRate;
            PenaltyPercentageRate = penaltyPercentageRate;
        }
    }
}
