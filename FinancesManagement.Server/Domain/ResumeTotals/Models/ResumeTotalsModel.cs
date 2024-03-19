namespace FinancesManagement.Server.Domain.Totals.Models
{
    public class ResumeTotalsModel
    {
        public decimal CurrentBalance { get; set; }
        public decimal ExpenseAmount { get; set; }
        public decimal IncomeAmount { get; set; }

        public ResumeTotalsModel() { }

        public ResumeTotalsModel(decimal currentBalance, decimal expenseAmount, decimal incomeAmount, decimal totalAmount)
        {
            CurrentBalance = currentBalance;
            ExpenseAmount = expenseAmount;
            IncomeAmount = incomeAmount;
        }
    }
}
