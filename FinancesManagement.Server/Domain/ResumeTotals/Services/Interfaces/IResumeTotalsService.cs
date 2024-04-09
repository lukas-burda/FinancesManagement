using FinancesManagement.Server.Domain.Models;
using FinancesManagement.Server.Domain.Totals.Models;

namespace FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces
{
    public interface IResumeTotalsService
    {
        public Task<ResumeTotalsModel> GetAndCalculateTotals(QueryOptionsFilter queryOptions);
    }
}
