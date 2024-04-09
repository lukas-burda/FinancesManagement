namespace FinancesManagement.Server.Domain.Models
{
    public class QueryOptionsFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Classification { get; set; }
        public string? OrderBy { get; set; }
        public string? OrderAscending { get; set; }
    }
}
