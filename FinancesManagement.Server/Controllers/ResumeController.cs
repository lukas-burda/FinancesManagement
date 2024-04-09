using FinancesManagement.Server.Domain.Models;
using FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinancesManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeTotalsService _resumeTotalsService;

        public ResumeController(IResumeTotalsService resumeTotalsService)
        {
            _resumeTotalsService = resumeTotalsService;
        }

        [HttpGet("totals")]
        public async Task<IActionResult> GetTotals([FromQuery]QueryOptionsFilter queryOptions)
        {
            try
            {
                var totals = await _resumeTotalsService.GetAndCalculateTotals(queryOptions);
                return Ok(totals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
