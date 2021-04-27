using desafio_full.Entities;
using desafio_full.Entities.DbConfig;
using Microsoft.EntityFrameworkCore;

namespace desafio_full.Data
{
    public class DesafioFullDbContext : DbContext
    {
        public DbSet<Debt> Debts { get; set; }
        public DbSet<Installment> Installments { get; set; }

        public DesafioFullDbContext(DbContextOptions<DesafioFullDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost; Initial Catalog=desafio_full; Integrated Security=false; User Id=sa; Password=password;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DebtDbConfig());
            modelBuilder.ApplyConfiguration(new InstallmentDbConfig());
        }
    }
}
