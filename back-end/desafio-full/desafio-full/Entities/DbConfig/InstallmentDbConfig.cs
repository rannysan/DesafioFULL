using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace desafio_full.Entities.DbConfig
{
    public class InstallmentDbConfig : IEntityTypeConfiguration<Installment>
    {
        public void Configure(EntityTypeBuilder<Installment> builder)
        {
            var emptyAsNull = new ValueConverter<string, string>(value => value == string.Empty ? null : value, value => value);

            builder.ToTable("installments", schema: "dbo");
            builder.HasKey(p => p.Id).HasName("id");
            builder.Property(p => p.Id).HasColumnType("int");

            builder.Property(p => p.Number).HasColumnType("int").HasColumnName("number");
            builder.Property(p => p.DueDate).HasColumnType("datetimeoffset(7)").HasColumnName("due_date");
            builder.Property(p => p.Value).HasColumnType("decimal").HasColumnName("value");
            builder.Property(p => p.DebtId).HasColumnType("int").HasColumnName("id_debt");

            builder.HasOne(p => p.Debt);
        }
    }
}
