using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FiservReactApp.Models
{
    public partial class FiservDemoDBContext : DbContext
    {
        public FiservDemoDBContext()
        {
        }

        public FiservDemoDBContext(DbContextOptions<FiservDemoDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Quote> Quotes { get; set; }
        public virtual DbSet<Score> Scores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=FiservDemoDB;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Quote>(entity =>
            {
                entity.Property(e => e.Author)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Quote1)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("Quote");
            });

            modelBuilder.Entity<Score>(entity =>
            {
                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Quote)
                    .WithMany(p => p.Scores)
                    .HasForeignKey(d => d.QuoteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QuoteScore");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
