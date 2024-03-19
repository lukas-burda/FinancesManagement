﻿using FinancesManagement.Server.Domain.Record.Repositories.Interfaces;
using FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces;
using FinancesManagement.Server.Domain.Totals.Models;

namespace FinancesManagement.Server.Domain.ResumeTotals.Services
{
    public class ResumeTotalsService : IResumeTotalsService
    {
        private readonly IFinancialRecordRepository _repository;

        public ResumeTotalsService(IFinancialRecordRepository repository)
        {
            _repository = repository;

        }

        public async Task<ResumeTotalsModel> GetAndCalculateTotals(DateTime? fromDate, DateTime? toDate, string? classification)
        {
            var records = await _repository.GetRecordsFiltered(fromDate, toDate, classification);

            var resume = new ResumeTotalsModel();
            foreach (var record in records)
            {
                if (record.IsExpense())
                {
                    resume.ExpenseAmount += record.Amount;
                }
                if(record.IsIncome())
                {
                    resume.IncomeAmount += record.Amount;
                }
            }

            resume.CurrentBalance = resume.IncomeAmount + (resume.ExpenseAmount); //Expense is always negative decimal

            return resume;
        }
    }
}
