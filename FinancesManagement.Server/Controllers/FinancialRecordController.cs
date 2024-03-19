using FinancesManagement.Server.Domain.Record.Models;
using FinancesManagement.Server.Domain.Record.Services.Interfaces;
using FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces;
using FinancesManagement.Server.Domain.Totals.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinancesManagement.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FinancialRecordsController : ControllerBase
    {
        private readonly IFinancialRecordService _financialRecordService;
        private readonly IResumeTotalsService _resumeTotalsService;

        public FinancialRecordsController(IFinancialRecordService financialRecordService, IResumeTotalsService resumeTotalsService)
        {
            _financialRecordService = financialRecordService;
            _resumeTotalsService = resumeTotalsService;
        }

        // Add a new financial record
        [HttpPost]
        public IActionResult AddRecord(FinancialRecordModel record)
        {
            try
            {
                _financialRecordService.AddRecord(record);
                return CreatedAtAction(nameof(this.AddRecord), record);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // Get a list of all financial records
        [HttpGet("records")]
        public async Task<IActionResult> GetRecords()
        {
            try
            {
                var records = await _financialRecordService.GetAllRecords();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Get a summary of totals based on date filter
        [HttpGet("recordsFilter")]
        public async Task<IActionResult> recordsFiltered(DateTime? fromDate, DateTime? toDate, string? classification)
        {
            try
            {
                var recordsFiltered = await _financialRecordService.GetRecordsFiltered(fromDate, toDate, classification);
                return Ok(recordsFiltered);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("totals")]
        public async Task<IActionResult> GetTotals(DateTime? fromDate, DateTime? toDate, string? classification)
        {
            try
            {
                var totals = await _resumeTotalsService.GetAndCalculateTotals(fromDate, toDate, classification);
                return Ok(totals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("existentClassifications")]
        public async Task<IActionResult> GetExistentClassifications()
        {
            try
            {
                var classifications = await _financialRecordService.GetAllRecordsWithClassification();
                return Ok(classifications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
