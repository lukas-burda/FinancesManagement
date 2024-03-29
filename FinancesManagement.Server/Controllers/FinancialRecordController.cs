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
        public FinancialRecordsController(IFinancialRecordService financialRecordService)
        {
            _financialRecordService = financialRecordService;
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

        [HttpPut]
        public IActionResult UpdateRecord(FinancialRecordModel record) 
        {
            try
            {
                _financialRecordService.UpdateRecord(record);
                return CreatedAtAction(nameof(this.UpdateRecord), record);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteRecord(int id)
        {
            try
            {
                _financialRecordService.DeleteRecord(id);
                return Ok();
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
