using FinancesManagement.Server.Domain.Totals.Models;

namespace FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces
{
    public interface IResumeTotalsService
    {
        public Task<ResumeTotalsModel> GetAndCalculateTotals(DateTime? fromDate, DateTime? toDate, string? classification);
    }
}
