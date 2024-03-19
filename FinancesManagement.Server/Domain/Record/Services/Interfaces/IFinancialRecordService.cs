using FinancesManagement.Server.Domain.Record.Models;

namespace FinancesManagement.Server.Domain.Record.Services.Interfaces
{
    public interface IFinancialRecordService
    {
        Task<IEnumerable<FinancialRecordModel>> GetAllRecords();
        Task<HashSet<string>> GetAllRecordsWithClassification();
        Task<IEnumerable<FinancialRecordModel>> GetRecordsFiltered(DateTime? fromDate = null, DateTime? toDate = null, string? classification = null);
        Task<FinancialRecordModel> GetRecordById(int id);
        Task AddRecord(FinancialRecordModel record);
        Task UpdateRecord(FinancialRecordModel record);
        Task DeleteRecord(int id);
    }
}
