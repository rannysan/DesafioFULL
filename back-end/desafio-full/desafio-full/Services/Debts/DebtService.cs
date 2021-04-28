using desafio_full.Data;
using desafio_full.Entities;
using desafio_full.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio_full.Debts.Services
{
    public class DebtService
    {
        private readonly DesafioFullDbContext _context;

        public DebtService(DesafioFullDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<List<Debt>>> GetList()
        {
            ServiceResponse<List<Debt>> serviceResponse = new ServiceResponse<List<Debt>>();
            serviceResponse.Data = await _context.Debts.ToListAsync();

            return serviceResponse;
        }

        public async Task<ServiceResponse<Debt>> GetById(int id)
        {
            if (id <= 0)
                return new ServiceResponse<Debt>("Parameter id cannot be 0.");

            var debt = await _context.Debts.FirstOrDefaultAsync(d => d.Id == id);

            if (debt == null)
                return new ServiceResponse<Debt>("The debt was not found.");

            return new ServiceResponse<Debt>(debt);
        }

        public async Task<ServiceResponse<int>> Create(Debt newDebt)
        {
            await _context.AddAsync(newDebt);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>(newDebt.Id);
            else
                return new ServiceResponse<int>("Error when trying to create a debt.");
        }

        public async Task<ServiceResponse<int>> Update(Debt updatedDebt)
        {
            var debt = _context.Debts.FirstOrDefault(d => d.Id == updatedDebt.Id);

            if (debt == null)
                return new ServiceResponse<int>("The debt was not found.");

            debt.TitleNumber = updatedDebt.TitleNumber;
            debt.DebtorName = updatedDebt.DebtorName;
            debt.DebtorCPF = updatedDebt.DebtorCPF;
            debt.InterestPercentageRate = updatedDebt.InterestPercentageRate;
            debt.PenaltyPercentageRate = updatedDebt.PenaltyPercentageRate;

            _context.Debts.Update(debt);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>(debt.Id);
            else
                return new ServiceResponse<int>("Error when trying to update a debt.");
        }

        public async Task<ServiceResponse<int>> Delete(int id)
        {
            if (id <= 0)
                return new ServiceResponse<int>("Parameter id cannot be 0.");

            var debt = await _context.Debts.FirstOrDefaultAsync(d => d.Id == id);

            if (debt == null)
                return new ServiceResponse<int>("The debt was not found.");

            _context.Debts.Remove(debt);

            if (await _context.SaveChangesAsync() > 0)
                return new ServiceResponse<int>();
            else
                return new ServiceResponse<int>("Error when trying to delete a debt.");
        }
    }
}
