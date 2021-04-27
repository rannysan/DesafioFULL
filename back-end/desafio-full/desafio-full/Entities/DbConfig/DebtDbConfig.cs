using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace desafio_full.Entities.DbConfig
{
    public class DebtDbConfig : IEntityTypeConfiguration<Debt>
    {
        public void Configure(EntityTypeBuilder<Debt> builder)
        {
            var emptyAsNull = new ValueConverter<string, string>(value => value == string.Empty ? null : value, value => value);

            builder.ToTable("debts", schema: "dbo");
            builder.HasKey(p => p.Id).HasName("id");
            builder.Property(p => p.Id).HasColumnType("int");

            builder.Property(p => p.TitleNumber).HasColumnType("int").HasColumnName("title_number");
            builder.Property(p => p.DebtorName).HasColumnType("varchar(100)").HasColumnName("debtor_name");
            builder.Property(p => p.DebtorCPF).HasColumnType("varchar(15)").HasColumnName("debtor_cpf");
            builder.Property(p => p.InterestPercentageRate).HasColumnType("decimal(18, 2)").HasColumnName("interest_percentage_rate");
            builder.Property(p => p.PenaltyPercentageRate).HasColumnType("decimal(18, 2)").HasColumnName("penalty_percentage_rate");

            builder.Property(p => p.CreationDate).HasColumnType("datetimeoffset(7)").HasColumnName("creation_date");
            builder.Property(p => p.LastUpdate).HasColumnType("datetimeoffset(7)").HasColumnName("last_update");

            builder.HasMany(p => p.Installments).WithOne(p => p.Debt).HasForeignKey(p => p.DebtId);
        }
    }
}
