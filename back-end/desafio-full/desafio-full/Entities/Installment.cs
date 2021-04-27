using System;

namespace desafio_full.Entities
{
    public class Installment
    {
        public int Id { get; set; }
        public int DebtId { get; set; }
        public int Number { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public decimal Value { get; set; }
        public Debt Debt { get; set; }

        protected Installment()
        { }

        public Installment(
            int number,
            int debtId,
            DateTimeOffset dueDate,
            decimal value,
            Debt debt = null
        ) : this()
        {
            SetData(
                number: number,
                debtId: debtId,
                dueDate: dueDate,
                value: value,
                debt: debt
            );
        }

        public void SetData(
            int number,
            int debtId,
            DateTimeOffset dueDate,
            decimal value,
            Debt debt = null
        )
        {
            Number = number;
            DebtId = debtId;
            DueDate = dueDate;
            Value = value;
            Debt = debt;
        }
    }
}
