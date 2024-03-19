namespace FinancesManagement.Server.Domain.Record.Models
{
    public class FinancialRecordModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsExpense()
        {
            return Amount < 0;
        }

        public bool IsIncome()
        {
            return Amount > 0;
        }

        private string? _classification;

        public string? Classification
        {
            get => _classification;
            set => _classification = value?.ToUpper();
        }
    }
}
