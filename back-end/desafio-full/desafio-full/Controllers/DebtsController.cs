using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using desafio_full.Debts.Services;
using desafio_full.Entities;

namespace desafio_full.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DebtsController : Controller
    {
        private readonly DebtService _debtService;

        public DebtsController(DebtService debtService)
        {
            _debtService = debtService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _debtService.GetList());
        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            return Ok(await _debtService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Debt newDebt)
        {           
            return Ok(await _debtService.Create(newDebt));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(Debt updatedDebt)
        {       
            return Ok(await _debtService.Update(updatedDebt));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            return Ok(await _debtService.Delete(id));
        }
    }
}
