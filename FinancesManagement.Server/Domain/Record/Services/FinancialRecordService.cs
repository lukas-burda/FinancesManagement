using FinancesManagement.Server.Domain.Models;
using FinancesManagement.Server.Domain.Record.Models;
using FinancesManagement.Server.Domain.Record.Repositories.Interfaces;
using FinancesManagement.Server.Domain.Record.Services.Interfaces;

namespace FinancesManagement.Server.Domain.Record.Services
{
    public class FinancialRecordService : IFinancialRecordService
    {
        private readonly IFinancialRecordRepository _repository;

        public FinancialRecordService(IFinancialRecordRepository repository)
        {
            _repository = repository;

        }

        public Task AddRecord(FinancialRecordModel record)
        {
            return _repository.AddRecord(record);
        }

        public Task DeleteRecord(int id)
        {
            return _repository.DeleteRecord(id);
        }

        public async Task<IEnumerable<FinancialRecordModel>> GetAllRecords()
        {
            return await _repository.GetAllRecords();
        }

        public Task<FinancialRecordModel> GetRecordById(int id)
        {
            return _repository.GetRecordById(id);
        }

        public async Task<IEnumerable<FinancialRecordModel>> GetRecordsFiltered(QueryOptionsFilter queryOptions)
        {
            return await _repository.GetRecordsFiltered(queryOptions);
        }

        public Task UpdateRecord(FinancialRecordModel record)
        {
            return _repository.UpdateRecord(record);
        }

        public async Task<HashSet<string>> GetAllRecordsWithClassification()
        {
            var records = await _repository.GetAllRecordsWithClassifications();
            var existentClassifications = new HashSet<string>();
            foreach(var record in records)
            {
                existentClassifications.Add(record.Classification);
            }
            return existentClassifications;
        }
    }
}
