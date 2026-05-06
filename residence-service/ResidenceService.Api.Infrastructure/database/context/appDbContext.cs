using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Infrastructure.database.context;

public class AppDbContext : DbContext{
  public AppDbContext (DbContextOptions<AppDbContext> options) : base (options){}

  public DbSet<Companie> Companies {get; set;}
  public DbSet<CompanieContact> CompanieContacts {get; set;}
  public DbSet<CompanyRating> CompanyRatings {get; set;}
  public DbSet<Project> Projects {get; set;}
  public DbSet<ProjectAssignment> ProjectAssignments {get; set;}
  public DbSet<Deliverable> Deliverables {get; set;}
  public DbSet<DeliverableAssignment> DeliverableAssignments {get; set;}
  public DbSet<DeliverableSubmission> DeliverableSubmissions {get; set;}

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        
        modelBuilder.Entity<CompanyRating>()
        .HasOne(cr => cr.Companie)
        .WithMany("Ratings")
        .HasForeignKey(cr => cr.IdCompanie)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<CompanyRating>()
        .HasOne(cr => cr.ProjectAssignment)
        .WithMany()
        .HasForeignKey(cr => cr.IdProjectAssignment)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<DeliverableAssignment>()
        .HasOne(da => da.ProjectAssignment)
        .WithMany()
        .HasForeignKey(da => da.IdProjectAssignment)
        .OnDelete(DeleteBehavior.NoAction);
    }
} 