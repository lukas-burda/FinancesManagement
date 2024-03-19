using FinancesManagement.Server.Domain.Record.Models;
namespace FinancesManagement.Server.Domain.Record.Repositories.Interfaces
{

    public interface IFinancialRecordRepository
    {
        Task<IEnumerable<FinancialRecordModel>> GetAllRecords();
        Task<IEnumerable<FinancialRecordModel>> GetAllRecordsWithClassifications();
        Task<IEnumerable<FinancialRecordModel>> GetRecordsFiltered(DateTime? fromDate = null, DateTime? toDate = null, string? classification = null);
        Task<FinancialRecordModel> GetRecordById(int id);
        Task AddRecord(FinancialRecordModel record);
        Task UpdateRecord(FinancialRecordModel record);
        Task DeleteRecord(int id);
    }
}
