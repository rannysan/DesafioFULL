using desafio_full.Data;
using desafio_full.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio_full.Services.Installments
{
    public class InstallmentService
    {
        private readonly DesafioFullDbContext _context;

        public InstallmentService(DesafioFullDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<List<Installment>>> GetList(int debtId)
        {
            ServiceResponse<List<Installment>> serviceResponse = new ServiceResponse<List<Installment>>();
            serviceResponse.Data = await _context.Installments.Where(i => i.DebtId == debtId).ToListAsync();

            return serviceResponse;
        }

        public async Task<ServiceResponse<Installment>> GetById(int id)
        {
            if (id <= 0)
                return new ServiceResponse<Installment>("Parameter id cannot be 0.");

            var installment = await _context.Installments.FirstOrDefaultAsync(d => d.Id == id);

            if (installment == null)
                return new ServiceResponse<Installment>("The debt was not found.");

            return new ServiceResponse<Installment>(installment);
        }

        public async Task<ServiceResponse<int>> Create(Installment newInstallment)
        {
            newInstallment.Debt = await _context.Debts.FirstOrDefaultAsync(d => d.Id == newInstallment.DebtId);
            await _context.AddAsync(newInstallment);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>(newInstallment.Id);
            else
                return new ServiceResponse<int>("Error when trying to create a debt.");
        }

        public async Task<ServiceResponse<int>> Update(Installment updatedInstallment)
        {
            var installment = _context.Installments.FirstOrDefault(d => d.Id == updatedInstallment.Id);

            if (installment == null)
                return new ServiceResponse<int>("The installment was not found.");

            installment.Number = updatedInstallment.Number;
            installment.DueDate = updatedInstallment.DueDate;
            installment.Value = updatedInstallment.Value;

            _context.Installments.Update(installment);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>(installment.Id);
            else
                return new ServiceResponse<int>("Error when trying to update a installment.");
        }

        public async Task<ServiceResponse<int>> Delete(int id)
        {
            if (id <= 0)
                return new ServiceResponse<int>("Parameter id cannot be 0.");

            var installment = await _context.Installments.FirstOrDefaultAsync(d => d.Id == id);

            if (installment == null)
                return new ServiceResponse<int>("The installment was not found.");

            _context.Installments.Remove(installment);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>();
            else
                return new ServiceResponse<int>("Error when trying to delete a installment.");
        }
    }
}
