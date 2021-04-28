using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using desafio_full.Entities;
using desafio_full.Services.Installments;

namespace desafio_full.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InstallmentsController : Controller
    {
        private readonly InstallmentService _installmentService;

        public InstallmentsController(InstallmentService installmentService)
        {
            _installmentService = installmentService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await _installmentService.GetList(id));
        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            return Ok(await _installmentService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Installment newInstallment)
        {
            return Ok(await _installmentService.Create(newInstallment));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(Installment updatedInstallment)
        {
            return Ok(await _installmentService.Update(updatedInstallment));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            return Ok(await _installmentService.Delete(id));
        }
    }
}
